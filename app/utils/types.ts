import { Address, Hex } from 'viem';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  optimism,
  optimismSepolia,
  polygon,
  polygonMumbai,
  sepolia,
} from 'viem/chains';

/** ERC20 Transaction Data */
export type Transfer = {
  from: Address;
  to: Address;
  value: bigint;
  contractAddress: Address;
  tokenDecimal: bigint;
  tokenSymbol: string;
  memo?: string;
};

/** Event Log Data */
export type EventLog = {
  timestamp: number;
  blockNumber: bigint;
  logIndex: number;
  transactionHash: Hex;
  chainId: number;
  chainName: string;

  // Contract address that emitted the event.
  address: Address;
  topics: [signature: Hex, ...args: Hex[]];
  data: Hex;
};

/** Address Profile */
export type AddressProfile = {
  accountAddress: string;
  account: Account;
};

/** Supported account types */
export enum AccountTypeStr {
  ENS = 'ENS',
  DAIMO = 'DAIMO',
  FARCASTER = 'FARCASTER',
  SPECIAL_ADDRESS = 'SPECIAL_ADDRESS',
  UNKNOWN = 'Unknown',
}

/** Known account Profile */
export type Account = {
  type: AccountTypeStr;
  name?: string | null;
  avatar?: string | null;
  url?: string | null;
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

export const DaimoChains = [base.id, baseSepolia.id];
