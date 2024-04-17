import { resolveAccountForAddress } from '@/app/utils/profiles';
import { AddressProfile } from '@/app/utils/types';
import { createViemClient } from '@/app/utils/viem/client';
import { Hex } from 'viem';

/**
 * Handle GET requests to /api/account/[chainId]/[address]
 *
 * @param {Object} params - The request parameters.
 * @param {string} params.chainId - The chain ID of the desired account.
 * @param {string} params.address - The address of the desired account.
 * @returns {Object} The account profile in the form: { account: AccountProfile }.
 */
export async function GET(
  req: Request,
  { params }: { params: { chainId: string; address: string } },
) {
  const publicClient = createViemClient(params.chainId);

  const account: AddressProfile = await resolveAccountForAddress(
    params.address as Hex,
    publicClient,
  );

  return Response.json(account);
}
