import { createClient } from 'next-sanity';

const projectId  = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset    = process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01';

// Public CDN client — used for all read queries on the portfolio
export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

// Authenticated client — used for preview / write operations from the studio
export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// ── GROQ QUERIES ────────────────────────

export const galleryQuery = `*[_type == "gallery"][0]{
  heroRevealImage,
  images[]{
    asset->{url, metadata},
    alt
  },
  showMoreImages[]{
    asset->{url, metadata},
    alt
  }
}`;

export const collectionsQuery = `*[_type == "collection"] | order(order asc){
  _id,
  name,
  tagline,
  coverImage{asset->{url}},
  images[]{asset->{url}},
  slug
}`;

export const settingsQuery = `*[_type == "settings"][0]{
  heroImage{asset->{url}},
  aboutImage{asset->{url}},
  aboutBio
}`;
