import { AddressProfile } from '@/app/utils/types';
import Image from 'next/image';
import { truncateAddress } from '../utils/formatting';

export default function AddressBubble(props: Readonly<{ addressProfile: AddressProfile }>) {
  const address = truncateAddress(props.addressProfile.accountAddress);
  return (
    <div>
      <p>{props.addressProfile.account?.name}</p>
      <p>{address}</p>
      <p>{props.addressProfile.account?.type}</p>
      {props.addressProfile.account?.avatar && (
        <Image src={props.addressProfile.account?.avatar} width={50} height={50} alt='pfp' />
      )}
    </div>
  );
}
