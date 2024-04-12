import { Address } from 'viem';
import { AccountTypeStr, Account } from '../types';
import { trpc } from '@/app/trpc';

/** Retreve Daimo profile if exists */
export async function tryGetDaimoProfile(accountAddress: Address): Promise<Account | null> {
  try {
    // @ts-ignore
    const res = await trpc.getEthereumAccount.query({ addr: accountAddress });
    if (!res.name) {
      console.log(`No Daimo profile found for ${accountAddress}`);
      return null;
    }

    const daimoAccount: Account = {
      type: AccountTypeStr.DAIMO,
      name: res.name,
      avatar: res.profilePicture || null,
      url: `https://daimo.com/l/account/${res.name}`,
    };
    return daimoAccount;
  } catch (e) {
    console.log(`No Daimo profile found for ${accountAddress}`);
    return null;
  }
}
