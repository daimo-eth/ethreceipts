import { Address } from 'viem';
import {
  arbitrum,
  arbitrumSepolia,
  mainnet,
  polygon,
  polygonMumbai,
  sepolia,
  base,
  baseSepolia,
  optimism,
  optimismSepolia,
} from 'viem/chains';

/** ERC20 Transaction Data */
export type ERC20Transfer = {
  from: Address;
  to: Address;
  value: bigint;
  contractAddress: Address;
};

/** Event Log Data */
export type EventLog = {
  timestamp: bigint;
  blockNumber: bigint;
  logIndex: number;
  transactionHash: string;
};

/** Address Profile */
export type AddressProfile = {
  accountAddress: string;
  account: AccountType;
};

export type AccountType = EnsAccount | DaimoAccount | null;
export enum AccountTypeStr {
  ENS = 'ENS',
  DAIMO = 'DAIMO',
}
export const BASE_MAINNNET_CHAIN_ID = 8453;
export const ETH_MAINNET_CHAIN_ID = 1;

/** ENS Account */
export type EnsAccount = {
  type: AccountTypeStr;
  name: string | null;
  avatar: string | null;
};

/** Daimo Account */
export type DaimoAccount = {
  type: AccountTypeStr;
  name: string | null;
  avatar: string | null;
};

/** Supported chains by Alchemy API */
export const supportedChains = [
  mainnet,
  sepolia,
  polygon,
  polygonMumbai,
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  optimism,
  optimismSepolia,
];

/** Mapping of chainID to Alchemy network name */
export const supportedChainNames = {
  [mainnet.id]: 'eth-mainnet',
  [sepolia.id]: 'eth-sepolia',
  [polygon.id]: 'polygon-mainnet',
  [polygonMumbai.id]: 'polygon-mumbai',
  [arbitrum.id]: 'arb-mainnet',
  [arbitrumSepolia.id]: 'arb-sepolia',
  [base.id]: 'base-mainnet',
  [baseSepolia.id]: 'base-sepolia',
  [optimism.id]: 'opt-mainnet',
  [optimismSepolia.id]: 'opt-sepolia',
};

/** Type for Alchemy chain ID */
export type SupportedChainId = keyof typeof supportedChainNames;
