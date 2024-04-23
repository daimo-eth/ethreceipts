import { ClientConfig, Pool, PoolConfig } from 'pg';

/** Credentials come from env.PGURL, defaults to localhost & no auth. */
const dbConfig: ClientConfig = {
  connectionString: process.env.PGURL,
  connectionTimeoutMillis: 5000,
  query_timeout: 5000,
  statement_timeout: 5000,
  database: process.env.PGURL == null ? 'daimo' : undefined,
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

  async getTransfer(chainId: number, blockNumber: number, logIndex: number) {
    console.log(`[DB] getting transfer(${chainId}, ${blockNumber}, ${logIndex})`);
    await this.pool.query(
      `select
        chain_id,
        block_num,
        block_hash,
        tx_hash,
        tx_idx,
        log_addr,
        f as "from",
        t as "to",
        v as "value"
      from transfers
      where (
        chain_id = $1 AND
        block_num = $2 AND
        log_idx = $3
      );
    `,
      [chainId, blockNumber, logIndex],
    );
  }
}
