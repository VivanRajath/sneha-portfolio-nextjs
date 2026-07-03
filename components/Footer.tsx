import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer} id="footer">
      <div className={styles.top}>
        <div className={styles.logo}>SNEHA</div>
        <div className={styles.tagline}>Fashion Designer &amp; Creative Director · Bengaluru, India</div>
        <a
          href="https://www.instagram.com/museonzidray"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.igLink}
          id="footer-ig"
        >
          ↗ @museonzidray
        </a>
      </div>

      <div className={styles.divider} />

      <div className={styles.bottom}>
        <span className={styles.copy}>© 2025 Sneha. All rights reserved.</span>
        <div className={styles.links}>
          <a href="#hero"       id="footer-home">Home</a>
          <a href="#about"      id="footer-about">About</a>
          <a href="#gallery"    id="footer-gallery">Work</a>
          <a href="#philosophy" id="footer-philosophy">Philosophy</a>
          <a href="#contact"    id="footer-contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
