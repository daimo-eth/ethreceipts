import { OldDaimo } from '@/public/icons';
import { LinkFooter, TextFooter } from './typography';
import { Daimo } from '@/public/profileIcons/Daimo';

/** Footer component for Eth Receipts */
export default function Footer() {
  return (
    <div className='relative bottom-0 w-full py-10 sm:px-[25%] px-2'>
      <div className='flex flex-row flex-wrap w-full items-center justify-between w-full items-center min-w-fit'>
        <div className='flex flex-row items-center gap-x-1'>
          <OldDaimo />
          <TextFooter>Powered by Ethereum</TextFooter>
        </div>
        <LinkFooter href='https://github.com/daimo-eth/daimo'>GitHub</LinkFooter>
        <div className='flex flex-row items-center gap-x-2'>
          <a href='https://daimo.com' target='_blank'>
            <Daimo />
          </a>

          <TextFooter>Built by Daimo</TextFooter>
        </div>
      </div>
    </div>
  );
}
