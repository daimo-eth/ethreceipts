import { Address } from 'viem';
import { Account, AccountTypeStr } from '../types';

export async function tryGetFarcasterProfile(accountAddress: Address) {
  try {
    const res = await fetch(
      `https://searchcaster.xyz/api/profiles?connected_address=${accountAddress}`,
    ).then((res) => res.json());
    if (res.length === 0) {
      console.log(`[ADDR] No Farcaster profile found for ${accountAddress}`);
      return null;
    }
    const farcasterProfile: Account = {
      type: AccountTypeStr.FARCASTER,
      name: res[0].body.username,
      avatar: res[0].body.avatarUrl,
      url: `https://warpcast.com/${res[0].body.username}`,
    };
    return farcasterProfile;
  } catch (e) {
    console.log(`Error fetching Farcaster profile found for ${accountAddress}`);
    return null;
  }
}
