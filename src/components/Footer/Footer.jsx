import { motion } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { profile, socials, nav } from '../../data/content';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <a href="#top" className={styles.logo} data-cursor="hover">
            {profile.alias}
          </a>
          <p className={styles.tag}>Frontend engineer, Lagos, Nigeria.</p>
        </div>

        <div className={styles.linksCol}>
          <span className={styles.colLabel}>Quick links</span>
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} data-cursor="hover">{item.label}</a>
          ))}
        </div>

        <div className={styles.linksCol}>
          <span className={styles.colLabel}>Elsewhere</span>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor="hover">
              {s.label}
            </a>
          ))}
        </div>

        <motion.button
          className={styles.toTop}
          onClick={scrollTop}
          whileHover={{ y: -3 }}
          data-cursor="hover"
          aria-label="Back to top"
        >
          <FiArrowUp />
        </motion.button>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>&copy; {new Date().getFullYear()} {profile.name}. Built with React, GSAP, and too much coffee.</span>
      </div>
    </footer>
  );
}
