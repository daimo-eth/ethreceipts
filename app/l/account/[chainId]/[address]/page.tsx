import AddressBubble from '@/app/components/AddressBubble';
import Footer from '@/app/components/Footer';
import { Header } from '@/app/components/typography';
import { apiUrl } from '@/app/env';
import { AddressProfile } from '@/app/utils/types';

/** Retrieve address profile given chainId and address. */
async function getAddressProfile(chainId: string, address: string): Promise<AddressProfile | null> {
  const res = await fetch(`${apiUrl}/api/account/${chainId}/${address}`);
  if (!res.ok) {
    console.error('Failed to fetch address profile');
    return null;
  }
  return res.json();
}

/**
 * Represents an account page for the account of blockNumber, index logIndex.
 *
 * @component
 * @param {Object} params - The component parameters.
 * @param {string} params.chainId - The chain ID.
 * @param {string} params.address - The address of desired account.
 * @returns {React.ReactElement} An account page component.
 */
export default async function Page({ params }: { params: { chainId: string; address: string } }) {
  const addressProfile: AddressProfile | null = await getAddressProfile(
    params.chainId,
    params.address,
  );
  if (!addressProfile) return null;

  return (
    <div className='flex flex-col items-center justify-center max-w-fit m-auto'>
      <div className='flex sm:pt-20 pt-12 sm:pb-14 pb-8'>
        <Header>ETH RECEIPT</Header>
      </div>
      <AddressBubble addressProfile={addressProfile} />
    </div>
  );
}
