import ERC20Card from "@/app/components/ERC20Card";
import EventLogCard from "@/app/components/EventLogCard";

/**
 * Fetch log data from API.
 * 
 * @param {string} blockNumber - The block number.
 * @param {string} logIndex - The log index.
 * @returns {Object} The result from API fetch.
 */
async function getLogData(blockNumber: string, logIndex: string) {
    const res = await fetch(`${process.env.HOST_URL}/api/${blockNumber}/${logIndex}`, {cache: 'force-cache'});
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
export default async function Page({ params: {blockNumber, logIndex} }: { params: { blockNumber: string, logIndex: string} }) {
    const logData = await getLogData(blockNumber, logIndex);
    return (
        <div>
            <ERC20Card ERC20TransferData={logData.ERC20TransferData} />
            <br />
            <EventLogCard eventLogData={logData.eventLogData} />
        </div>
    )
}