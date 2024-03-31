import { erc20Abi } from "@/app/utils/abi";
import { publicClient } from "@/app/utils/client";
import { NextRequest } from "next/server";
import { Block, Log, decodeEventLog } from "viem";
import "@/app/utils/serialization";
import { ERC20Transfer, EventLog } from "@/app/utils/types";


/**
 * Handle GET requests to /api/[blockNumber]/[logIndex]
 * @param params Contains block number and log index for desired log.
 * @returns 
 */
export async function GET(req: NextRequest, { params }: { params: { blockNumber: string, logIndex: string} }) {
    const blockNumber = BigInt(params.blockNumber);
    const logIndex = Number(params.logIndex);
    
    // Fetch logs at block number.
    const logs: Log[] = await publicClient.getLogs({
        fromBlock: blockNumber,
        toBlock: blockNumber,
    });

    // Type Log reference: https://github.com/wevm/viem/blob/main/src/types/log.ts.
    const log: Log = logs[logIndex];

    // Ensure correct log is fetched.
    if (log.blockNumber !== blockNumber || log.logIndex !== logIndex) {
        return Response.json("Log not found", { status: 404 });
    }

    // Ensure block has been finalized.
    if (log.transactionHash === null) {
        return Response.json("Block not finalized", { status: 404 });
    }
    
    // Get the block details of the block.
    // Type Block reference: https://github.com/wevm/viem/blob/main/src/types/block.ts.
    const block: Block = await publicClient.getBlock({
        blockNumber: blockNumber
    });

    // Format event log data.
    const eventLogData: EventLog = {
        timestamp: block.timestamp,
        blockNumber: blockNumber,
        logIndex: log.logIndex,
        transactionHash: log.transactionHash,
    }    
    
    // Decode ERC20 transfer event data.
    // Reference: https://viem.sh/docs/contract/decodeEventLog.html.
    const ERC20EventLogData = decodeEventLog({
        abi: erc20Abi,
        data: log.data,
        topics: log.topics,
    });

    // Ensure log is an ERC20 transfer event.
    if (ERC20EventLogData.eventName !== 'Transfer') {
        return Response.json("Log not an ERC20 transfer event", { status: 404 });
    }

    // Format ERC20 transfer event data.
    const ERC20TransferData: ERC20Transfer = {
        from: ERC20EventLogData.args.from,
        to: ERC20EventLogData.args.to,
        value: ERC20EventLogData.args.value
    }

    return Response.json({ERC20TransferData: ERC20TransferData, eventLogData: eventLogData});
}