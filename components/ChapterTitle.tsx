'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import s from './ChapterTitle.module.css';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  n: string; // "01"
  title: string; // the caps part
  script?: string; // a word in script after it
  line: string; // the statement under it
  dark?: boolean;
};

/** The story beat that opens every section. */
export default function ChapterTitle({ n, title, script, line, dark }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: 'top 80%' } });
      tl.from(`.${s.rule}`, { scaleX: 0, duration: 1.2, ease: 'expo.inOut' })
        .from(`.${s.label} > *`, { opacity: 0, y: 10, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, 0.2)
        .from(`.${s.ch}`, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.025 }, 0.3)
        .from(`.${s.script}`, { clipPath: 'inset(0 100% 0 0)', duration: 1, ease: 'power3.inOut' }, 0.7)
        .from(`.${s.line}`, { opacity: 0, y: 16, filter: 'blur(6px)', duration: 1, ease: 'power3.out' }, 0.8);
    },
    { scope: root },
  );

  return (
    <div ref={root} className={`${s.wrap} ${dark ? s.dark : ''}`}>
      <span className={s.rule} />
      <div className={`mono ${s.label}`}>
        <span>Chapter {n}</span>
        <span>{title.toLowerCase()}</span>
      </div>
      <h2 className={s.title} aria-label={`${title} ${script ?? ''}`}>
        {title.split('').map((c, i) => (
          <span key={i} className={s.mask}>
            <span className={s.ch}>{c === ' ' ? ' ' : c}</span>
          </span>
        ))}
        {script && <span className={`script ${s.script}`}>{script}</span>}
      </h2>
      <p className={s.line}>{line}</p>
    </div>
  );
}
