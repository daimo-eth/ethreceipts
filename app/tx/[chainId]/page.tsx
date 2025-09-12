import ERC20TransferSection from '@/app/components/logs/ERC20TransferSection';
import EventLogSection from '@/app/components/logs/EventLogSection';
import UnsupportedLogSection from '@/app/components/logs/UnsupportedLogSection';
import { Wiggle } from '@/app/components/shared/Wiggle';
import { getLogData, LogData } from '@/app/utils/getLogData';
import { createMetadataForTransfer } from '@/app/utils/linkMetaTags';
import { db } from '@/src/db/db';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export default async function Page({ params: { chainId } }: { params: { chainId: string } }) {
  const txHashOrChainId = chainId;
  const isTxHash = txHashOrChainId.startsWith('0x');

  if (!isTxHash) {
    redirect('/');
  }

  const startMs = Date.now();
  const bestLog = await db.getBestTransferByTxHash(txHashOrChainId as `0x${string}`);
  if (bestLog === null) {
    redirect('/');
  }

  const chainIdStr = String(bestLog.chain_id);
  const blockNumberStr = String(bestLog.block_num);
  const logIndexStr = String(bestLog.log_idx);

  const logData: LogData | null = await getLogData(chainIdStr, blockNumberStr, logIndexStr);
  if (!logData) {
    redirect('/');
  }

  console.log(
    `[TX PAGE] chainId: ${chainIdStr}, blockNumber: ${blockNumberStr}, logIndex: ${logIndexStr} (resolved in ${
      Date.now() - startMs
    }ms)`,
  );

  return (
    <div className='flex flex-col m-auto px-8'>
      <div className='sm:w-[640px] rounded-[24px] flex flex-col m-auto bg-gradient-to-b from-gray1 to-[#E7E7E7] p-[1px] drop-shadow-card'>
        <div className='flex flex-col bg-white rounded-[23px]'>
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
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { chainId },
}: {
  params: { chainId: string };
}): Promise<Metadata> {
  const isTxHash = chainId.startsWith('0x');
  if (!isTxHash) return {};

  const bestLog = await db.getBestTransferByTxHash(chainId as `0x${string}`);
  if (!bestLog) return {};

  const logData: LogData | null = await getLogData(
    String(bestLog.chain_id),
    String(bestLog.block_num),
    String(bestLog.log_idx),
  );
  if (!logData) return {};
  return createMetadataForTransfer(logData);
}
