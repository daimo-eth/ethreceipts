import { getEnvVars } from '@/app/env';
import { SupportedChainId, supportedChainNames } from '@/app/utils/types';
import { getViemClient } from '@/app/utils/viem/client';
import { Hex } from 'viem';
import { base } from 'viem/chains';

class DB {
  constructor() {}

  getStatus() {
    return {
      idleCount: 0,
      totalCount: 0,
      waitingCount: 0,
    };
  }

  async getBestTransferByTxHash(txHash: Hex, chainId?: number) {
    // Default to Base chain if no chainId is provided
    const chainToCheck = chainId || base.id;

    console.log(`[DB] getting transfer(${txHash}) using Alchemy API for chain ${chainToCheck}`);

    try {
      // Get client for this chain
      const client = getViemClient(chainToCheck);

      // Get transaction receipt
      const receipt = await client.getTransactionReceipt({ hash: txHash });

      if (receipt) {
        // Find logs that look like ERC20 transfer events
        // ERC20 Transfer event topic: 0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
        const transferLogs = receipt.logs.filter(
          (log) =>
            log.topics.length >= 3 &&
            log.topics[0] === '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        );

        if (transferLogs.length > 0) {
          // Use the first transfer log found (or could sort by value if we decoded them)
          const transferLog = transferLogs[0];

          // Check if we have valid topics for the from and to addresses
          if (transferLog.topics[1] && transferLog.topics[2]) {
            // Return in format matching the DB query result
            return {
              chain_id: chainToCheck,
              block_num: Number(receipt.blockNumber),
              block_hash: receipt.blockHash,
              tx_hash: txHash,
              tx_idx: receipt.transactionIndex,
              log_addr: transferLog.address,
              from: `0x${transferLog.topics[1].slice(26)}`, // Extract address from topic
              to: `0x${transferLog.topics[2].slice(26)}`, // Extract address from topic
              value: BigInt(transferLog.data),
              src_name: 'alchemy',
              log_idx: transferLog.logIndex,
            };
          }
        }
      }
    } catch (error: any) {
      console.log(
        `[DB] couldn't find transaction on chain ${chainToCheck}: ${
          error?.message || 'Unknown error'
        }`,
      );
    }
    // If no transfer found or if there was an error, return null
    return null;
  }
}

const globalForDB = globalThis as unknown as {
  db: DB | undefined;
};

export const db = globalForDB.db ?? new DB();

if (globalForDB.db === undefined) {
  globalForDB.db = db;
}
