import { formatTimestamp, getDateDifference, truncateAddress } from '../utils/formatting';
import { EventLog } from '../utils/types';
import { EventField, StatusField } from './fields';
import { TextBold } from './typography';

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
  const timeFormatted = formatTimestamp(time);
  const dateDifferenceStr = getDateDifference(time);

  const chain = process.env.DAIMO_CHAIN || 'Ethereum';
  const chainFormatted = chain[0].toUpperCase() + chain.slice(1);

  const transactionHashFormatted = truncateAddress(props.eventLogData.transactionHash);

  return (
    <div className='rounded-lg flex flex-col px-10 py-6 bg-white w-full m-auto gap-y-8'>
      <TextBold>EVENT LOG</TextBold>
      <div className='w-full flex flex-row justify-between'>
        <EventField header={`${timeFormatted}`} value={`${dateDifferenceStr}`} />
        <StatusField header='SUCCESS' value='Finalized' />
      </div>
      <div className='w-full flex flex-row justify-between'>
        <EventField header={chainFormatted} value='Chain' />
        <EventField header={props.eventLogData.blockNumber.toString()} value='Block' />
        <EventField header={props.eventLogData.logIndex.toString()} value='Log' />
        <EventField
          header={transactionHashFormatted}
          value='Tx details'
          link={`https://basescan.org/tx/${props.eventLogData.transactionHash}`}
        />
      </div>
    </div>
  );
}
