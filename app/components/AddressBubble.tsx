import { AddressProfile } from '@/app/utils/types';
import Image from 'next/image';
import { truncateAddress } from '../utils/formatting';
import { TextInitial } from './typography';
import { AddressField } from './fields';
import { Daimo } from '@/public/icons';

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
        <AddressField name={name || ''} address={address} />
      </div>
    </div>
  );
}
