/* TODO: MAKE THIS PRETTY */
export default function Home() {
  return (
    <div className='max-w-screen-sm px-4 m-auto'>
      <div className='px-16 pt-12 pb-16 rounded-xl bg-white border border-gray1'>
        <p className='font-medium'>Show them it&apos;s sent.</p>
        <div className='h-4' />
        <p>
          You can link to any asset ERC-20 asset transfer.{' '}
          <a className='text-gray4' href='/l/8453/12320223/94'>
            Here&apos;s an example.
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
