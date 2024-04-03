import { Address } from 'viem';

/* ERC20 Transaction Data */
export type ERC20Transfer = {
  from: Address;
  to: Address;
  value: bigint;
  contractAddress: Address;
};

/* Event Log Data */
export type EventLog = {
  timestamp: bigint;
  blockNumber: bigint;
  logIndex: number;
  transactionHash: string;
};

/* Address Profile */
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

/* ENS Account */
export type EnsAccount = {
  type: AccountTypeStr;
  name: string | null;
  avatar: string | null;
};

/* Daimo Account */
export type DaimoAccount = {
  type: AccountTypeStr;
  name: string | null;
  avatar: string | null;
};
