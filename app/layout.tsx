import './globals.css';
import localFont from 'next/font/local';

const sfPro = localFont({
  src: [
    { path: '../public/fonts/sfPro/sf-pro-display_light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/sfPro/sf-pro-display_regular.woff2', weight: '400', style: 'normal' },
    {
      path: '../public/fonts/sfPro/sf-pro-display_medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/sfPro/sf-pro-display_semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    { path: '../public/fonts/sfPro/sf-pro-display_bold.woff2', weight: '700', style: 'normal' },
  ],
});

export const NeueMontreal = localFont({
  src: [
    {
      path: '../public/fonts/NeueMontreal/NeueMontreal-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal/NeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal/NeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/NeueMontreal/NeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={sfPro.className}>{children}</body>
    </html>
  );
}
