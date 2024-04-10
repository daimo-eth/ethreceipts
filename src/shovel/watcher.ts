import { ClientConfig, Pool, PoolConfig } from 'pg';

import { retryBackoff } from '../../app/utils/retryBackoff';

interface indexer {
  load(pg: Pool, from: number, to: number): void | Promise<void>;
}

const dbConfig: ClientConfig = {
  // connectionString: process.env.SHOVEL_DATABASE_URL,
  connectionString: 'postgresql:///kayleegeorge',
  connectionTimeoutMillis: 20000,
  query_timeout: 20000,
  statement_timeout: 20000,
  database: process.env.SHOVEL_DATABASE_URL == null ? 'postgres' : undefined,
};

const poolConfig: PoolConfig = {
  ...dbConfig,
  max: 8,
  idleTimeoutMillis: 60000,
};

/**
 * Watcher follows the latest indexed logs and prefetches / saves metadata.
 * Modified to one-layer indexing.
 */
export class Watcher {
  // Start from a block before the first Daimo tx on Base and Base Sepolia.
  private latest = 5699999;
  private batchSize = 100000;
  private isIndexing = false;

  private pg: Pool;
  private indexers: indexer[] = [];

  constructor() {
    // TODO currently config --> change to poolConfig
    this.pg = new Pool(poolConfig);
  }

  add(...i: indexer[]) {
    this.indexers.push(...i);
  }

  async init() {
    const shovelLatest = await this.getShovelLatest();
    await this.catchUpTo(shovelLatest);
  }

  // Watches shovel for new blocks, and indexes them (skip indexing if it's already indexing)
  async watch() {
    setInterval(async () => {
      try {
        if (this.isIndexing) {
          console.log(`[SHOVEL] skipping tick, already indexing`);
          return;
        }
        this.isIndexing = true;

        const shovelLatest = await this.getShovelLatest();
        const localLatest = await this.index(this.latest + 1, shovelLatest, this.batchSize);
        // localLatest <= 0 when there are no new blocks in shovel
        // or, for whatever reason, we are ahead of shovel.
        if (localLatest > this.latest) this.latest = localLatest;
      } finally {
        this.isIndexing = false;
      }
    }, 1000);
  }

  // Indexes batches till we get to the given block number, inclusive.
  async catchUpTo(stop: number) {
    while (this.latest < stop) {
      this.latest = await this.index(this.latest + 1, stop, this.batchSize);
    }
    console.log(`[SHOVEL] initialized to ${this.latest}`);
  }

  // Indexes a single batch of blocks.
  // Returns new tip block number on success, 0 if stop<start (= no new blocks).
  private async index(start: number, stop: number, n: number): Promise<number> {
    const t0 = Date.now();
    const delta = stop - start;
    if (delta < 0) return 0;
    const limit = delta >= n ? n - 1 : delta;

    console.log(`[SHOVEL] loading ${start} to ${start + limit}`);
    await Promise.all(this.indexers.map((i) => i.load(this.pg, start, start + limit)));
    console.log(`[SHOVEL] loaded ${start} to ${start + limit} in ${Date.now() - t0}ms`);
    return start + limit;
  }

  //Get latest shovel block.
  async getShovelLatest(): Promise<number> {
    const result = await retryBackoff(`shovel-latest-query`, () =>
      this.pg.query(`select block_num from transfers`),
    );
    return Number(result.rows[0].num);
  }
}
