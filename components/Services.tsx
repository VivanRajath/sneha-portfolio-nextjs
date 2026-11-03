import { services } from '@/lib/data';
import ChapterTitle from './ChapterTitle';
import Deco from './Deco';
import s from './Services.module.css';

export default function Services() {
  return (
    <section className={s.wrap} id="services">
      <Deco
        items={[
          { src: '/accessories/heart-glasses.webp', top: '40px', right: '6%', size: 'clamp(70px, 6.4vw, 110px)', anim: 'float', drift: 0.5 },
          { src: '/accessories/flower-charm.webp', bottom: '24px', left: '3%', size: 'clamp(44px, 4vw, 64px)', anim: 'pulse', drift: 0.3 },
          { src: '/accessories/digicam.svg', bottom: '14px', right: '8%', size: 'clamp(70px, 6.6vw, 110px)', anim: 'wiggle', drift: 0.6 },
          { src: '/accessories/star-clip.webp', top: '46%', right: '2%', size: 'clamp(44px, 4vw, 64px)', anim: 'pulse', drift: 0.4, rotate: 20 },
          { src: '/accessories/headphones.webp', top: '20px', right: '26%', size: 'clamp(54px, 5vw, 84px)', anim: 'swing', drift: 0.8 },
        ]}
      />

      <ChapterTitle n="05" title="What she " script="does" line="Available for editorials, campaigns and collabs." />

      <div className={s.table}>
        {services.map((x) => (
          <div key={x.n} className={s.row}>
            <span className="mono">{x.n}</span>
            <span className={s.svc}>{x.t}</span>
            <span className={`mono ${s.desc}`}>{x.d}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
