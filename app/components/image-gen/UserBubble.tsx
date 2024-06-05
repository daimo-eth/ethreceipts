/* eslint-disable @next/next/no-img-element */
import { truncateAddress } from '@/app/utils/formatting';
import { AddressProfile } from '@/app/utils/types';

export function UserBubble({ addressProfile }: { addressProfile: AddressProfile }) {
  const address = truncateAddress(addressProfile.accountAddress);
  const name = addressProfile.account?.name ?? undefined;

  return (
    <div
      style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UserProfilePicture name={name} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        {name && <div style={{ color: '#323232', fontSize: '32px' }}>{name}</div>}
        {<div style={{ color: '#AAAAAA', fontWeight: 'lighter', fontSize: '26px' }}>{address}</div>}
      </div>
    </div>
  );
}

function UserProfilePicture({ name }: { name: string | undefined }) {
  const nameInitial = name ? name[0].toUpperCase() : '0x';

  return (
    <div
      style={{
        display: 'flex',
        width: '100px',
        height: '100px',
        borderRadius: '9999px',
        backgroundColor: 'white',
        border: '0.5px solid #535353',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          color: '#535353',
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: '100px',
        }}
      >
        {nameInitial}
      </div>
    </div>
  );
}
