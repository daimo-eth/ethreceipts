import { Address } from 'viem';
import { trpc } from '@/app/trpc';

/** Retreve Daimo profile if exists */
export async function getDaimoAccountHistory(accountAddress: Address): Promise<any | null> {
  try {
    // @ts-ignore
    const res = await trpc.getAccountHistory.query({
      address: accountAddress,
      sinceBlockNum: 0,
    });
    return res;
  } catch (e) {
    console.log(`Error fetching account history for ${accountAddress}`);
    return null;
  }
}
