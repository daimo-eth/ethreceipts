import { db } from '@/src/db/db';
import { redirect } from 'next/navigation';
import { Hex } from 'viem';

export async function GET(_: Request, { params }: { params: { chainId: string } }) {
  const chainIdOrTxHash = params.chainId;
  const startMs = Date.now();

  // Determine if the parameter is a chainId or txHash
  const isTxHash = chainIdOrTxHash.startsWith('0x');

  let log;
  if (isTxHash) {
    // This is a transaction hash, not a chainId
    log = await db.getBestTransferByTxHash(chainIdOrTxHash as Hex);
  } else {
    // This is a path like /tx/42220 which isn't valid - redirect to home
    redirect('/');
  }

  if (log === null) redirect('/');
  else {
    console.log(`[TX] found log ${log.block_num}/${log.log_idx} in ${Date.now() - startMs}ms`);
    redirect(`/l/${log.chain_id}/${log.block_num}/${log.log_idx}`);
  }
}
