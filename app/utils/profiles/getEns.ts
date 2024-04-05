import { Address, PublicClient, isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { AccountTypeStr, Account } from '../types';

/** Attempt to get ENS name */
async function tryGetEnsName(accountAddress: Address, viemClient: PublicClient) {
  if (!isAddress(accountAddress)) return null;
  try {
    return await viemClient.getEnsName({
      address: accountAddress,
    });
  } catch (e) {
    console.log(`No ENS name for address ${accountAddress}`);
    return null;
  }
}

/** Attempt to get ENS avatar via ENS name */
async function tryGetEnsAvatar(ensName: string, viemClient: PublicClient) {
  try {
    return await viemClient.getEnsAvatar({
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
export async function tryGetEnsProfile(
  accountAddress: Address,
  viemClient: PublicClient,
): Promise<Account | null> {
  const ensName = await tryGetEnsName(accountAddress, viemClient);
  if (!ensName) return null;
  const ensAvatar = await tryGetEnsAvatar(ensName, viemClient);

  const ensProfile: Account = {
    type: AccountTypeStr.ENS,
    name: ensName,
    avatar: ensAvatar,
    url: null, // TODO: add link to ens name
  };
  return ensProfile;
}
