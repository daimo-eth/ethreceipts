import { AddressProfile, Transfer, EventLog } from '../utils/types';
import AddressBubble from './AddressBubble';
import EventLogCard from './EventLog';
import {
  TextValue,
  TextHeader,
  TextMemo,
  TextSuccess,
  TextLight,
  TextSuccessTiny,
} from './typography';
import TransferArrow from './minorComponents/TransferArrow';
import { formatTimestamp, formatValue } from '../utils/formatting';
import stablecoinsAddresses from '../utils/tokens/stablecoins';
import { checkTokenWhitelist } from '../utils/tokens/tokenWhitelist';
import TokenWarning from './minorComponents/TokenWarning';
import { robotoMono } from '../layout';
import { FinalizedCheck, SuccessCircle } from '@/public/icons';
import { QRCodeSVG } from 'qrcode.react';
import { getChainExplorerByChainId } from '../utils/getExplorerURL';

function BlockStatusStamp({
  blockNumber,
  logIndex,
  chainId,
  transactionHash,
}: {
  blockNumber: number;
  logIndex: number;
  chainId: number;
  transactionHash: string;
}) {
  const explorerUrl = getChainExplorerByChainId(chainId)!;
  const transactionLink = `${explorerUrl}/tx/${transactionHash}`;

  return (
    <a
      href={transactionLink}
      target='_blank'
      className='border-[#3fb950] border-[4px] rounded-[8px] p-2 flex flex-col items-center justify-center gap-1'
    >
      <div className='flex flex-row items-center justify-center'>
        <FinalizedCheck />
        <TextSuccess>CONFIRMED</TextSuccess>
      </div>
      <div className='flex flex-row items-center justify-center'>
        <TextSuccessTiny>
          #{blockNumber} • L{logIndex}
        </TextSuccessTiny>
      </div>
    </a>
  );
}

function ShareQRCode({ blockNumber, logIndex }: { blockNumber: number; logIndex: number }) {
  const link = `https://ethreceipt.org/l/8453/${blockNumber}/${logIndex}`;

  const shareOnClick = () => {
    navigator.clipboard.writeText(link);
  };

  return <QRCodeSVG value={link} size={64} />;
}

/**
 * Represents an ERC20 Transfer card.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Transfer} props.transferData - The ERC20 transfer data.
 * @returns {React.ReactElement} An ERC20 Transfer card component.
 */
export default function TransferCard(
  props: Readonly<{
    transferData: Transfer;
    addressProfileFrom: AddressProfile;
    addressProfileTo: AddressProfile;
    eventLogData: EventLog;
    finalized: boolean;
  }>,
) {
  const value = formatValue(
    Number(props.transferData.value) / Number(10 ** Number(props.transferData.tokenDecimal)),
  );
  const link = `https://${process.env.ETH_RECEIPT_DOMAIN}/l/${props.eventLogData.chainId}/${props.eventLogData.blockNumber}/${props.eventLogData.logIndex}`;

  const memo = props.transferData.memo;

  const isStablecoin = stablecoinsAddresses.includes(props.transferData.contractAddress);
  const isWhitelistedToken = checkTokenWhitelist(
    props.transferData.contractAddress,
    props.eventLogData.chainId,
  );

  const time = new Date(Number(props.eventLogData.timestamp) * 1000);
  const formattedTs = formatTimestamp(time);

  const chain = props.eventLogData.chainName;
  const chainFormatted = chain[0].toUpperCase() + chain.slice(1);

  return (
    <div className='flex flex-col bg-white rounded-[16px] w-full m-auto drop-shadow min-w-fit'>
      <div className='flex flex-col w-full items-center p-4'>
        <div className='flex flex-col items-center justify-center w-full min-w-fit gap-y-4'>
          <div className={robotoMono.className}>
            <div className='flex flex-row flex-start gap-x-1 p-4'>
              <TextValue>{`${isStablecoin ? '$' : ''}${value} ${
                props.transferData.tokenSymbol
              }`}</TextValue>
              {!isWhitelistedToken && (
                <div className='flex py-1 px-2'>
                  <TokenWarning />
                </div>
              )}
            </div>
          </div>
          {memo && <TextMemo>{memo}</TextMemo>}
          <div className='flex flex-row gap-x-2 items-center'>
            <SuccessCircle />
            <TextSuccess>Status: Completed</TextSuccess>
          </div>
          <TextLight>
            {chainFormatted} • {formattedTs}
          </TextLight>
        </div>
      </div>

      <div className='flex flex-col width-full container border-t-2 border-dashed'>
        <div className='flex w-full flex-row justify-between py-4 p-8 border-dashed border-b-2 gap-x-24'>
          <TextHeader>FROM</TextHeader>
          <AddressBubble addressProfile={props.addressProfileFrom} />
        </div>
        <div className='flex w-full flex-row justify-between py-4 p-8 border-dashed border-b-2 gap-x-24'>
          <TextHeader>TO</TextHeader>
          <AddressBubble addressProfile={props.addressProfileTo} />
        </div>
      </div>
      <div className='flex flex-col width-full container'>
        <div className='flex w-full flex-row justify-between p-8 gap-x-24'>
          <ShareQRCode
            blockNumber={Number(props.eventLogData.blockNumber)}
            logIndex={props.eventLogData.logIndex}
          />
          <BlockStatusStamp
            blockNumber={Number(props.eventLogData.blockNumber)}
            logIndex={props.eventLogData.logIndex}
            chainId={Number(props.eventLogData.chainId)}
            transactionHash={props.eventLogData.transactionHash}
          />
        </div>
      </div>
    </div>
  );
}
