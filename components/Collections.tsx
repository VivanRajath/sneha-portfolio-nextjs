'use client';
import { useRef, useEffect } from 'react';
import styles from './Collections.module.css';
import type { SanityCollection } from '@/lib/sanity';

const staticCollections = [
  {
    id: 'hop',
    num: '01',
    name: 'H O P',
    tagline: 'Street Couture · Urban Editorial',
    desc: 'A collection that lives between the gutter and the sky — raw energy refined into silhouette. The streets of Bengaluru as a runway.',
    cover: '/works/Hop-9.webp',
    thumbs: ['/works/Hop-10.webp', '/works/Hop-33.webp'],
  },
  {
    id: 'phool',
    num: '02',
    name: 'PHOOL',
    tagline: 'Heritage Editorial · Indian Couture',
    desc: 'Florals as a form of resistance. Heritage not as nostalgia but as a living, breathing vocabulary for the present.',
    cover: '/works/Hop-1-2.webp',
    thumbs: ['/works/Hop-6.webp', '/works/Edited_MG_0082.webp'],
  },
  {
    id: 'studio',
    num: '03',
    name: 'STUDIO',
    tagline: 'Fine Art Editorial · Monochrome',
    desc: 'The body as canvas. Light as medium. A study in form stripped to its essence — where everything unnecessary falls away.',
    cover: '/works/_MG_0245.webp',
    thumbs: ['/works/_MG_0070.webp', '/works/Edited_MG_0242.webp'],
  },
];

interface Props {
  sanityCollections?: SanityCollection[];
}

export default function Collections({ sanityCollections }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add(styles.inView);
        });
      },
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Use Sanity data if available, otherwise fall back to static
  const entries = sanityCollections && sanityCollections.length > 0
    ? sanityCollections.map((c, i) => ({
        id: c.slug?.current || c._id,
        num: String(i + 1).padStart(2, '0'),
        name: c.name,
        tagline: c.tagline,
        desc: c.desc || '',
        cover: c.coverImage?.asset?.url || '',
        thumbs: (c.thumbs || []).map(t => t.asset?.url || '').filter(Boolean),
      }))
    : staticCollections;

  return (
    <section className={styles.section} id="collections" ref={sectionRef}>
      <div className={styles.sectionHead}>
        <div className={`section-tag ${styles.reveal}`}>
          <span className="dot" /> Chapter Two
        </div>
        <h2 className={`${styles.sectionTitle} ${styles.reveal}`}>
          The <em>Collections</em>
        </h2>
      </div>

      {entries.map((coll, ci) => (
        <div
          key={coll.id}
          className={`${styles.entry} ${ci % 2 === 1 ? styles.entryFlip : ''} ${styles.reveal}`}
          id={`coll-${coll.id}`}
        >
          <div className={styles.entryNum}>{coll.num}</div>

          <div className={styles.entryImg}>
            {coll.cover && <img src={coll.cover} alt={coll.name} loading="lazy" />}
            <div className={styles.imgOverlay} />
          </div>

          <div className={styles.thumbs}>
            {coll.thumbs.slice(0, 2).map((src, i) => (
              <div key={i} className={styles.thumb}>
                <img src={src} alt={`${coll.name} ${i + 2}`} loading="lazy" />
              </div>
            ))}
          </div>

          <div className={styles.info}>
            <span className={styles.infoNum}>{coll.num}</span>
            <h3 className={styles.infoName}>{coll.name}</h3>
            <p className={styles.infoTag}>{coll.tagline}</p>
            <div className={styles.infoDivider} />
            <p className={styles.infoDesc}>{coll.desc}</p>
            <a href="#gallery" className={styles.viewLink} id={`coll-${coll.id}-btn`}>
              View in Gallery
              <span className={styles.viewArrow}>→</span>
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}
