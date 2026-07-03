'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './GalleryReel.module.css';

interface Work {
  src: string;
  title: string;
  subtitle: string;
  year: string;
  collection: string;
  desc: string;
}

const allWorks: Work[] = [
  { src: '/works/Hop-8.webp',            title: 'Ascent',     subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'A study in vertical tension — where height meets defiance.' },
  { src: '/works/Hop-25.webp',           title: 'Drift',      subtitle: 'Urban Editorial',    year: '2024', collection: 'HOP',    desc: 'The city as fabric, movement as design.' },
  { src: '/works/Hop-33.webp',           title: 'Bloom',      subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'Form unfolding in the language of the street.' },
  { src: '/works/Hop-36.webp',           title: 'Flux',       subtitle: 'Urban Editorial',    year: '2024', collection: 'HOP',    desc: 'Between stillness and motion — this is where fashion lives.' },
  { src: '/works/Hop-38.webp',           title: 'Lull',       subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'A quiet moment before the world rushes back in.' },
  { src: '/works/Hop-9.webp',            title: 'Cipher',     subtitle: 'Urban Editorial',    year: '2024', collection: 'HOP',    desc: 'Coded in silhouette, decoded in feeling.' },
  { src: '/works/Hop-10.webp',           title: 'Verse',      subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'Each stitch a syllable in the language of self.' },
  { src: '/works/Hop-49.webp',           title: 'Motion',     subtitle: 'Urban Editorial',    year: '2024', collection: 'HOP',    desc: 'Fashion in perpetual motion, never arriving.' },
  { src: '/works/Hop-30.webp',           title: 'Anchor',     subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'Grounded yet restless — the paradox of modern style.' },
  { src: '/works/Hop-64.webp',           title: 'Fracture',   subtitle: 'Urban Editorial',    year: '2024', collection: 'HOP',    desc: 'Breaking the expected to reveal something true.' },
  { src: '/works/Hop-39.webp',           title: 'Surge',      subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'Energy made visible in drape and structure.' },
  { src: '/works/Hop-1-2.webp',          title: 'Heritage',   subtitle: 'Indian Couture',     year: '2024', collection: 'PHOOL',  desc: 'Rooted in tradition, reaching toward a new sky.' },
  { src: '/works/Hop-4.webp',            title: 'Bloom II',   subtitle: 'Heritage Editorial', year: '2024', collection: 'PHOOL',  desc: 'Florals reimagined as architecture, not decoration.' },
  { src: '/works/Hop-6-2.webp',          title: 'Reverie',    subtitle: 'Indian Couture',     year: '2024', collection: 'PHOOL',  desc: 'A dream in thread — where memory meets the present.' },
  { src: '/works/_MG_0245.webp',         title: 'Study I',    subtitle: 'Editorial',          year: '2024', collection: 'STUDIO', desc: 'Light studies in monochrome — the body as sculpture.' },
  { src: '/works/Hop-28.webp',           title: 'Transit',    subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'In transit between who you were and who you are becoming.' },
  { src: '/works/Hop-11.webp',           title: 'Silhouette', subtitle: 'Urban Editorial',    year: '2024', collection: 'HOP',    desc: 'The shape of an idea before words get to it.' },
  { src: '/works/Hop-15.webp',           title: 'Contour',    subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'Lines that argue with gravity and win.' },
  { src: '/works/_MG_0034.webp',         title: 'Study IV',   subtitle: 'Editorial',          year: '2024', collection: 'STUDIO', desc: 'The intimate archaeology of getting dressed.' },
  { src: '/works/_MG_0204.webp',         title: 'Study V',    subtitle: 'Editorial',          year: '2024', collection: 'STUDIO', desc: 'Silence has a texture. This is it.' },
  { src: '/works/Hop-4-2.webp',          title: 'Bloom III',  subtitle: 'Heritage Editorial', year: '2024', collection: 'PHOOL',  desc: 'A second blooming — more knowing, more present.' },
  { src: '/works/IMG_3097.webp',         title: 'Portal',     subtitle: 'Conceptual',         year: '2024', collection: 'STUDIO', desc: 'Every image is a doorway. Step through.' },
  { src: '/works/Hop-27.webp',           title: 'Shadow',     subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'The presence felt even when unseen.' },
  { src: '/works/Hop-31.webp',           title: 'Tension',    subtitle: 'Urban Editorial',    year: '2024', collection: 'HOP',    desc: 'Where constraint becomes power, not limitation.' },
  { src: '/works/Edited_MG_0082.webp',   title: 'Study II',   subtitle: 'Editorial',          year: '2024', collection: 'STUDIO', desc: 'Controlled chaos — a conversation between form and feeling.' },
  { src: '/works/_MG_0070.webp',         title: 'Study III',  subtitle: 'Editorial',          year: '2024', collection: 'STUDIO', desc: 'The quiet power of negative space in fashion.' },
  { src: '/works/Hop-32.webp',           title: 'Pulse',      subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'The rhythm of the street distilled into fabric.' },
  { src: '/works/Hop-17.webp',           title: 'Echo',       subtitle: 'Urban Editorial',    year: '2024', collection: 'HOP',    desc: 'A resonance that lingers long after the shutter closes.' },
  { src: '/works/Hop-44.webp',           title: 'Veil',       subtitle: 'Street Couture',     year: '2024', collection: 'HOP',    desc: 'What is revealed is only the surface of what is meant.' },
  { src: '/works/Edited_MG_0218.webp',   title: 'Dusk',       subtitle: 'Editorial',          year: '2024', collection: 'STUDIO', desc: 'The hour when light becomes memory.' },
  { src: '/works/Edited_MG_0242.webp',   title: 'Noir',       subtitle: 'Editorial',          year: '2024', collection: 'STUDIO', desc: 'In the darkroom of imagination, she develops herself.' },
  { src: '/works/Hop-6.webp',            title: 'Canvas',     subtitle: 'Heritage Editorial', year: '2024', collection: 'PHOOL',  desc: 'The blank page before the first stitch.' },
];

const colA = allWorks.slice(0, 11);
const colB = allWorks.slice(11, 22);
const colC = allWorks.slice(22);

export default function GalleryReel() {
  const sectionRef   = useRef<HTMLElement>(null);
  const colARef      = useRef<HTMLDivElement>(null);
  const colBRef      = useRef<HTMLDivElement>(null);
  const colCRef      = useRef<HTMLDivElement>(null);
  const ticking      = useRef(false);
  const manualClosed = useRef(false);
  const prevHero     = useRef(false);

  const [heroOpen, setHeroOpen]         = useState(false);
  const [currentWork, setCurrentWork]   = useState<Work>(allWorks[0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect     = section.getBoundingClientRect();
      const scrolled = -rect.top;
      const offset   = Math.max(scrolled, 0);

      // Three columns, three different vertical speeds
      if (colARef.current) colARef.current.style.transform = `translateY(${offset * 0}px)`;
      if (colBRef.current) colBRef.current.style.transform = `translateY(${-offset * 0.15}px)`;
      if (colCRef.current) colCRef.current.style.transform = `translateY(${offset * 0.12}px)`;

      // Hero auto-reveals at 55% of the section
      const threshold = section.offsetHeight * 0.55;
      const past = scrolled > threshold;

      if (!past) {
        manualClosed.current = false; // reset when above threshold
        if (prevHero.current) { prevHero.current = false; setHeroOpen(false); }
      } else if (!manualClosed.current && !prevHero.current) {
        prevHero.current = true;
        setHeroOpen(true);
      }
    };

    update();

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => { update(); ticking.current = false; });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openWork = (work: Work) => {
    setCurrentWork(work);
    manualClosed.current = false;
    prevHero.current = true;
    setHeroOpen(true);
  };

  const closeHero = () => {
    manualClosed.current = true;
    prevHero.current = false;
    setHeroOpen(false);
  };

  const related   = allWorks.filter(w => w.src !== currentWork.src);
  const relStrip0 = related.slice(0, 10);
  const relStrip1 = related.slice(10, 21);
  const relStrip2 = related.slice(21);
  const heroIdx   = allWorks.findIndex(w => w.src === currentWork.src) + 1;

  return (
    <section className={styles.section} id="gallery" ref={sectionRef}>

      {/* Sticky heading */}
      <div className={styles.headingWrap}>
        <div className="section-tag">
          <span className="dot" /> The Work
        </div>
        <h2 className={styles.heading}>
          Selected<br /><em>Works</em>
        </h2>
      </div>

      {/* 3 vertical columns — different scroll speeds */}
      <div className={styles.gallery}>
        <div className={styles.col} ref={colARef}>
          {colA.map((work, i) => (
            <button
              key={work.src}
              className={styles.card}
              onClick={() => openWork(work)}
              aria-label={`Open ${work.title}`}
            >
              <img
                src={work.src}
                alt={work.title}
                loading={i < 2 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </button>
          ))}
        </div>

        <div className={`${styles.col} ${styles.colB}`} ref={colBRef}>
          {colB.map((work, i) => (
            <button
              key={work.src}
              className={styles.card}
              onClick={() => openWork(work)}
              aria-label={`Open ${work.title}`}
            >
              <img
                src={work.src}
                alt={work.title}
                loading={i < 2 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </button>
          ))}
        </div>

        <div className={`${styles.col} ${styles.colC}`} ref={colCRef}>
          {colC.map((work, i) => (
            <button
              key={work.src}
              className={styles.card}
              onClick={() => openWork(work)}
              aria-label={`Open ${work.title}`}
            >
              <img
                src={work.src}
                alt={work.title}
                loading={i < 2 ? 'eager' : 'lazy'}
                fetchPriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Hero reveal — slides up from bottom */}
      <div className={`${styles.heroReveal} ${heroOpen ? styles.heroVisible : ''}`}>

        <button className={styles.closeBtn} onClick={closeHero} aria-label="Close">
          <span /><span />
        </button>

        {/* B&W image + details */}
        <div className={styles.heroSplit}>
          <div className={styles.heroBw}>
            <img
              src={currentWork.src}
              alt={currentWork.title}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className={styles.heroInfo}>
            <div className={styles.heroColl}>{currentWork.collection}</div>
            <h3 className={styles.heroTitle}>{currentWork.title}</h3>
            <div className={styles.heroMeta}>
              <span>{currentWork.subtitle}</span>
              <span className={styles.heroDot} />
              <span>{currentWork.year}</span>
            </div>
            <p className={styles.heroDesc}>{currentWork.desc}</p>
            <div className={styles.heroIdx}>
              {String(heroIdx).padStart(2, '0')} / {String(allWorks.length).padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* 3 horizontal strips of related images — different auto-scroll speeds */}
        <div className={styles.relStrips}>
          <div className={`${styles.strip} ${styles.strip0}`}>
            {[...relStrip0, ...relStrip0].map((w, i) => (
              <button key={`s0${i}`} className={styles.stripCard} onClick={() => setCurrentWork(w)} aria-label={`View ${w.title}`}>
                <img src={w.src} alt={w.title} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <div className={`${styles.strip} ${styles.strip1}`}>
            {[...relStrip1, ...relStrip1].map((w, i) => (
              <button key={`s1${i}`} className={styles.stripCard} onClick={() => setCurrentWork(w)} aria-label={`View ${w.title}`}>
                <img src={w.src} alt={w.title} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <div className={`${styles.strip} ${styles.strip2}`}>
            {[...relStrip2, ...relStrip2].map((w, i) => (
              <button key={`s2${i}`} className={styles.stripCard} onClick={() => setCurrentWork(w)} aria-label={`View ${w.title}`}>
                <img src={w.src} alt={w.title} loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
