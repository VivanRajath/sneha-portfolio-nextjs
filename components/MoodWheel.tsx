'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ChapterTitle from './ChapterTitle';
import Deco from './Deco';
import { moods } from '@/lib/data';
import s from './MoodWheel.module.css';

gsap.registerPlugin(ScrollTrigger);

const C = 230; // centre of the 460 viewBox
const R = 196; // outer radius
const r = 96; // inner radius (photo window)
const GAP = 1.4; // degrees between slices

const pt = (rad: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  // rounded so server and client print identical SVG numbers
  return [Math.round((C + rad * Math.cos(a)) * 100) / 100, Math.round((C + rad * Math.sin(a)) * 100) / 100];
};

function slice(a0: number, a1: number) {
  const [x0, y0] = pt(R, a0);
  const [x1, y1] = pt(R, a1);
  const [x2, y2] = pt(r, a1);
  const [x3, y3] = pt(r, a0);
  return `M${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 0 0 ${x3} ${y3} Z`;
}

export default function MoodWheel() {
  const root = useRef<HTMLElement>(null);
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [img, setImg] = useState(0);
  const touched = useRef(false);
  const mood = moods[active];
  const step = 360 / moods.length;

  // auto-spin through moods until someone interacts
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!touched.current) setActive((a) => (a + 1) % moods.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  // flick through the active mood's photos in the centre
  useEffect(() => {
    const id = window.setInterval(() => setImg((i) => i + 1), 700);
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const st = { trigger: `.${s.wheel}`, start: 'top 80%' };
      gsap.from(`.${s.slices}`, { scale: 0.7, rotate: -70, svgOrigin: '230 230', duration: 1.4, ease: 'expo.out', scrollTrigger: st });
      gsap.from(`.${s.slice}`, { opacity: 0, duration: 0.5, stagger: 0.07, scrollTrigger: st });
    },
    { scope: root },
  );

  const pick = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  return (
    <section ref={root} className={s.wrap} id="moods" style={{ '--mood': mood.color } as React.CSSProperties}>
      <Deco
        items={[
          { src: '/accessories/scrunchie.webp', top: '160px', right: '3%', size: 'clamp(56px, 5vw, 84px)', anim: 'spin', drift: 0.6 },
          { src: '/accessories/instant-camera.svg', bottom: '40px', right: '4%', size: 'clamp(70px, 7vw, 116px)', anim: 'float', drift: 0.3, rotate: -10 },
          { src: '/accessories/star-clip.webp', bottom: '28px', left: '36%', size: 'clamp(50px, 4.4vw, 72px)', anim: 'wiggle', drift: 0.8, rotate: -8 },
          { src: '/accessories/headphones.webp', top: '190px', left: '40%', size: 'clamp(60px, 5.6vw, 96px)', anim: 'float', drift: 0.5, rotate: 8 },
        ]}
      />

      <ChapterTitle n="03" title="The mo" script="ods" line="Every collection starts as a colour and a feeling." />

      <div className={s.grid}>
        <div className={s.copy}>
          <blockquote key={mood.id} className={s.quote}>
            <span className="mono" style={{ color: 'var(--mute)' }}>
              {String(active + 1).padStart(2, '0')} — {mood.name} — {mood.color}
            </span>
            <p className="serif">“{mood.statement}”</p>
          </blockquote>

          <ul className={s.chips}>
            {moods.map((m, i) => (
              <li key={m.id}>
                <Link
                  href={`/portfolio#mood-${m.id}`}
                  className={`mono ${s.chip} ${i === active ? s.chipOn : ''}`}
                  onPointerEnter={() => pick(i)}
                  onFocus={() => pick(i)}
                >
                  <span className={s.dot} style={{ background: m.color }} />
                  {m.name}
                  <span className={s.count}>{m.images.length}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href={`/portfolio#mood-${mood.id}`} className={`mono ${s.open}`}>
            Open the {mood.name} mood <span>→</span>
          </Link>
        </div>

        <div className={s.wheel}>
          <div className={s.glow} />
          <svg viewBox="0 0 460 460" className={s.svg} role="list" aria-label="Moods">
            <defs>
              <path id="ring-text" d={`M ${C} ${C} m -218 0 a 218 218 0 1 1 436 0 a 218 218 0 1 1 -436 0`} />
            </defs>
            <g className={s.ringText}>
              <text className={s.ringLabel}>
                <textPath href="#ring-text">{'PICK A MOOD ✶ OPEN THE ARCHIVE ✶ PICK A MOOD ✶ OPEN THE ARCHIVE ✶ '}</textPath>
              </text>
            </g>
            <g className={s.slices}>
              {moods.map((m, i) => {
                const a0 = i * step + GAP / 2;
                const a1 = (i + 1) * step - GAP / 2;
                const mid = (a0 + a1) / 2;
                const [dx, dy] = pt(14, mid).map((v) => v - C);
                const [tx, ty] = pt((R + r) / 2, mid);
                const on = i === active;
                return (
                  <g
                    key={m.id}
                    role="listitem"
                    tabIndex={0}
                    aria-label={`${m.name} mood`}
                    className={s.slice}
                    style={{ transform: on ? `translate(${dx}px, ${dy}px)` : 'translate(0,0)' }}
                    onPointerEnter={() => pick(i)}
                    onFocus={() => pick(i)}
                    onClick={() => router.push(`/portfolio#mood-${m.id}`)}
                    onKeyDown={(e) => e.key === 'Enter' && router.push(`/portfolio#mood-${m.id}`)}
                    data-cursor
                  >
                    <path d={slice(a0, a1)} fill={m.color} stroke="#111110" strokeWidth="3" strokeLinejoin="round" />
                    <text x={tx} y={ty} fill={m.ink} className={s.sliceLabel} textAnchor="middle" dominantBaseline="middle">
                      {m.name.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          <div className={s.eye}>
            {mood.images.map((src, i) => (
              <Image
                key={src + mood.id}
                src={src}
                alt=""
                fill
                sizes="220px"
                className={s.eyeImg}
                style={{ opacity: i === img % mood.images.length ? 1 : 0 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
