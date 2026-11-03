'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ChapterTitle from './ChapterTitle';
import Deco from './Deco';
import { chapters, site } from '@/lib/data';
import s from './Statement.module.css';

gsap.registerPlugin(ScrollTrigger);

// words that get the satin highlight once they fill in
const hl = new Set(['story', 'walk', 'surreal.']);
// her own words, straight from her captions
const quotes = chapters.filter((c) => c.quote?.her).map((c) => ({ text: c.quote!.text, from: c.title }));

export default function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(`.${s.w}`, root.current);
      const qs = gsap.utils.toArray<HTMLElement>(`.${s.quote}`, root.current);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${s.pin}`,
          start: 'top top',
          end: () => `+=${window.innerHeight * (1.6 + quotes.length * 0.9)}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. the statement fills in, word by word
      tl.fromTo(words, { opacity: 0.12 }, { opacity: 1, stagger: 0.1, duration: 0.3, ease: 'none' });
      tl.to({}, { duration: 0.6 });
      // 2. it steps back; her own words take over, one at a time
      tl.to(`.${s.text}`, { opacity: 0.08, scale: 0.94, filter: 'blur(4px)', duration: 0.8 });
      tl.to(`.${s.tag}`, { opacity: 0, duration: 0.4 }, '<');
      qs.forEach((q, i) => {
        tl.fromTo(q, { opacity: 0, y: 60, filter: 'blur(10px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }, i ? '>' : '>-0.2');
        tl.to({}, { duration: 0.6 });
        if (i < qs.length - 1) tl.to(q, { opacity: 0, y: -60, filter: 'blur(10px)', duration: 0.6 });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.wrap} id="statement">
      <div className={s.head}>
        <ChapterTitle n="02" title="The state" script="ment" line="What she believes, in her own words." />
      </div>

      <div className={s.pin}>
        <Deco
          items={[
            { src: '/accessories/star-clip.webp', top: '14%', right: '6%', size: 'clamp(60px, 6vw, 100px)', anim: 'wiggle', drift: 0.3, rotate: 12 },
            { src: '/accessories/scrunchie.webp', bottom: '12%', left: '4%', size: 'clamp(64px, 6vw, 104px)', anim: 'spin', drift: 0.3 },
            { src: '/accessories/instant-camera.svg', bottom: '10%', right: '5%', size: 'clamp(70px, 7vw, 120px)', anim: 'float', drift: 0.2, rotate: -10 },
          ]}
        />
        <div className={s.stack}>
          <p className={s.text}>
            {site.statement.split(' ').map((word, i) => (
              <span key={i} className={`${s.w} ${hl.has(word) ? s.hl : ''}`}>
                {word}{' '}
              </span>
            ))}
          </p>
          {quotes.map((q) => (
            <blockquote key={q.from} className={s.quote}>
              <p>“{q.text}”</p>
              <cite className="mono">— Sneha, on {q.from}</cite>
            </blockquote>
          ))}
        </div>
        <p className={`mono ${s.tag}`}>
          <span className={s.sq} /> {`[ ${site.name} // ${site.city} // Styling everywhere ]`}
        </p>
      </div>
    </section>
  );
}
