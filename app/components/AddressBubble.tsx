import { AddressProfile } from '@/app/utils/types';
import Image from 'next/image';
import { truncateAddress } from '../utils/formatting';
import { TextLightMedium } from './typography';
import { AddressField } from './fields';

/** Represents an address bubble component given an address profile*/
export default function AddressBubble(props: Readonly<{ addressProfile: AddressProfile }>) {
  const address = truncateAddress(props.addressProfile.accountAddress);
  const pfp = props.addressProfile.account?.avatar ?? null;

  return (
    <div className='flex flex-row min-w-72 gap-x-4'>
      <div className='min-w-[52px]'>
        {pfp && (
          <div className='border border-gray-400 rounded-[50%]'>
            <Image src={pfp} className='pfpImage' width='50' height='50' alt='pfp' />
          </div>
        )}
      </div>
      <div className='flex justify-between w-full'>
        <AddressField header={props.addressProfile.account?.name || ''} value={address} />
        <div>
          <TextLightMedium>{props.addressProfile.account?.type}</TextLightMedium>
        </div>
      </div>
    </div>
  );
}
