import { NeueMontreal } from '@/public/fonts';
import { IconLink } from '@/public/icons';
import { formatValue } from '../utils/formatting';
import stablecoinsAddresses from '../utils/tokens/stablecoins';
import { checkTokenWhitelist } from '../utils/tokens/tokenWhitelist';
import { AddressProfile, EventLog, Transfer } from '../utils/types';
import AddressBubble from './AddressBubble';
import EventLogCard from './EventLog';
import TokenWarning from './minorComponents/TokenWarning';
import TransferArrow from './minorComponents/TransferArrow';
import { TextHeader, TextMemo, TextValue } from './typography';
import { useMemo } from 'react';

/**
 * Represents an ERC20 Transfer card.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Transfer} props.transferData - The ERC20 transfer data.
 * @returns {React.ReactElement} An ERC20 Transfer card component.
 */
export default function TransferCard(
  props: Readonly<{
    transferData: Transfer;
    addressProfileFrom: AddressProfile;
    addressProfileTo: AddressProfile;
    eventLogData: EventLog;
    latestFinalizedBlockNumber: number;
  }>,
) {
  return (
    <div className='rounded-[24px] flex flex-col m-auto bg-gradient-to-b from-gray1 to-[#E7E7E7] p-[1px] drop-shadow-card'>
      <div className='flex flex-col bg-white rounded-[23px]'>
        <AmountRow transferData={props.transferData} eventLogData={props.eventLogData} />
        <Wiggle />
        <div className='flex flex-col container sm:flex-row'>
          <LabelAddr label='FROM' addrProfile={props.addressProfileFrom} />
          <div className='flex items-center overlay-component'>
            <TransferArrow />
          </div>
          <LabelAddr label='TO' addrProfile={props.addressProfileTo} />
        </div>
        <Wiggle />
        <EventLogCard
          eventLogData={props.eventLogData}
          finalized={props.latestFinalizedBlockNumber >= props.eventLogData.blockNumber}
        />
      </div>
    </div>
  );
}

function Wiggle() {
  const wiggleSvgDataUri =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzkiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDM5IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNDJfNSkiPgo8cGF0aCBkPSJNMCA2TDUgMUwxMCA2TDE1IDFMMTkuNSA2TDI0IDFMMjkgNkwzNCAxTDM5IDYiIHN0cm9rZT0iI0YzRjNGMyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE0Ml81Ij4KPHJlY3Qgd2lkdGg9IjM5IiBoZWlnaHQ9IjciIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==';
  const style = useMemo(
    () => ({
      width: '100%',
      height: '7px',
      background: `url(${wiggleSvgDataUri}) repeat-x 0 0`,
    }),
    [],
  );
  return <div style={style} />;
}

function LabelAddr({ label, addrProfile }: { label: 'FROM' | 'TO'; addrProfile: AddressProfile }) {
  const border = label === 'FROM' ? '' : 'border-t sm:border-l sm:border-t-[0px]';
  const style = `flex w-full flex-col px-16 pt-10 pb-12 gap-y-2 border-gray1 sm:w-1/2 sm:pt-6 sm:pb-12 ${border}`;
  return (
    <div className={style}>
      <TextHeader>{label}</TextHeader>
      <AddressBubble addressProfile={addrProfile} />
    </div>
  );
}

function AmountRow({
  transferData,
  eventLogData,
}: {
  transferData: Transfer;
  eventLogData: EventLog;
}) {
  const { chainId, blockNumber, logIndex } = eventLogData;
  const link = `https://${process.env.ETH_RECEIPT_DOMAIN}/l/${chainId}/${blockNumber}/${logIndex}`;

  const { memo } = transferData;

  return (
    <div className='w-full sm:px-10 px-8 sm:py-8 pt-8 pb-8'>
      <div className='flex flex-row justify-between items-center'>
        <div className='w-12'>&nbsp; {/* placeholder for centering */}</div>
        <AmountToken transferData={transferData} eventLogData={eventLogData} />
        <a href={link} target='_blank' className='block w-12 hover:opacity-80 p-4'>
          <IconLink />
        </a>
      </div>
      {memo && (
        <div className='flex flex-row justify-center pt-3'>
          <TextMemo>{memo}</TextMemo>
        </div>
      )}
    </div>
  );
}

function AmountToken({
  transferData,
  eventLogData,
}: {
  transferData: Transfer;
  eventLogData: EventLog;
}) {
  const value = formatValue(
    Number(transferData.value) / Number(10 ** Number(transferData.tokenDecimal)),
  );

  const isStablecoin = stablecoinsAddresses.includes(transferData.contractAddress);
  const isWhitelistedToken = checkTokenWhitelist(
    transferData.contractAddress,
    eventLogData.chainId,
  );
  const amountTokenStr = `${isStablecoin ? '$' : ''}${value} ${transferData.tokenSymbol}`;

  return (
    <div className={NeueMontreal.className}>
      <div className='flex flex-row flex-start gap-x-1'>
        <TextValue>{amountTokenStr}</TextValue>
        {!isWhitelistedToken && (
          <div className='flex py-1 px-2'>
            <TokenWarning />
          </div>
        )}
      </div>
    </div>
  );
}
