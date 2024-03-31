import { Address } from "viem";

/* ERC20 Transaction Data */
export interface ERC20Transfer {
    from: Address;
    to: Address;
    value: bigint;
}

/* Event Log Data */
export interface EventLog {
    timestamp: bigint,
    blockNumber: bigint,
    logIndex: number,
    transactionHash: string,
}