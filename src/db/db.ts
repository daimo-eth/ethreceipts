import { getEnvVars } from '@/app/env';
import { SupportedChainId, supportedChainNames } from '@/app/utils/types';
import { getViemClient } from '@/app/utils/viem/client';
import { Hex } from 'viem';
import { base } from 'viem/chains';
import { fetchTokenFromWhitelist } from '@/app/utils/tokens/tokenWhitelist';

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

        // Only consider logs with both from and to topics present
        const candidateLogs = transferLogs.filter((log) => log.topics[1] && log.topics[2]);
        const nonZeroCandidates = candidateLogs.filter((log) => {
          try {
            return BigInt(log.data) > BigInt(0);
          } catch {
            return false;
          }
        });

        if (candidateLogs.length > 0) {
          // Select the transfer with the highest normalized value (by token decimals if known)
          const logsToScan = nonZeroCandidates.length > 0 ? nonZeroCandidates : candidateLogs;
          const transferLog = logsToScan.reduce((maxLog, currentLog) => {
            const maxRaw = BigInt(maxLog.data);
            const curRaw = BigInt(currentLog.data);

            // Get decimals from whitelist if available; default to 18
            const maxToken = fetchTokenFromWhitelist(maxLog.address, chainToCheck);
            const curToken = fetchTokenFromWhitelist(currentLog.address, chainToCheck);
            const maxDecimals = BigInt(maxToken?.decimals ?? 18);
            const curDecimals = BigInt(curToken?.decimals ?? 18);

            // Compare scaled to 18 decimals to avoid floating math: value * 10^(18 - decimals)
            // Implement power without BigInt literals/exponent operator for TS target compatibility
            const powerOfTen = (exp: bigint): bigint => {
              let result = BigInt(1);
              const ten = BigInt(10);
              let i = BigInt(0);
              while (i < exp) {
                result *= ten;
                i += BigInt(1);
              }
              return result;
            };

            const scaleUp = (value: bigint, decimals: bigint): bigint => {
              const eighteen = BigInt(18);
              if (decimals === eighteen) return value;
              if (decimals < eighteen) return value * powerOfTen(eighteen - decimals);
              // decimals > 18: divide, avoid fractional by truncation which is fine for comparison
              return value / powerOfTen(decimals - eighteen);
            };

            const maxScaled = scaleUp(maxRaw, maxDecimals);
            const curScaled = scaleUp(curRaw, curDecimals);

            return curScaled > maxScaled ? currentLog : maxLog;
          }, logsToScan[0]);

          // Return in format matching the DB query result
          const fromTopic = transferLog.topics[1]!;
          const toTopic = transferLog.topics[2]!;
          const selectedValue = BigInt(transferLog.data);
          console.log(
            `[DB] selected logIndex=${
              transferLog.logIndex
            } valueRaw=${selectedValue.toString()} addr=${transferLog.address}`,
          );
          return {
            chain_id: chainToCheck,
            block_num: Number(receipt.blockNumber),
            block_hash: receipt.blockHash,
            tx_hash: txHash,
            tx_idx: receipt.transactionIndex,
            log_addr: transferLog.address,
            from: `0x${fromTopic.slice(26)}`, // Extract address from topic
            to: `0x${toTopic.slice(26)}`, // Extract address from topic
            value: selectedValue,
            src_name: 'alchemy',
            log_idx: transferLog.logIndex,
          };
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
