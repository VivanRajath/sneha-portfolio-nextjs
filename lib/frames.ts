import path from 'node:path';
import sharp from 'sharp';
import { alsoStyled, chapters, moods } from './data';
import { workImages } from './images';

export type Frame = { src: string; w: number; h: number; project: string; moods: string[] };

/** Every photo across every project folder, with its real size (for the masonry grid). */
export async function allFrames(): Promise<Frame[]> {
  const projects = [
    ...chapters.map((c) => ({ slug: c.slug, title: c.title })),
    ...alsoStyled.map((x) => ({ slug: x.slug, title: x.title })),
  ];
  const out: Frame[] = [];
  for (const p of projects) {
    for (const src of workImages(p.slug)) {
      const file = path.join(process.cwd(), 'public', decodeURIComponent(src));
      let w = 4;
      let h = 5;
      try {
        const m = await sharp(file).metadata();
        if (m.width && m.height) {
          w = m.width;
          h = m.height;
        }
      } catch {}
      out.push({ src, w, h, project: p.title, moods: moods.filter((m) => m.images.includes(src)).map((m) => m.id) });
    }
  }
  return out;
}
