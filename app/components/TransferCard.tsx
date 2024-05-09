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
    <div
      className='rounded-[24px] flex flex-col w-full m-auto
      border-[0px] bg-gradient-to-b from-[#F3F3F3] to-[#D6D6D6] p-[1px] drop-shadow-3xl min-w-fit'
    >
      <div className='flex flex-col bg-white rounded-[23px]'>
        <AmountRow transferData={props.transferData} eventLogData={props.eventLogData} />

        <div className='flex sm:flex-row flex-col width-full container border-y-[2px] border-[#F3F3F3]'>
          <div className='flex sm:w-1/2 w-full flex-col px-16 sm:py-8 pt-10 pb-12 gap-y-4 sm:border-r-[1px] sm:border-b-[0px] border-b-[1px] border-[#F3F3F3]'>
            <TextHeader>FROM</TextHeader>
            <AddressBubble addressProfile={props.addressProfileFrom} />
          </div>
          <div className='flex items-center overlay-component'>
            <TransferArrow />
          </div>
          <div className='flex sm:w-1/2 w-full flex-col px-16 sm:py-8 pt-10 pb-12 gap-y-4 sm:border-l-[1px] sm:border-t-[0px] border-t-[1px] border-[#F3F3F3]'>
            <TextHeader>TO</TextHeader>
            <AddressBubble addressProfile={props.addressProfileTo} />
          </div>
        </div>
        <EventLogCard
          eventLogData={props.eventLogData}
          finalized={props.latestFinalizedBlockNumber >= props.eventLogData.blockNumber}
        />
      </div>
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
        <div className='w-8' /> {/* placeholder for centering */}
        <AmountToken transferData={transferData} eventLogData={eventLogData} />
        <div className='w-8'>
          <a href={link} target='_blank'>
            <IconLink />
          </a>
        </div>
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
