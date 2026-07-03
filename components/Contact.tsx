'use client';
import { useEffect, useRef } from 'react';
import styles from './Contact.module.css';

const links = [
  {
    id: 'contact-email',
    label: 'Email',
    value: 'snehasridhar.fad.63@gmail.com',
    href: 'mailto:snehasridhar.fad.63@gmail.com',
  },
  {
    id: 'contact-ig',
    label: 'Instagram',
    value: '@museonzidray',
    href: 'https://www.instagram.com/museonzidray',
  },
  {
    id: 'contact-phone',
    label: 'Phone',
    value: '+91 93536 16017',
    href: 'tel:+919353616017',
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add(styles.inView);
        });
      },
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll(`.${styles.reveal}`).forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      {/* Top: tag + statement */}
      <div className={styles.top}>
        <div className={`section-tag ${styles.reveal}`}>
          <span className="dot" /> Open for Collaborations
        </div>
        <h2 className={`${styles.statement} ${styles.reveal}`}>
          Let&apos;s make<br />
          <em>something new.</em>
        </h2>
        <p className={`${styles.sub} ${styles.reveal}`}>
          Whether it&apos;s a shoot, a concept, or a full creative direction — reach out and let&apos;s begin.
        </p>
      </div>

      {/* Contact links */}
      <div className={styles.links}>
        {links.map((l, i) => (
          <a
            key={l.id}
            id={l.id}
            href={l.href}
            className={`${styles.link} ${styles.reveal}`}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <span className={styles.linkLabel}>{l.label}</span>
            <span className={styles.linkValue}>{l.value}</span>
            <span className={styles.linkArrow}>→</span>
          </a>
        ))}
      </div>

      {/* Bottom decoration */}
      <div className={`${styles.bottom} ${styles.reveal}`}>
        <span>Bengaluru, India</span>
        <span className={styles.bottomDot} />
        <span>Available for Remote & On-site</span>
      </div>
    </section>
  );
}
