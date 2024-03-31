import { EventLog } from "../utils/types"

/**
 * Represents a card component for displaying event log data.
 * 
 * @component
 * @param {Object} props - The component props.
 * @param {EventLog} props.eventLog - The event log data.
 * @returns {React.ReactElement} An event log card component.
 */
export default function EventLogCard(props: Readonly<{ eventLogData: EventLog }>) {
    // Format block finalization timestamp to UTC string.
    const time = new Date(Number(props.eventLogData.timestamp) * 1000).toUTCString();
    
    return (
        <div className="card">
            <div className="card-header">
                EVENT LOG
            </div>
            <div className="card-body">
                <p>Block Number: {props.eventLogData.blockNumber.toString()}</p>
                <p>Log Index: {props.eventLogData.logIndex}</p>
                <p>Transaction Hash: {props.eventLogData.transactionHash}</p>
                <p>Timestamp: {time}</p>
            </div>
        </div>
    )
}