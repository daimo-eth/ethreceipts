'use client';

import { Link } from '@/public/icons';
import { useState } from 'react';

/* Component for copying receipt link to clipboard. */
export default function CopyReceipt({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  // Copies link to clipboard.
  const copyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(link);

    // Reset after 1 second.
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className='group relative flex justify-center'>
      <button onClick={copyLink} className='px-2 py-2'>
        <Link />
      </button>
      <div className='absolute flex flex-row gap-x-[3px] bottom-8 scale-0 rounded bg-black p-2 text-xs text-white group-hover:scale-100'>
        <div className='flex'>{copied ? 'Copied!' : 'Copy'}</div>
        {!copied && <div className='flex'>link</div>}
        <div className='arrow-down' />
      </div>
    </div>
  );
}
