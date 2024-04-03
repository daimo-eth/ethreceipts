import { AddressProfile, ERC20Transfer } from '../utils/types';
import AddressBubble from './AddressBubble';
import { TextBold } from './typography';

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
  const value = BigInt(props.erc20TransferData.value) / ERC20_DECIMAL;

  return (
    <div className='rounded-md flex-auto p-16'>
      <div className='card-header'>ERC20 TRANSFER</div>
      <div className='flex flex-row'>
        <div className='w-fit'>
          <TextBold>From: </TextBold>
        </div>
        <div className='w-fit'>
          <AddressBubble addressProfile={props.addressProfileFrom} />
        </div>
      </div>
      <br />
      <p>To:</p>
      <AddressBubble addressProfile={props.addressProfileTo} />
      <br />
      <p>Value: {value.toString()}</p>
    </div>
  );
}
