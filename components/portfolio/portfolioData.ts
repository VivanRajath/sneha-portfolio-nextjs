import type { PChapter, PSettings } from './PortfolioClient';
import type { SanityPortfolioChapter, SanityPortfolioSettings } from '@/lib/sanity';

// ── STATIC FALLBACK (used until Sanity is populated) ──────────
export const defaultSettings: PSettings = {
  heroImage: '/works/Hop-6.webp',
  heroKicker: 'The Portfolio',
  heroTitle: 'Every image',
  heroTitleEm: 'is a sentence.',
  heroSub: 'Scroll to read the story.',
  frameCount: '32 Frames',
  chapterCount: '3 Chapters',
  closingQuote: 'Fashion is not about fabric.',
  closingQuoteEm: "It's about the story the fabric tells.",
  closingAuthor: '— Sneha, Creative Director',
};

export const defaultChapters: PChapter[] = [
  {
    id: 'phool',
    roman: 'I',
    name: 'Phool',
    sub: 'Heritage Couture · Bengaluru Flower Market',
    book: {
      num: '01',
      label: 'Phool — Heritage Couture',
      title: 'She Became',
      titleEm: 'the Marigold',
      body: 'Silk draped like memory. Marigold garlands wound around her arms like armour. A woman choosing to exist beautifully in a space the world called ordinary.',
      collection: 'Collection: PHOOL, 2024',
      img: '/works/Hop-1-2.webp',
      caption: 'Among Marigolds · Frame 001',
    },
    gridLabel: 'Selected Frames — Phool',
    grid: [
      { src: '/works/Hop-6.webp', num: '002', story: 'The Gaze.', tall: true },
      { src: '/works/Hop-6-2.webp', num: '003', story: 'Crown of Jasmine.' },
      { src: '/works/Hop-4.webp', num: '004', story: 'Fingers & Gold.' },
      { src: '/works/Hop-4-2.webp', num: '005', story: 'Silk Drape.', tall: true },
    ],
  },
  {
    id: 'hop',
    roman: 'II',
    name: 'H·O·P',
    sub: 'Street Couture · Urban Editorial',
    full: {
      img: '/works/Hop-9.webp',
      frame: 'Frame 006',
      title: 'The Supermarket',
      titleEm: 'Enter:',
      body: 'Fluorescent aisles. The most unlikely runway in the world.',
    },
    book: {
      num: '07',
      label: 'HOP — Street Couture',
      title: 'Pink Hair.',
      titleEm: 'Maroon Leather.',
      body: 'She walked in and everyone looked. Not because she was out of place — but because she was completely in it.',
      collection: 'Collection: HOP, 2024',
      img: '/works/Hop-8.webp',
      caption: 'Aisle Seven · Frame 007',
    },
    gridLabel: 'Selected Frames — HOP',
    grid: [
      { src: '/works/Hop-11.webp', num: '009', story: 'Lace & Steel.', tall: true },
      { src: '/works/Hop-15.webp', num: '010', story: 'Green Haze.' },
      { src: '/works/Hop-17.webp', num: '011', story: 'Chain Reaction.' },
      { src: '/works/Hop-25.webp', num: '012', story: 'Cart Queen.', tall: true },
      { src: '/works/Hop-27.webp', num: '013', story: 'Shelf Life.' },
      { src: '/works/Hop-28.webp', num: '014', story: 'Between Shelves.' },
      { src: '/works/Hop-30.webp', num: '015', story: 'Head Tilt.', tall: true },
      { src: '/works/Hop-31.webp', num: '016', story: 'Riot of Colour.' },
      { src: '/works/Hop-32.webp', num: '017', story: 'Signal.' },
      { src: '/works/Hop-33.webp', num: '018', story: 'Noise.' },
      { src: '/works/Hop-36.webp', num: '019', story: 'Glance.', tall: true },
      { src: '/works/Hop-38.webp', num: '020', story: 'Texture.' },
      { src: '/works/Hop-39.webp', num: '021', story: 'Last Frame.' },
      { src: '/works/Hop-44.webp', num: '022', story: 'Stillness.' },
      { src: '/works/Hop-49.webp', num: '023', story: 'Final Cut.', tall: true },
      { src: '/works/Hop-64.webp', num: '024', story: 'Exit.' },
    ],
  },
  {
    id: 'raw',
    roman: 'III',
    name: 'Raw',
    sub: 'Street Portraits · Unfiltered Frames',
    book: {
      num: '25',
      label: 'Raw — Unfiltered Archive',
      title: 'Before',
      titleEm: 'the Edit',
      body: 'Not every frame needs a filter. Some images are perfect precisely because they are unpolished — a flash of real light, an unexpected shadow.',
      collection: 'Archive: Raw, 2024',
      img: '/works/Edited_MG_0082.webp',
      caption: 'Pink in the City · Frame 025',
    },
    gridLabel: 'Selected Frames — Raw',
    grid: [
      { src: '/works/Edited_MG_0218.webp', num: '026', story: 'Unfiltered.', tall: true },
      { src: '/works/Edited_MG_0242.webp', num: '027', story: 'Raw Edge.' },
      { src: '/works/IMG_3097.webp', num: '028', story: 'Street Portrait.' },
      { src: '/works/_MG_0034.webp', num: '029', story: 'Direction Study.', tall: true },
      { src: '/works/_MG_0070.webp', num: '030', story: 'Candid.' },
      { src: '/works/_MG_0204.webp', num: '031', story: 'Movement.' },
      { src: '/works/_MG_0245.webp', num: '032', story: 'The Last Frame.', tall: true },
    ],
  },
];

// ── MAP Sanity → plain props (falls back per-field) ──────────
export function mapSettings(s: SanityPortfolioSettings | null): PSettings {
  if (!s) return defaultSettings;
  return {
    heroImage: s.heroImage?.asset?.url || defaultSettings.heroImage,
    heroKicker: s.heroKicker || defaultSettings.heroKicker,
    heroTitle: s.heroTitle || defaultSettings.heroTitle,
    heroTitleEm: s.heroTitleEm || defaultSettings.heroTitleEm,
    heroSub: s.heroSub || defaultSettings.heroSub,
    frameCount: s.frameCount || defaultSettings.frameCount,
    chapterCount: s.chapterCount || defaultSettings.chapterCount,
    closingQuote: s.closingQuote || defaultSettings.closingQuote,
    closingQuoteEm: s.closingQuoteEm || defaultSettings.closingQuoteEm,
    closingAuthor: s.closingAuthor || defaultSettings.closingAuthor,
  };
}

export function mapChapters(rows: SanityPortfolioChapter[]): PChapter[] {
  if (!rows || rows.length === 0) return defaultChapters;
  return rows.map((r, i) => {
    const full = r.fullImage?.asset?.url
      ? {
          img: r.fullImage.asset.url,
          frame: r.fullFrame || '',
          title: r.fullTitle || '',
          titleEm: r.fullTitleEm || '',
          body: r.fullBody || '',
        }
      : undefined;
    const book = r.bookImage?.asset?.url
      ? {
          num: r.bookNum || '',
          label: r.bookLabel || '',
          title: r.bookTitle || '',
          titleEm: r.bookTitleEm || '',
          body: r.bookBody || '',
          collection: r.bookCollection || '',
          img: r.bookImage.asset.url,
          caption: r.bookCaption || '',
        }
      : undefined;
    return {
      id: (r.name || `chapter-${i}`).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `chapter-${i}`,
      roman: r.roman || '',
      name: r.name || '',
      sub: r.sub || '',
      full,
      book,
      gridLabel: r.gridLabel || '',
      grid: (r.grid || [])
        .filter(g => g.image?.asset?.url)
        .map(g => ({ src: g.image!.asset!.url, num: g.num || '', story: g.story || '', tall: !!g.tall })),
    };
  });
}
