import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sneha — Fashion Designer & Creative Director',
  description: 'Fashion that feels like a story. Portfolio by Sneha — Gen-Z fashion designer & creative director, Bengaluru.',
  openGraph: {
    title: 'Sneha — Fashion Designer & Creative Director',
    description: 'Fashion that feels like a story.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap"
          rel="stylesheet"
        />
        {/* Preload the hero image — it's above the fold and must be instant */}
        <link rel="preload" as="image" href="/works/Hop-6.webp" fetchPriority="high" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
