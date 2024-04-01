import { normalize } from 'viem/ens';
import { Address, isAddress } from 'viem';
import { publicClient } from '@/app/utils/viem/client';
import { AccountType, AddressProfile, DaimoAccount, EnsAccount } from '@/app/utils/types';

/** Resolve account given an address */
export async function resolveAccountForAddress(address: Address): Promise<AddressProfile> {
  let accountType: AccountType = await tryGetEnsProfile(address);
  if (!accountType) accountType = await tryGetDaimoProfile(address);

  const addressProfile: AddressProfile = {
    accountAddress: address,
    homeChainId: 1, // TODO CHANGE THIS
    accountType: accountType,
  };
  return addressProfile;
}

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
async function tryGetEnsProfile(accountAddress: Address): Promise<EnsAccount | null> {
  // Retrieve ENS name from account address.
  const ensName = await tryGetEnsName(accountAddress);
  if (!ensName) return null;

  // Retrieve ENS avatar from ENS name.
  const ensAvatar = await tryGetEnsAvatar(ensName);

  const ensProfile: EnsAccount = {
    ensName: ensName,
    ensAvatar: ensAvatar,
  };
  return ensProfile;
}

async function tryGetDaimoProfile(accountAddress: Address): Promise<DaimoAccount | null> {
  /* TODO */
  return null;
}
