import localFont from 'next/font/local';

export const sfPro = localFont({
  src: [
    { path: './SfPro/sf-pro-display_light.woff2', weight: '300', style: 'normal' },
    { path: './SfPro/sf-pro-display_regular.woff2', weight: '400', style: 'normal' },
    {
      path: './SfPro/sf-pro-display_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './SfPro/sf-pro-display_semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    { path: './SfPro/sf-pro-display_bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const NeueMontreal = localFont({
  src: [
    {
      path: './NeueMontreal/NeueMontreal-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './NeueMontreal/NeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './NeueMontreal/NeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './NeueMontreal/NeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});
