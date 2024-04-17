import { DaimoChain, getChainConfig } from './utils/viem/chainConfig';

export const chainConfig = getChainConfig((process.env.DAIMO_CHAIN || 'baseSepolia') as DaimoChain);

export const apiUrl = process.env.ETH_RECEIPTS_DOMAIN || 'http://localhost:3000';
