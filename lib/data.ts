// ─────────────────────────────────────────────────────────────
//  Sneha's story. All copy lives here.
//  Photos: drop files into /public/work/<slug>/ (01.jpg, 02.jpg …) —
//  the site picks them up automatically, in filename order.
//  Quotes marked `her: true` are Sneha's own words (from her captions).
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Sneha Sridhar',
  first: 'Sneha',
  last: 'Sridhar',
  role: 'Fashion Stylist & Creative Director',
  city: 'Bengaluru',
  email: 'snehasridhar.work@gmail.com',
  instagram: { handle: '@museonzidray', url: 'https://www.instagram.com/museonzidray/' },
  vibe: ['Contemporary', 'Experimental', 'Nostalgic', 'Surreal'],
  // the big statement that fills in as you scroll
  statement:
    'I don’t just dress people. I write them a story to walk out in — contemporary, a little experimental, quietly nostalgic and slightly surreal.',
};

const ph = (n: number) => `/work/phool/${String(n).padStart(2, '0')}.webp`;
const gr = (n: number) => `/work/grocery-run/${String(n).padStart(2, '0')}.webp`;
const bl = '/work/between-looks/01.webp';

// flipbook on the hero computer screen
export const heroFrames = [
  { src: ph(2), label: 'Phool — 2024' },
  { src: gr(1), label: 'The Grocery Run' },
  { src: ph(13), label: 'Phool — 2024' },
  { src: ph(3), label: 'Phool — 2024' },
  { src: gr(7), label: 'The Grocery Run' },
  { src: ph(15), label: 'Phool — 2024' },
  { src: ph(1), label: 'Phool — 2024' },
  { src: gr(3), label: 'The Grocery Run' },
  { src: ph(17), label: 'Phool — 2024' },
  { src: bl, label: 'Between Looks and Deadlines' },
];

// ── About me ── (illustrated Sneha lives in components/CartoonSneha.tsx)
export const about = {
  intro:
    'I’m Sneha Sridhar — a fashion stylist and creative director from Bengaluru. I build looks like stories: a concept, a mood, a woman, and the world she walks into.',
  more: 'It started with Metallic Epoch, my graduation collection in just gold and ivory, which won Best Colour Palette. Today it’s editorials, campaigns and conceptual shoots — sketched on an iPad, built in Illustrator, pinned to a very full mood deck.',
  // the magazine: cover lines + the interview inside
  cover: {
    image: '/work/phool/02.webp',
    lines: ['The stylist who won with just two colours', 'Nine concept shoots, one story', 'Inside: what’s in her kit'],
  },
  interview: [
    {
      q: 'Where did it start?',
      a: 'With Metallic Epoch, my graduation collection — gold and ivory, five designs. It won Best Colour Palette.',
    },
    {
      q: 'What do you make now?',
      a: 'Concept shoots, editorials and campaigns — Untamed Form, Saaya, False Spring, The Unnatural Form of Reality.',
    },
    {
      q: 'How would you describe the work?',
      a: 'Contemporary, a little experimental, quietly nostalgic and slightly surreal.',
    },
  ],
  facts: [
    ['Based', 'Bengaluru, India'],
    ['Does', 'Styling, creative direction, concept shoots'],
    ['Vibe', 'Contemporary / Experimental / Nostalgic / Surreal'],
    ['Instagram', '@museonzidray'],
  ] as [string, string][],
};

export type ToolId = 'pencil' | 'ipad' | 'illustrator' | 'deck' | 'computer' | 'accessories';
export const tools: { id: ToolId; name: string; line: string; img: string }[] = [
  { id: 'pencil', name: 'Apple Pencil', line: 'Where every silhouette starts.', img: '/accessories/pencil.webp' },
  { id: 'ipad', name: 'iPad', line: 'The sketchbook that never runs out.', img: '/accessories/ipad.webp' },
  { id: 'illustrator', name: 'Illustrator', line: 'Flats, prints and tech packs.', img: '/accessories/illustrator.webp' },
  { id: 'deck', name: 'Mood Deck', line: 'The before of everything.', img: '/accessories/mood-deck.webp' },
  { id: 'computer', name: 'Computer', line: 'Not a laptop. Ever.', img: '/accessories/computer.webp' },
  { id: 'accessories', name: 'Accessories', line: 'The finishing chaos.', img: '/accessories/heart-glasses.webp' },
];

// ── Moods: the colour wheel + filters on /portfolio ──
export type Mood = { id: string; name: string; color: string; ink: string; statement: string; images: string[] };
export const moods: Mood[] = [
  { id: 'satin', name: 'Satin', color: '#B0103A', ink: '#F6E7E1', statement: 'Red isn’t a colour. It’s a decision.', images: [ph(13), ph(15), ph(17), ph(14), ph(16), ph(19), ph(20), ph(21)] },
  { id: 'marigold', name: 'Marigold', color: '#FF9416', ink: '#1A1208', statement: 'Dress like the flower market is your runway.', images: [ph(3), ph(1), ph(6), ph(4), ph(7), ph(5), ph(8), ph(9)] },
  { id: 'bubblegum', name: 'Bubblegum', color: '#FF9CCB', ink: '#2A0C1A', statement: 'Soft hair. Hard attitude.', images: [gr(5), gr(7), gr(1), gr(3), gr(6)] },
  { id: 'lime', name: 'Lace Lime', color: '#D2FF3C', ink: '#111110', statement: 'Loud enough to be seen from aisle seven.', images: [gr(2), gr(4), gr(3), gr(1)] },
  { id: 'jasmine', name: 'Jasmine', color: '#F4EEDF', ink: '#111110', statement: 'Wear the flowers your grandmother wore.', images: [ph(2), ph(10), ph(12), ph(11), ph(22)] },
  { id: 'midnight', name: 'Midnight', color: '#1F3B3F', ink: '#EAF2EE', statement: 'Glamour belongs in back rooms too.', images: [ph(24), ph(23), ph(18), bl, ph(22)] },
];

export const services = [
  { n: '001', t: 'Fashion Styling', d: 'Editorials, lookbooks and campaigns — styled on set, down to the last ring.' },
  { n: '002', t: 'Creative Direction', d: 'Concept, casting, location, mood. Building the world the clothes live in.' },
  { n: '003', t: 'Concept Shoots', d: 'From a single feeling to a finished story — like Untamed Form, Saaya and False Spring.' },
  { n: '004', t: 'Illustration & Tech Packs', d: 'Fashion illustration, flats and production-ready tech packs, drawn in Illustrator.' },
  { n: '005', t: 'Moodboards & Concept', d: 'Mood decks that make a brief feel inevitable before a single stitch.' },
];

export type Variant =
  | 'quiet'
  | 'pair'
  | 'glitch'
  | 'collage'
  | 'filmstrip'
  | 'spotlight'
  | 'mirror'
  | 'curtain'
  | 'veil';

export type Chapter = {
  slug: string;
  numeral: string;
  title: string;
  year: string;
  kind: string;
  /** one line under the title */
  tagline: string;
  concept: string;
  quote?: { text: string; her: boolean };
  credits: [string, string][];
  palette: { bg: string; fg: string; accent: string };
  variant: Variant;
  ig?: string;
};

export const chapters: Chapter[] = [
  {
    slug: 'metallic-epoch',
    numeral: 'I',
    title: 'Metallic Epoch',
    year: '2024',
    kind: 'Graduation Collection · Best Colour Palette',
    tagline: 'Where it started — two colours, five designs.',
    concept:
      'My final portfolio collection, inspired by the Bronze Era — a concept built on timelessness and silent strength. I worked with just two colours, gold and ivory. Five designs. Every piece spoke on its own.',
    quote: {
      text: 'It wasn’t loud, it wasn’t screaming for attention. It was clean, it was rich, and it made sense.',
      her: true,
    },
    credits: [
      ['Design', 'Sneha Sridhar'],
      ['Award', 'Best Colour Palette'],
    ],
    palette: { bg: '#EDE5D6', fg: '#2A2118', accent: '#A8823E' },
    variant: 'quiet',
    ig: 'https://www.instagram.com/p/DKnDG1fzrhj/',
  },
  {
    slug: 'phool',
    numeral: 'II',
    title: 'Phool',
    year: '2024',
    kind: 'Editorial',
    tagline: 'Satin in a flower market.',
    concept:
      'A red satin column dropped into the marigold stalls of a Bengaluru flower market at dawn — and carried into the back rooms behind it. Couture, styled into the most ordinary, most beautiful place in the city.',
    credits: [['Styling', 'Sneha Sridhar']],
    palette: { bg: '#1B0F0B', fg: '#F3E6D6', accent: '#E2851B' },
    variant: 'pair',
  },
  {
    slug: 'soft-error',
    numeral: 'III',
    title: 'SoftError',
    year: '2025',
    kind: 'Conceptual Editorial',
    tagline: 'A clean disruption.',
    concept:
      'Minimal lines, a quiet colour story and a sneaker to ground it — street-informed femininity with a glitch in the system.',
    credits: [
      ['Styling', '@museonzidray & @the_arkived'],
      ['Model', '@mithi_bijkal'],
      ['MUA', '@a.m.z_96'],
      ['Photography', '@wime_studios'],
    ],
    palette: { bg: '#D9DBDF', fg: '#14161A', accent: '#5B4BD1' },
    variant: 'glitch',
    ig: 'https://www.instagram.com/p/DKxMcwdTEd9/',
  },
  {
    slug: 'raw-flora',
    numeral: 'IV',
    title: 'Raw Flora',
    year: '2025',
    kind: 'Editorial',
    tagline: 'Whimsical, floral, braided.',
    concept: 'Petals, a long braid and soft light — a whimsical floral study in hair, make-up and styling.',
    credits: [
      ['Styling & CD', '@museonzidray'],
      ['Muse', '@mondira_deshmukh'],
      ['MUA', '@blush_stories_by_rupa'],
      ['Hair', '@styleyourhairbyshilpa'],
      ['Shot by', '@kindredphototales'],
      ['Edit', '@wime_studios'],
    ],
    palette: { bg: '#F1DEDB', fg: '#3A1C22', accent: '#C24E68' },
    variant: 'collage',
    ig: 'https://www.instagram.com/p/DZISSY2E-b3/',
  },
  {
    slug: 'untamed-form',
    numeral: 'V',
    title: 'Untamed Form',
    year: '2025',
    kind: 'Editorial · Noir',
    tagline: 'Untamed form in noir energy.',
    concept:
      'A woman exists in a space where nothing defines her — no roles, no expectations, no softness forced upon her.',
    quote: { text: 'She doesn’t perform femininity. She redefines it.', her: true },
    credits: [
      ['Styling & CD', '@museonzidray'],
      ['Shot by', '@likitharajashekar.photographer'],
      ['Muse', '@manasavijayy'],
      ['HMUA', '@blush_stories_by_rupa'],
      ['Studio', '@tulips.studio'],
    ],
    palette: { bg: '#0B0B0B', fg: '#EDEDED', accent: '#8C8C8C' },
    variant: 'filmstrip',
    ig: 'https://www.instagram.com/p/DYkRrE7E53V/',
  },
  {
    slug: 'saaya',
    numeral: 'VI',
    title: 'Saaya',
    year: '2025',
    kind: 'Jewellery Editorial',
    tagline: 'Heirloom gold, held in shadow.',
    concept:
      'Saaya — shadow. Heritage and temple jewellery lit low through smoke, so the gold is the only thing that speaks.',
    credits: [
      ['Styling & Concept', '@museonzidray'],
      ['Shot by', '@wime_studios'],
      ['Jewellery', '@anairaaofficial'],
      ['In frame', '@varuni.ag'],
      ['MUA', '@blush_stories_by_rupa'],
    ],
    palette: { bg: '#1A110A', fg: '#F1DFC2', accent: '#C99A45' },
    variant: 'spotlight',
    ig: 'https://www.instagram.com/p/DakrFg-Ews_/',
  },
  {
    slug: 'mira',
    numeral: 'VII',
    title: 'Mira',
    year: '2025',
    kind: 'Editorial',
    tagline: 'A revival of grace.',
    concept: 'Grace, mirrors and lotus — a portrait of quiet, unsaid things.',
    quote: { text: 'A reflection of everything she never had to say.', her: true },
    credits: [
      ['Styling', '@museonzidray'],
      ['Shot by', '@_chegavar_'],
      ['HMUA', '@lookslikemk'],
      ['Muse', '@_haripriyag_'],
    ],
    palette: { bg: '#E8DFDA', fg: '#2B2422', accent: '#B07A82' },
    variant: 'mirror',
    ig: 'https://www.instagram.com/p/DZ7i30zk6Yt/',
  },
  {
    slug: 'false-spring',
    numeral: 'VIII',
    title: 'False Spring',
    year: '2025',
    kind: 'Studio Editorial',
    tagline: 'Lace, velvet red, a season that came too soon.',
    concept:
      'Ivory lace against deep red velvet — a cinematic studio story about blooming before it is safe to.',
    credits: [
      ['Styling & CD', '@museonzidray'],
      ['Shot by', '@wime_studios'],
      ['Muse', '@varuni.ag'],
      ['MUA', '@blush_stories_by_rupa'],
    ],
    palette: { bg: '#3A090E', fg: '#F5E6E0', accent: '#E9D6C4' },
    variant: 'curtain',
    ig: 'https://www.instagram.com/p/DaDMy57E-0e/',
  },
  {
    slug: 'unnatural-form',
    numeral: 'IX',
    title: 'The Unnatural Form of Reality',
    year: '2025',
    kind: 'Conceptual Editorial',
    tagline: 'What exists within, and what the world perceives.',
    concept:
      'What exists within a person can be entirely different from what the world perceives. This explores that unseen space — where the familiar human form becomes something strange, abstract and beyond ordinary perception.',
    quote: { text: 'Reality is never singular.', her: true },
    credits: [
      ['Stylist & CD', '@museonzidray'],
      ['Muse', '@camilamaleskii'],
      ['Shot by', '@wime_studios'],
      ['MUA', '@blush_stories_by_rupa'],
      ['Hair', '@styleyourhairbyshilpa'],
    ],
    palette: { bg: '#1D2320', fg: '#E7E3D7', accent: '#A3B4A6' },
    variant: 'veil',
    ig: 'https://www.instagram.com/p/DdY_WDMk1il/',
  },
];

/** Shorter collaborations, shown after the nine chapters. */
export type Side = { slug: string; title: string; note: string; with: string; ig?: string };
export const alsoStyled: Side[] = [
  {
    slug: 'pop-and-patina',
    title: 'Pop & Patina',
    note: 'Bold Gen-Z colour blocking meets oxidised jewellery and timeless Indian textiles.',
    with: 'with @saran.gullig',
    ig: 'https://www.instagram.com/p/DdEoT-TEmDJ/',
  },
  {
    slug: 'between-looks',
    title: 'Between Looks and Deadlines',
    note: 'Pearls, braids and a red telephone — “It’s Britney!”',
    with: 'with @purepixelss · @pma.ly',
    ig: 'https://www.instagram.com/p/DPBxztqDACe/',
  },
  {
    slug: 'grocery-run',
    title: 'The Grocery Run',
    note: 'Pink hair, maroon leather, lime lace and a trolley — round two.',
    with: 'with @thaarahh',
    ig: 'https://www.instagram.com/p/DW-nNFxierN/',
  },
];
