import { formatValue, truncateAddress } from '@/app/utils/formatting';
import { getAbsoluteUrl } from '@/app/utils/getAbsoluteUrl';
import stablecoinsAddresses from '@/app/utils/tokens/stablecoins';
import { AddressProfile, EventLog, Transfer } from '@/app/utils/types';

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
  console.log(`[LINK PREVIEW] ${JSON.stringify(addressProfileFrom)}`);
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundImage: `url(${getAbsoluteUrl('/assets/eth-receipts-header.png')}")`,
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'column',
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

  // Format addresses
  const sender =
    addressProfileFrom.account?.name || truncateAddress(addressProfileFrom.accountAddress);
  const receiver =
    addressProfileTo.account?.name || truncateAddress(addressProfileTo.accountAddress);

  const text = `${sender} sent ${amountStr} ${tokenSymbol} to ${receiver}`;
  return <div>{text}</div>;
}

function Footer({
  eventLogData,
  latestFinalizedBlockNumber,
}: {
  eventLogData: EventLog;
  latestFinalizedBlockNumber: number;
}) {
  const isFinalized = eventLogData.blockNumber <= latestFinalizedBlockNumber;
  const status = isFinalized ? 'FINALIZED' : 'NOT FINALIZED';
  const chain = eventLogData.chainId;
  return (
    <div
      style={{
        height: '10%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        justifyItems: 'center',
        marginBottom: '48px',
      }}
    >
      CHAIN: {chain} | STATUS: {status}
    </div>
  );
}
