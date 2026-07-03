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

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <GalleryReel />
        <Collections />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
