import Link from 'next/link';
import { HTMLAttributeAnchorTarget } from 'react';

export function TextH1({ children }: { children: React.ReactNode }) {
  return <h1 className='text-[1.75rem] font-semibold text-midnight leading-none'>{children}</h1>;
}

export function TextH3({ children }: { children: React.ReactNode }) {
  return <h3 className='text-[1.5rem] font-semibold text-midnight leading-none'>{children}</h3>;
}

export function LinkLightSmall({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target='_blank'>
      <TextLightSmall>{children}</TextLightSmall>
    </a>
  );
}

export function TextSemiBold({ children }: { children: React.ReactNode }) {
  return <p className='text-[16px] leading-[20.8px] font-semibold'>{children}</p>;
}

export function TextMedium({ children }: { children: React.ReactNode }) {
  return <p className='text-base leading-[20.8px] font-medium'>{children}</p>;
}

export function TextMediumLarge({ children }: { children: React.ReactNode }) {
  return <p className='text-2xl leading-[20.8px] font-medium'>{children}</p>;
}

export function TextMediumGreen({ children }: { children: React.ReactNode }) {
  return <p className='text-base leading-[20.8px] font-medium text-green-500'>{children}</p>;
}

export function TextBold({ children }: { children: React.ReactNode }) {
  return <p className='text-base tracking-none leading-[20.8px] font-bold'>{children}</p>;
}

export function TextError({ children }: { children: React.ReactNode }) {
  return <p className='text-base font-semibold text-danger'>{children}</p>;
}

export function TextLight({ children }: { children: React.ReactNode }) {
  return <p className='text-sm leading-[20.8px]  text-light-gray'>{children}</p>;
}

export function TextLightMedium({ children }: { children: React.ReactNode }) {
  return <p className='text-sm leading-[20.8px] text-light-gray font-medium'>{children}</p>;
}

export function TextLightSmall({ children }: { children: React.ReactNode }) {
  return <p className='text-xs leading-[20.8px] text-light-gray'>{children}</p>;
}

export function TextHeader({ children }: { children: React.ReactNode }) {
  return <p className='text-lg leading-[20.8px] font-semibold text-midnight'>{children}</p>;
}
