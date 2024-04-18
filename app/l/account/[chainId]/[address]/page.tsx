import { TransferHistoryEntry } from '@/app/api/account/[chainId]/[address]/route';
import AddressBubble from '@/app/components/AddressBubble';
import AddressBubbleRow from '@/app/components/AddressBubbleRow';
import {
  Header,
  HeaderProfileActivity,
  RowHeaderProfileActivity,
  RowTimeProfileActivity,
  RowValueProfileActivity,
} from '@/app/components/typography';
import { apiUrl } from '@/app/env';
import { formatValue, getDateDifference, truncateAddress } from '@/app/utils/formatting';
import { AddressProfile } from '@/app/utils/types';
import { USDC } from '@/public/tokens';

// Acount profile and transfer history.
type Account = {
  accountProfile: AddressProfile;
  accountTransferHistory: any[];
};

/**
 * Retrieve address profile given chainId and address.
 * @returns {AddressProfile, Transfer[]} - The address profile and transfer history.
 */
async function getAddressProfile(chainId: string, address: string): Promise<Account | null> {
  const res = await fetch(`${apiUrl}/api/account/${chainId}/${address}`);
  if (!res.ok) {
    console.error('Failed to fetch address profile');
    return null;
  }
  return res.json();
}

/** Make a table of transfers. */
// TODO: change any[]
function makeTransferTable(accountAddress: string, transfers: any[]) {
  const USDC_DECIMAL = 6; // TODO: get decimals from token
  return (
    <div className='flex flex-col w-full'>
      <div
        key={'header'}
        className='flex flex-row w-full gap-x-4 border-b-[1px] border-[#F3F3F3] px-10 py-4 justify-between items-center'
      >
        <div className='flex-2'>
          <RowHeaderProfileActivity>Account</RowHeaderProfileActivity>
        </div>
        <div className='flex-1'>
          <RowHeaderProfileActivity>Amount</RowHeaderProfileActivity>
        </div>
        <div className='flex-2'>
          <RowHeaderProfileActivity>Token</RowHeaderProfileActivity>
        </div>
        <div className='flex-1'>
          <RowHeaderProfileActivity>Time</RowHeaderProfileActivity>
        </div>
      </div>
      {transfers.toReversed().map((transfer: TransferHistoryEntry) => {
        // List out all transfers to/from this account.
        const sent = transfer.transferLog.from === accountAddress;
        const value = formatValue(
          Number(transfer.transferLog.amount) / Number(10 ** Number(USDC_DECIMAL)),
        );

        return (
          <div
            key={`${transfer.transferLog.txHash}`}
            className='flex flex-row w-full gap-x-4 border-b-[1px] border-[#F3F3F3] px-10 py-4 items-center'
          >
            <div className='flex-2'>
              <RowValueProfileActivity>
                <AddressBubbleRow addressProfile={transfer.otherAccountProfile} />
              </RowValueProfileActivity>
            </div>
            <div className='flex-1'>
              <RowValueProfileActivity>
                {sent ? `-$${value}` : `+$${value}`}
              </RowValueProfileActivity>
            </div>
            <div className='flex flex-row flex-2 gap-x-1 items-center'>
              <USDC />
              <RowValueProfileActivity>{`${value} USDC`}</RowValueProfileActivity>
            </div>
            <div className='flex-1'>
              <RowTimeProfileActivity>
                {getDateDifference(new Date(Number(transfer.transferLog.timestamp) * 1000), false)}
              </RowTimeProfileActivity>
            </div>
          </div>
        );
      })}
    </div>
  );
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

  const accountTransferHistory = addressProfile.accountTransferHistory;

  return (
    <div className='flex flex-col items-center justify-center max-w-fit m-auto'>
      <div className='flex sm:pt-20 pt-12 sm:pb-14 pb-8'>
        <Header>ETH RECEIPT</Header>
      </div>
      <div className='flex flex-col gap-y-8 w-[600px]'>
        <div
          className='rounded-[24px] flex flex-col w-full m-auto
      border-[0px] bg-gradient-to-b from-[#F3F3F3] to-[#D6D6D6] p-[1px] drop-shadow-3xl '
        >
          <div className='flex flex-col bg-white rounded-[23px] px-10 py-6'>
            <AddressBubble addressProfile={addressProfile.accountProfile} link={true} />
          </div>
        </div>

        <div
          className='rounded-[24px] flex flex-col w-full m-auto
      border-[0px] bg-gradient-to-b from-[#F3F3F3] to-[#D6D6D6] p-[1px] drop-shadow-3xl '
        >
          <div className='flex flex-col bg-white rounded-[23px] py-4'>
            <div className='flex flex-col gap-y-2 w-full border-b-[2px] border-[#F3F3F3] px-10 pb-4'>
              <HeaderProfileActivity>Recent activity</HeaderProfileActivity>
            </div>
            {makeTransferTable(
              addressProfile.accountProfile.accountAddress,
              accountTransferHistory,
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
