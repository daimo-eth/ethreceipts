import { Block, PublicClient } from 'viem';

export async function getBlockTimestamp(blockNum: number | bigint, publicClient: PublicClient) {
  const bn = Number(blockNum);
  const chainId = publicClient.chain?.id;
  if (chainId === undefined) throw new Error('No chainId');
  switch (chainId) {
    case 84532: // Base Sepolia
      return 1695768288 + bn * 2;
    case 8453: // Base
      return 1686789347 + bn * 2;
    default:
      return Number((await getBlockFromViem(BigInt(bn), publicClient)).timestamp);
  }
}

/**
 * Get block from Viem.
 * @param blockNumber
 * @param publicClient
 * @returns
 */
async function getBlockFromViem(blockNumber: bigint, publicClient: PublicClient): Promise<Block> {
  try {
    return await publicClient.getBlock({
      blockNumber: blockNumber,
    });
  } catch (e) {
    console.log(`[API] error fetching block from Viem: ${e}`);
    throw Error(`Block ${blockNumber.toString()} not found`);
  }
}
