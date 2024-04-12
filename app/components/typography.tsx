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
    <p className='text-[16px] leading-[19px] tracking-[-0.025em] font-light bg-gradient-to-b from-[#AAAAAA] to-[#777777] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// From and To.
export function TextHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[12px] leading-[14.5px] tracking-[2px] font-semibold bg-gradient-to-b from-[#D6D6D6] to-[#AAAAAA] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Value of transfer.
export function TextValue({ children }: { children: React.ReactNode }) {
  return (
    <p className='font-mono sm:text-[36px] text-[32px] leading-[43px] tracking-[-0.03em] font-medium bg-gradient-to-b from-[#535353] to-[#000000] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Memo of transfer.
export function TextMemo({ children }: { children: React.ReactNode }) {
  return (
    <p className='sm:text-[20px] text-[16px] leading-[23px] tracking-[-0.03em] font-light bg-gradient-to-b from-[#AAAAAA] to-[#777777] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Initial for profile bubble.
export function TextInitial({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[24px] leading-[28px] tracking-[0.5px] font-semibold bg-gradient-to-b from-[#535353] to-[#111111] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Light text.
export function TextLight({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[14px] leading-[16.8px] tracking-[-0.03em] font-light bg-gradient-to-b from-[#D6D6D6] to-[#AAAAAA] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Link for text.
export function LinkLight({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target='_blank'>
      <TextLight>{children}</TextLight>
    </a>
  );
}

// Header for Eth Receipts.
export function Header({ children }: { children: React.ReactNode }) {
  return (
    <p className='sm:text-[24px] text-[20px] leading-[28px] tracking-[2px] font-semibold bg-gradient-to-b from-[#D6D6D6] to-[#AAAAAA] bg-clip-text text-transparent'>
      {children}
    </p>
  );
}

// Text for footer.
export function TextFooter({ children }: { children: React.ReactNode }) {
  return (
    <p className='sm:text-[14px] text-[10px] leading-[16.8px] tracking-[-0.025em] font-light color-[#AAAAAA] opacity-70'>
      {children}
    </p>
  );
}

// Link for footer.
export function LinkFooter({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target='_blank'>
      <TextFooter>{children}</TextFooter>
    </a>
  );
}
