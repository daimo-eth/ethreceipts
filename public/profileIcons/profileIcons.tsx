import { AccountTypeStr } from '@/app/utils/types';
import { Daimo } from './Daimo';
import { ENS } from './Ens';
import { Farcaster } from './Farcaster';

export function AccountIcon({ accountType }: { accountType: AccountTypeStr }) {
  switch (accountType) {
    case AccountTypeStr.DAIMO:
      return <Daimo />;
    case AccountTypeStr.ENS:
      return <ENS />;
    case AccountTypeStr.FARCASTER:
      return <Farcaster />;
    case AccountTypeStr.SPECIAL_ADDRESS:
      return null;
    default:
      return null;
  }
}
