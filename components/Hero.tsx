'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Sticker from './Sticker';
import Deco from './Deco';
import Clock from './Clock';
import { heroFrames, site } from '@/lib/data';
import s from './Hero.module.css';

const N = heroFrames.length;

/** A retro TV you can actually flip channels on — her name lives on the screen. */
export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [ch, setCh] = useState(0);
  const [noise, setNoise] = useState(false);
  const [knob, setKnob] = useState(0);
  const touched = useRef(false);
  const busy = useRef(false);

  const tune = useCallback((dir: 1 | -1) => {
    if (busy.current) return;
    busy.current = true;
    setNoise(true);
    setKnob((k) => k + dir * 30);
    window.setTimeout(() => setCh((c) => (c + dir + N) % N), 180);
    window.setTimeout(() => {
      setNoise(false);
      busy.current = false;
    }, 420);
  }, []);

  const press = (dir: 1 | -1) => {
    touched.current = true;
    tune(dir);
  };

  // it channel-surfs by itself until someone grabs the remote
  useEffect(() => {
    const id = window.setInterval(() => {
      if (!touched.current) tune(1);
    }, 3200);
    return () => window.clearInterval(id);
  }, [tune]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.set(q(`.${s.ch}`), { yPercent: 110 });
      gsap.set(q(`.${s.tv}`), { y: 50, opacity: 0 });
      gsap.set(q(`.${s.reveal}`), { opacity: 0, y: 10 });
      gsap.set(q(`.${s.stickerSlot}`), { scale: 0 });

      const intro = () =>
        gsap
          .timeline()
          .to(q(`.${s.tv}`), { y: 0, opacity: 1, duration: 1.1, ease: 'expo.out' })
          .to(q(`.${s.ch}`), { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.035 }, 0.35)
          .to(q(`.${s.reveal}`), { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06 }, 0.7)
          .to(q(`.${s.stickerSlot}`), { scale: 1, duration: 0.7, ease: 'back.out(2.4)', stagger: 0.1 }, 1);

      if (window.__booted) {
        intro();
        return;
      }
      window.addEventListener('loader:done', intro, { once: true });
      return () => window.removeEventListener('loader:done', intro);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className={s.hero}
      id="top"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') press(1);
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') press(-1);
      }}
    >
      <Deco
        items={[
          { src: '/accessories/digicam.svg', top: '40%', left: '1.5%', size: 'clamp(64px, 7vw, 112px)', anim: 'float', drift: 0.6, mobile: true },
          { src: '/accessories/headphones.webp', bottom: '20%', right: '1.5%', size: 'clamp(64px, 6.5vw, 104px)', anim: 'wiggle', drift: 0.9, rotate: 10 },
        ]}
      />

      <div className={s.tv}>
        <div className={s.body}>
          {/* ── the screen ── */}
          <div className={s.screen}>
            {heroFrames.map((f, i) => (
              <Image
                key={f.src}
                src={f.src}
                alt=""
                fill
                sizes="(max-width: 760px) 80vw, 60vw"
                loading="eager"
                className={s.frame}
                style={{ opacity: i === ch ? 1 : 0 }}
              />
            ))}
            <span className={s.shade} />
            <span className={s.scan} />
            <span className={`${s.static} ${noise ? s.staticOn : ''}`} />

            <div className={s.title}>
              <h1 className={s.name} aria-label={site.name}>
                {site.name.split('').map((c, i) => (
                  <span key={i} className={s.mask}>
                    <span className={s.ch}>{c === ' ' ? ' ' : c}</span>
                  </span>
                ))}
              </h1>
              <p className={`mono ${s.role} ${s.reveal}`}>{site.role}</p>
            </div>

            <span className={`mono ${s.osdTop}`}>
              ● REC <Clock />
            </span>
            <span className={`mono ${s.osdCh}`}>CH {String(ch + 1).padStart(2, '0')}</span>
            <span className={`mono ${s.osd}`}>{heroFrames[ch].label}</span>
          </div>

          {/* ── the control panel ── */}
          <div className={s.panel}>
            <span className={`mono ${s.brand}`}>SNEHA·TV</span>
            <button
              className={s.knob}
              style={{ rotate: `${knob}deg` }}
              onClick={() => press(1)}
              aria-label="Turn the dial to the next channel"
            >
              <span className={s.notch} />
            </button>
            <div className={s.btns}>
              <button className={`mono ${s.btn}`} onClick={() => press(1)} aria-label="Next channel">
                CH ▲
              </button>
              <button className={`mono ${s.btn}`} onClick={() => press(-1)} aria-label="Previous channel">
                CH ▼
              </button>
            </div>
            <span className={s.grille} />
            <span className={s.led} />
          </div>
        </div>
        <div className={s.legs}>
          <span />
          <span />
        </div>

        <div className={`${s.stickerSlot} ${s.sGlasses}`}>
          <Sticker rotate={-8}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/accessories/heart-glasses.webp" alt="" draggable={false} style={{ width: '100%' }} />
          </Sticker>
        </div>
        <div className={`${s.stickerSlot} ${s.sPencil}`}>
          <Sticker rotate={-4}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/accessories/pencil.webp" alt="" draggable={false} style={{ height: '100%', display: 'block', margin: '0 auto' }} />
          </Sticker>
        </div>
      </div>

      <div className={`mono ${s.under} ${s.reveal}`}>
        <span>Prologue — a story in five chapters</span>
        <span className={s.hint}>Flip the channels ▲▼</span>
        <span>Scroll to read ↓</span>
      </div>
    </section>
  );
}
