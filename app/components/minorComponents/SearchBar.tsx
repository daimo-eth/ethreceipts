import { Search } from '@/public/icons';

export default function SearchBar() {
  return (
    <div className='flex flex-row items-center gap-x-2 px-10 py-4'>
      <input
        type='text'
        placeholder='Search by address'
        className='flex-1 border-[1px] border-[#F3F3F3] rounded-[36px] px-8 w-[700px] h-[64px] drop-shadow-3xl text-[20px] leading-[24px] font-light tracking-[-0.025em]'
      />
      <div className='-ml-14'>
        <Search />
      </div>
    </div>
  );
}
