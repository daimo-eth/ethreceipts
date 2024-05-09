import { IconWarning } from '@/public/icons';

export default function TokenWarning() {
  return (
    <div className='group relative flex items-center justify-center'>
      <IconWarning />
      <div className='absolute flex flex-col items-center justify-center gap-x-[3px] min-w-fit bottom-8 scale-0 rounded bg-black py-3 px-6 mb-1 text-xs text-white group-hover:scale-100 whitespace-nowrap'>
        <div className='text-center'>Warning: This may be a spam, scam, or impersonator token.</div>
        <div className='text-center'>This token is not on our list.</div>
        <div className='arrow-down' />
      </div>
    </div>
  );
}
