export function Daimo({ width = '16', height = '16' }: { width?: string; height?: string }) {
  return (
    <div style={{ opacity: 0.3 }}>
      <svg width={width} height={height} viewBox='0 0 17 17' fill='none'>
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
