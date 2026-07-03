'use client';
import { useEffect, useRef } from 'react';
import styles from './About.module.css';

const stats = [
  { num: 32, label: 'Editorials', suffix: '+' },
  { num: 3,  label: 'Collections', suffix: '' },
  { num: 4,  label: 'Years',       suffix: '+' },
];

const skills = ['Styling', 'Creative Direction', 'Costume Design', 'Editorial', 'Concept Development'];

interface AboutProps {
  bio?: string;
  mainImageUrl?: string;
  accentImageUrl?: string;
}

export default function About({ bio, mainImageUrl, accentImageUrl }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const numsRef    = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.inView);

          if (entry.target === statsRef.current && !statsRef.current?.dataset.animated) {
            statsRef.current!.dataset.animated = 'true';
            stats.forEach((s, i) => {
              const el = numsRef.current[i];
              if (!el) return;
              const start = performance.now();
              const dur   = 1400;
              const tick  = (now: number) => {
                const p = Math.min((now - start) / dur, 1);
                const e = 1 - Math.pow(1 - p, 3);
                el.textContent = String(Math.round(e * s.num)) + (p >= 1 ? s.suffix : '');
                if (p < 1) requestAnimationFrame(tick);
              };
              requestAnimationFrame(tick);
            });
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    sectionRef.current?.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el));
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.about} id="about" ref={sectionRef}>
      {/* Decorative background number */}
      <div className={styles.bgNum} aria-hidden>01</div>

      {/* Full-width headline */}
      <div className={styles.intro}>
        <div className={`section-tag ${styles.reveal}`}>
          <span className="dot" /> Chapter One
        </div>
        <h2 className={`${styles.headline} ${styles.reveal}`}>
          The girl who<br /><em>rewrote</em> the rules.
        </h2>
      </div>

      {/* Split: images left, text right */}
      <div className={styles.split}>
        <div className={`${styles.imgCol} ${styles.reveal}`}>
          <div className={styles.mainImg}>
            <img src={mainImageUrl || '/works/Hop-6-2.webp'} alt="Sneha" loading="eager" />
          </div>
          <div className={styles.accentImg}>
            <img src={accentImageUrl || '/works/Hop-4-2.webp'} alt="Editorial" loading="eager" />
          </div>
        </div>

        <div className={styles.textCol}>
          <p className={`${styles.lead} ${styles.reveal}`}>
            {bio || 'Fashion became language for me — every fold a sentence, every silhouette a story. I grew up in Bengaluru where tradition and rebellion share the same sidewalk.'}
          </p>

          <div className={`${styles.skillList} ${styles.reveal}`}>
            {skills.map((sk, i) => (
              <div key={sk} className={styles.skillRow} style={{ transitionDelay: `${i * 0.06}s` }}>
                <span className={styles.skillRule} />
                <span className={styles.skillName}>{sk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className={styles.statsBar} ref={statsRef}>
        {stats.map((s, i) => (
          <div key={s.label} className={styles.statCell}>
            <span
              className={styles.statNum}
              ref={el => { numsRef.current[i] = el; }}
            >
              0
            </span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
