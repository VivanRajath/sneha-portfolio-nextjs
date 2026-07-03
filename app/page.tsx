import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import GalleryReel from '@/components/GalleryReel';
import Collections from '@/components/Collections';
import Philosophy from '@/components/Philosophy';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { sanityClient, settingsQuery, collectionsQuery } from '@/lib/sanity';
import type { SanitySettings, SanityCollection } from '@/lib/sanity';

export default async function Home() {
  let settings: SanitySettings | null = null;
  let collections: SanityCollection[] = [];

  try {
    [settings, collections] = await Promise.all([
      sanityClient.fetch<SanitySettings>(settingsQuery),
      sanityClient.fetch<SanityCollection[]>(collectionsQuery),
    ]);
  } catch {
    // Falls back to static content if Sanity is unreachable
  }

  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero heroImages={settings?.heroImages?.map(img => img.asset?.url).filter((u): u is string => Boolean(u))} />
        <Marquee />
        <About
          bio={settings?.aboutBio}
          mainImageUrl={settings?.aboutMainImage?.asset?.url}
          accentImageUrl={settings?.aboutAccentImage?.asset?.url}
        />
        <GalleryReel />
        <Collections sanityCollections={collections.length > 0 ? collections : undefined} />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
