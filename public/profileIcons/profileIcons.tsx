import { AccountTypeStr } from '@/app/utils/types';
import { Daimo } from './Daimo';
import { ENS } from './Ens';

export function AccountIcon({ accountType }: { accountType: AccountTypeStr }) {
  switch (accountType) {
    case AccountTypeStr.DAIMO:
      return <Daimo />;
    case AccountTypeStr.ENS:
      return <ENS />;
    default:
      return <></>;
  }
}
