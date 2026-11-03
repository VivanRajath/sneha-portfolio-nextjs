import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Statement from '@/components/Statement';
import MoodWheel from '@/components/MoodWheel';
import Work, { type WorkItem } from '@/components/Work';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import StoryProgress from '@/components/StoryProgress';
import { alsoStyled, chapters } from '@/lib/data';
import { workImages } from '@/lib/images';

export default function Home() {
  const items: WorkItem[] = [
    ...chapters.map((c, i) => ({
      slug: c.slug,
      index: String(i + 1).padStart(3, '0'),
      name: c.title,
      tagline: c.tagline,
      kind: c.kind,
      year: c.year,
      color: c.palette.bg,
      ink: c.palette.fg,
      ig: c.ig,
      images: workImages(c.slug),
    })),
    ...alsoStyled.map((x, i) => ({
      slug: x.slug,
      index: String(chapters.length + i + 1).padStart(3, '0'),
      name: x.title,
      tagline: x.note,
      kind: x.with,
      year: '',
      color: '#D2FF3C',
      ink: '#111110',
      ig: x.ig,
      images: workImages(x.slug),
    })),
  ];

  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Statement />
        <MoodWheel />
        <Work items={items} />
        <Services />
        <Contact />
      </main>
      <StoryProgress />
    </>
  );
}
