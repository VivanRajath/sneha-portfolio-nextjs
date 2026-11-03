'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import s from './CaseStudy.module.css';

gsap.registerPlugin(ScrollTrigger);

export type Entry = {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  kind: string;
  year: string;
  concept: string;
  quote?: { text: string; her: boolean };
  credits: [string, string][];
  ig?: string;
  images: string[];
};

// rhythm of the gallery: full-bleed, pair, pair, full, pair...
function chunk(images: string[]) {
  const out: string[][] = [];
  let i = 0;
  let step = 0;
  while (i < images.length) {
    const size = step % 3 === 0 ? 1 : 2;
    out.push(images.slice(i, i + size));
    i += size;
    step++;
  }
  return out;
}

export default function CaseStudy({ entry: p, next }: { entry: Entry; next: Entry }) {
  const root = useRef<HTMLDivElement>(null);
  const [cover, ...rest] = p.images;

  useGSAP(
    () => {
      gsap.from(`.${s.titleCh}`, { yPercent: 100, duration: 1.2, ease: 'expo.out', stagger: 0.035, delay: 0.1 });
      gsap.from(`.${s.metaItem}`, { opacity: 0, y: 12, duration: 0.8, ease: 'power3.out', stagger: 0.06, delay: 0.4 });
      gsap.from(`.${s.hero}`, { clipPath: 'inset(30% 12% 30% 12%)', duration: 1.6, ease: 'expo.out', delay: 0.3 });
      gsap.to(`.${s.heroImg}`, {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: `.${s.hero}`, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(`.${s.shot}`).forEach((el) => {
        gsap.from(el, { clipPath: 'inset(14% 0 14% 0)', duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });
    },
    { scope: root, dependencies: [p.slug], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={s.page}>
      <header className={s.head}>
        <Link href="/#work" className={`mono ${s.back}`}>
          ← Back to the story
        </Link>
        <h1 className={s.title} aria-label={p.title}>
          {p.title.split('').map((c, i) => (
            <span key={i} className={s.mask}>
              <span className={s.titleCh}>{c === ' ' ? ' ' : c}</span>
            </span>
          ))}
        </h1>
        <p className={`serif ${s.tagline}`}>{p.tagline}</p>

        <dl className={s.meta}>
          {[['Story', p.index], ['Field', p.kind], ['Year', p.year || '—'], ...p.credits.slice(0, 1)].map(([k, v]) => (
            <div key={k} className={s.metaItem}>
              <dt className="mono">{k}</dt>
              <dd className="mono">{v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className={s.hero}>
        <Image src={cover} alt={p.title} fill sizes="100vw" preload className={s.heroImg} />
      </div>

      <section className={s.overview}>
        <span className={`mono ${s.ovLabel}`}>The concept</span>
        <div>
          <p className={s.ovText}>{p.concept}</p>
          {p.quote && (
            <blockquote className={s.quote}>
              <p>“{p.quote.text}”</p>
              {p.quote.her && <cite className="mono">— Sneha, in her own words</cite>}
            </blockquote>
          )}
          <dl className={s.credits}>
            {p.credits.map(([k, v]) => (
              <div key={k}>
                <dt className="mono">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
          {p.ig && (
            <a href={p.ig} target="_blank" rel="noreferrer" className={`mono ${s.ig}`}>
              View on Instagram ↗
            </a>
          )}
        </div>
      </section>

      <section className={s.gallery}>
        {chunk(rest).map((row, r) => (
          <div key={r} className={row.length === 1 ? s.full : s.pair}>
            {row.map((src) => (
              <div key={src} className={s.shot}>
                <Image src={src} alt="" fill sizes={row.length === 1 ? '100vw' : '50vw'} />
              </div>
            ))}
          </div>
        ))}
      </section>

      <Link href={`/work/${next.slug}`} className={s.next}>
        <span className="mono">Next story → {next.index}</span>
        <span className={s.nextName}>{next.title}</span>
        <span className={s.nextImg}>
          <Image src={next.images[0]} alt="" fill sizes="30vw" />
        </span>
      </Link>
    </div>
  );
}
