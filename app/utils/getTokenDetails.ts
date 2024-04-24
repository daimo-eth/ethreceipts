import { Address, PublicClient, ReadContractReturnType } from 'viem';
import { tokenAbi } from './viem/abi';

/** Get token details for an ERC-20 token
 * @param {Address} logAddress - The address of the ERC-20 token.
 * @param {PublicClient} publicClient - The public client to use for reading the contract.
 */
export async function getTokenDetails(
  logAddress: Address,
  publicClient: PublicClient,
): Promise<{
  tokenDecimal: bigint;
  tokenSymbol: string;
}> {
  // Get token decimals.
  const tokenDecimal: ReadContractReturnType = await publicClient.readContract({
    address: logAddress,
    abi: tokenAbi,
    functionName: 'decimals',
  });

  // Get token symbol.
  const tokenSymbol: ReadContractReturnType = await publicClient.readContract({
    address: logAddress,
    abi: tokenAbi,
    functionName: 'symbol',
  });
  return {
    tokenDecimal: BigInt(tokenDecimal as string),
    tokenSymbol: tokenSymbol as string,
  };
}
