'use client';

import { Link } from '@/public/icons';

export default function CopyReceipt({ link }: { link: string }) {
  const copyLink = () => navigator.clipboard.writeText(link);
  return (
    <button onClick={copyLink} className='flex cursor-pointer px-2 py-2 items-center'>
      <Link />
    </button>
  );
}
