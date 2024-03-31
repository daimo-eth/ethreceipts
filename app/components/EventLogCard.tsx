import { EventLog } from "../utils/types"

export default function EventLogCard(props: Readonly<{ eventLog: EventLog }>) {
    const time = new Date(Number(props.eventLog.timestamp) * 1000).toUTCString();
    
    return (
        <div className="card">
            <div className="card-header">
                EVENT LOG
            </div>
            <div className="card-body">
                <p>Block Number: {props.eventLog.blockNumber.toString()}</p>
                <p>Log Index: {props.eventLog.logIndex}</p>
                <p>Transaction Hash: {props.eventLog.transactionHash}</p>
                <p>Timestamp: {time}</p>
            </div>
        </div>
    )
}