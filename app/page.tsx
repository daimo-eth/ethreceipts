/* TODO: MAKE THIS PRETTY */
export default function Home() {
  return (
    <div>
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div>
          The goal of Eth Receipts is to show ERC-20 transfers in a clean and extensible way. No
          information overload, no noise. Just a simple receipt.
        </div>
        <div>Go to /l/[blockNumber]/[logIndex] to see the log page for a log.</div>
      </div>
    </div>
  );
}
