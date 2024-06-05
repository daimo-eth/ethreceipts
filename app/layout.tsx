import { sfPro } from '@/public/fonts';
import './globals.css';
import Footer from './components/shared/Footer';
import { Header } from './components/shared/Header';
import { Metadata } from 'next';
import { getAbsoluteUrl } from './utils/getAbsoluteUrl';

export const metadata: Metadata = {
  metadataBase: new URL(getAbsoluteUrl('/')),
  title: 'Eth Receipts',
  description: 'Receipts for Ethereum Transactions',
  icons: {
    icon: '/receipt-logo.png',
  },
  openGraph: {
    images: [
      {
        url: '/eth-receipts-header.png',
        width: 138,
        height: 71,
        alt: 'Eth Receipts',
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${sfPro.className} overflow-x-hidden min-w-96`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
