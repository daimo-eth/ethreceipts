import ERC20TransferSection from '@/app/components/logs/ERC20TransferSection';
import EventLogSection from '@/app/components/logs/EventLogSection';
import UnsupportedLogSection from '@/app/components/logs/UnsupportedLogSection';
import { Wiggle } from '@/app/components/shared/Wiggle';
import { getLogData, LogData } from '@/app/utils/getLogData';
import { createMetadataForTransfer } from '@/app/utils/linkMetaTags';
import { Metadata } from 'next';

interface LinkProps {
  params: { chainId: string; blockNumber: string; logIndex: string };
}

/**
 * Represents a log page for the log of blockNumber, index logIndex.
 *
 * @component
 * @param {Object} params - The component parameters.
 * @param {string} blockNumber - The block number.
 * @param {string} logIndex - The log index.
 * @returns {React.ReactElement} A Log page component.
 */
export default async function Page({
  params: { chainId, blockNumber, logIndex },
}: {
  params: { chainId: string; blockNumber: string; logIndex: string };
}) {
  console.log(`[LOG PAGE] chainId: ${chainId}, blockNumber: ${blockNumber}, logIndex: ${logIndex}`);
  const logData: LogData = await getLogData(chainId, blockNumber, logIndex);

  return (
    <div className='flex flex-col m-auto px-8'>
      <div className='sm:w-[640px] rounded-[24px] flex flex-col m-auto bg-gradient-to-b from-gray1 to-[#E7E7E7] p-[1px] drop-shadow-card'>
        <div className='flex flex-col bg-white rounded-[23px]'>
          {logData.transferData ? (
            <ERC20TransferSection
              transferData={logData.transferData}
              addressProfileFrom={logData.fromAddressProfile}
              addressProfileTo={logData.toAddressProfile}
              eventLogData={logData.eventLogData}
              latestFinalizedBlockNumber={logData.latestFinalizedBlockNumber}
            />
          ) : (
            <UnsupportedLogSection />
          )}
          <Wiggle />
          <EventLogSection
            eventLogData={logData.eventLogData}
            logType={logData.transferData ? 'ERC-20 Transfer' : 'Unknown'}
            finalized={logData.latestFinalizedBlockNumber >= logData.eventLogData.blockNumber}
          />
        </div>
      </div>
    </div>
  );
}

// Generate metadata for a transfer log.
export async function generateMetadata(props: LinkProps): Promise<Metadata> {
  const { chainId, blockNumber, logIndex } = props.params;
  const logData: LogData = await getLogData(chainId, blockNumber, logIndex);
  const metadata = createMetadataForTransfer(logData);
  return metadata;
}
