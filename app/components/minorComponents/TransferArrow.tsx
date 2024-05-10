import { IconArrow } from '@/public/icons';

/** Middle arrow component */
export default function TransferArrow() {
  return (
    <div
      className='flex w-12 h-12 rounded-full border border-gray1 items-center justify-center
     bg-white sm:rotate-0 rotate-90'
    >
      <IconArrow />
    </div>
  );
}
