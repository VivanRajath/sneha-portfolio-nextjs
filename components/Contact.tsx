'use client';
import { useEffect, useRef, useState } from 'react';
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

const CONTACT_EMAIL = 'snehasridhar.fad.63@gmail.com';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New enquiry from ${form.name || 'your website'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

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

      {/* Two columns: contact details (left) + form (right) */}
      <div className={styles.grid}>
        {/* Left — contact + instagram details */}
        <div className={styles.details}>
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

          <div className={`${styles.bottom} ${styles.reveal}`}>
            <span>Bengaluru, India</span>
            <span className={styles.bottomDot} />
            <span>Available for Remote &amp; On-site</span>
          </div>
        </div>

        {/* Right — contact form */}
        <form className={`${styles.form} ${styles.reveal}`} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="cf-name" className={styles.fieldLabel}>Name</label>
            <input
              id="cf-name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="cf-email" className={styles.fieldLabel}>Email</label>
            <input
              id="cf-email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="cf-message" className={styles.fieldLabel}>Message</label>
            <textarea
              id="cf-message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your project…"
              className={styles.textarea}
            />
          </div>

          <button type="submit" className={styles.submit}>
            Send Message <span className={styles.submitArrow}>→</span>
          </button>
        </form>
      </div>
    </section>
  );
}
