'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import s from './Loader.module.css';

const lines = ['> boot sneha_os v26', '> mounting moodboard.ai', '> threading needles', '> steaming the satin'];

/** Beige desktop computer (not a laptop) that boots up, then you fall into the screen. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useGSAP(
    () => {
      // only boot once per visit
      let seen = false;
      try {
        seen = sessionStorage.getItem('booted') === '1';
      } catch {}
      if (seen || window.__booted) {
        window.__booted = true;
        root.current!.style.display = 'none';
        setGone(true);
        return;
      }

      window.__lenis?.stop();
      document.documentElement.classList.add('is-loading');
      document.documentElement.style.overflow = 'hidden';
      const count = { v: 0 };
      const pct = root.current!.querySelector(`.${s.pct}`)!;
      const bar = root.current!.querySelector(`.${s.barFill}`) as HTMLElement;
      const rows = gsap.utils.toArray<HTMLElement>(`.${s.line}`);

      const finish = () => {
        document.documentElement.style.overflow = '';
        document.documentElement.classList.remove('is-loading');
        window.__lenis?.start();
        window.__booted = true;
        try {
          sessionStorage.setItem('booted', '1');
        } catch {}
        window.dispatchEvent(new Event('loader:done'));
        setGone(true);
      };

      const tl = gsap.timeline({ onComplete: finish });
      tl.from(`.${s.machine}`, { y: 60, opacity: 0, duration: 0.9, ease: 'expo.out' })
        .to(`.${s.screen}`, { backgroundColor: '#0d0d0c', duration: 0.15 }, '-=0.3')
        .from(rows, { opacity: 0, duration: 0.01, stagger: 0.32 }, '<')
        .to(
          count,
          {
            v: 100,
            duration: 1.9,
            ease: 'power2.inOut',
            onUpdate: () => {
              const v = Math.round(count.v);
              pct.textContent = String(v).padStart(2, '0') + '%';
              bar.style.transform = `scaleX(${v / 100})`;
            },
          },
          '<',
        )
        .to(`.${s.screen}`, { backgroundColor: '#f1eee7', duration: 0.12 })
        .to(`.${s.screenInner}`, { opacity: 0, duration: 0.1 }, '<')
        .to(`.${s.machine}`, { scale: 14, duration: 1.1, ease: 'expo.in' })
        .to(root.current, { opacity: 0, duration: 0.35 }, '-=0.2');
    },
    { scope: root },
  );

  if (gone) return null;

  return (
    <div ref={root} className={s.loader} aria-label="Loading">
      <div className={s.machine}>
        <div className={s.monitor}>
          <div className={s.screen}>
            <div className={s.scan} />
            <div className={s.screenInner}>
              {lines.map((l) => (
                <p key={l} className={s.line}>
                  {l}
                </p>
              ))}
              <div className={s.bar}>
                <span className={s.barFill} />
              </div>
              <p className={s.pct}>00%</p>
            </div>
          </div>
          <div className={s.chin}>
            <span className={s.led} />
            <span className={s.badge}>SNEHA</span>
            <span className={s.slot} />
          </div>
        </div>
        <div className={s.neck} />
        <div className={s.keyboard}>
          {Array.from({ length: 36 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
      <p className={`mono ${s.caption}`}>(a computer. not a laptop.)</p>
    </div>
  );
}
