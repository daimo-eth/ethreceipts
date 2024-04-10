import { DaimoChain, getChainConfig } from './utils/viem/chainConfig';

export const chainConfig = getChainConfig((process.env.DAIMO_CHAIN || 'baseSepolia') as DaimoChain);
