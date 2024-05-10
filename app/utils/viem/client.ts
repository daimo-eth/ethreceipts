import { createPublicClient, http, Chain, extractChain } from 'viem';
import { SupportedChainId, supportedChains, supportedChainNames } from '../types';
import { getEnvVars } from '@/app/env';

/** Get chain name in Alchemy format for API. */
function getAlchemyNetworkById(chainId: Number): string | null {
  return supportedChainNames[chainId as SupportedChainId] || null;
}

/** Get Viem chain from chain ID for Viem client creation. */
function getViemChainById(chainId: SupportedChainId): Chain {
  return extractChain({ chains: supportedChains, id: chainId });
}

/** Get Chain name in string format. */
export function getChainNameById(chainId: SupportedChainId): string {
  const chain = getViemChainById(chainId);
  return chain.name;
}

/**
 * Create Viem client connected to chainID.
 * Uses private Alchemy API key.
 */
export function createViemClient(chainId: number) {
  const network = getAlchemyNetworkById(chainId);
  if (!network) {
    throw new Error(`Invalid chainId: ${chainId}`);
  }
  const alchemyApiKey = getEnvVars().ALCHEMY_API_KEY;
  const alchemyRpcUrl = `https://${network}.g.alchemy.com/v2/${alchemyApiKey}`;
  const chain: Chain = getViemChainById(chainId as SupportedChainId);

  // Create Viem client with correct chain and RPC.
  return createPublicClient({
    chain: chain,
    transport: http(alchemyApiKey),
    cacheTime: 3600,
  });
}
