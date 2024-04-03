import { Address, isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { AccountTypeStr, EnsAccount } from '../types';
import { publicClient } from '../viem/client';

/** Get ENS name */
async function tryGetEnsName(accountAddress: Address) {
  if (!isAddress(accountAddress)) return null;
  try {
    return await publicClient.getEnsName({
      address: accountAddress,
    });
  } catch (e) {
    console.log(`No ENS name for address ${accountAddress}`);
    return null;
  }
}

/** Get ENS avatar */
async function tryGetEnsAvatar(ensName: string) {
  try {
    return await publicClient.getEnsAvatar({
      name: normalize(ensName),
    });
  } catch (e) {
    console.log(`No ENS avatar for name ${ensName}`);
    return null;
  }
}

/**
 * Retrieve ENS profile for account address.
 *
 * @param {string} accountAddress - The account address for the desired ENS profile.
 * @returns {AccountProfile} - The ENS profile for the account address.
 */
export async function tryGetEnsProfile(accountAddress: Address): Promise<EnsAccount | null> {
  // Retrieve ENS name from account address.
  const ensName = await tryGetEnsName(accountAddress);
  if (!ensName) return null;

  // Retrieve ENS avatar from ENS name.
  const ensAvatar = await tryGetEnsAvatar(ensName);

  const ensProfile: EnsAccount = {
    type: AccountTypeStr.ENS,
    name: ensName,
    avatar: ensAvatar,
  };
  return ensProfile;
}
