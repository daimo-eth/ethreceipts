import { Daimo } from '@/public/icons';
import { AccountAddress, AccountName } from './typography';

/** Header-value React component field for Address Bubble */
export function AddressField(props: { name: string; address: string }) {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-x-3 items-center'>
        <AccountName>{props.name}</AccountName>
        <a href={`https://daimo.com/l/account/${props.name}`} target='_blank'>
          <Daimo />
        </a>
      </div>
      <AccountAddress>{props.address}</AccountAddress>
    </div>
  );
}
