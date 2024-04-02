import { Address } from 'viem';
import { DaimoAccount } from '../types';
import { rpc } from '../rpc';

export async function tryGetDaimoProfile(accountAddress: Address): Promise<DaimoAccount | null> {
  const res = await rpc.getEthereumAccount.query({ accountAddress });
  const linkedAccount = res.linkedAccounts?.[0];
  console.log(linkedAccount);
  return null;
}
