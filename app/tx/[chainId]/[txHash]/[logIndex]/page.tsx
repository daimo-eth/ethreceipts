import ERC20TransferSection from '@/app/components/logs/ERC20TransferSection';
import EventLogSection from '@/app/components/logs/EventLogSection';
import UnsupportedLogSection from '@/app/components/logs/UnsupportedLogSection';
import { Wiggle } from '@/app/components/shared/Wiggle';
import Card from '@/app/components/shared/Card';
import { getLogData, LogData } from '@/app/utils/getLogData';
import { createMetadataForTransfer } from '@/app/utils/linkMetaTags';
import { getViemClient } from '@/app/utils/viem/client';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Hex } from 'viem';

export default async function Page({
  params: { chainId, txHash, logIndex },
}: {
  params: { chainId: string; txHash: Hex; logIndex: string };
}) {
  const parsedChainId = parseInt(chainId, 10);
  const parsedLogIndex = parseInt(logIndex, 10);
  if (isNaN(parsedChainId) || isNaN(parsedLogIndex)) {
    redirect('/');
  }

  const client = getViemClient(parsedChainId);
  const receipt = await client.getTransactionReceipt({ hash: txHash });
  if (!receipt) {
    redirect('/');
  }

  const targetLog = receipt.logs.find((l) => l.logIndex === parsedLogIndex);
  if (!targetLog) {
    redirect('/');
  }

  const chainIdStr = String(parsedChainId);
  const blockNumberStr = String(receipt.blockNumber);
  const logIndexStr = String(parsedLogIndex);

  const logData: LogData | null = await getLogData(chainIdStr, blockNumberStr, logIndexStr);
  if (!logData) {
    redirect('/');
  }

  return (
    <div className='flex flex-col m-auto px-8'>
      <Card>
        {logData.transferData ? (
          <ERC20TransferSection
            transferData={logData.transferData}
            addressProfileFrom={logData.fromAddressProfile}
            addressProfileTo={logData.toAddressProfile}
            eventLogData={logData.eventLogData}
            latestFinalizedBlockNumber={logData.latestFinalizedBlockNumber}
            context='tx'
          />
        ) : (
          <UnsupportedLogSection />
        )}
        <Wiggle />
        <EventLogSection
          eventLogData={logData.eventLogData}
          logType={logData.transferData ? 'ERC-20 Transfer' : 'Unknown'}
          finalized={logData.latestFinalizedBlockNumber >= logData.eventLogData.blockNumber}
          context='tx'
        />
      </Card>
    </div>
  );
}

export async function generateMetadata({
  params: { chainId, txHash, logIndex },
}: {
  params: { chainId: string; txHash: Hex; logIndex: string };
}): Promise<Metadata> {
  const parsedChainId = parseInt(chainId, 10);
  const parsedLogIndex = parseInt(logIndex, 10);
  if (isNaN(parsedChainId) || isNaN(parsedLogIndex)) return {};

  const client = getViemClient(parsedChainId);
  const receipt = await client.getTransactionReceipt({ hash: txHash });
  if (!receipt) return {};

  const targetLog = receipt.logs.find((l) => l.logIndex === parsedLogIndex);
  if (!targetLog) return {};

  const logData: LogData | null = await getLogData(
    String(parsedChainId),
    String(receipt.blockNumber),
    String(parsedLogIndex),
  );
  if (!logData) return {};
  return createMetadataForTransfer(logData);
}
