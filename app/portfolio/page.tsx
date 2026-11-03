import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Contact from '@/components/Contact';
import Gallery from '@/components/Gallery';
import { allFrames } from '@/lib/frames';

export const metadata: Metadata = {
  title: 'Portfolio — Sneha Sridhar',
  description: 'Every frame from Sneha Sridhar’s shoots, sorted by mood.',
};

export default async function PortfolioPage() {
  const frames = await allFrames();
  return (
    <>
      <Nav />
      <main>
        <Gallery frames={frames} />
        <Contact />
      </main>
    </>
  );
}
