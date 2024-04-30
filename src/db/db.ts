import { ClientConfig, Pool, PoolConfig } from 'pg';

/** Credentials come from env.PGURL, defaults to localhost & no auth. */
const dbConfig: ClientConfig = {
  connectionString: process.env.DB_URL,
  connectionTimeoutMillis: 5000,
  query_timeout: 5000,
  statement_timeout: 5000,
};

const poolConfig: PoolConfig = {
  ...dbConfig,
  max: 8,
  idleTimeoutMillis: 60000,
};

export class DB {
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

  // Attempt to get transfers given a chainId, blockNumber, and logIndex.
  async getTransfer(chainId: Number, blockNumber: bigint, logIndex: Number) {
    console.log(`[DB] getting transfer(${chainId}, ${blockNumber}, ${logIndex})`);
    try {
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
        chain_id = $1 AND
        block_num = $2 AND
        log_idx = $3
      );
    `,
        [chainId, blockNumber, logIndex],
      );
      return res;
    } catch (e) {
      console.log(`[DB] error getting transfer(${chainId}, ${blockNumber}, ${logIndex})`);
      return null;
    }
  }
}
