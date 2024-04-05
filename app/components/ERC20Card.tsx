import { truncateAddress } from '../utils/formatting';
import { AddressProfile, ERC20Transfer } from '../utils/types';
import AddressBubble from './AddressBubble';
import { TextBold, TextHeader, TextLightSmall, TextMediumLarge } from './typography';

/* Unit of ERC20 token */
const ERC20_DECIMAL = BigInt(10 ** 6);

/**
 * Represents an ERC20 Transfer card.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {ERC20Transfer} props.ERC20TransferData - The ERC20 transfer data.
 * @returns {React.ReactElement} An ERC20 Transfer card component.
 */
export default function ERC20Card(
  props: Readonly<{
    erc20TransferData: ERC20Transfer;
    addressProfileFrom: AddressProfile;
    addressProfileTo: AddressProfile;
  }>,
) {
  const value = Number(BigInt(props.erc20TransferData.value) / ERC20_DECIMAL).toFixed(2);
  const contractAddress = truncateAddress(props.erc20TransferData.contractAddress, 4);

  return (
    <div className='rounded-lg flex flex-col px-10 py-6 bg-white w-full m-auto gap-y-6'>
      <TextBold>ERC20 TRANSFER</TextBold>
      <div className='flex flex-row gap-x-10 mt-2'>
        <div className='w-fit min-w-24'>
          <TextHeader>From: </TextHeader>
        </div>
        <div className='w-fit'>
          <AddressBubble addressProfile={props.addressProfileFrom} />
        </div>
      </div>
      <div className='flex flex-row gap-x-10'>
        <div className='w-fit min-w-24'>
          <TextHeader>To: </TextHeader>
        </div>
        <div className='w-fit'>
          <AddressBubble addressProfile={props.addressProfileTo} />
        </div>
      </div>
      <div className='flex flex-row gap-x-10 mt-6'>
        <div className='w-fit min-w-24'>
          <TextHeader>Amount: </TextHeader>
        </div>
        <div className='flex flex-col ml-16 gap-y-1'>
          <TextMediumLarge>{`$${value.toString()} USDC`}</TextMediumLarge>
          <TextLightSmall>{`Native USDC ${contractAddress}`}</TextLightSmall>
        </div>
      </div>
    </div>
  );
}
