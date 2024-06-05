import { Metadata } from 'next';
import { getChainExplorerByChainId } from './getExplorerURL';
import stablecoinsAddresses from './tokens/stablecoins';
import { getAbsoluteUrl } from './getAbsoluteUrl';
import { formatValue, truncateAddress } from './formatting';
import { LogData } from './getLogData';

// Creates a metadata object for a transfer log.
export function createMetadataForTransfer(logData: LogData): Metadata {
  const {
    transferData,
    fromAddressProfile,
    toAddressProfile,
    eventLogData,
    latestFinalizedBlockNumber,
  } = logData;

  // Create title
  const title = `Eth Receipts Transaction Receipt`;

  // Create description
  const sender =
    fromAddressProfile.account?.name || truncateAddress(fromAddressProfile.accountAddress);
  const receiver =
    toAddressProfile.account?.name || truncateAddress(toAddressProfile.accountAddress);

  const chainName = getChainExplorerByChainId(eventLogData.chainId) ?? eventLogData.chainId;
  const status = latestFinalizedBlockNumber >= eventLogData?.blockNumber ? 'Finalized' : 'Pending';

  const { tokenSymbol, tokenDecimal, value: tokenValue } = transferData;
  const value = formatValue(Number(tokenValue) / Number(10 ** Number(tokenDecimal)));
  const isStablecoin = stablecoinsAddresses.includes(transferData.contractAddress);
  const amountStr = `${isStablecoin ? '$' : ''}${value}`;

  const description = `${sender} sent ${amountStr} ${tokenSymbol} to ${receiver} on ${chainName}.`;

  // Create preview URL
  const previewUrl = getPreviewURL(
    eventLogData.chainId.toString() ?? undefined,
    eventLogData.blockNumber.toString() ?? undefined,
    eventLogData.logIndex.toString() ?? undefined,
  );

  // Create metadata
  const metadata = createMetadata(title, description, previewUrl);
  return metadata;
}

// Creates a metadata object.
function createMetadata(title: string, description: string, previewUrl: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: title,
      images: [
        {
          url: previewUrl,
          alt: 'Eth Receipts',
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
  };
}

// Generates an OpenGraph preview link image URL.
// Also generates dynamically generated image preview (see preview/route.tsx).
function getPreviewURL(
  chainId: string | undefined,
  blockNumber: string | undefined,
  logIndex: string | undefined,
) {
  if (!chainId) {
    return `${getAbsoluteUrl('/assets/eth-receipts-header.png')}`;
  }

  let previewUrl = `/preview?chainId=${chainId}`;
  if (blockNumber) {
    previewUrl += `&blockNumber=${blockNumber}`;
  }
  if (logIndex) {
    previewUrl += `&logIndex=${logIndex}`;
  }
  return `${getAbsoluteUrl(previewUrl)}`;
}
