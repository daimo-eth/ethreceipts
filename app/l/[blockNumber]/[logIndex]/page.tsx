import ERC20Card from "@/app/components/ERC20Card";
import EventLogCard from "@/app/components/EventLogCard";

/* Fetch log data from API */
const BASE_API = 'http://localhost:3000';
async function getLogData(blockNumber: string, logIndex: string) {
    const res = await fetch(`${BASE_API}/api/${blockNumber}/${logIndex}`, {cache: 'force-cache'});
    if (!res.ok) {
        throw new Error('Failed to fetch log');
    }
    return res.json();
}

export default async function Page({ params: {blockNumber, logIndex} }: { params: { blockNumber: string, logIndex: string} }) {
    const logData = await getLogData(blockNumber, logIndex);
    return (
        <div>
            <ERC20Card ERC20TransferData={logData.ERC20TransferData} />
            <br />
            <EventLogCard eventLog={logData.eventLogData} />
        </div>
    )
}