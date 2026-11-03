import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter_Tight, Space_Mono, Mrs_Saint_Delafield } from 'next/font/google';
import SmoothScroll from '@/components/SmoothScroll';
import Cursor from '@/components/Cursor';
import './globals.css';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--f-serif' });
const sans = Inter_Tight({ subsets: ['latin'], variable: '--f-sans' });
const mono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--f-mono' });
const script = Mrs_Saint_Delafield({ subsets: ['latin'], weight: '400', variable: '--f-script' });

export const metadata: Metadata = {
  title: 'Sneha Sridhar — Fashion Stylist & Creative Director',
  description:
    'Contemporary, experimental, a little nostalgic, slightly surreal. The story of Sneha Sridhar — fashion stylist & creative director, Bengaluru.',
  openGraph: {
    title: 'Sneha Sridhar — Fashion Stylist & Creative Director',
    description: 'Contemporary, experimental, a little nostalgic, slightly surreal.',
    type: 'website',
  },
};

export const viewport: Viewport = { themeColor: '#F1EEE7' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${script.variable}`}>
      <body suppressHydrationWarning>
        <SmoothScroll>{children}</SmoothScroll>
        <Cursor />
      </body>
    </html>
  );
}
