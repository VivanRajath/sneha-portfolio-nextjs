'use client';
import { useEffect, useRef } from 'react';
import styles from './Philosophy.module.css';

const pillars = [
  {
    num: '01',
    word: 'Storytelling',
    line: 'Every garment is a sentence in an ongoing conversation.',
  },
  {
    num: '02',
    word: 'Contradiction',
    line: 'Strength and softness. Heritage and disruption. Both, always.',
  },
  {
    num: '03',
    word: 'Authenticity',
    line: "Fashion that doesn't try to be anything it isn't.",
  },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add(styles.inView);
        });
      },
      { threshold: 0.18 }
    );
    sectionRef.current?.querySelectorAll(`.${styles.pillar}`).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="philosophy" ref={sectionRef}>
      <div className={styles.bg}>
        <img src="/works/Hop-6-2.webp" alt="" aria-hidden loading="lazy" />
      </div>
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className="section-tag light" style={{ marginBottom: '4rem' }}>
          <span className="dot light" /> Chapter Three
        </div>

        {pillars.map((p, i) => (
          <div
            key={p.num}
            className={styles.pillar}
            style={{ transitionDelay: `${i * 0.14}s` }}
          >
            <div className={styles.pillarInner}>
              <span className={styles.pillarNum}>{p.num}</span>
              <div className={styles.pillarText}>
                <span className={styles.pillarWord}>{p.word}</span>
                <span className={styles.pillarLine}>{p.line}</span>
              </div>
            </div>
          </div>
        ))}

        <blockquote className={styles.coda}>
          Fashion is the space where a woman becomes the sentence she was always trying to say.
        </blockquote>
      </div>
    </section>
  );
}
