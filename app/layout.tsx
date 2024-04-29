import { Roboto_Mono } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer';

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={robotoMono.className}>
        {children} <Footer />
      </body>
    </html>
  );
}
