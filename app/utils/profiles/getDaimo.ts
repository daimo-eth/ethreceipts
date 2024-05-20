import { getEnvVars } from '@/app/env';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import { Address, Hex } from 'viem';
import { Account, AccountTypeStr } from '../types';

/** Retreve Daimo profile if exists */
export async function tryGetDaimoProfile(accountAddress: Address): Promise<Account | null> {
  try {
    // @ts-ignore
    const res = await daimoRpc.getEthereumAccount.query({ addr: accountAddress });
    console.log(`[ADDR] fetched Daimo profile for ${accountAddress}: ${res.name || 'not found'}`);
    if (!res.name) return null;

    const daimoAccount: Account = {
      type: AccountTypeStr.DAIMO,
      name: res.name || res.label || res.ensName || null,
      avatar: res.profilePicture || null,
      url: `https://daimo.com/l/account/${res.name}`,
    };
    return daimoAccount;
  } catch (e) {
    console.log(`[ADDR] No Daimo profile found for ${accountAddress}`);
    return null;
  }
}

/** Retrieve Daimo memo if exists */
export async function tryGetDaimoMemo(txHash: Hex, logIndex: number): Promise<string | undefined> {
  try {
    // @ts-ignore
    const memo = await daimoRpc.getMemo.query({ txHash, logIndex });
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

// TODO: replace type with AppRouter from @daimo/api when it's available.
const daimoRpc = createTRPCClient<any>({
  links: [httpBatchLink({ url: getEnvVars().DAIMO_API_URL_WITH_CHAIN })],
});
