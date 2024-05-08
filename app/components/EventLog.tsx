import { ConfirmedCheck, ExternalLink, FinalizedCheck } from '@/public/icons';
import { formatTimestamp, getDateDifference, truncateAddress } from '../utils/formatting';
import { EventLog, Transfer } from '../utils/types';
import { LinkLight, TextLight } from './typography';
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
  const dateDifferenceStr = getDateDifference(time);

  const chain = props.eventLogData.chainName;
  const chainFormatted = chain[0].toUpperCase() + chain.slice(1);

  const explorerUrl = getChainExplorerByChainId(props.eventLogData.chainId);
  const tokenLink = `${explorerUrl}/token/${props.transferData.contractAddress}`;
  const transactionLink = `${explorerUrl}/tx/${props.eventLogData.transactionHash}`;

  const { blockNumber, logIndex } = props.eventLogData;

  return (
    <div className='w-full py-4 px-10 flex flex-col gap-1'>
      <div className='flex sm:flex-row flex-col sm:gap-y-0 gap-y-2 justify-between'>
        <div className='flex flex-row gap-x-1 items-center'>
          <LinkLight href={tokenLink}>{props.transferData.tokenSymbol}</LinkLight>
          <TextLight>•</TextLight>
          <TextLight>{chainFormatted}</TextLight>
          <TextLight>•</TextLight>
          <TextLight>{dateDifferenceStr}</TextLight>
          <a href={transactionLink} target='_blank'>
            <ExternalLink />
          </a>
        </div>
        <div className='flex flex-row gap-x-1 items-center'>
          {/* If finalized, show "Finalized" and "Confirmed" icons. Otherwise, show "Confirmed" icon. */}
          {props.finalized ? (
            <>
              <FinalizedCheck />
              <TextLight>Finalized</TextLight>
            </>
          ) : (
            <>
              <ConfirmedCheck />
              <TextLight>Confirmed</TextLight>
            </>
          )}
        </div>
      </div>
      <div className='flex flex-row gap-x-1 items-center'>
        <TextLight>Block #{Number(blockNumber)}</TextLight>
        <TextLight>•</TextLight>
        <TextLight>Log {logIndex}</TextLight>
        <TextLight>•</TextLight>
        <TextLight>ERC-20 Transfer</TextLight>
      </div>
    </div>
  );
}
