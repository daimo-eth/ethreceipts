import { ExternalLink, FinalizedCheck } from '@/public/icons';
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
  props: Readonly<{ eventLogData: EventLog; transferData: Transfer }>,
) {
  const time = new Date(Number(props.eventLogData.timestamp) * 1000);
  const timeFormatted = formatTimestamp(time);
  const dateDifferenceStr = getDateDifference(time);

  const chain = process.env.DAIMO_CHAIN || 'Ethereum';
  const chainFormatted = chain[0].toUpperCase() + chain.slice(1);

  const tokenLink = `https://etherscan.io/token/${props.transferData.contractAddress}`;

  const explorerUrl = getChainExplorerByChainId(props.eventLogData.chainId);
  const transactionLink = `${explorerUrl}/tx/${props.eventLogData.transactionHash}`;

  return (
    <div className='w-full flex sm:flex-row flex-col sm:gap-y-0 gap-y-2 justify-between py-4 px-10'>
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
        <FinalizedCheck />
        <TextLight>Finalized</TextLight>
      </div>
    </div>
  );
}
