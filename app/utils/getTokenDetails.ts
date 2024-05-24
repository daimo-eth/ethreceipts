import { Address, PublicClient, ReadContractReturnType } from 'viem';
import { tokenAbi } from './viem/abi';
import { fetchTokenFromWhitelist } from './tokens/tokenWhitelist';

export async function getTokenDetails(logAddress: Address, publicClient: PublicClient) {
  const chainId = publicClient.chain?.id;
  if (chainId === undefined) throw new Error('No chainId');

  // If the token is a known token, just return it.
  const whitelistedToken = fetchTokenFromWhitelist(logAddress, chainId);

  if (whitelistedToken !== null) {
    return {
      tokenDecimal: BigInt(whitelistedToken.decimals),
      tokenSymbol: whitelistedToken.symbol,
    };
  }

  return lookupTokenDetails(logAddress, publicClient);
}

/** Get token details for an ERC-20 token
 * @param {Address} logAddress - The address of the ERC-20 token.
 * @param {PublicClient} publicClient - The public client to use for reading the contract.
 */
async function lookupTokenDetails(
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
