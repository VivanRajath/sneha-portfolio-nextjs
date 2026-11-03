'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const el = dot.current!;
    document.documentElement.classList.add('has-cursor');
    el.style.display = 'block';
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3' });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      const hit = t.closest('a, button, [data-cursor]');
      const grab = t.closest('[data-drag]');
      el.dataset.state = grab ? 'grab' : hit ? 'hover' : '';
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      document.documentElement.classList.remove('has-cursor');
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      style={{ display: 'none' }}
      className="cursor-dot"
    >
      <style>{`
        .cursor-dot{position:fixed;left:0;top:0;z-index:9500;pointer-events:none;mix-blend-mode:difference}
        .cursor-dot::before{content:'';position:absolute;left:-6px;top:-6px;width:12px;height:12px;border-radius:50%;background:#fff;transition:transform .35s cubic-bezier(.16,1,.3,1)}
        .cursor-dot[data-state='hover']::before{transform:scale(3.2)}
        .cursor-dot[data-state='grab']::before{transform:scale(2.2);border-radius:30%}
      `}</style>
    </div>
  );
}
