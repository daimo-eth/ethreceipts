import { CoinIndexer } from '../shovel/coinIndexer';
import { Watcher } from '../shovel/watcher';

async function main() {
  console.log('[Server] intializing shovel watcher');
  const shovelWatcher = new Watcher();
  await shovelWatcher.init();
  shovelWatcher.add(new CoinIndexer());
  shovelWatcher.watch();

  // here do I create a router / HTTP handler?
  // https://github.com/daimo-eth/daimo/blob/4eec1462de3781da50cc838a45928942fc49e1eb/packages/daimo-api/src/server/server.ts#L28
}
