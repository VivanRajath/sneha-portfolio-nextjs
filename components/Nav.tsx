'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './Nav.module.css';

const links = [
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Work' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} id="mainNav">
        <div className={styles.logo}>
          <a href="#hero" id="nav-logo">SNEHA</a>
        </div>
        <div className={styles.menu}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>{l.label}</a>
          ))}
        </div>
        <button
          className={`${styles.toggle} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          id="nav-toggle"
        >
          <span /><span />
        </button>
      </nav>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.menuOpen : ''}`}>
        {links.map((l) => (
          <a key={l.href} href={l.href} className={styles.mobileLink} onClick={closeMenu}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
