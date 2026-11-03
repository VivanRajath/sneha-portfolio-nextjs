'use client';

import { useRef } from 'react';
import gsap from 'gsap';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  rotate?: number;
};

/** Something you can pick up and throw around. */
export default function Sticker({ children, className = '', style, rotate = 0 }: Props) {
  const el = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0, sx: 0, sy: 0, px: 0, py: 0 });

  const down = (e: React.PointerEvent) => {
    const n = el.current!;
    n.setPointerCapture(e.pointerId);
    const p = pos.current;
    p.sx = e.clientX;
    p.sy = e.clientY;
    p.px = p.x;
    p.py = p.y;
    gsap.to(n, { scale: 1.12, rotation: Math.random() * 16 - 8, duration: 0.3, ease: 'back.out(3)' });
    n.style.zIndex = '40';
  };
  const move = (e: React.PointerEvent) => {
    const n = el.current!;
    if (!n.hasPointerCapture(e.pointerId)) return;
    const p = pos.current;
    p.x = p.px + (e.clientX - p.sx);
    p.y = p.py + (e.clientY - p.sy);
    gsap.set(n, { x: p.x, y: p.y });
  };
  const up = (e: React.PointerEvent) => {
    const n = el.current!;
    if (n.hasPointerCapture(e.pointerId)) n.releasePointerCapture(e.pointerId);
    gsap.to(n, { scale: 1, rotation: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
  };

  return (
    <div
      ref={el}
      data-drag
      className={className}
      style={{ ...style, rotate: `${rotate}deg`, touchAction: 'none', userSelect: 'none' }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
    >
      <div className="shadowed" style={{ width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
