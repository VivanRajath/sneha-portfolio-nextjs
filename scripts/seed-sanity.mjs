// Seed Sanity with all /works images + all documents so everything is
// controllable and visible in Studio. Idempotent: re-running replaces docs.
//
//   node scripts/seed-sanity.mjs
//
import { createClient } from '@sanity/client';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

// ── Load .env.local ──
const env = {};
for (const line of readFileSync(join(root, '.env.local'), 'utf8').split('\n')) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
}

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => crypto.randomBytes(6).toString('hex');
const WORKS = join(root, 'public', 'works');

// ── Upload every image, cache filename → assetId ──
const assetCache = new Map();
async function uploadAll() {
  const files = readdirSync(WORKS).filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f));
  console.log(`Uploading ${files.length} images…`);
  for (const f of files) {
    const buf = readFileSync(join(WORKS, f));
    const asset = await client.assets.upload('image', buf, { filename: f });
    assetCache.set(f, asset._id);
    process.stdout.write('.');
  }
  console.log('\nUploads done.');
}

// filename ('/works/x.webp' or 'x.webp') → image field
const img = name => {
  const f = name.replace('/works/', '');
  const id = assetCache.get(f);
  if (!id) throw new Error(`No uploaded asset for ${f}`);
  return { _type: 'image', asset: { _type: 'reference', _ref: id } };
};
const imgArr = names => names.map(n => ({ ...img(n), _key: key() }));

async function seed() {
  await uploadAll();

  // ── HOME SETTINGS ──
  const settings = {
    _id: 'settings',
    _type: 'settings',
    siteTitle: 'Sneha',
    heroImages: imgArr(['Hop-6.webp', 'Hop-9.webp', 'Hop-1-2.webp', 'Hop-8.webp', 'Hop-25.webp']),
    aboutMainImage: img('_MG_0245.webp'),
    aboutAccentImage: img('Hop-27.webp'),
    aboutBio:
      'Sneha is a fashion designer and creative director based in Bengaluru, telling stories through fabric, colour and the frame. Every collection is a narrative — from heritage couture to street editorial.',
  };

  // ── GALLERY SECTIONS (home reel) ──
  const gallery = [
    {
      _id: 'gallery-hop', _type: 'gallerySection', title: 'H O P', collection: 'Street Couture', order: 1,
      heroImage: img('Hop-9.webp'),
      images: imgArr(['Hop-8.webp','Hop-25.webp','Hop-33.webp','Hop-36.webp','Hop-38.webp','Hop-10.webp','Hop-49.webp','Hop-30.webp','Hop-64.webp','Hop-39.webp','Hop-28.webp','Hop-6.webp']),
    },
    {
      _id: 'gallery-phool', _type: 'gallerySection', title: 'PHOOL', collection: 'Indian Couture', order: 2,
      heroImage: img('Hop-1-2.webp'),
      images: imgArr(['Hop-4.webp','Hop-6-2.webp','Hop-4-2.webp','Hop-11.webp','Hop-15.webp','Hop-17.webp','Hop-44.webp','Hop-31.webp','Hop-32.webp']),
    },
    {
      _id: 'gallery-studio', _type: 'gallerySection', title: 'STUDIO', collection: 'Editorial', order: 3,
      heroImage: img('_MG_0245.webp'),
      images: imgArr(['_MG_0070.webp','Edited_MG_0082.webp','_MG_0034.webp','_MG_0204.webp','Edited_MG_0218.webp','Edited_MG_0242.webp','IMG_3097.webp','Hop-27.webp','Hop-6.webp']),
    },
  ];

  // ── PORTFOLIO SETTINGS ──
  const portfolioSettings = {
    _id: 'portfolioSettings', _type: 'portfolioSettings',
    heroImage: img('Hop-6.webp'),
    heroKicker: 'The Portfolio',
    heroTitle: 'Every image', heroTitleEm: 'is a sentence.',
    heroSub: 'Scroll to read the story.',
    frameCount: '32 Frames', chapterCount: '3 Chapters',
    closingQuote: 'Fashion is not about fabric.',
    closingQuoteEm: "It's about the story the fabric tells.",
    closingAuthor: '— Sneha, Creative Director',
  };

  const gridItem = (name, num, story, tall) => ({
    _key: key(), image: img(name), num, story, tall: !!tall,
  });

  // ── PORTFOLIO CHAPTERS ──
  const chapters = [
    {
      _id: 'portfolio-phool', _type: 'portfolioChapter', order: 1,
      roman: 'I', name: 'Phool', sub: 'Heritage Couture · Bengaluru Flower Market',
      bookNum: '01', bookLabel: 'Phool — Heritage Couture',
      bookTitle: 'She Became', bookTitleEm: 'the Marigold',
      bookBody: 'Silk draped like memory. Marigold garlands wound around her arms like armour. A woman choosing to exist beautifully in a space the world called ordinary.',
      bookCollection: 'Collection: PHOOL, 2024',
      bookImage: img('Hop-1-2.webp'), bookCaption: 'Among Marigolds · Frame 001',
      gridLabel: 'Selected Frames — Phool',
      grid: [
        gridItem('Hop-6.webp', '002', 'The Gaze.', true),
        gridItem('Hop-6-2.webp', '003', 'Crown of Jasmine.'),
        gridItem('Hop-4.webp', '004', 'Fingers & Gold.'),
        gridItem('Hop-4-2.webp', '005', 'Silk Drape.', true),
      ],
    },
    {
      _id: 'portfolio-hop', _type: 'portfolioChapter', order: 2,
      roman: 'II', name: 'H·O·P', sub: 'Street Couture · Urban Editorial',
      fullImage: img('Hop-9.webp'), fullFrame: 'Frame 006',
      fullTitle: 'The Supermarket', fullTitleEm: 'Enter:',
      fullBody: 'Fluorescent aisles. The most unlikely runway in the world.',
      bookNum: '07', bookLabel: 'HOP — Street Couture',
      bookTitle: 'Pink Hair.', bookTitleEm: 'Maroon Leather.',
      bookBody: 'She walked in and everyone looked. Not because she was out of place — but because she was completely in it.',
      bookCollection: 'Collection: HOP, 2024',
      bookImage: img('Hop-8.webp'), bookCaption: 'Aisle Seven · Frame 007',
      gridLabel: 'Selected Frames — HOP',
      grid: [
        gridItem('Hop-11.webp', '009', 'Lace & Steel.', true),
        gridItem('Hop-15.webp', '010', 'Green Haze.'),
        gridItem('Hop-17.webp', '011', 'Chain Reaction.'),
        gridItem('Hop-25.webp', '012', 'Cart Queen.', true),
        gridItem('Hop-27.webp', '013', 'Shelf Life.'),
        gridItem('Hop-28.webp', '014', 'Between Shelves.'),
        gridItem('Hop-30.webp', '015', 'Head Tilt.', true),
        gridItem('Hop-31.webp', '016', 'Riot of Colour.'),
        gridItem('Hop-32.webp', '017', 'Signal.'),
        gridItem('Hop-33.webp', '018', 'Noise.'),
        gridItem('Hop-36.webp', '019', 'Glance.', true),
        gridItem('Hop-38.webp', '020', 'Texture.'),
        gridItem('Hop-39.webp', '021', 'Last Frame.'),
        gridItem('Hop-44.webp', '022', 'Stillness.'),
        gridItem('Hop-49.webp', '023', 'Final Cut.', true),
        gridItem('Hop-64.webp', '024', 'Exit.'),
      ],
    },
    {
      _id: 'portfolio-raw', _type: 'portfolioChapter', order: 3,
      roman: 'III', name: 'Raw', sub: 'Street Portraits · Unfiltered Frames',
      bookNum: '25', bookLabel: 'Raw — Unfiltered Archive',
      bookTitle: 'Before', bookTitleEm: 'the Edit',
      bookBody: 'Not every frame needs a filter. Some images are perfect precisely because they are unpolished — a flash of real light, an unexpected shadow.',
      bookCollection: 'Archive: Raw, 2024',
      bookImage: img('Edited_MG_0082.webp'), bookCaption: 'Pink in the City · Frame 025',
      gridLabel: 'Selected Frames — Raw',
      grid: [
        gridItem('Edited_MG_0218.webp', '026', 'Unfiltered.', true),
        gridItem('Edited_MG_0242.webp', '027', 'Raw Edge.'),
        gridItem('IMG_3097.webp', '028', 'Street Portrait.'),
        gridItem('_MG_0034.webp', '029', 'Direction Study.', true),
        gridItem('_MG_0070.webp', '030', 'Candid.'),
        gridItem('_MG_0204.webp', '031', 'Movement.'),
        gridItem('_MG_0245.webp', '032', 'The Last Frame.', true),
      ],
    },
  ];

  const docs = [settings, ...gallery, portfolioSettings, ...chapters];
  console.log(`Writing ${docs.length} documents…`);
  const tx = client.transaction();
  docs.forEach(d => tx.createOrReplace(d));
  await tx.commit();
  console.log('✓ Seed complete. Open /studio to see & edit everything.');
}

seed().catch(err => { console.error('\nSEED FAILED:', err.message); process.exit(1); });
