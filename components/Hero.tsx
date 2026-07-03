'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const imgLayerRef = useRef<HTMLDivElement>(null);
  const shutterRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const recTimerRef = useRef<HTMLSpanElement>(null);
  const [shutterOpen, setShutterOpen] = useState(false);
  const [focusing, setFocusing] = useState(false);
  const [focusLocked, setFocusLocked] = useState(false);

  // Camera shutter sequence
  useEffect(() => {
    const t1 = setTimeout(() => {
      setShutterOpen(true);
      setFocusing(true);
    }, 600);
    const t2 = setTimeout(() => {
      setFocusing(false);
      setFocusLocked(true);
      imgLayerRef.current?.classList.add(styles.focusLocked);
    }, 1800);
    const t3 = setTimeout(() => {
      contentRef.current?.classList.add(styles.revealed);
    }, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // REC timer
  useEffect(() => {
    if (!shutterOpen) return;
    let secs = 1;
    const id = setInterval(() => {
      secs++;
      const mm = String(Math.floor(secs / 60)).padStart(2, '0');
      const ss = String(secs % 60).padStart(2, '0');
      if (recTimerRef.current) recTimerRef.current.textContent = `REC [00:${mm}:${ss}]`;
    }, 1000);
    return () => clearInterval(id);
  }, [shutterOpen]);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current) {
        bgRef.current.style.transform = `translateY(${window.scrollY * 0.4}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const shutterClasses = [
    styles.cameraShutter,
    shutterOpen ? styles.shutterOpen : '',
    focusing ? styles.focusing : '',
    focusLocked ? styles.focusLocked : '',
  ].filter(Boolean).join(' ');

  return (
    <section className={styles.hero} id="hero">
      {/* Parallax background */}
      <div className={styles.parallaxBg} ref={bgRef}>
        <div className={styles.imgLayer} ref={imgLayerRef}>
          <img
            src="/works/Hop-6.webp"
            alt="Hero fashion editorial"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </div>

      {/* Camera UI */}
      <div className={shutterClasses} ref={shutterRef} id="cameraShutter">
        <div className={`${styles.shutterBlade} ${styles.bladeTop}`} />
        <div className={`${styles.shutterBlade} ${styles.bladeBottom}`} />

        <div className={styles.viewfinderGrid}>
          <div className={`${styles.vfCorner} ${styles.topLeft}`} />
          <div className={`${styles.vfCorner} ${styles.topRight}`} />
          <div className={`${styles.vfCorner} ${styles.bottomLeft}`} />
          <div className={`${styles.vfCorner} ${styles.bottomRight}`} />

          <div className={styles.autofocus}>
            <div className={`${styles.afBracket} ${styles.afLeft}`} />
            <div className={`${styles.afBracket} ${styles.afRight}`} />
            <div className={styles.afDot} />
          </div>

          <div className={`${styles.readout} ${styles.readoutTL}`}>FCON 1/250 f/2.8</div>
          <div className={`${styles.readout} ${styles.readoutTR}`}>
            <span className={styles.recIcon} />
            <span ref={recTimerRef}>REC [00:00:01]</span>
          </div>
          <div className={`${styles.readout} ${styles.readoutBL}`}>ISO 400</div>
          <div className={`${styles.readout} ${styles.readoutBR}`}>AF-C [LOCK]</div>
        </div>
      </div>

      <div className={styles.overlay} />

      {/* Content */}
      <div className={styles.content} ref={contentRef} id="heroContent">
        <div className={styles.heroTag}>
          <span className="dot" /> Creative Director &amp; Fashion Designer
        </div>
        <h1 className={styles.title}>
          <span className={styles.titleLine}>Fashion</span>
          <span className={`${styles.titleLine} ${styles.italic}`}>is a</span>
          <span className={styles.titleLine}>Statement.</span>
        </h1>
        <p className={styles.sub}>
          Where tradition meets rebellion.<br />
          Crafting stories through silhouette &amp; soul.
        </p>
        <div className={styles.cta}>
          <a href="#gallery" className="btn-primary" id="hero-work-btn">
            <span>View Work</span>
          </a>
          <a href="#about" className="btn-ghost" id="hero-about-btn">My Story</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>

      <div className={styles.bottomText}>
        <span>© 2024</span>
        <span>Bengaluru, India</span>
      </div>
    </section>
  );
}
