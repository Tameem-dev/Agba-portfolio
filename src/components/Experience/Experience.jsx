import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experience } from '../../data/content';
import styles from './Experience.module.css';

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <p className="eyebrow">02 — Experience</p>
        <h2 className={styles.headline}>Where I've worked</h2>
        <p className={styles.hint}>Click a role to see the detail behind the summary.</p>

        <div className={styles.list}>
          {experience.map((job, i) => {
            const open = openIndex === i;
            return (
              <div key={job.company} className={styles.item}>
                <motion.button
                  className={styles.row}
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  data-cursor="hover"
                  aria-expanded={open}
                >
                  <span className={styles.period}>{job.period}</span>
                  <div className={styles.roleBlock}>
                    <h3 className={styles.role}>{job.role}</h3>
                    <span className={styles.company}>{job.company}</span>
                  </div>
                  <p className={styles.summary}>{job.summary}</p>
                  <span className={`${styles.plus} ${open ? styles.plusOpen : ''}`} aria-hidden="true">+</span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className={styles.details}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className={styles.detailsInner}>
                        <div className={styles.detailCol}>
                          <h4 className={styles.detailLabel}>Responsibilities</h4>
                          <ul className={styles.detailList}>
                            {job.responsibilities.map((r) => <li key={r}>{r}</li>)}
                          </ul>
                        </div>
                        <div className={styles.detailCol}>
                          <h4 className={styles.detailLabel}>Achievements</h4>
                          <ul className={styles.detailList}>
                            {job.achievements.map((a) => <li key={a}>{a}</li>)}
                          </ul>
                        </div>
                        <div className={styles.detailCol}>
                          <h4 className={styles.detailLabel}>Technologies</h4>
                          <div className={styles.techPills}>
                            {job.technologies.map((t) => (
                              <span key={t} className={styles.techPill}>{t}</span>
                            ))}
                          </div>
                          <div className={styles.metricsRow}>
                            {job.metrics.map((m) => (
                              <div key={m.label} className={styles.metric}>
                                <span className={styles.metricValue}>{m.value}</span>
                                <span className={styles.metricLabel}>{m.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
