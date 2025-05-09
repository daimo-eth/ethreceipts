import { db } from '@/src/db/db';
import { SupportedChainId } from '@/app/utils/types';
import { redirect } from 'next/navigation';
import { Hex } from 'viem';

export async function GET(_: Request, { params }: { params: { chainId: string; txHash: Hex } }) {
  const txHash = params.txHash;
  const chainIdStr = params.chainId;
  const startMs = Date.now();

  // Handle case where chainId is actually a txHash (in case URL was constructed incorrectly)
  if (chainIdStr.startsWith('0x')) {
    redirect(`/tx/${chainIdStr}`);
    return;
  }

  // Parse chainId as number
  const chainId = parseInt(chainIdStr, 10);
  if (isNaN(chainId)) {
    redirect('/');
    return;
  }

  // Get the transaction data using specific chainId
  const log = await db.getBestTransferByTxHash(txHash, chainId);

  if (log === null) redirect('/');
  else {
    console.log(`[TX] found log ${log.block_num}/${log.log_idx} in ${Date.now() - startMs}ms`);

    redirect(`/l/${log.chain_id}/${log.block_num}/${log.log_idx}`);
  }
}
