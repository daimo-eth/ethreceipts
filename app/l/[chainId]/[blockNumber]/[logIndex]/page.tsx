import Footer from '@/app/components/Footer';
import TransferCard from '@/app/components/TransferCard';
import { Header } from '@/app/components/typography';

// const apiUrl = process.env.ETH_RECEIPTS_DOMAIN || 'http://localhost:3000';

/**
 * Fetch log data from API.
 *
 * @param {string} chainId - The chain ID.
 * @param {string} blockNumber - The block number.
 * @param {string} logIndex - The log index.
 * @returns {Object} The result from API fetch.
 */
async function getLogData(chainId: string, blockNumber: string, logIndex: string) {
  const res = await fetch(
    `https://eth-receipts.vercel.app/api/${chainId}/${blockNumber}/${logIndex}`,
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
  const logData = await getLogData(chainId, blockNumber, logIndex);
  if (!logData) return <div>Log not found</div>;

  return (
    <div className='flex flex-col items-center justify-center max-w-fit m-auto'>
      <div className='flex sm:pt-20 pt-12 sm:pb-14 pb-8'>
        <Header>ETH RECEIPTS</Header>
      </div>
      <TransferCard
        transferData={logData.transferData}
        addressProfileFrom={logData.fromAccountProfile}
        addressProfileTo={logData.toAccountProfile}
        eventLogData={logData.eventLogData}
      />
      <Footer />
    </div>
  );
}
