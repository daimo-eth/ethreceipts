import { AddressProfile } from '@/app/utils/types';
import Image from 'next/image';

export default function AddressBubble(props: Readonly<{ addressProfile: AddressProfile }>) {
  return (
    <div className='card'>
      <div className='card-body'>
        <p>Name: {props.addressProfile.account?.name}</p>
        <p>Address: {props.addressProfile.accountAddress}</p>
        <p>Type: {props.addressProfile.account?.type}</p>
        {props.addressProfile.account?.avatar && (
          <Image
            src={props.addressProfile.account?.avatar}
            width={50}
            height={50}
            alt='Profile Image'
          />
        )}
      </div>
    </div>
  );
}
