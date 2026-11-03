'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ChapterTitle from './ChapterTitle';
import Deco from './Deco';
import { about, chapters, site, tools } from '@/lib/data';
import s from './About.module.css';

gsap.registerPlugin(ScrollTrigger);

const epoch = chapters.find((c) => c.slug === 'metallic-epoch');

/** "Who she is", told as a magazine issue: the cover turns open into the interview + her kit. */
export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // desktop: pin, slide to centre, turn the cover like a real page
      mm.add('(min-width: 861px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: `.${s.pin}`, start: 'top top', end: '+=160%', pin: true, scrub: 1 },
        });
        tl.fromTo(`.${s.book}`, { xPercent: -25 }, { xPercent: 0, duration: 1, ease: 'power2.inOut' }, 0)
          .fromTo(`.${s.leaf}`, { rotateY: 0 }, { rotateY: -180, duration: 1, ease: 'power2.inOut' }, 0)
          .fromTo(`.${s.fold}`, { opacity: 0.6 }, { opacity: 0, duration: 0.6 }, 0.4)
          .from(`.${s.kitItem}`, { y: 30, opacity: 0, stagger: 0.05, duration: 0.3 }, 0.7)
          .to(`.${s.hint}`, { opacity: 0, duration: 0.2 }, 0.5)
          .to({}, { duration: 0.35 });
      });

      // phones: one page wide — the cover flips like a card to the interview,
      // then that page slides away to reveal her kit underneath
      mm.add('(max-width: 860px)', () => {
        // no 3D on phones (it renders unreliably) — the cover squashes edge-on
        // and the interview opens out from the same edge, like a turning page
        gsap.set(`.${s.back}`, { scaleX: 0, transformOrigin: '0% 50%' });
        gsap.set(`.${s.cover}`, { transformOrigin: '0% 50%' });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: `.${s.pin}`, start: 'top top', end: '+=200%', pin: true, scrub: 0.6 },
        });
        tl.to(`.${s.cover}`, { scaleX: 0, duration: 0.5, ease: 'power2.in' })
          .to(`.${s.back}`, { scaleX: 1, duration: 0.5, ease: 'power2.out' })
          .to({}, { duration: 0.5 })
          .to(`.${s.leaf}`, { xPercent: -125, rotate: -10, duration: 0.9, ease: 'power2.in' })
          .to(`.${s.hint}`, { opacity: 0, duration: 0.2 }, '<')
          .from(`.${s.kitItem}`, { y: 24, opacity: 0, stagger: 0.04, duration: 0.25 }, '-=0.5')
          .to({}, { duration: 0.5 });
      });

      // every size: the cover arrives like it was just tossed on the table
      gsap.from(`.${s.book}`, {
        rotate: -6,
        y: 80,
        opacity: 0,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: `.${s.pin}`, start: 'top 80%' },
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={s.wrap} id="about">
      <Deco
        items={[
          { src: '/accessories/bracelet.webp', top: '60px', right: '4%', size: 'clamp(64px, 6vw, 100px)', anim: 'swing', drift: 0.7 },
          { src: '/accessories/flower-charm.webp', bottom: '30px', left: '4%', size: 'clamp(52px, 5vw, 80px)', anim: 'wiggle', drift: 0.5, mobile: true },
        ]}
      />

      <div className={s.head}>
        <ChapterTitle n="01" title="Who she" script="is" line="Her story, as an issue of its own." />
      </div>

      <div className={s.pin}>
        <div className={s.book}>
          {/* ── right page (under the cover): in her kit ── */}
          <article className={`${s.page} ${s.kit}`}>
            <header className={s.pageHead}>
              <span className="mono">p. 03</span>
              <h3 className={s.pageTitle}>
                In her <em>kit</em>
              </h3>
            </header>
            <ul className={s.kitGrid}>
              {tools.map((t) => (
                <li key={t.id} className={s.kitItem}>
                  <span className={s.kitImg}>
                    <Image src={t.img} alt={t.name} fill sizes="120px" className={s.kitPic} />
                  </span>
                  <span className={`mono ${s.kitName}`}>{t.name}</span>
                  <span className={s.kitLine}>{t.line}</span>
                </li>
              ))}
            </ul>
            <dl className={s.facts}>
              {about.facts.slice(0, 3).map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd className="mono">{v}</dd>
                </div>
              ))}
            </dl>
          </article>

          {/* ── the leaf: front = cover, back = the interview ── */}
          <div className={s.leaf}>
            <div className={`${s.face} ${s.cover}`}>
              <Image src={about.cover.image} alt="Sneha Sridhar, cover story" fill sizes="(max-width: 860px) 90vw, 36vw" className={s.coverImg} />
              <span className={s.coverShade} />
              <div className={s.masthead}>
                <span className={`mono ${s.issue}`}>Issue 01 · {site.city} · 2026</span>
                <span className={s.mast}>SNEHA</span>
              </div>
              <ul className={s.lines}>
                {about.cover.lines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
              <span className={s.burst}>
                <span>NEW</span>
              </span>
              <div className={s.barcode}>
                <span className={s.bars} />
                <span className="mono">₹ priceless</span>
              </div>
              <span className={s.fold} />
            </div>

            <div className={`${s.face} ${s.back}`}>
              <header className={s.pageHead}>
                <span className="mono">p. 02</span>
                <h3 className={s.pageTitle}>
                  The <em>interview</em>
                </h3>
              </header>
              <p className={s.lede}>{about.intro}</p>
              <div className={s.qa}>
                {about.interview.map((x) => (
                  <div key={x.q}>
                    <p className={s.q}>{x.q}</p>
                    <p className={s.a}>{x.a}</p>
                  </div>
                ))}
              </div>
              {epoch?.quote && (
                <blockquote className={s.pull}>
                  “{epoch.quote.text}”
                  <cite className="mono">— Sneha</cite>
                </blockquote>
              )}
            </div>
          </div>
        </div>
        <p className={`mono ${s.hint}`}>Keep scrolling — the cover opens</p>
      </div>
    </section>
  );
}
