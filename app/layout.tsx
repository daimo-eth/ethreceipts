import { sfPro } from '@/public/fonts';
import './globals.css';
import Footer from './components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={sfPro.className}>
      <body className={sfPro.className}>
        {children} <Footer />
      </body>
    </html>
  );
}
