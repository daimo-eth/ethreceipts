import { AccountTypeStr } from '../types';

export function getProfileLink(
  accountName: string,
  accountType: AccountTypeStr,
): string | undefined {
  switch (accountType) {
    case AccountTypeStr.ENS:
      return `https://app.ens.domains/${accountName}`;
    case AccountTypeStr.DAIMO:
      return `https://daimo.com/l/account/${accountName}`;
    default:
      return undefined;
  }
}
