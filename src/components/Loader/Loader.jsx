import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Loader.module.css';

const BOOT_LINES = [
  'booting agbadev.dev',
  'resolving modules ▸ react, gsap, three',
  'compiling components',
  'optimizing bundle',
  'ready',
];

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [lineIndex, setLineIndex] = useState(0);
  const [exiting, setExiting] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    // Failsafe: whatever else happens, never let the loader trap the page.
    const failsafe = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        setExiting(true);
        onDone?.();
      }
    }, 5000);
    return () => clearTimeout(failsafe);
  }, [onDone]);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        const next = Math.min(p + Math.round(4 + Math.random() * 9), 100);
        return next;
      });
    }, 90);

    return () => clearInterval(progressTimer);
  }, []);

  useEffect(() => {
    const step = 100 / BOOT_LINES.length;
    const target = Math.min(Math.floor(progress / step), BOOT_LINES.length - 1);
    if (target > lineIndex) setLineIndex(target);

    if (progress >= 100 && !doneRef.current) {
      doneRef.current = true;
      setTimeout(() => setExiting(true), 320);
      setTimeout(() => onDone?.(), 1100);
    }
  }, [progress, lineIndex, onDone]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className={styles.loader}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className={styles.inner}>
            <div className={styles.brand}>
              <span className={styles.bracket}>{'<'}</span>
              AGBA DEV
              <span className={styles.bracket}>{' />'}</span>
            </div>

            <div className={styles.terminal}>
              {BOOT_LINES.slice(0, lineIndex + 1).map((line, i) => (
                <div key={line} className={styles.line}>
                  <span className={styles.prompt}>$</span> {line}
                  {i === lineIndex && <span className={styles.cursorBlink} />}
                </div>
              ))}
            </div>

            <div className={styles.progressRow}>
              <div className={styles.barTrack}>
                <motion.div
                  className={styles.barFill}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <span className={styles.percent}>{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
