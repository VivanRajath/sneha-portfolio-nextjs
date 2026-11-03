'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Deco from './Deco';
import { moods } from '@/lib/data';
import type { Frame } from '@/lib/frames';
import s from './Gallery.module.css';

const readHash = () => {
  if (typeof window === 'undefined') return 'all';
  const m = window.location.hash.match(/^#mood-([a-z]+)$/);
  return m && moods.some((x) => x.id === m[1]) ? m[1] : 'all';
};

export default function Gallery({ frames }: { frames: Frame[] }) {
  const root = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState('all');
  const [open, setOpen] = useState<number | null>(null);

  // #mood-<colour> in the URL picks the filter (and follows back/forward)
  useEffect(() => {
    const sync = () => setFilter(readHash());
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const choose = (id: string) => {
    setFilter(id);
    const url = id === 'all' ? window.location.pathname : `${window.location.pathname}#mood-${id}`;
    window.history.replaceState(null, '', url);
  };

  const mood = moods.find((m) => m.id === filter);
  const items = useMemo(() => (mood ? frames.filter((f) => f.moods.includes(mood.id)) : frames), [mood, frames]);
  const projects = new Set(frames.map((f) => f.project)).size;

  useGSAP(
    () => {
      gsap.from(`.${s.item}`, { y: 50, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.035 });
      gsap.from(`.${s.bannerInner} > *`, { y: 30, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08 });
    },
    { scope: root, dependencies: [filter], revertOnUpdate: true },
  );

  // lightbox
  const close = useCallback(() => setOpen(null), []);
  const nav = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)),
    [items.length],
  );
  useEffect(() => {
    if (open === null) return;
    window.__lenis?.stop();
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') nav(1);
      if (e.key === 'ArrowLeft') nav(-1);
    };
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('keydown', key);
      window.__lenis?.start();
    };
  }, [open, close, nav]);

  const current = open !== null ? items[open] : null;

  return (
    <div
      ref={root}
      className={s.page}
      style={{ '--mood': mood?.color ?? '#111110', '--mood-ink': mood?.ink ?? '#F1EEE7' } as React.CSSProperties}
    >
      <header className={s.head}>
        <Deco
          items={[
            { src: '/accessories/instant-camera.svg', top: '84px', right: '4%', size: 'clamp(70px, 7vw, 116px)', anim: 'wiggle', drift: 0.6, rotate: 12, mobile: true },
            { src: '/accessories/headphones.webp', top: '110px', right: '24%', size: 'clamp(54px, 5vw, 84px)', anim: 'float', drift: 0.4 },
            { src: '/accessories/scrunchie.webp', top: '40%', right: '14%', size: 'clamp(50px, 4.6vw, 76px)', anim: 'swing', drift: 0.8 },
          ]}
        />
        <h1 className={s.title}>
          PORTF<span className={`script ${s.o}`}>o</span>LIO
        </h1>
        <div className={`mono ${s.headMeta}`}>
          <span>{frames.length} frames</span>
          <span>{projects} stories</span>
          <span>{moods.length} moods</span>
        </div>
      </header>

      <nav className={s.bar} aria-label="Filter by mood">
        <button className={`mono ${s.pill} ${filter === 'all' ? s.pillOn : ''}`} onClick={() => choose('all')}>
          <span className={s.allDot} />
          All
          <span className={s.n}>{frames.length}</span>
        </button>
        {moods.map((m) => (
          <button key={m.id} className={`mono ${s.pill} ${filter === m.id ? s.pillOn : ''}`} onClick={() => choose(m.id)}>
            <span className={s.dot} style={{ background: m.color }} />
            {m.name}
            <span className={s.n}>{frames.filter((f) => f.moods.includes(m.id)).length}</span>
          </button>
        ))}
      </nav>

      <section className={`${s.banner} ${mood ? s.bannerMood : ''}`}>
        <div className={s.bannerInner}>
          <span className="mono">{mood ? `Mood — ${mood.color}` : 'Everything, unsorted'}</span>
          <p className={s.statement}>
            {mood ? `“${mood.statement}”` : '“Every frame is a sentence. Pick a colour to read it in a mood.”'}
          </p>
          <span className={`script ${s.bannerName}`}>{mood ? mood.name : 'the archive'}</span>
        </div>
      </section>

      <section className={s.grid}>
        {items.map((f, i) => (
          <button key={f.src} className={s.item} onClick={() => setOpen(i)} data-cursor>
            <Image
              src={f.src}
              alt={`${f.project} — frame ${i + 1}`}
              width={f.w}
              height={f.h}
              sizes="(max-width: 600px) 50vw, (max-width: 1100px) 33vw, 25vw"
              className={s.img}
            />
            <span className={`mono ${s.cap}`}>
              <span>{String(i + 1).padStart(3, '0')}</span>
              <span>{f.project}</span>
            </span>
          </button>
        ))}
      </section>

      {current && (
        <div className={s.lightbox} role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={close}>
          <div className={s.lbImg} onClick={(e) => e.stopPropagation()}>
            <Image src={current.src} alt={current.project} fill sizes="100vw" className={s.lbPic} />
          </div>
          <div className={`mono ${s.lbBar}`} onClick={(e) => e.stopPropagation()}>
            <span>
              {String(open! + 1).padStart(3, '0')} / {String(items.length).padStart(3, '0')} — {current.project}
            </span>
            <span className={s.lbBtns}>
              <button onClick={() => nav(-1)}>← Prev</button>
              <button onClick={() => nav(1)}>Next →</button>
              <button onClick={close}>Close ✕</button>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
