/* eslint-disable @next/next/no-img-element */
import { formatValue, getDateDifference, truncateAddress } from '@/app/utils/formatting';
import { getAbsoluteUrl } from '@/app/utils/getAbsoluteUrl';
import stablecoinsAddresses from '@/app/utils/tokens/stablecoins';
import { AddressProfile, EventLog, Transfer } from '@/app/utils/types';
import { UserBubble } from './UserBubble';

export function LinkPreviewImg({
  transferData,
  addressProfileFrom,
  addressProfileTo,
  eventLogData,
  latestFinalizedBlockNumber,
}: {
  transferData: Transfer;
  addressProfileFrom: AddressProfile;
  addressProfileTo: AddressProfile;
  eventLogData: EventLog;
  latestFinalizedBlockNumber: number;
}) {
  return (
    <div
      style={{
        backgroundColor: '#F3F3F3',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          backgroundColor: 'white',
          borderRadius: '24px',
          paddingTop: '40px',
          paddingBottom: '20px',
          border: '1px solid #EEEEEE',
        }}
      >
        <Content
          transferData={transferData}
          addressProfileFrom={addressProfileFrom}
          addressProfileTo={addressProfileTo}
        />
        <Footer
          eventLogData={eventLogData}
          latestFinalizedBlockNumber={latestFinalizedBlockNumber}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <img
          src={`${getAbsoluteUrl('/assets/eth-receipts-one-liner.png')}`}
          alt={'Profile'}
          width={'20%'}
        ></img>
      </div>
    </div>
  );
}

function Content({
  transferData,
  addressProfileFrom,
  addressProfileTo,
}: {
  transferData: Transfer;
  addressProfileFrom: AddressProfile;
  addressProfileTo: AddressProfile;
}) {
  // Format token value
  const { tokenSymbol, tokenDecimal, value: tokenValue } = transferData;
  const value = formatValue(Number(tokenValue) / Number(10 ** Number(tokenDecimal)));

  const isStablecoin = stablecoinsAddresses.includes(transferData.contractAddress);
  const amountStr = `${isStablecoin ? '$' : ''}${value}`;

  const memo = transferData.memo ?? '';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <span style={{ fontSize: '54px', fontWeight: 'bold' }}>
          {amountStr} {tokenSymbol}
        </span>
        <span style={{ fontSize: '24px', color: '#AAAAAA' }}>{memo}</span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginTop: '20px',
          marginBottom: '12px',
          width: '100%',
          borderBottom: '1px solid #EEEEEE',
          borderTop: '1px solid #EEEEEE',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '30px 50px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#777777' }}>FROM</span>
          <UserBubble addressProfile={addressProfileFrom} />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            padding: '30px 50px',
            borderLeft: '1px solid #EEEEEE',
          }}
        >
          <span style={{ fontSize: '18px', color: '#777777' }}>TO</span>
          <UserBubble addressProfile={addressProfileTo} />
        </div>
      </div>
    </div>
  );
}

function Footer({
  eventLogData,
  latestFinalizedBlockNumber,
}: {
  eventLogData: EventLog;
  latestFinalizedBlockNumber: number;
}) {
  const time = new Date(Number(eventLogData.timestamp) * 1000);
  const dateDifferenceStr = getDateDifference(time);

  const chain = eventLogData.chainName;
  const chainName = chain[0].toUpperCase() + chain.slice(1);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        color: '#AAAAAA',
        fontSize: '18px',
        fontWeight: 'lighter',
      }}
    >
      {dateDifferenceStr} on {chainName}
    </div>
  );
}
