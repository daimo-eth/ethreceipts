import { AccountIcon } from '@/public/profileIcons/profileIcons';
import { truncateAddress } from '../utils/formatting';
import { AccountTypeStr, AddressProfile } from '../utils/types';
import { RowAccountProfileInitial } from './typography';
import Image from 'next/image';

function AddressField(props: { name: string; address: string; accountType: AccountTypeStr }) {
  // Get profile link for an account name.
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-x-2 items-center'>
        {props.accountType == AccountTypeStr.UNKNOWN ? props.address : props.name}
        <AccountIcon accountType={props.accountType} small={true} />
      </div>
    </div>
  );
}

/** Represents an address bubble component given an address profile for transfer history */
export default function AddressBubbleRow(
  props: Readonly<{ addressProfile: AddressProfile; link?: boolean }>,
) {
  const address = truncateAddress(props.addressProfile.accountAddress);
  const pfp = props.addressProfile.account?.avatar ?? null;
  const name = props.addressProfile.account?.name;
  const nameInitial = name ? name[0].toUpperCase() : '0x';

  return (
    <div className='flex flex-row w-min-fit gap-x-2'>
      <div className='flex'>
        {pfp ? (
          <div className='rounded-[50%] w-6 h-6'>
            <Image src={pfp} className='pfpImage' width='20' height='20' alt='pfp' />
          </div>
        ) : (
          <div className='bg-gradient-to-b w-6 h-6 rounded-[50%] from-[#F3F3F3] to-[#D6D6D6] p-[1px]'>
            <div className='flex w-full h-full rounded-[50%] items-center justify-center bg-white'>
              <RowAccountProfileInitial>{nameInitial}</RowAccountProfileInitial>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-row items-center justify-start'>
        <AddressField
          name={name || ''}
          address={address}
          accountType={props.addressProfile.account?.type}
        />
      </div>
    </div>
  );
}
