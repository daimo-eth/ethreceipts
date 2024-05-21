import { getBlockFromViem } from '@/app/utils/getBlock';
import { getTokenDetails } from '@/app/utils/getTokenDetails';
import { tryGetDaimoMemo } from '@/app/utils/profiles/getDaimo';
import '@/app/utils/serialization'; // Note: needed for BigInt serialization.
import { AddressProfile, EventLog, SupportedChainId, Transfer } from '@/app/utils/types';
import { erc20Abi } from '@/app/utils/viem/abi';
import { getChainNameById, getViemClient } from '@/app/utils/viem/client';
import { DB } from '@/src/db/db';
import { Block, Hex, Log, PublicClient, decodeEventLog } from 'viem';
import { z } from 'zod';
import { resolveAccountForAddress } from '../../../../utils/profiles';

export async function apiGetLog(params: {
  chainId: string;
  blockNumber: string;
  logIndex: string;
}) {
  // Validate inputs
  const chainId = z.number().int().positive().parse(Number(params.chainId));
  const blockNumber = BigInt(z.number().int().positive().parse(Number(params.blockNumber)));
  const logIndex = z.number().int().nonnegative().parse(Number(params.logIndex));

  // Get latest finalized block
  const publicClient = getViemClient(chainId);
  const latestFinalizedBlock = await publicClient.getBlock({
    blockTag: 'finalized',
  });

  // Get event log
  const startTime = Date.now();
  const log = await fetchEventLogFromViem(chainId, blockNumber, logIndex, publicClient);
  console.log(`[API] fetched event log in ${Date.now() - startTime}ms`);

  // Get details for specific events.
  const signature = log.topics[0];
  const details = await (async function () {
    switch (signature) {
      case '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef':
        return fetchErc20TransferDetails(log, chainId, publicClient);
      default:
        return {};
    }
  })();

  const ret = {
    latestFinalizedBlockNumber: latestFinalizedBlock.number,
    eventLogData: log,
    signature,
    ...details,
  };
  console.log(`[API] loaded log ${chainId}/${blockNumber}/${logIndex}: ${JSON.stringify(ret)}`);
  return Response.json(ret);
}

async function fetchEventLogFromViem(
  chainId: number,
  blockNumber: bigint,
  logIndex: number,
  publicClient: PublicClient,
): Promise<EventLog> {
  // Fetch logs at block number.
  const logs: Log[] = await publicClient.getLogs({
    fromBlock: blockNumber,
    toBlock: blockNumber,
  });

  // Type Log reference: https://github.com/wevm/viem/blob/main/src/types/log.ts.
  const log: Log = logs[logIndex];
  if (log.blockNumber !== blockNumber || log.logIndex !== logIndex) {
    throw new Error('Log not found, wrong blockNumber or logIndex');
  }
  if (log.transactionHash === null) {
    throw new Error('Block not confirmed');
  }

  // Fetch block from Viem to retrieve timestamp.
  const block: Block = await getBlockFromViem(blockNumber, publicClient);

  // Format event log data.
  if (log.topics.length === 0) {
    throw new Error(`Invalid log, missing signature: ${JSON.stringify(log)}`);
  }
  const eventLog: EventLog = {
    address: log.address,
    data: log.data,
    topics: log.topics as [Hex, ...Hex[]],
    chainId: chainId,
    blockNumber: blockNumber,
    logIndex: logIndex,
    transactionHash: log.transactionHash,
    chainName: getChainNameById(chainId as SupportedChainId),
    timestamp: block.timestamp,
  };

  return eventLog;
}

async function fetchErc20TransferDetails(
  log: EventLog,
  chainId: number,
  publicClient: PublicClient,
) {
  const startTime = Date.now();
  const transferData = await fetchTransferFromViem(log, publicClient);
  console.log(`[API] fetched ERC-20 transfer in ${Date.now() - startTime}ms`);

  // Error handling for missing fields.
  if (
    transferData.contractAddress === undefined ||
    transferData.from === undefined ||
    transferData.to === undefined
  ) {
    throw new Error('Contract, from, or to address not found');
  }

  // Fetch token details.
  const { tokenDecimal, tokenSymbol } = await getTokenDetails(
    transferData.contractAddress,
    publicClient,
  );
  transferData.tokenDecimal = tokenDecimal;
  transferData.tokenSymbol = tokenSymbol;

  const chainName = getChainNameById(chainId as SupportedChainId);
  log.chainName = chainName;

  // Get address profiles for from and to addresses.
  const [fromAddressProfile, toAddressProfile] = await Promise.all([
    resolveAccountForAddress(transferData.from, chainId, publicClient),
    resolveAccountForAddress(transferData.to, chainId, publicClient),
  ]);

  return { transferData, fromAddressProfile, toAddressProfile };
}

async function fetchTransferFromViem(log: EventLog, publicClient: PublicClient): Promise<Transfer> {
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
    throw new Error('Inputted log is not an ERC-20 transfer event');
  }

  const { tokenDecimal, tokenSymbol } = await getTokenDetails(log.address, publicClient);

  // Get Daimo memo if exists.
  const memo = await tryGetDaimoMemo(log.transactionHash, log.logIndex);

  // Format ERC20 transfer event data.
  return {
    from: erc20EventLogData.args.from,
    to: erc20EventLogData.args.to,
    value: erc20EventLogData.args.value,
    contractAddress: log.address,
    tokenDecimal: tokenDecimal,
    tokenSymbol: tokenSymbol,
    memo: memo,
  };
}

/**
 * Fetch transfer from DB.
 */
async function fetchTransferFromDB(
  chainId: number,
  blockNumber: bigint,
  logIndex: number,
): Promise<{ erc20TransferData: Partial<Transfer>; eventLogData: Partial<EventLog> }> {
  const db = new DB();
  const transfers = await db.getTransfer(chainId, blockNumber, logIndex);
  if (transfers === null || transfers?.rowCount === 0 || transfers === undefined) {
    throw new Error('Transfer not found in DB');
  }

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