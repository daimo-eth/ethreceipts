import { Address } from 'viem';
import { AccountTypeStr, DaimoAccount } from '../types';
import { trpc } from '@/app/trpc';

/** Retreve Daimo profile if exists */
// TODO: could also link accounts like Farcaster (res.linkedAccounts?.[0].type == farcaster)
// res.linkedAccounts?.[0]: with username, displayName, pfpUrl
export async function tryGetDaimoProfile(accountAddress: Address): Promise<DaimoAccount | null> {
  try {
    const res = await trpc.getEthereumAccount.query({ addr: accountAddress });
    const daimoAccount: DaimoAccount = {
      type: AccountTypeStr.DAIMO,
      name: res.name,
      avatar: res.profilePicture ?? null,
    };
    return daimoAccount;
  } catch (e) {
    console.log(`No Daimo profile found for ${accountAddress}`);
    return null;
  }
}
