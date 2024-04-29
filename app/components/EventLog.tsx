import { ConfirmedCheck, FinalizedCheck, SuccessCircle } from '@/public/icons';
import { formatTimestamp, getDateDifference, truncateAddress } from '../utils/formatting';
import { EventLog, Transfer } from '../utils/types';
import { LinkLight, TextLight, TextSuccess } from './typography';
import { getChainExplorerByChainId } from '../utils/getExplorerURL';

/**
 * Represents a card component for displaying event log data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {EventLog} props.eventLog - The event log data.
 * @returns {React.ReactElement} An event log card component.
 */
export default function EventLogCard(
  props: Readonly<{ eventLogData: EventLog; transferData: Transfer; finalized: boolean }>,
) {
  const time = new Date(Number(props.eventLogData.timestamp) * 1000);
  const formattedTs = formatTimestamp(time);

  const chain = props.eventLogData.chainName;
  const chainFormatted = chain[0].toUpperCase() + chain.slice(1);

  const explorerUrl = getChainExplorerByChainId(props.eventLogData.chainId)!;
  const tokenLink = `${explorerUrl}/token/${props.transferData.contractAddress}`;
  const transactionLink = `${explorerUrl}/tx/${props.eventLogData.transactionHash}`;

  return (
    <div className='w-full flex flex-col gap-y-4 p-4 items-center'>
      <div className='flex flex-row gap-x-2 items-center'>
        <>
          <SuccessCircle />
          <TextSuccess>Completed {formattedTs} </TextSuccess>
        </>
        {/* If finalized, show "Finalized" and "Confirmed" icons. Otherwise, show "Confirmed" icon. */}
        {/* {props.finalized ? (
          <>
            <FinalizedCheck />
            <TextSuccess>Status: Finalized</TextSuccess>
          </>
        ) : (
          <>
            <ConfirmedCheck />
            <TextSuccess>Status: Confirmed</TextSuccess>
          </>
        )} */}
      </div>
      <div className='flex flex-row gap-x-2 items-center'>
        <LinkLight href={tokenLink}>{props.transferData.tokenSymbol}</LinkLight>
        <TextLight>•</TextLight>
        <LinkLight href={explorerUrl}>{chainFormatted}</LinkLight>
        <TextLight>•</TextLight>
        <TextLight>{formattedTs}</TextLight>
      </div>
    </div>
  );
}
