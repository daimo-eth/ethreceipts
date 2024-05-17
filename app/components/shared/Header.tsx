import Image from 'next/image';

export function Header() {
  return (
    <a href='/' className='flex flex-row justify-center py-6 sm:py-8'>
      <Image
        width={414}
        height={214}
        src={'/assets/eth-receipts-header.png'}
        className='w-[103px] h-[53px] sm:w-[138px] sm:h-[71px]'
        alt='ETH RECEIPTS'
      />
    </a>
  );
}
