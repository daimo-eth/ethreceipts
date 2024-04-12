import { Address, PublicClient } from 'viem';
import { Account, AccountTypeStr, AddressProfile } from '@/app/utils/types';
import { getProfileFunctions } from '@/app/utils/profiles/profileFunctions';

/** Get account type given an address */
async function getAccountType(address: Address, viemClient: PublicClient): Promise<Account> {
  // Fetch profile on each supported account type.
  const accountResults = await Promise.all(
    getProfileFunctions.map((fn) => fn(address, viemClient)),
  );
  // Return known or unknown (contract or EOA) account. If no account exists, return null.
  return accountResults.find((account) => account !== null) || { type: AccountTypeStr.UNKNOWN };
}

/** Resolve account profile given an address */
export async function resolveAccountForAddress(
  address: Address,
  viemClient: PublicClient,
): Promise<AddressProfile> {
  const account: Account = await getAccountType(address, viemClient);
  return { accountAddress: address, account: account };
}
