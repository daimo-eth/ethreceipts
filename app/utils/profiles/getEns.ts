import { Address, isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { AccountTypeStr, Account } from '../types';
import { getViemClient } from '../viem/client';

/** Attempt to get ENS name */
async function tryGetEnsName(accountAddress: Address) {
  if (!isAddress(accountAddress)) return null;
  const l1Client = getViemClient(1);
  try {
    return await l1Client.getEnsName({
      address: accountAddress,
    });
  } catch (e) {
    console.log(`No ENS name for address ${accountAddress}`);
    return null;
  }
}

/** Attempt to get ENS avatar via ENS name */
async function tryGetEnsAvatar(ensName: string) {
  const l1Client = getViemClient(1);
  try {
    return await l1Client.getEnsAvatar({
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
 * @returns {Account} - The ENS profile for the account address.
 */
export async function tryGetEnsProfile(accountAddress: Address): Promise<Account | null> {
  const ensName = await tryGetEnsName(accountAddress);
  console.log(`[ADDR] fetched ENS profile for ${accountAddress}: ${ensName || 'not found'}`);
  if (!ensName) return null;
  const ensAvatar = await tryGetEnsAvatar(ensName);

  const ensProfile: Account = {
    type: AccountTypeStr.ENS,
    name: ensName,
    avatar: ensAvatar || null,
    url: null, // TODO: add link to ens name
  };
  return ensProfile;
}
