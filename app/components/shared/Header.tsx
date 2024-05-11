import Image from 'next/image';

export function Header() {
  return (
    <div className='flex flex-row justify-center pt-4 pb-4 sm:pt-8 sm:pb-8'>
      <Image
        width={414}
        height={214}
        src={'/assets/eth-receipts-header.png'}
        className='w-[103px] h-[53px] sm:w-[138px] sm:h-[71px]'
        alt='ETH RECEIPTS'
      />
    </div>
  );
}
