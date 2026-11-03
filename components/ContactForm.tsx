'use client';

import { useState } from 'react';
import { site } from '@/lib/data';
import s from './ContactForm.module.css';

const kinds = ['Collaboration', 'Commission', 'Styling / Shoot', 'Creative Direction', 'Just saying hi'];

/**
 * No backend yet: on send it opens the visitor's mail app with everything pre-filled
 * to Sneha's address. Swap `send` for a form service (Formspree, Resend…) later if wanted.
 */
export default function ContactForm() {
  const [kind, setKind] = useState(kinds[0]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${kind} — from ${name}`);
    const body = encodeURIComponent(`${msg}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <form className={s.form} onSubmit={send}>
      <fieldset className={s.kinds}>
        <legend className="mono">What’s it about?</legend>
        <div className={s.chips}>
          {kinds.map((k) => (
            <button
              type="button"
              key={k}
              className={`mono ${s.chip} ${kind === k ? s.chipOn : ''}`}
              onClick={() => setKind(k)}
              aria-pressed={kind === k}
            >
              {k}
            </button>
          ))}
        </div>
      </fieldset>

      <label className={s.field}>
        <span className="mono">Your name</span>
        <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" autoComplete="name" />
      </label>

      <label className={s.field}>
        <span className="mono">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@studio.com"
          autoComplete="email"
        />
      </label>

      <label className={s.field}>
        <span className="mono">Tell me everything</span>
        <textarea
          required
          rows={4}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="The idea, the mood, the deadline…"
        />
      </label>

      <div className={s.actions}>
        <button type="submit" className={s.send}>
          Send it <span>→</span>
        </button>
        {sent && <span className="mono">Opening your mail app…</span>}
      </div>
    </form>
  );
}
