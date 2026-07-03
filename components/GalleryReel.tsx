'use client';
import { useEffect, useRef } from 'react';
import styles from './GalleryReel.module.css';
import type { SanityGallerySection } from '@/lib/sanity';

interface Chapter {
  _id: string;
  title?: string;
  collection?: string;
  heroImage: string;
  images: string[];
}

const staticChapters: Chapter[] = [
  {
    _id: 'hop',
    title: 'H O P',
    collection: 'Street Couture',
    heroImage: '/works/Hop-9.webp',
    images: [
      '/works/Hop-8.webp',  '/works/Hop-25.webp', '/works/Hop-33.webp',
      '/works/Hop-36.webp', '/works/Hop-38.webp', '/works/Hop-10.webp',
      '/works/Hop-49.webp', '/works/Hop-30.webp', '/works/Hop-64.webp',
      '/works/Hop-39.webp', '/works/Hop-28.webp', '/works/Hop-6.webp',
    ],
  },
  {
    _id: 'phool',
    title: 'PHOOL',
    collection: 'Indian Couture',
    heroImage: '/works/Hop-1-2.webp',
    images: [
      '/works/Hop-4.webp',  '/works/Hop-6-2.webp', '/works/Hop-4-2.webp',
      '/works/Hop-11.webp', '/works/Hop-15.webp',  '/works/Hop-17.webp',
      '/works/Hop-44.webp', '/works/Hop-31.webp',  '/works/Hop-32.webp',
    ],
  },
  {
    _id: 'studio',
    title: 'STUDIO',
    collection: 'Editorial',
    heroImage: '/works/_MG_0245.webp',
    images: [
      '/works/_MG_0070.webp',         '/works/Edited_MG_0082.webp', '/works/_MG_0034.webp',
      '/works/_MG_0204.webp',         '/works/Edited_MG_0218.webp', '/works/Edited_MG_0242.webp',
      '/works/IMG_3097.webp',         '/works/Hop-27.webp',         '/works/Hop-6.webp',
    ],
  },
];

interface Props {
  sanityChapters?: SanityGallerySection[];
}

export default function GalleryReel({ sanityChapters }: Props) {
  const galleriesRef = useRef<(HTMLDivElement | null)[]>([]);
  const ticking = useRef(false);

  const chapters: Chapter[] =
    sanityChapters && sanityChapters.length > 0
      ? sanityChapters.map(s => ({
          _id: s._id,
          title: s.title,
          collection: s.collection,
          heroImage: s.heroImage?.asset?.url || '',
          images: (s.images || [])
            .map(img => img.asset?.url)
            .filter((u): u is string => Boolean(u)),
        }))
      : staticChapters;

  // Vertical parallax — each column moves at a different speed
  useEffect(() => {
    const update = () => {
      const vh = window.innerHeight;
      galleriesRef.current.forEach(gallery => {
        if (!gallery) return;
        const rect = gallery.getBoundingClientRect();
        // Only compute when the gallery is anywhere near the viewport
        if (rect.bottom < -vh || rect.top > vh * 1.5) return;

        // progress grows as the gallery scrolls up through the viewport
        const progress = vh - rect.top;
        const colB = gallery.querySelector<HTMLDivElement>('[data-col="b"]');
        const colC = gallery.querySelector<HTMLDivElement>('[data-col="c"]');
        // Column A stays; B moves up faster; C lags behind (moves down slower)
        if (colB) colB.style.transform = `translateY(${-progress * 0.12}px)`;
        if (colC) colC.style.transform = `translateY(${progress * 0.08}px)`;
      });
    };

    update();
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => { update(); ticking.current = false; });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [chapters.length]);

  return (
    <section className={styles.section} id="gallery">
      <div className={styles.sectionLabel}>
        <div className="section-tag">
          <span className="dot" /> The Work
        </div>
      </div>

      {chapters.map((chapter, ci) => {
        // Distribute images round-robin into 3 vertical columns
        const colA = chapter.images.filter((_, i) => i % 3 === 0);
        const colB = chapter.images.filter((_, i) => i % 3 === 1);
        const colC = chapter.images.filter((_, i) => i % 3 === 2);
        const total = chapters.length;

        return (
          <div key={chapter._id} className={styles.chapter}>

            {/* Full-screen hero image */}
            <div className={styles.chapterHero}>
              {chapter.heroImage && (
                <img
                  src={chapter.heroImage}
                  alt={chapter.title || `Gallery ${ci + 1}`}
                  loading={ci === 0 ? 'eager' : 'lazy'}
                  fetchPriority={ci === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              )}
              <div className={styles.heroOverlay} />
              <div className={styles.heroLabel}>
                {chapter.collection && <span className={styles.heroColl}>{chapter.collection}</span>}
                {chapter.title && <h2 className={styles.heroTitle}>{chapter.title}</h2>}
              </div>
              <div className={styles.heroCounter}>
                {String(ci + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            </div>

            {/* 3 vertical columns — different scroll speeds */}
            {chapter.images.length > 0 && (
              <div
                className={styles.gallery}
                ref={el => { galleriesRef.current[ci] = el; }}
              >
                <div className={styles.col} data-col="a">
                  {colA.map((src, i) => (
                    <div key={`a-${i}`} className={styles.card}>
                      <img src={src} alt="" loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
                <div className={`${styles.col} ${styles.colB}`} data-col="b">
                  {colB.map((src, i) => (
                    <div key={`b-${i}`} className={styles.card}>
                      <img src={src} alt="" loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
                <div className={`${styles.col} ${styles.colC}`} data-col="c">
                  {colC.map((src, i) => (
                    <div key={`c-${i}`} className={styles.card}>
                      <img src={src} alt="" loading="lazy" decoding="async" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
