import AddressBubble from '@/app/components/AddressBubble';
import ERC20Card from '@/app/components/ERC20Card';
import EventLogCard from '@/app/components/EventLogCard';

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
  const res = await fetch(`http://localhost:3000/api/${chainId}/${blockNumber}/${logIndex}`);
  if (!res.ok) {
    throw new Error('Failed to fetch log');
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
  return (
    <div className='p-20 max-w-fit m-auto'>
      <ERC20Card
        erc20TransferData={logData.erc20TransferData}
        addressProfileFrom={logData.fromAccountProfile}
        addressProfileTo={logData.toAccountProfile}
      />
      <br />
      <EventLogCard eventLogData={logData.eventLogData} />
    </div>
  );
}
