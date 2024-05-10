/** Typography components for Eth Receipts */

// Name of an account.
export function AccountName({ children }: { children: React.ReactNode }) {
  return (
    <p className='sm:text-[20px] text-[16px] leading=[24px] tracking-[-0.3px] font-normal bg-gradient-to-b from-[#323232] to-[#000000] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Address of an account.
export function AccountAddress({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[16px] leading-[19px] tracking-[-0.025em] font-light bg-gradient-to-b from-gray3 to-gray4 bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// From and To.
export function TextHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[12px] leading-[14.5px] tracking-[2px] font-semibold text-transparen text-gray4'>
      {children}
    </p>
  );
}

// Value of transfer.
export function TextValue({ children }: { children: React.ReactNode }) {
  return (
    <p className='font-mono sm:text-[36px] text-[32px] leading-[36px] tracking-[-0.02em] font-medium bg-gradient-to-b from-gray5 to-[#000000] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Memo of transfer.
export function TextMemo({ children }: { children: React.ReactNode }) {
  return (
    <p className='sm:text-[20px] text-[16px] leading-[23px] tracking-[-0.03em] font-light bg-gradient-to-b from-gray3 to-gray4 bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Initial for profile bubble.
export function TextInitial({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[24px] leading-[28px] tracking-[0.5px] font-medium bg-gradient-to-b from-gray5 to-[#111111] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Light text.
export function TextMedium({
  textStyle,
  children,
}: {
  textStyle?: string;
  children: React.ReactNode;
}) {
  if (textStyle == null) textStyle = 'text-gray4';
  return (
    <p className={`text-[14px] leading-[16.8px] tracking-[-0.03em] font-medium ${textStyle}`}>
      {children}
    </p>
  );
}

// Small, bold header.
export function TextSmallHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[10px] leading-none tracking-widest font-bold text-gray3'>{children}</p>
  );
}

// Text for footer.
export function TextFooter({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[12px] leading-[16px] tracking-[-0.025em] font-light text-gray4 sm:text-[14px]'>
      {children}
    </p>
  );
}
