import { AddressProfile, ERC20Transfer } from '../utils/types';
import AddressBubble from './AddressBubble';

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
    <div className='card'>
      <div className='card-header'>ERC20 TRANSFER</div>
      <div className='card-body'>
        <p>From: </p>
        <AddressBubble addressProfile={props.addressProfileFrom} />
        <br />
        <p>To:</p>
        <AddressBubble addressProfile={props.addressProfileTo} />
        <br />
        <p>Value: {value.toString()}</p>
      </div>
    </div>
  );
}
