import { erc20Abi } from '@/app/utils/viem/abi';
import { createViemClient } from '@/app/utils/viem/client';
import { Block, Log, decodeEventLog } from 'viem';
import '@/app/utils/serialization'; // Note: needed for BigInt serialization.
import { ERC20Transfer, EventLog } from '@/app/utils/types';
import { AddressProfile } from '@/app/utils/types';
import { resolveAccountForAddress } from './getProfile';

/**
 * Handle GET requests to /api/[blockNumber]/[logIndex]
 *
 * @param {Object} params - The request parameters.
 * @param {string} params.chainId - The chain ID of the desired log.
 * @param {string} params.blockNumber - The block number for the desired log.
 * @param {string} params.logIndex - The log index of the desired log.
 * @returns {Object} The log data in the form: { ERC20TransferData, eventLogData,
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

  // Format event log data.
  const eventLogData: EventLog = {
    timestamp: block.timestamp,
    blockNumber: blockNumber,
    logIndex: log.logIndex,
    transactionHash: log.transactionHash,
  };

  // Decode ERC20 transfer event data.
  const erc20EventLogData = decodeEventLog({
    abi: erc20Abi,
    data: log.data,
    topics: log.topics,
  });

  // Ensure log is an ERC20 transfer event.
  if (erc20EventLogData.eventName !== 'Transfer') {
    return Response.json('Log not an ERC20 transfer event', { status: 404 });
  }

  // Format ERC20 transfer event data.
  const erc20TransferData: ERC20Transfer = {
    from: erc20EventLogData.args.from,
    to: erc20EventLogData.args.to,
    value: erc20EventLogData.args.value,
    contractAddress: log.address,
  };

  const fromAccount: AddressProfile = await resolveAccountForAddress(
    erc20TransferData.from,
    publicClient,
  );
  const toAccount: AddressProfile = await resolveAccountForAddress(
    erc20TransferData.to,
    publicClient,
  );

  return Response.json({
    erc20TransferData: erc20TransferData,
    eventLogData: eventLogData,
    fromAccountProfile: fromAccount,
    toAccountProfile: toAccount,
  });
}
