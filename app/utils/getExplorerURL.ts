/** Get block explorer URL for chain ID
 * Note: Doing manually for now because Viem hasn't added Basescan to Base Chain typeyet.
 */
export function getChainExplorerByChainId(chainId: number): string | undefined {
  switch (chainId) {
    case 1:
      return 'https://etherscan.io';
    case 42:
      return 'https://kovan.etherscan.io';
    case 8453:
      return 'https://basescan.org';
    case 84532:
      return 'https://sepolia.basescan.org/';
    default:
      return undefined;
  }
}
