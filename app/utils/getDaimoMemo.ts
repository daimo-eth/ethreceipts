import { Hex } from 'viem';
import { trpc } from '../trpc';

/** Retrieve Daimo memo if exists */
export async function tryGetDaimoMemo(txHash: Hex, logIndex: number): Promise<string | undefined> {
  try {
    // @ts-ignore
    const memo = await trpc.getMemo.query({ txHash, logIndex });
    console.log(`Daimo memo found for tx ${txHash}: ${memo}`);
    return memo;
  } catch (e) {
    console.log(`No Daimo memo found for tx ${txHash} / logIndex ${logIndex}`);
    return undefined;
  }
}
