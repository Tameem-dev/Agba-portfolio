import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { nav, pages, profile } from '../../data/content';
import styles from './Nav.module.css';

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('about');
  const lastY = useRef(0);
  const location = useLocation();
  const onHome = location.pathname === '/';

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? y / max : 0);

        const delta = y - lastY.current;
        // Hysteresis + minimum delta: ignore small jitter (a few px of
        // trackpad/momentum noise) so the nav doesn't flicker in and out
        // right at the show/hide boundary.
        if (y < 120) {
          setHidden(false);
        } else if (delta > 8) {
          setHidden(true);
        } else if (delta < -8) {
          setHidden(false);
        }

        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!onHome) return;
    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  return (
    <motion.header
      className={styles.nav}
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.progressBar} style={{ scaleX: progress }} />
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} data-cursor="hover">
          {profile.alias.split(' ')[0]}<span className={styles.logoAccent}>.</span>
        </Link>

        <nav className={styles.links}>
          {nav.map((item) => (
            <Link
              key={item.id}
              to={`/#${item.id}`}
              className={`${styles.link} ${onHome && active === item.id ? styles.active : ''}`}
              data-cursor="hover"
            >
              <span className={styles.linkIndex}>{item.index}</span>
              {item.label}
            </Link>
          ))}
          <span className={styles.divider} />
          {pages.map((p) => (
            <Link
              key={p.path}
              to={p.path}
              className={`${styles.pageLink} ${location.pathname === p.path ? styles.active : ''}`}
              data-cursor="hover"
            >
              {p.label}
            </Link>
          ))}
        </nav>

        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className={styles.resumeBtn}
          data-cursor="hover"
          data-cursor-text="Open"
        >
          Resume
        </a>
      </div>
    </motion.header>
  );
}
