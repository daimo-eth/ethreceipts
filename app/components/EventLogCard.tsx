import Link from 'next/link';
import { getDateDifference } from '../utils/formatting';
import { EventLog } from '../utils/types';

/**
 * Represents a card component for displaying event log data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {EventLog} props.eventLog - The event log data.
 * @returns {React.ReactElement} An event log card component.
 */
export default function EventLogCard(props: Readonly<{ eventLogData: EventLog }>) {
  const time = new Date(Number(props.eventLogData.timestamp) * 1000);
  const dateDifferenceStr = getDateDifference(time);
  const chain = process.env.DAIMO_CHAIN || 'Ethereum';
  const chainFormatted = chain[0].toUpperCase() + chain.slice(1);

  return (
    <div className='card'>
      <div className='card-header'>EVENT LOG</div>
      <div className='card-body'>
        <p>Chain: {chainFormatted}</p>
        <p>Block: {props.eventLogData.blockNumber.toString()}</p>
        <p>Log: {props.eventLogData.logIndex}</p>
        <p>Transaction Hash: {props.eventLogData.transactionHash}</p>
        <p>Timestamp: {`${time.toUTCString()} (${dateDifferenceStr})`}</p>
        <a href={`basescan.org/tx/${props.eventLogData.transactionHash}`}> tx details </a>
      </div>
    </div>
  );
}
