/** Typography components for Eth Receipts */

// Name of an account.
export function AccountName({ children }: { children: React.ReactNode }) {
  return (
    <p className='sm:text-[20px] text-[16px] leading=[24px] tracking-[-0.3px] font-normal text-[#000000]'>
      {children}
    </p>
  );
}

// Address of an account.
export function AccountAddress({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[16px] leading-[19px] tracking-[-0.025em] font-light text-[#777777]'>
      {children}
    </p>
  );
}

// From and To.
export function TextHeader({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[12px] leading-[14.5px] tracking-[2px] font-semibold text-[#000000] content-center'>
      {children}
    </p>
  );
}

// Value of transfer.
export function TextValue({ children }: { children: React.ReactNode }) {
  return (
    <p className='font-mono sm:text-[36px] text-[32px] leading-[36px] tracking-[-0.02em] font-medium text-[#000000]'>
      {children}
    </p>
  );
}

// Memo of transfer.
export function TextMemo({ children }: { children: React.ReactNode }) {
  return (
    <p className='sm:text-[20px] text-[16px] leading-[23px] tracking-[-0.03em] font-light text-[#777777]'>
      {children}
    </p>
  );
}

// Initial for profile bubble.
export function TextInitial({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[24px] leading-[28px] tracking-[0.5px] font-medium text-[#111111]'>
      {children}
    </p>
  );
}

// Light text.
export function TextLight({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[14px] leading-[16.8px] tracking-[-0.03em] font-light text-[#AAAAAA]'>
      {children}
    </p>
  );
}

// Success text.
export function TextSuccess({ children }: { children: React.ReactNode }) {
  return (
    <p className='text-[14px] leading-[16.8px] tracking-[-0.03em] font-medium text-[#3fb950]'>
      {children}
    </p>
  );
}

// Success text tiny.
export function TextSuccessTiny({ children }: { children: React.ReactNode }) {
  return <p className='text-[10px] font-bold text-[#3fb950]'>{children}</p>;
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
    <p className='sm:text-[24px] text-[20px] leading-[28px] tracking-[2px] font-semibold text-[#AAAAAA]'>
      {children}
    </p>
  );
}

// Text for footer.
export function TextFooter({ children }: { children: React.ReactNode }) {
  return (
    <p className='sm:text-[14px] text-[10px] leading-[16.8px] tracking-[-0.025em] font-light text-[#AAAAAA] opacity-70'>
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
