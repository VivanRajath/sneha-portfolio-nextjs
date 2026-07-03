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

export interface SanityCollection {
  _id:          string;
  name:         string;
  tagline:      string;
  desc?:        string;
  coverImage?:  { asset: { url: string } };
  thumbs?:      Array<{ asset: { url: string } }>;
  slug?:        { current: string };
  order?:       number;
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

export const collectionsQuery = `*[_type == "collection"] | order(order asc){
  _id,
  name,
  tagline,
  desc,
  coverImage{ asset->{ url } },
  thumbs[]{ asset->{ url } },
  slug,
  order
}`;
