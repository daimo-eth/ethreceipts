/** https://tokens.coingecko.com/uniswap/all.json */

/** Fetch whitelist for chainId. */
function fetchWhitelist(chainId: number) {
  switch (chainId) {
    case 1:
      return require('./ethWhitelist.json');
    case 8453:
      return require('./baseWhitelist.json');
    case 42220:
      return require('./celoWhitelist.json');
    default:
      return null;
  }
}

interface Token {
  chainId: number;
  address: string;
  name: string;
  symbol: string;
  decimals: number;
  logoURI: string;
}

/** Check if token is whitelisted. */
export function fetchTokenFromWhitelist(tokenAddress: string, chainId: number): Token | null {
  const whitelist = fetchWhitelist(chainId);
  if (!whitelist) {
    console.error(`[TOKEN WHITELIST] No whitelist found for chainId ${chainId}`);
    return null;
  }
  for (const token of whitelist['tokens']) {
    console.log(`[TOKEN WHITELIST] Checking token ${token.address} against ${tokenAddress}`);
    if (token.address.toLowerCase() === tokenAddress.toLowerCase()) {
      return token;
    }
  }
  return null;
}
