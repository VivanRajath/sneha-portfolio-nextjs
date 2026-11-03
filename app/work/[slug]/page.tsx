import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Contact from '@/components/Contact';
import CaseStudy, { type Entry } from '@/components/CaseStudy';
import { alsoStyled, chapters } from '@/lib/data';
import { workImages } from '@/lib/images';

function entries(): Entry[] {
  const main: Entry[] = chapters.map((c, i) => ({
    slug: c.slug,
    index: String(i + 1).padStart(3, '0'),
    title: c.title,
    tagline: c.tagline,
    kind: c.kind,
    year: c.year,
    concept: c.concept,
    quote: c.quote,
    credits: c.credits,
    ig: c.ig,
    images: workImages(c.slug),
  }));
  const side: Entry[] = alsoStyled.map((x, i) => ({
    slug: x.slug,
    index: String(chapters.length + i + 1).padStart(3, '0'),
    title: x.title,
    tagline: x.note,
    kind: 'Collaboration',
    year: '',
    concept: x.note,
    credits: [
      ['Styling', '@museonzidray'],
      ['With', x.with.replace(/^with /, '')],
    ],
    ig: x.ig,
    images: workImages(x.slug),
  }));
  return [...main, ...side].filter((e) => e.images.length > 0);
}

export function generateStaticParams() {
  return entries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = entries().find((x) => x.slug === slug);
  if (!e) return {};
  return { title: `${e.title} — Sneha Sridhar`, description: e.concept };
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const all = entries();
  const i = all.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const next = all[(i + 1) % all.length];
  return (
    <>
      <Nav />
      <main>
        <CaseStudy entry={all[i]} next={next} />
        <Contact />
      </main>
    </>
  );
}
