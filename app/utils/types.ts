import { Address } from 'viem';

/* ERC20 Transaction Data */
export type ERC20Transfer = {
  from: Address;
  to: Address;
  value: bigint;
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
  homeChainId: number;
  accountType: AccountType;
};

export type AccountType = EnsAccount | DaimoAccount | null;
export enum AccountTypeStr {
  ENS = 'ENS',
  DAIMO = 'DAIMO',
}

/* ENS Account */
export type EnsAccount = {
  ensName: string | null;
  ensAvatar: string | null;
};

/* Daimo Account */
export type DaimoAccount = {
  daimoName: string | null;
  daimoAvatar: string | null;
};
