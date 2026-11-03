import fs from 'node:fs';
import path from 'node:path';

const IMG = /\.(jpe?g|png|webp|avif)$/i;

/** Every photo in /public/work/<slug>/, in natural filename order (01, 02 … 10). */
export function workImages(slug: string): string[] {
  const dir = path.join(process.cwd(), 'public', 'work', slug);
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMG.test(f))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
      .map((f) => `/work/${slug}/${encodeURIComponent(f)}`);
  } catch {
    return [];
  }
}
