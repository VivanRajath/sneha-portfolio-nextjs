import { createClient } from 'next-sanity';

const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// ── TYPES ────────────────────────────────

export interface SanitySettings {
  heroImages?:       Array<{ asset: { url: string } }>;
  aboutMainImage?:   { asset: { url: string } };
  aboutAccentImage?: { asset: { url: string } };
  aboutBio?:         string;
}

export interface SanityGallerySection {
  _id:         string;
  title?:      string;
  collection?: string;
  heroImage?:  { asset: { url: string } };
  images?:     Array<{ asset: { url: string } }>;
  order?:      number;
}

export interface SanityImg { asset?: { url: string } }

export interface SanityPortfolioSettings {
  heroImage?:     SanityImg;
  heroKicker?:    string;
  heroTitle?:     string;
  heroTitleEm?:   string;
  heroSub?:       string;
  frameCount?:    string;
  chapterCount?:  string;
  closingQuote?:  string;
  closingQuoteEm?:string;
  closingAuthor?: string;
}

export interface SanityPortfolioGridItem {
  image?: SanityImg;
  num?:   string;
  story?: string;
  tall?:  boolean;
}

export interface SanityPortfolioChapter {
  _id:            string;
  roman?:         string;
  name?:          string;
  sub?:           string;
  order?:         number;
  fullImage?:     SanityImg;
  fullFrame?:     string;
  fullTitle?:     string;
  fullTitleEm?:   string;
  fullBody?:      string;
  bookNum?:       string;
  bookLabel?:     string;
  bookTitle?:     string;
  bookTitleEm?:   string;
  bookBody?:      string;
  bookCollection?:string;
  bookImage?:     SanityImg;
  bookCaption?:   string;
  gridLabel?:     string;
  grid?:          SanityPortfolioGridItem[];
}

// ── QUERIES ──────────────────────────────

export const settingsQuery = `*[_type == "settings"][0]{
  heroImages[]{ asset->{ url } },
  aboutMainImage{ asset->{ url } },
  aboutAccentImage{ asset->{ url } },
  aboutBio
}`;

export const gallerySectionsQuery = `*[_type == "gallerySection"] | order(order asc){
  _id,
  title,
  collection,
  heroImage{ asset->{ url } },
  images[]{ asset->{ url } },
  order
}`;

export const portfolioSettingsQuery = `*[_type == "portfolioSettings"][0]{
  heroImage{ asset->{ url } },
  heroKicker, heroTitle, heroTitleEm, heroSub,
  frameCount, chapterCount,
  closingQuote, closingQuoteEm, closingAuthor
}`;

export const portfolioChaptersQuery = `*[_type == "portfolioChapter"] | order(order asc){
  _id, roman, name, sub, order,
  fullImage{ asset->{ url } }, fullFrame, fullTitle, fullTitleEm, fullBody,
  bookNum, bookLabel, bookTitle, bookTitleEm, bookBody, bookCollection,
  bookImage{ asset->{ url } }, bookCaption,
  gridLabel,
  grid[]{ image{ asset->{ url } }, num, story, tall }
}`;
