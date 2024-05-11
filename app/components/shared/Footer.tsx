import { IconEthLogo } from '@/public/icons';
import { Daimo } from '@/public/profileIcons/Daimo';
import { TextFooter } from '../typography';

/** Footer component for Eth Receipts */
export default function Footer() {
  return (
    <div className='max-w-screen-sm py-10 pl-12 pr-14 m-auto'>
      <div className='flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center gap-x-1 p-2 w-40'>
          <IconEthLogo />
          <TextFooter>Powered by Ethereum</TextFooter>
        </div>
        <a
          href='https://github.com/daimo-eth/eth-receipt'
          target='_blank'
          className='p-2 hover:opacity-80'
        >
          <TextFooter>GitHub</TextFooter>
        </a>
        <a
          href='https://daimo.com'
          target='_blank'
          className='flex flex-row items-center justify-end gap-x-2 p-2 w-40 hover:opacity-80'
        >
          <Daimo />
          <TextFooter>Built by Daimo</TextFooter>
        </a>
      </div>
    </div>
  );
}
