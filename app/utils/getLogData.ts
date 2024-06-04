import { apiGetLog } from '../api/[chainId]/[blockNumber]/[logIndex]/apiGetLog';
import { Transfer, AddressProfile, EventLog } from './types';

export type LogData = {
  transferData: Transfer;
  fromAddressProfile: AddressProfile;
  toAddressProfile: AddressProfile;
  eventLogData: EventLog;
  latestFinalizedBlockNumber: number;
};

/**
 * Fetch log data from API.
 *
 * @param {string} chainId - The chain ID.
 * @param {string} blockNumber - The block number.
 * @param {string} logIndex - The log index.
 * @returns {Object} The result from API fetch.
 */
export async function getLogData(chainId: string, blockNumber: string, logIndex: string) {
  // Revalidate every 10 minutes.
  const res = await apiGetLog({ chainId, blockNumber, logIndex });
  if (!res.ok) {
    console.error('Failed to fetch log', res.status);
    return null;
  }
  return res.json();
}
