import Image from 'next/image';

export function FinalizedCheck() {
  return (
    <svg width='22' height='16' viewBox='0 0 22 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M18.667 4L11.3337 11.3333L8.66699 8.66667'
        stroke='#3fb950'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.3332 4L5.99984 11.3333L2.6665 8'
        stroke='#3fb950'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function ConfirmedCheck() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M20 6L9 17L5 13'
        stroke='#3fb950'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function SuccessCircle() {
  return (
    <svg height='24' viewBox='0 0 24 24' version='1.1' width='24' data-view-component='true'>
      <path
        d='M1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12Zm16.28-2.72a.751.751 0 0 0-.018-1.042.751.751 0 0 0-1.042-.018l-5.97 5.97-2.47-2.47a.751.751 0 0 0-1.042.018.751.751 0 0 0-.018 1.042l3 3a.75.75 0 0 0 1.06 0Z'
        fill='#3fb950'
      />
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

export function OldDaimo() {
  return <Image src='/assets/eth-logo.png' width='20' height='20' alt='daimo' />;
}

export function Link() {
  return (
    <svg
      width='13.5px'
      height='13.5px'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_1_188)'>
        <path
          d='M6.66668 8.66666C6.95295 9.04939 7.31822 9.36606 7.73768 9.59526C8.15715 9.82446 8.62102 9.96073 9.09775 9.99486C9.57455 10.029 10.0531 9.96019 10.5009 9.79313C10.9488 9.62613 11.3554 9.36466 11.6934 9.02666L13.6934 7.02666C14.3006 6.39796 14.6365 5.55595 14.6289 4.68197C14.6213 3.80798 14.2707 2.97193 13.6527 2.35391C13.0347 1.73588 12.1987 1.38532 11.3247 1.37773C10.4507 1.37013 9.60868 1.70611 8.98002 2.31331L7.83335 3.45331M9.33335 7.33333C9.04702 6.95053 8.68175 6.63385 8.26228 6.40468C7.84282 6.17551 7.37902 6.03923 6.90222 6.00508C6.42548 5.97093 5.94695 6.03973 5.49911 6.20678C5.05127 6.37384 4.6446 6.63526 4.30668 6.97333L2.30668 8.97333C1.69948 9.60199 1.3635 10.444 1.3711 11.318C1.37869 12.192 1.72925 13.028 2.34728 13.6461C2.9653 14.2641 3.80135 14.6146 4.67534 14.6222C5.54932 14.6298 6.39133 14.2939 7.02002 13.6867L8.16002 12.5467'
          stroke='#535353'
          strokeWidth='1.33333'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
      <defs>
        <clipPath id='clip0_1_188'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
}

export function Warning() {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.9998 8.99999V13M11.9998 17H12.0098M10.6151 3.89171L2.39019 18.0983C1.93398 18.8863 1.70588 19.2803 1.73959 19.6037C1.769 19.8857 1.91677 20.142 2.14613 20.3088C2.40908 20.5 2.86435 20.5 3.77487 20.5H20.2246C21.1352 20.5 21.5904 20.5 21.8534 20.3088C22.0827 20.142 22.2305 19.8857 22.2599 19.6037C22.2936 19.2803 22.0655 18.8863 21.6093 18.0983L13.3844 3.89171C12.9299 3.10654 12.7026 2.71396 12.4061 2.58211C12.1474 2.4671 11.8521 2.4671 11.5935 2.58211C11.2969 2.71396 11.0696 3.10655 10.6151 3.89171Z'
        stroke='#DB5A11'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
