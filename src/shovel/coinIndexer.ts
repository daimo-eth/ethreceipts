import { Pool } from 'pg';
import { Address, Hex, bytesToHex, getAddress, PublicClient } from 'viem';
import { retryBackoff } from '../../app/utils/retryBackoff';
import { resolveAccountForAddress } from '@/app/utils/profiles';

/* ERC20 Transfer Event. */
export interface Transfer {
  chainId: number;
  address: Hex;
  blockNumber: bigint;
  blockHash: Hex;
  transactionHash: Hex;
  transactionIndex: number;
  logIndex: number;
  from: Address;
  to: Address;
  value: bigint;
}

/* USDC or testUSDC stablecoin contract. Tracks transfers. */
export class CoinIndexer {
  private allTransfers: Transfer[] = [];

  private listeners: ((transfers: Transfer[]) => void)[] = [];

  constructor(private viemClient: PublicClient) {}

  public status() {
    return { numTransfers: this.allTransfers.length };
  }

  // Load data from pg.
  async load(pg: Pool, from: number, to: number) {
    const startTime = Date.now();

    const result = await retryBackoff(`coinIndexer-logs-query-${from}-${to}`, () =>
      pg.query(
        `
          select
            chain_id,
            block_num,
            block_hash,
            tx_hash,
            tx_idx,
            log_idx,
            log_addr,
            f as "from",
            t as "to",
            v as "value"
          from transfers
          where (
            block_num >= $1
            and block_num <= $2
          );
        `,
        [from, to],
      ),
    );
    const logs: Transfer[] = await Promise.all(
      result.rows.map(async (row: any) => {
        const transfer: Transfer = {
          chainId: Number(row.chain_id),
          blockHash: bytesToHex(row.block_hash, { size: 32 }),
          blockNumber: BigInt(row.block_num),
          transactionHash: bytesToHex(row.tx_hash, { size: 32 }),
          transactionIndex: row.tx_idx,
          logIndex: row.log_idx,
          address: getAddress(bytesToHex(row.log_addr, { size: 20 })),
          from: getAddress(bytesToHex(row.from, { size: 20 })),
          to: getAddress(bytesToHex(row.to, { size: 20 })),
          value: BigInt(row.value),
        };

        // Get address profiles for from and to addresses.
        try {
          const addressProfileFrom = await resolveAccountForAddress(
            transfer.from,
            transfer.chainId,
            this.viemClient,
          );
          const addressProfileTo = await resolveAccountForAddress(
            transfer.to,
            transfer.chainId,
            this.viemClient,
          );
          if (addressProfileFrom.account?.name) {
            console.log(`[PROFILE] ${addressProfileFrom.account.name} sent ${transfer.value}`);
          }
          if (addressProfileTo.account?.name) {
            console.log(`[PROFILE] ${addressProfileTo.account.name} received ${transfer.value}`);
          }
        } catch (e) {
          console.log(`[PROFILE] error resolving account for ${transfer.from} or ${transfer.to}`);
        }
        return transfer;
      }),
    );

    // TODO: Add the profile to the db

    console.log(
      `[COIN] loaded ${logs.length} transfers ${from} ${to} in ${Date.now() - startTime}ms`,
    );
    this.allTransfers = this.allTransfers.concat(logs);
    this.listeners.forEach((l) => l(logs));
  }

  /** Listener invoked for all past coin transfers, then for new ones. */
  pipeAllTransfers(listener: (logs: Transfer[]) => void) {
    listener(this.allTransfers);
    this.addListener(listener);
  }

  /** Listener is invoked for all new coin transfers. */
  addListener(listener: (logs: Transfer[]) => void) {
    this.listeners.push(listener);
  }

  /** Unsubscribe from new coin transfers. */
  removeListener(listener: (logs: Transfer[]) => void) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
}
