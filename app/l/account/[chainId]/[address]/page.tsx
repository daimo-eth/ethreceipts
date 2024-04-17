import AddressBubble from '@/app/components/AddressBubble';
import { Header } from '@/app/components/typography';
import { apiUrl } from '@/app/env';
import { AddressProfile } from '@/app/utils/types';

// Acount profile and transfer history.
type Account = {
  accountProfile: AddressProfile;
  accountTransferHistory: any[];
};

/** Retrieve address profile given chainId and address. */
async function getAddressProfile(chainId: string, address: string): Promise<Account | null> {
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
  const addressProfile: Account | null = await getAddressProfile(params.chainId, params.address);
  if (!addressProfile) return null;

  return (
    <div className='flex flex-col items-center justify-center max-w-fit m-auto'>
      <div className='flex sm:pt-20 pt-12 sm:pb-14 pb-8'>
        <Header>ETH RECEIPT</Header>
      </div>
      <div
        className='rounded-[24px] flex flex-col w-full m-auto
      border-[0px] bg-gradient-to-b from-[#F3F3F3] to-[#D6D6D6] p-[1px] drop-shadow-3xl min-w-[600px]'
      >
        <div className='flex flex-col bg-white rounded-[23px] px-10 py-6'>
          <AddressBubble addressProfile={addressProfile.accountProfile} />
        </div>
      </div>
    </div>
  );
}
