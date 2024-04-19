import { CoinIndexer } from '../shovel/coinIndexer';
import { Watcher } from '../shovel/watcher';
import { createViemClient } from '@/app/utils/viem/client';
import { chainConfig } from '@/app/env';

async function main() {
  console.log('[Server] intializing shovel watcher');

  // Create Viem client with correct chain.
  // TODO: use different chain config.
  const viemClient = createViemClient(chainConfig.chainL1.id.toString());

  // Create shovel watcher with ERC20 indexer.
  const shovelWatcher = new Watcher();
  await shovelWatcher.init();

  const coinIndexer = new CoinIndexer(viemClient);
  shovelWatcher.add(coinIndexer);
  shovelWatcher.watch();
}

main().catch(console.error);
