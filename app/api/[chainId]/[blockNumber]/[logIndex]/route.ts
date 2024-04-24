import { erc20Abi } from '@/app/utils/viem/abi';
import { createViemClient, getChainNameById } from '@/app/utils/viem/client';
import { Block, Hex, Log, PublicClient, decodeEventLog } from 'viem';
import '@/app/utils/serialization'; // Note: needed for BigInt serialization.
import { Transfer, EventLog, SupportedChainId } from '@/app/utils/types';
import { AddressProfile } from '@/app/utils/types';
import { resolveAccountForAddress } from '../../../../utils/profiles';
import { tryGetDaimoMemo } from '@/app/utils/getDaimoMemo';
import { DB } from '@/src/db/db';
import { getTokenDetails } from '@/app/utils/getTokenDetails';
import { getBlockFromViem } from '@/app/utils/getBlock';

/**
 * Fetch transfer from Viem.
 */
async function fetchTransferFromViem(
  chainId: string,
  blockNum: string,
  logIdx: string,
  publicClient: PublicClient,
): Promise<{ erc20TransferData: Transfer; eventLogData: Partial<EventLog> } | Error> {
  const blockNumber = BigInt(blockNum);
  const logIndex = Number(logIdx);

  // Fetch logs at block number.
  const logs: Log[] = await publicClient.getLogs({
    fromBlock: blockNumber,
    toBlock: blockNumber,
  });

  // Type Log reference: https://github.com/wevm/viem/blob/main/src/types/log.ts.
  const log: Log = logs[logIndex];

  if (log.blockNumber !== blockNumber || log.logIndex !== logIndex) return Error('Log not found');
  if (log.transactionHash === null) return Error('Block not finalized');

  // Format event log data.
  const eventLogData: Partial<EventLog> = {
    blockNumber: blockNumber,
    logIndex: log.logIndex,
    transactionHash: log.transactionHash,
    chainId: Number(chainId),
  };

  // Decode ERC20 transfer event data.
  let erc20EventLogData;
  try {
    erc20EventLogData = decodeEventLog({
      abi: erc20Abi,
      data: log.data,
      topics: log.topics,
    });
  } catch (e) {
    console.log(`[ERROR] Failed to decode event log: ${e}`);
    return Error('Inputted log is not an ERC-20 transfer event');
  }

  const { tokenDecimal, tokenSymbol } = await getTokenDetails(log.address, publicClient);

  // Get Daimo memo if exists.
  const memo = await tryGetDaimoMemo(log.transactionHash, log.logIndex);

  // Format ERC20 transfer event data.
  const erc20TransferData: Transfer = {
    from: erc20EventLogData.args.from,
    to: erc20EventLogData.args.to,
    value: erc20EventLogData.args.value,
    contractAddress: log.address,
    tokenDecimal: tokenDecimal,
    tokenSymbol: tokenSymbol,
    memo: memo,
  };

  console.log('[API] fetched from Viem');
  return {
    erc20TransferData,
    eventLogData,
  };
}

/**
 * Fetch transfer from DB.
 */
async function fetchTransferFromDB(
  chainId: number,
  blockNumber: bigint,
  logIndex: number,
): Promise<{ erc20TransferData: Partial<Transfer>; eventLogData: Partial<EventLog> } | Error> {
  const db = new DB();
  const transfers = await db.getTransfer(chainId, blockNumber, logIndex);

  if (transfers?.rowCount === 0 || transfers === undefined)
    return Error('Transfer not found in DB');

  const transfer = transfers.rows[0];
  const txHash = `0x${transfer.tx_hash.toString('hex')}` as Hex;
  const logAddress = `0x${transfer.log_addr.toString('hex')}` as Hex;

  const memo = await tryGetDaimoMemo(txHash, logIndex);

  // Format event log data.
  const eventLogData: Partial<EventLog> = {
    blockNumber: blockNumber,
    logIndex: logIndex,
    transactionHash: txHash,
    chainId: chainId,
  };

  // Format ERC20 transfer event data.
  const erc20TransferData: Partial<Transfer> = {
    from: `0x${transfer.from.toString('hex')}`,
    to: `0x${transfer.to.toString('hex')}`,
    value: transfer.value.toString(),
    contractAddress: logAddress,
    memo: memo,
  };

  console.log('[API] fetched from DB');
  return {
    erc20TransferData,
    eventLogData,
  };
}

/**
 * Handle GET requests to /api/[blockNumber]/[logIndex]
 *
 * @param {Object} params - The request parameters.
 * @param {string} params.chainId - The chain ID of the desired log.
 * @param {string} params.blockNumber - The block number for the desired log.
 * @param {string} params.logIndex - The log index of the desired log.
 * @returns {Object} The log data in the form: { transferData, eventLogData,
 *                   fromAccountProfile, toAccountProfile }.
 */
export async function GET(
  req: Request,
  { params }: { params: { chainId: string; blockNumber: string; logIndex: string } },
) {
  const publicClient = createViemClient(params.chainId);

  // Get transfer from DB or Viem (whichever resolves first).
  const startTime = Date.now();
  const res = await Promise.any([
    fetchTransferFromDB(
      Number(params.chainId),
      BigInt(params.blockNumber),
      Number(params.logIndex),
    ),
    fetchTransferFromViem(params.chainId, params.blockNumber, params.logIndex, publicClient),
  ]).then((res) => {
    return res;
  });
  const endTime = Date.now();
  const timeTaken = endTime - startTime;
  console.log(`[API] fetched in ${timeTaken}ms`);

  if (res instanceof Error) return Response.json(res, { status: 404 });
  const { erc20TransferData, eventLogData } = res;

  // Fetch block from Viem to retrieve timestamp.
  try {
    const block: Block = await getBlockFromViem(BigInt(params.blockNumber), publicClient);
    eventLogData.timestamp = block.timestamp;
  } catch (e) {
    return Response.json(`Block ${params.blockNumber} not found`, { status: 404 });
  }

  // Error handling for missing fields.
  if (erc20TransferData.contractAddress === undefined) return Error('Contract address not found');
  if (erc20TransferData.from === undefined) return Error('From address not found');
  if (erc20TransferData.to === undefined) return Error('To address not found');

  // Fetch token details.
  const { tokenDecimal, tokenSymbol } = await getTokenDetails(
    erc20TransferData.contractAddress,
    publicClient,
  );
  erc20TransferData.tokenDecimal = tokenDecimal;
  erc20TransferData.tokenSymbol = tokenSymbol;

  const chainName = getChainNameById(Number(params.chainId) as SupportedChainId);
  eventLogData.chainName = chainName;

  // Check whether the block is finalized.
  const latestFinalizedBlock = await publicClient.getBlock({
    blockTag: 'finalized',
  });

  // Get address profiles for from and to addresses.
  const { fromAccount, toAccount }: { fromAccount: AddressProfile; toAccount: AddressProfile } =
    await Promise.all([
      resolveAccountForAddress(erc20TransferData.from, Number(params.chainId), publicClient),
      resolveAccountForAddress(erc20TransferData.to, Number(params.chainId), publicClient),
    ]).then(([fromAccount, toAccount]) => {
      return { fromAccount, toAccount };
    });

  return Response.json({
    transferData: erc20TransferData,
    eventLogData: eventLogData,
    fromAccountProfile: fromAccount,
    toAccountProfile: toAccount,
    latestFinalizedBlockNumber: latestFinalizedBlock.number,
  });
}
