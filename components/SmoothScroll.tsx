'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Phones show/hide the address bar while you scroll, which fires resize events.
// Re-measuring every pinned section mid-swipe is what makes scrolling jump.
ScrollTrigger.config({ ignoreMobileResize: true });

declare global {
  interface Window {
    __lenis?: Lenis;
    __booted?: boolean;
  }
}

/** Touch screens keep their own native scrolling; smooth scrolling is for mouse/trackpad only. */
export const isTouch = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none), (pointer: coarse)').matches;

/** Lock/unlock page scrolling (loader, lightboxes) — works with or without Lenis. */
export function lockScroll(on: boolean) {
  if (window.__lenis) {
    if (on) window.__lenis.stop();
    else window.__lenis.start();
  }
  document.documentElement.style.overflow = on ? 'hidden' : '';
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || isTouch()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    window.__lenis = lenis;
    if (document.documentElement.classList.contains('is-loading')) lenis.stop();
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  useEffect(() => {
    window.__lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <>{children}</>;
}
