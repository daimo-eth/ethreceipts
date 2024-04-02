import { Address } from 'viem';
import { AccountType, AddressProfile } from '@/app/utils/types';
import { getProfileFunctions } from '@/app/utils/profiles';

/** Get account type given an address */
async function getAccountType(address: Address): Promise<AccountType> {
  for (const getProfileFn of getProfileFunctions) {
    const accountType: AccountType = await getProfileFn(address);
    if (accountType) return accountType;
  }

  // TODO: check if EOA or coontract if unknown
  return null;
}

/** Resolve account profile given an address */
export async function resolveAccountForAddress(address: Address): Promise<AddressProfile> {
  const addressProfile: AddressProfile = {
    accountAddress: address,
    account: await getAccountType(address),
  };
  return addressProfile;
}
