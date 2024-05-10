import { sfPro } from '@/public/fonts';
import './globals.css';
import Footer from './components/shared/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${sfPro.className} overflow-x-hidden`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
