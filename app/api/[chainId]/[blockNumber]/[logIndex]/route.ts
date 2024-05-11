import '@/app/utils/serialization'; // Note: needed for BigInt serialization.
import { apiGetLog } from './apiGetLog';

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
  return apiGetLog(params);
}
