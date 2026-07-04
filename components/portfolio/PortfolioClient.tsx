'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './Portfolio.module.css';

// ── Data shapes (plain, already resolved) ──────────────
export interface PGridItem { src: string; num: string; story: string; tall?: boolean; }
export interface PFull { img: string; frame: string; title: string; titleEm: string; body: string; }
export interface PBook { num: string; label: string; title: string; titleEm: string; body: string; collection: string; img: string; caption: string; }
export interface PChapter { id: string; roman: string; name: string; sub: string; full?: PFull; book?: PBook; gridLabel: string; grid: PGridItem[]; }
export interface PSettings {
  heroImage: string; heroKicker: string; heroTitle: string; heroTitleEm: string; heroSub: string;
  frameCount: string; chapterCount: string;
  closingQuote: string; closingQuoteEm: string; closingAuthor: string;
}

interface Props {
  chapters: PChapter[];
  settings: PSettings;
}

interface LbEntry { src: string; alt: string; caption: string; }

export default function PortfolioClient({ chapters, settings }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'opening' | 'opened'>('idle');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tapped, setTapped] = useState<string | null>(null);

  // Lightbox
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIdx, setLbIdx] = useState(0);

  // Flat lightbox list: for each chapter → book image then grid images (in DOM order)
  const lbList = useMemo<LbEntry[]>(() => {
    const list: LbEntry[] = [];
    chapters.forEach(ch => {
      if (ch.book) list.push({ src: ch.book.img, alt: ch.book.caption, caption: ch.book.caption });
      ch.grid.forEach(g => list.push({ src: g.src, alt: g.story, caption: g.story }));
    });
    return list;
  }, [chapters]);

  // Per-chapter starting offset into lbList
  const offsets = useMemo<number[]>(() => {
    const out: number[] = [];
    let acc = 0;
    chapters.forEach(ch => {
      out.push(acc);
      acc += (ch.book ? 1 : 0) + ch.grid.length;
    });
    return out;
  }, [chapters]);

  // ── Enter portfolio (curtain split) ──
  const enterPortfolio = () => {
    setPhase(p => {
      if (p !== 'idle') return p;
      setTimeout(() => {
        setPhase('opened');
        document.body.style.overflow = 'auto';
      }, 1600);
      return 'opening';
    });
  };

  // Lock scroll until entered; any keypress also enters
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = () => { if (phase === 'idle') enterPortfolio(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ── Nav scrolled state ──
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Scroll reveals + full-bleed parallax ──
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const revealEls = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add(styles.visible); }),
      { rootMargin: '0px 0px -12% 0px' }
    );
    revealEls.forEach(el => io.observe(el));

    let ticking = false;
    const parallax = () => {
      root.querySelectorAll<HTMLImageElement>('[data-full-img]').forEach(img => {
        const holder = img.parentElement;
        if (!holder) return;
        const rect = holder.getBoundingClientRect();
        const center = rect.top + rect.height / 2 - window.innerHeight / 2;
        img.style.transform = `scale(1.05) translateY(${center * 0.15}px)`;
      });
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(parallax); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    parallax();

    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [chapters]);

  // ── Lightbox controls ──
  const openLb = (i: number) => { setLbIdx(i); setLbOpen(true); document.body.style.overflow = 'hidden'; };
  const closeLb = () => { setLbOpen(false); document.body.style.overflow = 'auto'; };
  const stepLb = (d: number) => setLbIdx(i => (i + d + lbList.length) % lbList.length);

  useEffect(() => {
    if (!lbOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') stepLb(-1);
      if (e.key === 'ArrowRight') stepLb(1);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lbOpen, lbList.length]);

  const navLinks = chapters.map(ch => ({ href: `#chapter-${ch.id}`, label: ch.name }));

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={rootRef} className={styles.root}>
      {/* ── INTRO OVERLAY ── */}
      <div className={`${styles.introOverlay} ${phase === 'opening' ? styles.openStart : ''} ${phase === 'opened' ? `${styles.openStart} ${styles.opened}` : ''}`}>
        <div className={`${styles.curtain} ${styles.curtainTop}`} />
        <div className={`${styles.curtain} ${styles.curtainBottom}`} />
        <div className={styles.introContentWrap}>
          <div className={styles.introCard}>
            <div className={styles.introText}>
              <p className={styles.introSub}>A visual narrative by</p>
              <h1 className={styles.introTitle}>Sneha</h1>
              <p className={styles.introTag}>Fashion Designer</p>
              <p className={styles.introEdition}>Portfolio, 2024</p>
            </div>
            <div className={styles.introImgWrap}>
              <img src={settings.heroImage} alt="Portfolio cover" />
              <div className={styles.introImgOverlay} />
            </div>
          </div>
          <button className={styles.openBtn} onClick={enterPortfolio}>
            <span className={styles.openBtnText}>Enter Portfolio</span>
            <span className={styles.openBtnLine} />
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div className={`${styles.portfolioMain} ${phase === 'opened' ? styles.visible : ''}`}>
        {/* NAV */}
        <nav className={`${styles.portNav} ${scrolled ? styles.scrolled : ''}`}>
          <a href="/" className={styles.portNavLogo}>SNEHA</a>
          <div className={styles.portNavLinks}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className={styles.portNavLink}>{l.label}</a>
            ))}
            <a href="/#contact" className={styles.portNavLink}>Contact</a>
          </div>
          <button
            className={styles.portNavToggle}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(4px, 4px)' } : undefined} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(4px, -4px)' } : undefined} />
          </button>
        </nav>

        <div className={`${styles.portMobileMenu} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
          ))}
          <a href="/#contact" onClick={closeMenu}>Contact</a>
        </div>

        {/* HERO */}
        <section className={styles.portHero}>
          <div className={styles.portHeroBg}>
            <img src={settings.heroImage} alt="Portfolio hero" />
            <div className={styles.portHeroOverlay} />
          </div>
          <div className={styles.portHeroContent}>
            <div className={styles.portChapterTag}>
              <span className={styles.portDot} /> {settings.heroKicker}
            </div>
            <h2 className={styles.portHeroTitle}>
              {settings.heroTitle}<br /><em>{settings.heroTitleEm}</em>
            </h2>
            <p className={styles.portHeroSub}>{settings.heroSub}</p>
            <div className={styles.portHeroScroll}><div className={styles.portScrollLine} /></div>
          </div>
          <div className={styles.portHeroChapterCount}>
            <span>{settings.frameCount}</span>
            <span>{settings.chapterCount}</span>
          </div>
        </section>

        {/* CHAPTERS */}
        {chapters.map((ch, ci) => {
          const base = offsets[ci];
          const bookIdx = base;
          const gridStart = base + (ch.book ? 1 : 0);
          const isLast = ci === chapters.length - 1;
          return (
            <section key={ch.id} className={styles.storyChapter} id={`chapter-${ch.id}`}>
              <div className={styles.chapterDivider}>
                <div className={styles.chapterLine} />
                <div className={styles.chapterLabel}>
                  <span className={styles.chapterRoman}>{ch.roman}</span>
                  <span className={styles.chapterName}>{ch.name}</span>
                  <span className={styles.chapterSub}>{ch.sub}</span>
                </div>
                <div className={styles.chapterLine} />
              </div>

              {/* Optional full-bleed opener */}
              {ch.full && (
                <div className={`${styles.storySpreadFull} ${styles.darkSpread}`} data-reveal>
                  <img src={ch.full.img} alt={ch.full.title} loading="lazy" data-full-img />
                  <div className={styles.fullSpreadText}>
                    <span className={styles.fsFrame}>{ch.full.frame}</span>
                    <h3 className={styles.fsTitle}><em>{ch.full.titleEm}</em> {ch.full.title}</h3>
                    <p className={styles.fsBody}>{ch.full.body}</p>
                  </div>
                </div>
              )}

              {/* Book spread */}
              {ch.book && (
                <div className={`${styles.storySpread} ${ci === 0 ? styles.spreadOpen : ''}`} data-reveal>
                  <div className={`${styles.spreadPage} ${styles.spreadTextPage}`}>
                    <div className={styles.pageInner}>
                      <div className={styles.pageNum}>{ch.book.num}</div>
                      <p className={styles.pageChapterLabel}>{ch.book.label}</p>
                      <h3 className={styles.pageTitle}>{ch.book.title}<br /><em>{ch.book.titleEm}</em></h3>
                      <p className={styles.pageBody}>{ch.book.body}</p>
                      <div className={styles.pageOrnament}>— ✦ —</div>
                      <p className={styles.pageCollection}>{ch.book.collection}</p>
                    </div>
                  </div>
                  <div className={`${styles.spreadPage} ${styles.spreadImgPage}`}>
                    <div className={styles.pageImgWrap} onClick={() => openLb(bookIdx)}>
                      <img src={ch.book.img} alt={ch.book.caption} loading="lazy" />
                      <div className={styles.pageImgCaption}>{ch.book.caption}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid */}
              <div className={styles.chapterGridLabel}><span>{ch.gridLabel}</span></div>
              <div className={styles.storyGrid}>
                {ch.grid.map((g, gi) => {
                  const key = `${ch.id}-${gi}`;
                  return (
                    <div
                      key={key}
                      className={`${styles.storyGridItem} ${g.tall ? styles.tall : ''} ${tapped === key ? styles.tapped : ''}`}
                      onClick={() => { setTapped(key); openLb(gridStart + gi); }}
                    >
                      <img src={g.src} alt={g.story} loading="lazy" />
                      <div className={styles.gridItemOverlay}>
                        <span className={styles.giNum}>{g.num}</span>
                        <p className={styles.giStory}>{g.story}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Closing quote after the last chapter */}
              {isLast && (
                <div className={styles.closingQuote} data-reveal>
                  <div className={styles.cqOrnament}>✦</div>
                  <blockquote className={styles.cqText}>
                    {settings.closingQuote}<br /><em>{settings.closingQuoteEm}</em>
                  </blockquote>
                  <cite className={styles.cqAuthor}>{settings.closingAuthor}</cite>
                  <a href="/#contact" className={styles.cqCta}>Work With Me →</a>
                </div>
              )}
            </section>
          );
        })}

        {/* FOOTER */}
        <footer className={styles.portFooter}>
          <div className={styles.pfTop}>
            <div className={styles.pfLogo}>SNEHA</div>
            <div className={styles.pfTagline}>Fashion Designer &amp; Creative Director · Bengaluru</div>
          </div>
          <div className={styles.pfDivider} />
          <div className={styles.pfBottom}>
            <span>© 2024 Sneha. All rights reserved.</span>
            <a href="/" className={styles.pfBack}>← Back to Home</a>
          </div>
        </footer>
      </div>

      {/* ── LIGHTBOX ── */}
      <div className={`${styles.portLightbox} ${lbOpen ? styles.open : ''}`} onClick={closeLb}>
        <button className={styles.plbClose} onClick={closeLb}>✕</button>
        <button className={styles.plbPrev} onClick={e => { e.stopPropagation(); stepLb(-1); }}>‹</button>
        <button className={styles.plbNext} onClick={e => { e.stopPropagation(); stepLb(1); }}>›</button>
        <div className={styles.plbImgWrap} onClick={e => e.stopPropagation()}>
          {lbList[lbIdx] && <img src={lbList[lbIdx].src} alt={lbList[lbIdx].alt} />}
        </div>
        <div className={styles.plbCaption}>{lbList[lbIdx]?.caption}</div>
      </div>
    </div>
  );
}
