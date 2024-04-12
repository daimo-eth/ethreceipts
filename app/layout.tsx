import { sfPro } from '@/public/fonts';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={sfPro.className}>{children}</body>
    </html>
  );
}
