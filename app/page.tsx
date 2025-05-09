/* TODO: MAKE THIS PRETTY */
export default function Home() {
  return (
    <div className='max-w-screen-sm px-4 m-auto'>
      <div className='px-16 pt-12 pb-16 rounded-xl bg-white border border-gray1'>
        <p className='font-medium'>Show them it&apos;s sent.</p>
        <div className='h-4' />
        <p>
          You can link to any ERC-20 asset transfer.{' '}
          <a className='text-gray4' href='/l/8453/12320223/94'>
            Here&apos;s an example.
          </a>
        </p>
        <div className='h-4' />
        <p>
          View any transaction by hash{' '}
          <a
            className='text-gray4'
            href='/tx/0x4ca7ee652a1c5241843d69f1a0357619c9e7e982e6f886df5eb5f8dda0b2d57d'
          >
            (default to Base chain)
          </a>{' '}
          or by specifying the chain{' '}
          <a
            className='text-gray4'
            href='/tx/42220/0x81d42827ba78d42865098acda7e61421aef787be53364161c2cb2e8a8bd6f5ec'
          >
            (e.g., Celo)
          </a>
        </p>
        <div className='h-4' />
        <p>
          Ethreceipts is open source and extensible.{' '}
          <a className='text-gray4' href='https://github.com/daimo-eth/ethreceipts'>
            Learn more on our Github.
          </a>
        </p>
      </div>
    </div>
  );
}
