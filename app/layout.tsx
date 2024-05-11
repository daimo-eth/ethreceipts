import { sfPro } from '@/public/fonts';
import './globals.css';
import Footer from './components/shared/Footer';
import { Header } from './components/shared/Header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${sfPro.className} overflow-x-hidden`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
