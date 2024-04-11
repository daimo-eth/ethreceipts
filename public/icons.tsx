import { AccountTypeStr } from '@/app/utils/types';
import { ensLink } from './ensLink';

export function ExternalLink() {
  return (
    <svg
      width='16px'
      height='16px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stopColor='#D6D6D6' />
          <stop offset='100%' stopColor='#AAAAAA' />
        </linearGradient>
      </defs>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='Interface / External_Link'>
        <path
          id='Vector'
          d='M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11'
          stroke='url(#gradient)' // Apply the gradient here
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </g>
    </svg>
  );
}

export function FinalizedCheck() {
  return (
    <svg
      width='20px'
      height='20px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
          <stop offset='0%' stopColor='#D3D3D3' />
          <stop offset='100%' stopColor='#AAAAAA' />
        </linearGradient>
      </defs>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          d='M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14'
          stroke='url(#gradient)'
          strokeWidth='1.5'
          strokeLinecap='round'
        ></path>
        <path
          d='M16 7L12 11'
          stroke='url(#gradient)'
          strokeWidth='1.5'
          strokeLinecap='round'
        ></path>
        <path
          d='M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7'
          stroke='url(#gradient)'
          strokeWidth='1.5'
          strokeLinecap='round'
        ></path>
      </g>
    </svg>
  );
}

export function Arrow() {
  return (
    <svg
      width='20px'
      height='20px'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <defs>
        <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='100%'>
          <stop offset='0%' stopColor='#D3D3D3' />
          <stop offset='100%' stopColor='#AAAAAA' />
        </linearGradient>
      </defs>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        <path
          d='M4 12H20M20 12L16 8M20 12L16 16'
          stroke='url(#gradient)'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></path>
      </g>
    </svg>
  );
}
export function Daimo() {
  return (
    <div style={{ opacity: 0.3 }}>
      <svg width='17' height='17' viewBox='0 0 17 17' fill='none'>
        <path
          d='M13.5995 8.49979L13.5995 8.4998H13.5994L13.5995 8.49979Z'
          fill='url(#paint0_linear_1_83)'
          fillOpacity='0.4'
        />
        <path
          d='M14.4494 9.97299L12.7495 7.02661M15.2993 8.4998H11.8996M14.4494 7.02661L13.5994 8.4998L12.7495 9.97299'
          stroke='url(#paint1_linear_1_83)'
          strokeWidth='1.0736'
          strokeLinecap='round'
        />
        <path
          d='M1.81333 0C0.811857 0 0 0.811857 0 1.81333V15.1867C0 16.1881 0.811857 17 1.81333 17H14.28C15.7822 17 17 15.7822 17 14.28V11.985C17 11.7346 16.797 11.5317 16.5467 11.5317H11.4467C10.4452 11.5317 9.63333 10.7198 9.63333 9.71833V7.28167C9.63333 6.28019 10.4452 5.46833 11.4467 5.46833H16.5467C16.797 5.46833 17 5.26537 17 5.015V2.72C17 1.21779 15.7822 0 14.28 0H1.81333Z'
          fill='url(#paint2_linear_1_83)'
          fillOpacity='0.7'
        />
        <defs>
          <linearGradient
            id='paint0_linear_1_83'
            x1='13.5995'
            y1='7.02661'
            x2='13.5995'
            y2='9.97299'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='white' />
            <stop offset='1' stopColor='#F3F3F3' />
          </linearGradient>
          <linearGradient
            id='paint1_linear_1_83'
            x1='13.5995'
            y1='7.02661'
            x2='13.5995'
            y2='9.97299'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#535353' />
            <stop offset='1' stopColor='#323232' />
          </linearGradient>
          <linearGradient
            id='paint2_linear_1_83'
            x1='8.5'
            y1='0'
            x2='8.5'
            y2='17'
            gradientUnits='userSpaceOnUse'
          >
            <stop offset='1' stopColor='#111111' />
            <stop stopColor='#111111' />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function OldDaimo() {
  return (
    <img
      width='20px'
      height='20px'
      src='https://s3-alpha-sig.figma.com/img/6601/97e9/bb28526f284ef81327be6ed4c82143c0?Expires=1713744000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jlI1qqfXYlX53ZTaFzwjqc5kHHFOoRN5J5~rWSmns~hKTFT4vtA1xUMw0CcbrIFPXDKk0OpQycWKKqFq5Ow4ofH99cjenFWCouc9kb2Ou31rBhss8KQ6YPkbu-mg8VF6vOfHm7sRkZdNEdjCzavCjxvTeczxHl4w-KLv4nB4WWZT7Tmox77S39FyC74Hv-8t5cqiWGBBX9yU8Gr2FR9OTX-QV0rElv7iOCmDiPqfRZUeS-FwXAUzfNhGc1lYRNZ5cBNT8bxcHZkc5sJtKvs50dr8dwnEsX78UiasIsLV7GJwvvZQAwVZ09iMmyNkExqdMW9jdgkmQ6xg4IWkaa0eqA__'
      alt='daimo'
    />
  );
}

export function ENS() {
  return (
    <svg
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <rect width='16' height='16' fill='url(#pattern0_1_265)' />
      <defs>
        <pattern id='pattern0_1_265' patternContentUnits='objectBoundingBox' width='1' height='1'>
          <use xlinkHref='#image0_1_265' transform='scale(0.000449236)' />
        </pattern>
        <image id='image0_1_265' width='2226' height='2226' xlinkHref={ensLink} />
      </defs>
    </svg>
  );
}

export function AccountIcon({ accountType }: { accountType: AccountTypeStr }) {
  switch (accountType) {
    case AccountTypeStr.DAIMO:
      return <Daimo />;
    case AccountTypeStr.ENS:
      return <ENS />;
    default:
      return <></>;
  }
}
