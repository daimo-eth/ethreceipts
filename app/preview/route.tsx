import { ImageResponse } from '@vercel/og';
import { LinkPreviewImg } from '../components/image-gen/LinkPreview';
import { getLogData } from '../utils/getLogData';

export const runtime = 'edge';

// Generate link preview image.
// Note: tailwind CSS is not supported in Vercel previews.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Transfer preview parameters.
  if (
    !searchParams.has('chainId') ||
    !searchParams.has('blockNumber') ||
    !searchParams.has('logIndex')
  ) {
    throw new Error('Invalid preview parameters');
  }
  const chainId = searchParams.get('chainId')!;
  const blockNumber = searchParams.get('blockNumber')!;
  const logIndex = searchParams.get('logIndex')!;
  console.log(
    `[PREVIEW] generating preview for transfer (chainId: ${chainId}, blockNumber: ${blockNumber}, logIndex: ${logIndex})`,
  );

  const logData = await getLogData(chainId, blockNumber, logIndex);
  if (!logData) {
    console.log('Transfer log not found');
  }

  return new ImageResponse(
    (
      <LinkPreviewImg
        transferData={logData.transferData}
        addressProfileFrom={logData.fromAddressProfile}
        addressProfileTo={logData.toAddressProfile}
        eventLogData={logData.eventLogData}
        latestFinalizedBlockNumber={logData.latestFinalizedBlockNumber}
      />
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
