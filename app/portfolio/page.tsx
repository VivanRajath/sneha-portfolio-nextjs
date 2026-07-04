import type { Metadata } from 'next';
import {
  sanityClient,
  portfolioSettingsQuery,
  portfolioChaptersQuery,
} from '@/lib/sanity';
import type { SanityPortfolioSettings, SanityPortfolioChapter } from '@/lib/sanity';
import PortfolioClient from '@/components/portfolio/PortfolioClient';
import { mapSettings, mapChapters } from '@/components/portfolio/portfolioData';

export const metadata: Metadata = {
  title: 'Portfolio — Sneha, Fashion Designer',
  description:
    'The complete portfolio of Sneha — a visual narrative spanning editorial collections, heritage couture and street fashion storytelling.',
};

export default async function PortfolioPage() {
  let settings: SanityPortfolioSettings | null = null;
  let chapters: SanityPortfolioChapter[] = [];
  try {
    [settings, chapters] = await Promise.all([
      sanityClient.fetch<SanityPortfolioSettings>(portfolioSettingsQuery),
      sanityClient.fetch<SanityPortfolioChapter[]>(portfolioChaptersQuery),
    ]);
  } catch {}

  return (
    <PortfolioClient
      settings={mapSettings(settings)}
      chapters={mapChapters(chapters || [])}
    />
  );
}
