'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const FALLBACK = [
  '/works/Hop-6.webp',
  '/works/Hop-1-2.webp',
  '/works/_MG_0245.webp',
];

export default function Hero({ heroImages }: { heroImages?: string[] }) {
  const contentRef     = useRef<HTMLDivElement>(null);
  const carouselRef    = useRef<HTMLDivElement>(null);
  const firstImgRef    = useRef<HTMLImageElement>(null);
  const recTimerRef    = useRef<HTMLSpanElement>(null);

  const [shutterOpen,  setShutterOpen]  = useState(false);
  const [focusing,     setFocusing]     = useState(false);
  const [focusLocked,  setFocusLocked]  = useState(false);
  const [cameraFaded,  setCameraFaded]  = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = heroImages && heroImages.length > 0 ? heroImages : FALLBACK;

  // ── Camera shutter sequence ──────────────
  useEffect(() => {
    const t1 = setTimeout(() => {
      setShutterOpen(true);
      setFocusing(true);
    }, 600);

    const t2 = setTimeout(() => {
      setFocusing(false);
      setFocusLocked(true);
      // Unblur first image & subtle zoom-in
      if (firstImgRef.current)  firstImgRef.current.style.filter = 'blur(0px)';
      if (carouselRef.current)  carouselRef.current.style.transform = 'scale(1.06)';
    }, 1800);

    const t3 = setTimeout(() => {
      contentRef.current?.classList.add(styles.revealed);
    }, 2000);

    // Fade out the entire camera UI overlay once content is visible
    const t4 = setTimeout(() => setCameraFaded(true), 3600);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  // ── REC timer ───────────────────────────
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

  // ── Carousel auto-advance ────────────────
  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setCurrentSlide(p => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [currentSlide, images.length]);

  const prev = () => setCurrentSlide(p => (p - 1 + images.length) % images.length);
  const next = () => setCurrentSlide(p => (p + 1) % images.length);

  const shutterClasses = [
    styles.cameraShutter,
    shutterOpen  ? styles.shutterOpen  : '',
    focusing     ? styles.focusing     : '',
    focusLocked  ? styles.focusLocked  : '',
    cameraFaded  ? styles.cameraFaded  : '',
  ].filter(Boolean).join(' ');

  return (
    <section className={styles.hero} id="hero">

      {/* ── Carousel background ─────────────── */}
      <div className={styles.carouselOuter}>
        <div
          className={styles.carouselRef}
          ref={carouselRef}
          style={{ transition: 'transform 0.7s cubic-bezier(0.34,1.56,0.64,1)' }}
        >
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={src + i} className={styles.slide}>
                <img
                  ref={i === 0 ? firstImgRef : undefined}
                  src={src}
                  alt={`Hero slide ${i + 1}`}
                  fetchPriority={i === 0 ? 'high' : 'auto'}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  style={i === 0 ? {
                    filter: 'blur(20px)',
                    transition: 'filter 1.4s cubic-bezier(0.22,1,0.36,1)',
                  } : undefined}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Camera UI (fades out after reveal) ─ */}
      <div className={shutterClasses} id="cameraShutter">
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

      {/* ── Text content ────────────────────── */}
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

      {/* ── Carousel nav (appears after camera fades) ─ */}
      {images.length > 1 && (
        <>
          <button className={styles.navPrev} onClick={prev} aria-label="Previous slide">
            <span />
          </button>
          <button className={styles.navNext} onClick={next} aria-label="Next slide">
            <span />
          </button>
          <div className={styles.slideCounter}>
            {String(currentSlide + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </div>
        </>
      )}

      {/* ── Scroll indicator ────────────────── */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </div>

      <div className={styles.bottomText}>
        <span>© 2025</span>
        <span>Bengaluru, India</span>
      </div>
    </section>
  );
}
