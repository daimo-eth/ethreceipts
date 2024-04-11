import './globals.css';
import localFont from 'next/font/local';

const sfPro = localFont({
  src: [
    { path: '../public/fonts/sf-pro/sf-pro-display_regular.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/sf-pro/sf-pro-display_light.woff2', weight: '300', style: 'normal' },
    { path: '../public/fonts/sf-pro/sf-pro-display_bold.woff2', weight: '700', style: 'normal' },
    {
      path: '../public/fonts/sf-pro/sf-pro-display_semibold.woff2',
      weight: '900',
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
