import { Arrow } from '@/public/icons';

/** Middle arrow component */
export default function TransferArrow() {
  return (
    <div
      className='flex w-[64px] h-16 rounded-[50%] border-[1px] border-[#F3F3F3] items-center justify-center
    drop-shadow-[0px_4px_8px_rgb(243,243,243)] bg-white rotate-90'
    >
      <Arrow />
    </div>
  );
}
