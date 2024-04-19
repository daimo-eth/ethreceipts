import { AccountTypeStr } from '@/app/utils/types';
import { Daimo } from './Daimo';
import { ENS } from './Ens';
import { Farcaster } from './Farcaster';

export function AccountIcon({
  accountType,
  link,
  small = false,
}: {
  accountType: AccountTypeStr;
  link?: string;
  small?: boolean;
}) {
  switch (accountType) {
    case AccountTypeStr.DAIMO:
      if (link) {
        return small ? (
          <a href={link} target='_blank'>
            <Daimo width='12' height='12' />
          </a>
        ) : (
          <a href={link} target='_blank'>
            <Daimo />
          </a>
        );
      }
      return small ? <Daimo width='12' height='12' /> : <Daimo />;
    case AccountTypeStr.ENS:
      if (link) {
        return small ? (
          <a href={link} target='_blank'>
            <ENS width='12' height='12' />
          </a>
        ) : (
          <a href={link} target='_blank'>
            <ENS />
          </a>
        );
      }
      return small ? <ENS width='12' height='12' /> : <ENS />;
    case AccountTypeStr.FARCASTER:
      if (link) {
        return small ? (
          <a href={link} target='_blank'>
            <Farcaster />
          </a>
        ) : (
          <a href={link} target='_blank'>
            <Farcaster />
          </a>
        );
      }
      return small ? <Farcaster width='12' height='12' /> : <Farcaster />;
    default:
      return <></>;
  }
}
