'use client';
import { useRef, useEffect } from 'react';
import styles from './Collections.module.css';

const collections = [
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

export default function Collections() {
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

      {collections.map((coll, ci) => (
        <div
          key={coll.id}
          className={`${styles.entry} ${ci % 2 === 1 ? styles.entryFlip : ''} ${styles.reveal}`}
          id={`coll-${coll.id}`}
        >
          {/* Index number — decorative */}
          <div className={styles.entryNum}>{coll.num}</div>

          {/* Cover image — large */}
          <div className={styles.entryImg}>
            <img src={coll.cover} alt={coll.name} loading="lazy" />
            <div className={styles.imgOverlay} />
          </div>

          {/* Thumbnails */}
          <div className={styles.thumbs}>
            {coll.thumbs.map((src, i) => (
              <div key={i} className={styles.thumb}>
                <img src={src} alt={`${coll.name} ${i + 2}`} loading="lazy" />
              </div>
            ))}
          </div>

          {/* Info panel */}
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
