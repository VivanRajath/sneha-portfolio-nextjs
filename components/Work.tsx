'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ChapterTitle from './ChapterTitle';
import Deco from './Deco';
import s from './Work.module.css';

gsap.registerPlugin(ScrollTrigger);

export type WorkItem = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  kind: string;
  year: string;
  color: string;
  ink: string;
  ig?: string;
  images: string[];
};

export default function Work({ items }: { items: WorkItem[] }) {
  const root = useRef<HTMLElement>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [active, setActive] = useState(0);
  const withImages = items.filter((p) => p.images.length);

  // page height changes between grid and list — re-measure every trigger below
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [view]);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(`.${s.card}`, root.current).forEach((c) => {
        gsap.from(c, {
          clipPath: 'inset(18% 8% 18% 8%)',
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: { trigger: c, start: 'top 88%' },
        });
      });
    },
    { scope: root, dependencies: [view], revertOnUpdate: true },
  );

  const cur = items[active];

  return (
    <section ref={root} className={s.wrap} id="work">
      <Deco
        items={[
          { src: '/accessories/digicam.svg', top: '150px', right: '22%', size: 'clamp(70px, 7vw, 120px)', anim: 'float', drift: 0.7 },
          { src: '/accessories/heart-glasses.webp', top: '230px', right: '5%', size: 'clamp(70px, 6.6vw, 110px)', anim: 'wiggle', drift: 0.4, rotate: -10 },
          { src: '/accessories/bracelet.webp', top: '110px', right: '40%', size: 'clamp(48px, 4.4vw, 74px)', anim: 'swing', drift: 1 },
          { src: '/accessories/flower-charm.webp', bottom: '120px', left: '2%', size: 'clamp(44px, 4vw, 66px)', anim: 'wiggle', drift: 0.6 },
          { src: '/accessories/scrunchie.webp', bottom: '90px', right: '3%', size: 'clamp(56px, 5vw, 84px)', anim: 'spin', drift: 0.5 },
        ]}
      />

      <ChapterTitle n="04" title="The w" script="ork" line="Nine concepts, a few side quests — every one with a story." />

      <div className={`mono ${s.label}`}>
        <span>
          {items.length} stories · {withImages.reduce((n, p) => n + p.images.length, 0)} frames
        </span>
        <div className={s.toggle}>
          <button className={view === 'grid' ? s.on : ''} onClick={() => setView('grid')}>
            [Grid]
          </button>
          <button className={view === 'list' ? s.on : ''} onClick={() => setView('list')}>
            [List]
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className={s.grid}>
          {withImages.map((p, i) => (
            <Link key={p.slug} href={`/work/${p.slug}`} className={`${s.item} ${i === 0 ? s.tall : ''}`}>
              <div className={s.card}>
                <Image src={p.images[0]} alt={p.name} fill sizes="(max-width: 760px) 100vw, 50vw" className={s.cover} />
                {p.images[1] && (
                  <Image src={p.images[1]} alt="" fill sizes="(max-width: 760px) 100vw, 50vw" className={s.hoverImg} />
                )}
                <span className={`mono ${s.idx}`}>{p.index}</span>
              </div>
              <div className={s.meta}>
                <span className={s.pname}>{p.name}</span>
                <span className={`mono ${s.tags}`}>{p.kind}</span>
                <span className="mono">{p.year}</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className={s.listWrap}>
          <ul className={s.list}>
            {items.map((p, i) => {
              const inner = (
                <>
                  <span className="mono">{p.index}</span>
                  <span className={s.rowName}>{p.name}</span>
                  <span className={`mono ${s.rowTag}`}>{p.tagline}</span>
                  <span className="mono">{p.images.length ? p.year : 'IG ↗'}</span>
                </>
              );
              const props = {
                className: `${s.row} ${active === i ? s.rowOn : ''}`,
                onPointerEnter: () => setActive(i),
                onFocus: () => setActive(i),
              };
              return (
                <li key={p.slug}>
                  {p.images.length ? (
                    <Link href={`/work/${p.slug}`} {...props}>
                      {inner}
                    </Link>
                  ) : (
                    <a href={p.ig} target="_blank" rel="noreferrer" {...props}>
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className={s.ipadZone}>
            <div className={s.ipad}>
              <span className={s.cam} />
              <div className={s.ipadScreen}>
                {items.map((p, i) =>
                  p.images.length ? (
                    <Image
                      key={p.slug}
                      src={p.images[0]}
                      alt=""
                      fill
                      sizes="40vw"
                      className={`${s.ipadImg} ${active === i ? s.ipadImgOn : ''}`}
                    />
                  ) : (
                    <div
                      key={p.slug}
                      className={`${s.ipadImg} ${s.ipadCard} ${active === i ? s.ipadImgOn : ''}`}
                      style={{ background: p.color, color: p.ink }}
                    >
                      <span className="mono">{p.kind}</span>
                      <span className={s.ipadTitle}>{p.name}</span>
                      <span className="mono">Photos on Instagram ↗</span>
                    </div>
                  ),
                )}
                <span className={`mono ${s.ipadBar}`}>
                  {cur.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')}.ai — {cur.year}
                </span>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/accessories/pencil.webp" alt="" className={s.pencil} />
          </div>
        </div>
      )}

      <Link href="/portfolio" className={s.cta}>
        <span className="mono">Every frame, sorted by mood</span>
        <span className={s.ctaText}>
          See the full portfolio <span className={s.arrow}>→</span>
        </span>
      </Link>
    </section>
  );
}
