import { Block, PublicClient } from 'viem';

/**
 * Get block from Viem.
 * @param blockNumber
 * @param publicClient
 * @returns
 */
export async function getBlockFromViem(
  blockNumber: bigint,
  publicClient: PublicClient,
): Promise<Block> {
  try {
    return await publicClient.getBlock({
      blockNumber: blockNumber,
    });
  } catch (e) {
    console.log(`[API] error fetching block from Viem: ${e}`);
    throw Error(`Block ${blockNumber.toString()} not found`);
  }
}
