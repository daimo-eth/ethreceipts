import { getEnvVars } from '@/app/env';
import { ClientConfig, Pool, PoolConfig } from 'pg';
import { Hex } from 'viem';

/** Credentials default to localhost & no auth. */
const dbConfig: ClientConfig = {
  connectionString: getEnvVars().SHOVEL_DB_URL,
  connectionTimeoutMillis: 5000,
  query_timeout: 5000,
  statement_timeout: 5000,
};

const poolConfig: PoolConfig = {
  ...dbConfig,
  max: 8,
  idleTimeoutMillis: 60000,
};

class DB {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(poolConfig);
  }

  getStatus() {
    const { idleCount, totalCount, waitingCount } = this.pool;
    return {
      idleCount,
      totalCount,
      waitingCount,
    };
  }

  async getBestTransferByTxHash(txHash: Hex) {
    console.log(`[DB] getting transfer(${txHash})`);
    const res = await this.pool.query(
      `select
        chain_id,
        block_num,
        block_hash,
        tx_hash,
        tx_idx,
        log_addr,
        f as "from",
        t as "to",
        v as "value",
        src_name,
        log_idx
      from erc20_transfers
      where (
        tx_hash = $1
      ) ORDER BY v DESC LIMIT 1;
    `,
      [txHash.replace('0x', '\\x')],
    );
    return res.rows.length > 0 ? res.rows[0] : null;
  }
}

const globalForDB = globalThis as unknown as {
  db: DB | undefined;
};

export const db = globalForDB.db ?? new DB();

if (globalForDB.db === undefined) {
  globalForDB.db = db;
}
