import { AccountName, TextMedium } from '../typography';

/** Card body for an unhandled event log. Not an ERC-20 transfer, etc. */
export default function UnsupportedLogSection() {
  return (
    <div className='px-16 pt-8 pb-8'>
      <AccountName>Unsupported log type</AccountName>
      <div className='h-4' />
      <TextMedium>Currently, ethreceipts shows ERC-20 transfers.</TextMedium>
      <div className='h-4' />
      <TextMedium>
        Want to add other logs?{' '}
        <a href='https://github.com/daimo-eth/ethreceipts'>See our Github.</a>
      </TextMedium>
    </div>
  );
}
