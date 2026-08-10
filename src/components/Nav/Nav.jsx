import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { nav, pages, profile } from '../../data/content';
import styles from './Nav.module.css';

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  const lastY = useRef(0);
  const location = useLocation();
  const onHome = location.pathname === '/';

  // Scroll behavior
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;
        const max =
          document.documentElement.scrollHeight - window.innerHeight;

        setProgress(max > 0 ? y / max : 0);

        const delta = y - lastY.current;

        // Always show near the top
        if (y < 120) {
          setHidden(false);
        } else if (delta > 8) {
          // Scrolling down
          setHidden(true);
        } else if (delta < -8) {
          // Scrolling up
          setHidden(false);
        }

        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname]);

  // Detect active section on homepage
  useEffect(() => {
    if (!onHome) return;

    const sections = nav
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -50% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={styles.nav}
        animate={{ y: hidden && !menuOpen ? -96 : 0 }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Reading progress */}
        <div
          className={styles.progressBar}
          style={{ transform: `scaleX(${progress})` }}
        />

        <div className={styles.inner}>
          {/* Logo */}
          <Link
            to="/"
            className={styles.logo}
            onClick={handleNavClick}
            data-cursor="hover"
          >
            {profile.alias.split(' ')[0]}
            <span className={styles.logoAccent}>.</span>
          </Link>

          {/* Desktop navigation */}
          <nav className={styles.links}>
            {nav.map((item) => (
              <Link
                key={item.id}
                to={`/#${item.id}`}
                className={`${styles.link} ${
                  onHome && active === item.id ? styles.active : ''
                }`}
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
                className={`${styles.pageLink} ${
                  location.pathname === p.path ? styles.active : ''
                }`}
                data-cursor="hover"
              >
                {p.label}
              </Link>
            ))}
          </nav>

          {/* Desktop resume */}
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

          {/* Mobile menu button */}
          <button
            type="button"
            className={`${styles.menuButton} ${
              menuOpen ? styles.menuButtonOpen : ''
            }`}
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={styles.menuIcon}>
              {menuOpen ? (
                <>
                  <span className={styles.closeLineOne} />
                  <span className={styles.closeLineTwo} />
                </>
              ) : (
                <>
                  <span />
                  <span />
                  <span />
                </>
              )}
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className={styles.mobileMenuInner}>
              <nav className={styles.mobileLinks}>
                {nav.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.06,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      to={`/#${item.id}`}
                      className={`${styles.mobileLink} ${
                        onHome && active === item.id
                          ? styles.mobileActive
                          : ''
                      }`}
                      onClick={handleNavClick}
                    >
                      <span className={styles.mobileLinkIndex}>
                        {item.index}
                      </span>

                      <span>{item.label}</span>

                      <span className={styles.mobileArrow}>↗</span>
                    </Link>
                  </motion.div>
                ))}

                <div className={styles.mobileDivider} />

                {pages.map((p, index) => (
                  <motion.div
                    key={p.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: (nav.length + index) * 0.06,
                      duration: 0.3,
                    }}
                  >
                    <Link
                      to={p.path}
                      className={`${styles.mobilePageLink} ${
                        location.pathname === p.path
                          ? styles.mobileActive
                          : ''
                      }`}
                      onClick={handleNavClick}
                    >
                      {p.label}
                      <span className={styles.mobileArrow}>↗</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.a
                href="/Resume.pdf"
                target="_blank"
                rel="noreferrer"
                className={styles.mobileResume}
                onClick={handleNavClick}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.3,
                }}
              >
                <span>Open Resume</span>
                <span>↗</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

