import { db } from '@/src/db/db';
import { redirect } from 'next/navigation';
import { Hex } from 'viem';

export async function GET(_: Request, { params }: { params: { txHash: Hex } }) {
  const txHash = params.txHash;
  const startMs = Date.now();
  // For now, just redirect to the best transfer log for the txHash.
  const log = await db.getBestTransferByTxHash(txHash);

  if (log === null) redirect('/');
  else {
    console.log(`[TX] found log ${log.block_num}/${log.log_idx} in ${Date.now() - startMs}ms`);

    redirect(`/l/${log.chain_id}/${log.block_num}/${log.log_idx}`);
  }
}
