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
    const bytecode = await viemClient.getBytecode({
      address: accountAddress as Address,
    });
    const addressType = bytecode ? 'Contract' : 'EOA';
    const unknownAccount: Account = {
      type: AccountTypeStr[addressType],
    };
    return unknownAccount;
  } catch (e) {
    console.log(`Address does not exist: ${accountAddress}`);
    return null;
  }
}
