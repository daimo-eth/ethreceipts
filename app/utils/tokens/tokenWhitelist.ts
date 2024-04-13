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

/** Check if token is whitelisted. */
export function checkTokenWhitelist(tokenAddress: string, chainId: number): boolean {
  const whitelist = fetchWhitelist(chainId);
  if (!whitelist) return false;

  for (const token of whitelist['tokens']) {
    if (token.address === tokenAddress) {
      return true;
    }
  }
  return false;
}
