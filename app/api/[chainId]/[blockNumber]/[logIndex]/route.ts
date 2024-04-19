import { erc20Abi, tokenAbi } from '@/app/utils/viem/abi';
import { createViemClient, getChainNameById } from '@/app/utils/viem/client';
import { Address, Block, Log, ReadContractReturnType, decodeEventLog } from 'viem';
import '@/app/utils/serialization'; // Note: needed for BigInt serialization.
import { Transfer, EventLog, SupportedChainId } from '@/app/utils/types';
import { AddressProfile } from '@/app/utils/types';
import { resolveAccountForAddress } from '../../../../utils/profiles';
import { tryGetDaimoMemo } from '@/app/utils/getDaimoMemo';

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
  const blockNumber = BigInt(params.blockNumber);
  const logIndex = Number(params.logIndex);

  // Fetch logs at block number.
  const logs: Log[] = await publicClient.getLogs({
    fromBlock: blockNumber,
    toBlock: blockNumber,
  });

  // Type Log reference: https://github.com/wevm/viem/blob/main/src/types/log.ts.
  const log: Log = logs[logIndex];

  // Ensure correct log is fetched.
  if (log.blockNumber !== blockNumber || log.logIndex !== logIndex) {
    return Response.json('Log not found', { status: 404 });
  }

  // Ensure block has been finalized.
  if (log.transactionHash === null) {
    return Response.json('Block not finalized', { status: 404 });
  }

  // Get the block details of the block.
  // Type Block reference: https://github.com/wevm/viem/blob/main/src/types/block.ts.
  const block: Block = await publicClient.getBlock({
    blockNumber: blockNumber,
  });

  const chainName = getChainNameById(Number(params.chainId) as SupportedChainId);

  // Format event log data.
  const eventLogData: EventLog = {
    timestamp: block.timestamp,
    blockNumber: blockNumber,
    logIndex: log.logIndex,
    transactionHash: log.transactionHash,
    chainId: Number(params.chainId),
    chainName: chainName,
  };

  // Decode ERC20 transfer event data.
  const erc20EventLogData = decodeEventLog({
    abi: erc20Abi,
    data: log.data,
    topics: log.topics,
  });

  // Ensure log is an ERC20 transfer event.
  if (erc20EventLogData.eventName !== 'Transfer') {
    return Response.json('Log not a transfer event', { status: 404 });
  }

  // Get token decimals.
  const tokenDecimal: ReadContractReturnType = await publicClient.readContract({
    address: log.address as Address,
    abi: tokenAbi,
    functionName: 'decimals',
  });

  // Get token symbol.
  const tokenSymbol: ReadContractReturnType = await publicClient.readContract({
    address: log.address as Address,
    abi: tokenAbi,
    functionName: 'symbol',
  });

  // Get Daimo memo if exists.
  // const memo = await tryGetDaimoMemo(log.transactionHash, log.logIndex);

  // Format ERC20 transfer event data.
  const erc20TransferData: Transfer = {
    from: erc20EventLogData.args.from,
    to: erc20EventLogData.args.to,
    value: erc20EventLogData.args.value,
    contractAddress: log.address,
    tokenDecimal: BigInt(tokenDecimal as string),
    tokenSymbol: tokenSymbol as string,
  };

  // Check whether the block is finalized.
  const latestFinalizedBlock = await publicClient.getBlock({
    blockTag: 'finalized',
  });
  const isFinalized = blockNumber <= latestFinalizedBlock.number;

  // Get address profiles for from and to addresses.
  const fromAccount: AddressProfile = await resolveAccountForAddress(
    erc20TransferData.from,
    publicClient,
  );

  const toAccount: AddressProfile = await resolveAccountForAddress(
    erc20TransferData.to,
    publicClient,
  );

  return Response.json({
    transferData: erc20TransferData,
    eventLogData: eventLogData,
    fromAccountProfile: fromAccount,
    toAccountProfile: toAccount,
    finalized: isFinalized,
  });
}
