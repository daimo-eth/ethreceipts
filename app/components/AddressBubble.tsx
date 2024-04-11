import { AccountTypeStr, AddressProfile } from '@/app/utils/types';
import Image from 'next/image';
import { truncateAddress } from '../utils/formatting';
import { TextInitial } from './typography';
import { AccountIcon } from '@/public/profileIcons/profileIcons';
import { AccountAddress, AccountName } from './typography';
import { getProfileLink } from '../utils/profiles/getProfileLink';

/** Header-value React component field for Address Bubble */
function AddressField(props: { name: string; address: string; accountType: AccountTypeStr }) {
  // Get profile link for an account name.
  const profileLink = getProfileLink(props.name, props.accountType);
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-x-3 items-center'>
        <AccountName>{props.name}</AccountName>
        {profileLink ? (
          <a href={profileLink} target='_blank'>
            <AccountIcon accountType={props.accountType} />
          </a>
        ) : (
          <AccountIcon accountType={props.accountType} />
        )}
      </div>
      <AccountAddress>{props.address}</AccountAddress>
    </div>
  );
}

/** Represents an address bubble component given an address profile*/
export default function AddressBubble(props: Readonly<{ addressProfile: AddressProfile }>) {
  const address = truncateAddress(props.addressProfile.accountAddress);
  const pfp = props.addressProfile.account?.avatar ?? null;
  const name = props.addressProfile.account?.name;
  const nameInitial = name ? name[0].toUpperCase() : '';
  return (
    <div className='flex flex-row w-full gap-x-4'>
      <div className='flex'>
        {pfp ? (
          <div className='rounded-[50%] w-16 h-16'>
            <Image src={pfp} className='pfpImage' width='64' height='64' alt='pfp' />
          </div>
        ) : (
          <div className='bg-gradient-to-b w-16 h-16 rounded-[50%] from-[#F3F3F3] to-[#D6D6D6] p-[1px]'>
            <div className='flex w-full h-full rounded-[50%] items-center justify-center bg-white'>
              <TextInitial>{nameInitial}</TextInitial>
            </div>
          </div>
        )}
      </div>
      <div className='flex flex-row gap-x-1 items-center justify-start'>
        <AddressField
          name={name || ''}
          address={address}
          accountType={props.addressProfile.account?.type}
        />
      </div>
    </div>
  );
}
