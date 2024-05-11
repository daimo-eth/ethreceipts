import { createPublicClient, http, Chain, extractChain, PublicClient } from 'viem';
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

const clients = new Map<number, PublicClient>();

/**
 * Create Viem client connected to chainID.
 * Uses private Alchemy API key.
 */
export function getViemClient(chainId: number) {
  if (!clients.has(chainId)) {
    clients.set(chainId, createViemClient(chainId));
  }
  return clients.get(chainId)!;
}

function createViemClient(chainId: number) {
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
    transport: http(alchemyRpcUrl),
    cacheTime: 3600,
  });
}
