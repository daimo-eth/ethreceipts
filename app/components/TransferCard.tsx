import { AddressProfile, Transfer, EventLog } from '../utils/types';
import AddressBubble from './AddressBubble';
import EventLogCard from './EventLog';
import { TextValue, TextHeader, TextMemo } from './typography';
import TransferArrow from './minorComponents/TransferArrow';
import { NeueMontreal } from '@/public/fonts';
import { formatValue } from '../utils/formatting';
import stablecoinsAddresses from '../utils/tokens/stablecoins';
import CopyReceipt from './minorComponents/CopyReceipt';
import { checkTokenWhitelist } from '../utils/tokens/tokenWhitelist';
import TokenWarning from './minorComponents/TokenWarning';
import { Block } from 'viem';

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
  const value = formatValue(
    Number(props.transferData.value) / Number(10 ** Number(props.transferData.tokenDecimal)),
  );
  const link = `https://${process.env.ETH_RECEIPT_DOMAIN}/l/${props.eventLogData.chainId}/${props.eventLogData.blockNumber}/${props.eventLogData.logIndex}`;

  const memo = props.transferData.memo;

  const isStablecoin = stablecoinsAddresses.includes(props.transferData.contractAddress);
  const isWhitelistedToken = checkTokenWhitelist(
    props.transferData.contractAddress,
    props.eventLogData.chainId,
  );

  return (
    <div
      className='rounded-[24px] flex flex-col w-full m-auto
      border-[0px] bg-gradient-to-b from-[#F3F3F3] to-[#D6D6D6] p-[1px] drop-shadow-3xl min-w-fit'
    >
      <div className='flex flex-col bg-white rounded-[23px]'>
        <div className='flex flex-col w-full items-center sm:px-10 px-8 sm:py-8 pt-8 pb-8'>
          <div className='w-full flex justify-end sm:px-4 px-0 sm:mb-[-16px] mb-[-12px]'>
            <CopyReceipt link={link} />
          </div>
          <div className='flex flex-col items-center justify-center w-full min-w-fit gap-y-2'>
            <div className={NeueMontreal.className}>
              <div className='flex flex-row flex-start gap-x-1'>
                <TextValue>{`${isStablecoin ? '$' : ''}${value} ${
                  props.transferData.tokenSymbol
                }`}</TextValue>
                {!isWhitelistedToken && (
                  <div className='flex py-1 px-2'>
                    <TokenWarning />
                  </div>
                )}
              </div>
            </div>
            {memo && <TextMemo>{memo}</TextMemo>}
          </div>
        </div>

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
          transferData={props.transferData}
          finalized={props.latestFinalizedBlockNumber >= props.eventLogData.blockNumber}
        />
      </div>
    </div>
  );
}
