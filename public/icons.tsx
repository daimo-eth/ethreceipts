import Image from 'next/image';
import { useMemo } from 'react';

export function IconExternalLink() {
  return (
    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M13 5V1M13 1H9M13 1L7.66667 6.33333M5.66667 2.33333H4.2C3.07989 2.33333 2.51984 2.33333 2.09202 2.55132C1.71569 2.74307 1.40973 3.04903 1.21799 3.42535C1 3.85317 1 4.41323 1 5.53333V9.8C1 10.9201 1 11.4801 1.21799 11.908C1.40973 12.2843 1.71569 12.5903 2.09202 12.782C2.51984 13 3.07989 13 4.2 13H8.46667C9.5868 13 10.1468 13 10.5747 12.782C10.951 12.5903 11.2569 12.2843 11.4487 11.908C11.6667 11.4801 11.6667 10.9201 11.6667 9.8V8.33333'
        stroke='#777777'
        strokeWidth='1.33333'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function IconFinalizedCheck() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M18.3333 6L10.1667 14.1667L8 12'
        stroke='#0CA01B'
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.3333 6L5.16667 14.1667L2 11'
        stroke='#0CA01B'
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function IconConfirmedCheck() {
  return (
    <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M16.3333 6L8.16667 14.1667L5 11'
        stroke='#0CA01B'
        strokeWidth='1.66667'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export function IconArrow() {
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

export function IconEthLogo() {
  return (
    <Image
      width={20}
      height={20}
      src='data:image/png;base64,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'
      alt='Etheruem'
      style={useMemo(() => ({ opacity: 0.6 }), [])}
    />
  );
}

export function IconLink() {
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

export function IconWarning() {
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
