import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import SplitType from 'split-type';
import ParticleField from './ParticleField';
import Magnetic from '../Magnetic';
import { profile } from '../../data/content';
import styles from './Hero.module.css';

const CODE_LINE = `const engineer = new AgbaDev({ role: "frontend", based: "Lagos" });`;

export default function Hero({ ready }) {
  const titleRef = useRef(null);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!ready) return;
    const split = new SplitType(titleRef.current, { types: 'chars, words' });

    gsap.fromTo(
      split.chars,
      { yPercent: 130, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.018,
        delay: 0.15,
      }
    );

    return () => split.revert();
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    let i = 0;
    const timer = setInterval(() => {
      i += 1;
      setTyped(CODE_LINE.slice(0, i));
      if (i >= CODE_LINE.length) clearInterval(timer);
    }, 22);
    return () => clearInterval(timer);
  }, [ready]);

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.aurora} aria-hidden="true" />
      <ParticleField />

      <div className={`${styles.content} container`}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 12 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          Available for select engagements — {profile.location}
        </motion.p>

        <h1 ref={titleRef} className={styles.title}>
          {profile.role}
        </h1>

        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          className={styles.codeLine}
          initial={{ opacity: 0 }}
          animate={{ opacity: ready ? 1 : 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <span className={styles.prompt}>❯</span> {typed}
          <span className={styles.blinker} />
        </motion.div>

        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 16 }}
          transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <Magnetic
            href="#work"
            className={styles.ctaPrimary}
            data-cursor="hover"
            data-cursor-text="View"
          >
            View Projects
          </Magnetic>
          <Magnetic
            href="#contact"
            className={styles.ctaGhost}
            data-cursor="hover"
          >
            Hire Me
          </Magnetic>
          <Magnetic
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className={styles.ctaGhost}
            data-cursor="hover"
          >
            Resume
          </Magnetic>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className={styles.scrollLine} />
        scroll
      </motion.div>
    </section>
  );
}
