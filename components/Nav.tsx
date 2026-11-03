'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Clock from './Clock';
import { site } from '@/lib/data';
import s from './Nav.module.css';

const links = [
  { href: '/#about', label: 'Story' },
  { href: '/#work', label: 'Work' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  const go = (e: React.MouseEvent, href: string) => {
    setOpen(false);
    if (path === '/' && href.startsWith('/#')) {
      e.preventDefault();
      const target = document.querySelector(href.slice(1)) as HTMLElement | null;
      if (target) {
        if (window.__lenis) window.__lenis.scrollTo(target, { duration: 1.6 });
        else target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header className={s.nav}>
        <Link href="/" className={s.logo}>
          <span className="serif">{site.first}</span>
          <span className={`script ${s.logoScript}`}>{site.last}</span>
        </Link>
        <span className={`mono ${s.role}`}>{site.role}</span>
        <span className={`mono ${s.clock}`}>
          BLR — <Clock />
        </span>
        <nav className={s.links}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="mono">
              <span className={s.plus}>+</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <button className={`mono ${s.menuBtn}`} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Close' : 'Menu'}
        </button>
      </header>

      <div className={`${s.sheet} ${open ? s.sheetOpen : ''}`} aria-hidden={!open}>
        {links.map((l, i) => (
          <Link key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className={s.sheetLink} tabIndex={open ? 0 : -1}>
            <span className="mono">00{i + 1}</span>
            <span className="serif">{l.label}</span>
          </Link>
        ))}
        <a href={site.instagram.url} target="_blank" rel="noreferrer" className={`mono ${s.sheetIg}`} tabIndex={open ? 0 : -1}>
          {site.instagram.handle} ↗
        </a>
      </div>
    </>
  );
}
