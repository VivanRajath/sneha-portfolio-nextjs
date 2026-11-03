'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Clock from './Clock';
import ContactForm from './ContactForm';
import Deco from './Deco';
import { Star } from './objects';
import { site } from '@/lib/data';
import s from './Contact.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${s.big} .${s.ch}`, {
        yPercent: 100,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: { trigger: `.${s.big}`, start: 'top 85%' },
      });
      gsap.from(`.${s.say}`, {
        clipPath: 'inset(0 100% 0 0)',
        duration: 1.4,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: `.${s.big}`, start: 'top 60%' },
      });
    },
    { scope: root },
  );

  const top = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 2 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const words = [...site.vibe, 'Bengaluru', 'Made with jasmine'];

  return (
    <section ref={root} className={s.wrap} id="contact">
      <div className={s.marquee} aria-hidden>
        <div className={s.track}>
          {[0, 1].map((k) => (
            <span key={k} className={s.group}>
              {words.map((w) => (
                <span key={w + k} className={s.mItem}>
                  {w} <Star className={s.mStar} fill="#111110" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className={`mono ${s.label}`}>
        <span>Epilogue</span>
        <span>(the next chapter could be yours)</span>
      </div>

      <div className={s.stage}>
        <Deco
          items={[
            { src: '/accessories/instant-camera.svg', top: '-8%', left: '2%', size: 'clamp(64px, 7vw, 110px)', anim: 'float', drift: 0.4, rotate: -12, mobile: true },
            { src: '/accessories/bracelet.webp', bottom: '-30%', left: '36%', size: 'clamp(54px, 5vw, 86px)', anim: 'swing', drift: 0.5 },
            { src: '/accessories/heart-glasses.webp', top: '-16%', right: '3%', size: 'clamp(90px, 9vw, 150px)', anim: 'wiggle', drift: 0.6, rotate: -8 },
            { src: '/accessories/scrunchie.webp', bottom: '-24%', right: '20%', size: 'clamp(54px, 5vw, 84px)', anim: 'spin', drift: 0.3 },
            { src: '/accessories/headphones.webp', top: '30%', left: '-1%', size: 'clamp(56px, 5vw, 86px)', anim: 'float', drift: 0.7 },
            { src: '/accessories/digicam.svg', bottom: '-34%', left: '8%', size: 'clamp(64px, 6vw, 100px)', anim: 'pulse', drift: 0.5 },
          ]}
        />
        <h2 className={s.big} aria-label="Let's talk">
          {'Let’s Talk'.split('').map((c, i) => (
            <span key={i} className={s.mask}>
              <span className={s.ch}>{c === ' ' ? ' ' : c}</span>
            </span>
          ))}
        </h2>
        <span className={`script ${s.say}`}>or just say hi</span>
      </div>

      <div className={s.split}>
        <div className={s.info}>
          <a href={`mailto:${site.email}`} className={s.email}>
            {site.email}
          </a>
          <div className={s.socials}>
            <a href={site.instagram.url} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </div>
          <p className={`mono ${s.note}`}>
            Editorials, campaigns, collabs, concept shoots — or just a hello. Tell me the feeling; I’ll build the story.
          </p>
        </div>
        <ContactForm />
      </div>

      <footer className={`mono ${s.foot}`}>
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>
          {site.city} — <Clock />
        </span>
        <button onClick={top} className="mono">
          Back to the prologue ↑
        </button>
      </footer>
    </section>
  );
}
