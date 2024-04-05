import { Address } from 'viem';
import { AccountTypeStr, Account } from '../types';
import { trpc } from '@/app/trpc';

/** Retreve Daimo profile if exists */
// TODO: could also link accounts like Farcaster (res.linkedAccounts?.[0].type == farcaster)
// res.linkedAccounts?.[0]: with username, displayName, pfpUrl
export async function tryGetDaimoProfile(accountAddress: Address): Promise<Account | null> {
  try {
    const res = await trpc.getEthereumAccount.query({ addr: accountAddress });
    const daimoAccount: Account = {
      type: AccountTypeStr.DAIMO,
      name: res.name,
      avatar: res.profilePicture || null,
      url: `https://daimo.com/l/account/${res.username}`,
    };
    return daimoAccount;
  } catch (e) {
    console.log(`No Daimo profile found for ${accountAddress}`);
    return null;
  }
}
