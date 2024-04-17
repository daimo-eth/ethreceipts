import { Warning } from '@/public/icons';

export default function TokenWarning() {
  return (
    <div className='group relative flex justify-center'>
      <Warning />
      <div className='absolute flex flex-row gap-x-[3px] min-w-[200px] bottom-8 scale-0 rounded bg-black p-2 mb-1 text-xs text-white group-hover:scale-100'>
        <div className='flex'>Not on token list. May be an spam, scam, or impersonator token.</div>
        <div className='arrow-down' />
      </div>
    </div>
  );
}
