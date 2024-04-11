import { Arrow } from '@/public/icons';
import { truncateAddress } from '../utils/formatting';
import { AddressProfile, Transfer, EventLog } from '../utils/types';
import AddressBubble from './AddressBubble';
import EventLogCard from './EventLog';
import { TextValue, TextHeader, TextMemo } from './typography';
import TransferArrow from './TransferArrow';

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
  }>,
) {
  const value = Number(
    BigInt(props.transferData.value) / BigInt(props.transferData.tokenDecimal),
  ).toFixed(2);
  const memo = 'for nyc trip'; // TODO: add memo

  return (
    <div
      className='rounded-[24px] flex flex-col w-full m-auto
      border-[0px] bg-gradient-to-b from-[#F3F3F3] to-[#D6D6D6] p-[1px] drop-shadow-3xl'
    >
      <div className='flex flex-col bg-white rounded-[23px]'>
        <div className='flex flex-col gap-y-1 w-full items-center px-10 py-12'>
          <TextValue>{`$${value.toString()} USDC`}</TextValue>
          {memo && <TextMemo>{memo}</TextMemo>}
        </div>

        <div className='flex width-full container border-y-[2px] border-[#F3F3F3]'>
          <div className='flex w-1/2 flex-col px-16 py-8 gap-y-4 border-r-[1px] border-[#F3F3F3]'>
            <TextHeader>FROM</TextHeader>
            <AddressBubble addressProfile={props.addressProfileFrom} />
          </div>
          <div className='flex items-center overlay-component'>
            <TransferArrow />
          </div>
          <div className='flex w-1/2 flex-col px-16 py-8 gap-y-4 border-l-[1px] border-[#F3F3F3]'>
            <TextHeader>TO</TextHeader>
            <AddressBubble addressProfile={props.addressProfileTo} />
          </div>
        </div>
        <EventLogCard eventLogData={props.eventLogData} transferData={props.transferData} />
      </div>
    </div>
  );
}
