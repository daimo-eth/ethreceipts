import { createPublicClient, http } from 'viem'
import { base } from 'viem/chains'

/* Create Viem client connected to Base. */
export const publicClient = createPublicClient({
    chain: base,
    transport: http(process.env.MAINNET_RPC as string),
    cacheTime: 3600,
})