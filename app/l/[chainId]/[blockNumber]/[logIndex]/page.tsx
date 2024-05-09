import LogNotFound from '@/app/components/LogNotFound';
import TransferCard from '@/app/components/TransferCard';
import Image from 'next/image';

const apiUrl = process.env.ETH_RECEIPTS_DOMAIN || 'http://localhost:3000';

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
    `${apiUrl}/api/${chainId}/${blockNumber}/${logIndex}`,
    // { next: { revalidate: 600 } },
  );
  if (!res.ok) {
    console.error('Failed to fetch log');
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
    <div className='flex flex-col items-center justify-center max-w-fit m-auto'>
      <div className='flex flex-row justify-center pt-8 pb-8 sm:pb-14'>
        <Image
          width={414}
          height={214}
          src={'/assets/eth-receipts-header.png'}
          className='w-[138px] h-[71px] sm:w-[207px] sm:h-[107px]'
          alt='ETH RECEIPTS'
        />
      </div>
      {logData ? (
        <TransferCard
          transferData={logData.transferData}
          addressProfileFrom={logData.fromAccountProfile}
          addressProfileTo={logData.toAccountProfile}
          eventLogData={logData.eventLogData}
          latestFinalizedBlockNumber={logData.latestFinalizedBlockNumber}
        />
      ) : (
        <LogNotFound />
      )}
    </div>
  );
}
