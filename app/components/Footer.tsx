import { Daimo, OldDaimo } from '@/public/icons';
import { LinkFooter, TextFooter } from './typography';

export default function Footer() {
  return (
    <div className='absolute bottom-0 w-full py-10 px-60'>
      <div className='flex flex-row w-full items-center justify-between w-full items-center min-w-fit'>
        <div className='flex flex-row items-center gap-x-1'>
          <OldDaimo />
          <TextFooter>Powered by Ethereum</TextFooter>
        </div>
        <LinkFooter href='https://github.com/daimo-eth/daimo'>GitHub</LinkFooter>
        <div className='flex flex-row items-center gap-x-2'>
          <Daimo />
          <TextFooter>Built by Daimo</TextFooter>
        </div>
      </div>
    </div>
  );
}
