import { Account, AccountTypeStr } from '../types';
import { Address, PublicClient } from 'viem';

/**
 * If no known account exists, retrieve whether the account is an EOA or contract.
 */
export async function tryGetUnknownProfile(
  accountAddress: string,
  viemClient: PublicClient,
): Promise<Account | null> {
  try {
    const unknownAccount: Account = {
      type: AccountTypeStr.UNKNOWN,
    };
    return unknownAccount;
  } catch (e) {
    return null;
  }
}
