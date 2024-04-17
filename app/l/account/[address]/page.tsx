import Footer from '@/app/components/Footer';
import SearchBar from '@/app/components/minorComponents/SearchBar';
import { Header } from '@/app/components/typography';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center max-w-fit m-auto'>
      <div className='flex sm:pt-20 pt-12 sm:pb-14 pb-8'>
        <Header>ETH RECEIPT</Header>
      </div>
      <SearchBar />
      <Footer />
    </div>
  );
}
