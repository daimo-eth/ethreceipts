import { Hex } from 'viem';
import { trpc } from '../daimoRpc';

/** Retrieve Daimo memo if exists */
export async function tryGetDaimoMemo(txHash: Hex, logIndex: number): Promise<string | undefined> {
  try {
    // @ts-ignore
    const memo = await trpc.getMemo.query({ txHash, logIndex });
    if (memo?.memo == undefined) {
      console.log(`No Daimo memo found for tx ${txHash} / logIndex ${logIndex}`);
      return undefined;
    }
    console.log(`Daimo memo found for tx ${txHash}: ${memo.memo}`);
    return memo.memo;
  } catch (e) {
    console.log(`Error fetching Daimo memo found for tx ${txHash} / logIndex ${logIndex}`);
    return undefined;
  }
}
