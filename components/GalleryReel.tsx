'use client';
import styles from './GalleryReel.module.css';
import type { SanityGallerySection } from '@/lib/sanity';

// ── Static fallback chapters ──────────────
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
  // Map Sanity data to the Chapter shape, or use static fallback
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

  return (
    <section className={styles.section} id="gallery">
      {/* Section label */}
      <div className={styles.sectionLabel}>
        <div className="section-tag">
          <span className="dot" /> The Work
        </div>
      </div>

      {chapters.map((chapter, ci) => {
        // Split images into 3 rows (distribute round-robin)
        const row0 = chapter.images.filter((_, i) => i % 3 === 0);
        const row1 = chapter.images.filter((_, i) => i % 3 === 1);
        const row2 = chapter.images.filter((_, i) => i % 3 === 2);
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

              {/* Bottom-left: title + collection */}
              <div className={styles.heroLabel}>
                {chapter.collection && (
                  <span className={styles.heroColl}>{chapter.collection}</span>
                )}
                {chapter.title && (
                  <h2 className={styles.heroTitle}>{chapter.title}</h2>
                )}
              </div>

              {/* Bottom-right: counter */}
              <div className={styles.heroCounter}>
                {String(ci + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            </div>

            {/* 3 auto-scrolling rows at different speeds */}
            {chapter.images.length > 0 && (
              <div className={styles.rows}>
                {([row0, row1, row2] as string[][]).map((row, ri) => {
                  if (row.length === 0) return null;
                  const doubled = [...row, ...row];
                  return (
                    <div key={ri} className={styles.rowOuter}>
                      <div
                        className={`${styles.row} ${
                          ri === 0 ? styles.row0 : ri === 1 ? styles.row1 : styles.row2
                        }`}
                      >
                        {doubled.map((src, i) => (
                          <div key={`${src}-${i}`} className={styles.rowCard}>
                            <img
                              src={src}
                              alt=""
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
