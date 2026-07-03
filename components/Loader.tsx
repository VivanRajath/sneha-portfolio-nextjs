'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './Loader.module.css';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.loader} ${hidden ? styles.hidden : ''}`} aria-hidden={hidden}>
      <div className={styles.inner}>
        <div className={styles.text}>
          {'SNEHA'.split('').map((l, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.1 + 0.1}s` }}>{l}</span>
          ))}
        </div>
        <div className={styles.line} />
        <p className={styles.sub}>Fashion Designer</p>
      </div>
    </div>
  );
}
