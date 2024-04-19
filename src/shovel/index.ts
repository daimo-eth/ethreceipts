import { makeConfig, toJSON } from '@indexsupply/shovel-config';
import type { Source } from '@indexsupply/shovel-config';
import { writeFileSync } from 'fs';

import { transfersIntegration } from './transfers';

// Mainnet.
const mainnet: Source = {
  name: 'mainnet',
  chain_id: 1,
  url: 'https://ethereum-rpc.publicnode.com',
  batch_size: 100,
  concurrency: 4,
};

// Base chain.
const base: Source = {
  name: 'base',
  chain_id: 8453,
  url: 'https://base-rpc.publicnode.com',
  batch_size: 100,
  concurrency: 4,
};

const integrations = [transfersIntegration];

// TODO: add mainnet.
const config = makeConfig({
  pg_url: '$DATABASE_URL',
  sources: [base, mainnet],
  integrations,
});

console.log(`✔ Writing Shovel config to config.json`);
writeFileSync('src/shovel/config.json', toJSON(config, 2));
