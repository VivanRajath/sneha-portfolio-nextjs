'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Sticker from './Sticker';
import s from './Deco.module.css';

gsap.registerPlugin(ScrollTrigger);

/** Accessory cut-outs live in /public/accessories */
export type DecoItem = {
  src: string;
  /** any CSS lengths: '6%', '120px', 'calc(...)' */
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** width; height follows the image */
  size: string;
  rotate?: number;
  anim?: 'float' | 'spin' | 'wiggle' | 'pulse' | 'swing';
  /** scroll drift: bigger = drifts up faster than the page */
  drift?: number;
  /** keep on phones (most hide — there's no spare space) */
  mobile?: boolean;
};

/**
 * A layer of draggable, animated accessories for the empty edges of a section.
 * Drop it as the first child of any `position: relative` section.
 */
export default function Deco({ items }: { items: DecoItem[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slots = gsap.utils.toArray<HTMLElement>(`.${s.slot}`, root.current);
      const section = root.current!.parentElement;
      gsap.from(slots, {
        scale: 0,
        rotate: -30,
        duration: 0.9,
        ease: 'back.out(2.2)',
        stagger: 0.08,
        scrollTrigger: { trigger: section, start: 'top 75%' },
      });
      slots.forEach((el, i) => {
        gsap.to(el, {
          y: -(items[i].drift ?? 0.4) * 140,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={s.layer} aria-hidden>
      {items.map((it, i) => (
        <div
          key={i}
          className={`${s.slot} ${it.mobile ? '' : s.desktopOnly}`}
          style={{ top: it.top, left: it.left, right: it.right, bottom: it.bottom, width: it.size }}
        >
          <Sticker rotate={it.rotate ?? 0}>
            <div className={s[it.anim ?? 'float']} style={{ animationDelay: `${-i * 1.3}s` }}>
              {/* plain img: small, already-optimised cut-outs at their natural aspect ratio */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.src} alt="" draggable={false} className={s.img} />
            </div>
          </Sticker>
        </div>
      ))}
    </div>
  );
}
