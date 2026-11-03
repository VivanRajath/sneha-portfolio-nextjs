'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import s from './StoryProgress.module.css';

gsap.registerPlugin(ScrollTrigger);

const beats = [
  { id: 'top', n: 'Prologue', t: 'Sneha Sridhar' },
  { id: 'about', n: 'Ch. 01', t: 'Who she is' },
  { id: 'statement', n: 'Ch. 02', t: 'The statement' },
  { id: 'moods', n: 'Ch. 03', t: 'The moods' },
  { id: 'work', n: 'Ch. 04', t: 'The work' },
  { id: 'services', n: 'Ch. 05', t: 'What she does' },
  { id: 'contact', n: 'Epilogue', t: 'Your chapter' },
];

/** A little "you are here" for the story. */
export default function StoryProgress() {
  const root = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);

  useGSAP(
    () => {
      beats.forEach((b, k) => {
        const el = document.getElementById(b.id);
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => self.isActive && setI(k),
        });
      });
      gsap.fromTo(
        `.${s.fill}`,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: true } },
      );
    },
    { scope: root },
  );

  const b = beats[i];
  return (
    <div ref={root} className={`mono ${s.wrap}`} aria-hidden>
      <span className={s.n}>{b.n}</span>
      <span key={b.id} className={s.t}>
        {b.t}
      </span>
      <span className={s.bar}>
        <span className={s.fill} />
      </span>
    </div>
  );
}
