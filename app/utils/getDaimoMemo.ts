import { Hex } from 'viem';
import { trpc } from '../trpc';

/** Retrieve Daimo memo if exists */
export async function tryGetDaimoMemo(transactionHash: Hex): Promise<string | undefined> {
  try {
    // @ts-ignore
    const memo = await trpc.getMemo.query({ opHash: transactionHash });
    console.log(`Daimo memo found for tx ${transactionHash}: ${memo}`);
    return memo;
  } catch (e) {
    console.log(`No Daimo memo found for tx ${transactionHash}`);
    return undefined;
  }
}
