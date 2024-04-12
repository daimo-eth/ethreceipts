import { AccountName } from './typography';

/** Log not found component for Eth Receipts */
export default function LogNotFound() {
  return (
    <div
      className='rounded-[24px] flex flex-col w-full m-auto
    border-[0px] bg-gradient-to-b from-[#F3F3F3] to-[#D6D6D6] p-[1px] drop-shadow-3xl'
    >
      <div className='flex flex-col bg-white rounded-[23px] px-10 py-10'>
        <AccountName>Provided log is not an ERC-20 transfer.</AccountName>
      </div>
    </div>
  );
}
