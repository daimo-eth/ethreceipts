import { Address } from "viem";

/* Transaction Details */
export interface ERC20Transfer {
    from: Address;
    to: Address;
    value: bigint;
}

/* Event Log Details */
export interface EventLog {
    timestamp: bigint,
    blockNumber: bigint,
    logIndex: number,
    transactionHash: string,
}