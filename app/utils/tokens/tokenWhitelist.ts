/** https://tokens.coingecko.com/uniswap/all.json */

/** Fetch whitelist for chainId. */
function fetchWhitelist(chainId: number) {
  switch (chainId) {
    case 1:
      return require('./ethWhitelist.json');
    case 8453:
      return require('./baseWhitelist.json');
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
  if (!whitelist) return null;

  for (const token of whitelist['tokens']) {
    if (token.address === tokenAddress) {
      return token;
    }
  }
  return null;
}
