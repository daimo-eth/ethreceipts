import { PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
  innerClassName?: string;
}>;

export default function Card({ children, className = '', innerClassName = '' }: CardProps) {
  return (
    <div
      className={`sm:w-[640px] rounded-[24px] flex flex-col m-auto bg-gradient-to-b from-gray1 to-[#E7E7E7] p-[1px] drop-shadow-card ${className}`}
    >
      <div className={`flex flex-col bg-white rounded-[23px] ${innerClassName}`}>{children}</div>
    </div>
  );
}
