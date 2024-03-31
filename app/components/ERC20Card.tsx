import { ERC20Transfer } from "../utils/types";

/* Unit of ERC20 token */
const ERC20_DECIMAL = BigInt(10**6);

export default function ERC20Card(props: Readonly<{ ERC20TransferData: ERC20Transfer }>) {
    const value = BigInt(props.ERC20TransferData.value) / ERC20_DECIMAL;
    
    return (
        <div className="card">
            <div className="card-header">
                ERC20 TRANSFER
            </div>
            <div className="card-body">
                <p>From: {props.ERC20TransferData.from}</p>
                <p>To: {props.ERC20TransferData.to}</p>
                <p>Value: {value.toString()}</p>
            </div>
        </div>
    )
}