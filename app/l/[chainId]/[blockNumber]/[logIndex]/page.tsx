import EventLogSection from '@/app/components/logs/EventLogSection';
import UnsupportedLogSection from '@/app/components/logs/UnsupportedLogSection';
import ERC20TransferSection from '@/app/components/logs/ERC20TransferSection';
import { Wiggle } from '@/app/components/shared/Wiggle';
import Image from 'next/image';

/**
 * Fetch log data from API.
 *
 * @param {string} chainId - The chain ID.
 * @param {string} blockNumber - The block number.
 * @param {string} logIndex - The log index.
 * @returns {Object} The result from API fetch.
 */
async function getLogData(chainId: string, blockNumber: string, logIndex: string) {
  // Revalidate every 10 minutes.
  const res = await fetch(
    `/api/${chainId}/${blockNumber}/${logIndex}`,
    // { next: { revalidate: 600 } },
  );
  if (!res.ok) {
    console.error('Failed to fetch log', res.status);
    return null;
  }
  return res.json();
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
  const logData = await getLogData(chainId, blockNumber, logIndex);

  return (
    <div className='flex flex-col items-center justify-center m-auto px-4'>
      <div className='flex flex-row justify-center pt-4 pb-4 sm:pt-8 sm:pb-8'>
        <Image
          width={414}
          height={214}
          src={'/assets/eth-receipts-header.png'}
          className='w-[103px] h-[53px] sm:w-[138px] sm:h-[71px]'
          alt='ETH RECEIPTS'
        />
      </div>

      <div className='rounded-[24px] flex flex-col m-auto bg-gradient-to-b from-gray1 to-[#E7E7E7] p-[1px] drop-shadow-card'>
        <div className='flex flex-col bg-white rounded-[23px]'>
          {logData.transferData ? (
            <ERC20TransferSection
              transferData={logData.transferData}
              addressProfileFrom={logData.fromAccountProfile}
              addressProfileTo={logData.toAccountProfile}
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
