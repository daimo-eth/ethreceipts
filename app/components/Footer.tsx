import { OldDaimo } from '@/public/icons';
import { LinkFooter, TextFooter } from './typography';
import { Daimo } from '@/public/profileIcons/Daimo';

/** Footer component for Eth Receipts */
export default function Footer() {
  return (
    <div className='mt-10 mx-12'>
      <div className='flex flex-row flex-wrap justify-between w-full items-center min-w-fit max-w-[]'>
        <a
          className='flex flex-row items-center gap-x-2'
          href='https://ethereum.org'
          target='_blank'
        >
          <OldDaimo />
          <TextFooter>Powered by Ethereum</TextFooter>
        </a>
        <LinkFooter href='https://github.com/daimo-eth/daimo'>GitHub</LinkFooter>
        <a className='flex flex-row items-center gap-x-2' href='https://daimo.com' target='_blank'>
          <Daimo />
          <TextFooter>Built by Daimo</TextFooter>
        </a>
      </div>
    </div>
  );
}
