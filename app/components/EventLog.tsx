import { IconConfirmedCheck, IconExternalLink, IconFinalizedCheck } from '@/public/icons';
import { getDateDifference } from '../utils/formatting';
import { getChainExplorerByChainId } from '../utils/getExplorerURL';
import { EventLog, Transfer } from '../utils/types';
import { TextMedium, TextSmallHeader } from './typography';

/**
 * Represents a card component for displaying event log data.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {EventLog} props.eventLog - The event log data.
 * @returns {React.ReactElement} An event log card component.
 */
export default function EventLogCard(
  props: Readonly<{ eventLogData: EventLog; finalized: boolean }>,
) {
  const { timestamp, blockNumber, logIndex, chainId, transactionHash, chainName } =
    props.eventLogData;

  const time = new Date(Number(timestamp) * 1000);
  const dateDifferenceStr = getDateDifference(time);

  const chain = chainName;
  const chainFormatted = chain[0].toUpperCase() + chain.slice(1);

  const explorerUrl = getChainExplorerByChainId(chainId);
  const transactionLink = `${explorerUrl}/tx/${transactionHash}`;

  return (
    <div className='pt-8 pb-12 px-16 flex flex-col gap-8 sm:flex-row sm:justify-between'>
      <div className='flex flex-row flex-wrap gap-x-9 gap-y-6'>
        <KV k='CHAIN' v={chainFormatted} />
        <KV k='BLOCK' v={'' + blockNumber} />
        <KV k='LOG' v={'#' + logIndex} />
        <KV k='LOG TYPE' v='ERC-20 Transfer' />
      </div>
      <div className='flex flex-col gap-1 items-start sm:items-end'>
        <a href={transactionLink} target='_blank' className='flex flex-row gap-1 hover:opacity-80'>
          <TextMedium>{dateDifferenceStr}</TextMedium>
          <IconExternalLink />
        </a>
        <TxStatus finalized={props.finalized} />
      </div>
    </div>
  );
}

function KV(props: Readonly<{ k: string; v: string }>) {
  return (
    <div className='flex flex-col gap-2 pt-1'>
      <TextSmallHeader>{props.k}</TextSmallHeader>
      <TextMedium>{props.v}</TextMedium>
    </div>
  );
}

function TxStatus(props: Readonly<{ finalized: boolean }>) {
  return (
    <div className='flex flex-row gap-x-1 items-center'>
      {props.finalized ? (
        <>
          <IconFinalizedCheck />
          <TextMedium textStyle='text-positiveGreen'>Finalized</TextMedium>
        </>
      ) : (
        <>
          <IconConfirmedCheck />
          <TextMedium textStyle='text-positiveGreen'>Confirmed</TextMedium>
        </>
      )}
    </div>
  );
}
