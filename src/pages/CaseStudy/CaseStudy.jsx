import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiGithub, FiExternalLink } from 'react-icons/fi';
import { projects } from '../../data/content';
import styles from './CaseStudy.module.css';

import finflow from '../../assets/finflow.png';
import nocturne from '../../assets/nocturne.png';
import devbridge from '../../assets/devbridge.png';
import foodbridge from '../../assets/foodbridge.png';
import chucksKitchen from '../../assets/chucks-kitchen.png';
import estatein from '../../assets/estatien.png';

const projectImages = {
  finflow,
  nocturne,
  devbridge,
  foodbridge,
  'chucks-kitchen': chucksKitchen,
  estatein,
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

export default function CaseStudy() {
  const { id } = useParams();
  const index = projects.findIndex((p) => p.id === id);
  const project = projects[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) return <Navigate to="/" replace />;

  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const image = projectImages[project.id];

  return (
    <main className={styles.page}>
      <div className="container">
        <Link to="/#work" className={styles.back} data-cursor="hover">
          <FiArrowLeft /> All projects
        </Link>

        <motion.div {...fadeUp} className={styles.header}>
          <span className={styles.tag}>{project.tag} — {project.year}</span>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.description}>{project.description}</p>

          <div className={styles.linkRow}>
            <a href={project.github} target="_blank" rel="noreferrer" className={styles.linkBtn} data-cursor="hover">
              <FiGithub /> View code
            </a>
            {project.liveDemo ? (
              <a href={project.liveDemo} target="_blank" rel="noreferrer" className={styles.linkBtnPrimary} data-cursor="hover">
                <FiExternalLink /> Live demo
              </a>
            ) : (
              <span className={styles.linkBtnDisabled} title="No public deployment yet">
                <FiExternalLink /> Live demo — not deployed
              </span>
            )}
          </div>
        </motion.div>

        <motion.div {...fadeUp} className={styles.shot}>
          {image ? (
            <img
              src={image}
              alt={`${project.name} screenshot`}
              className={styles.shotMedia}
            />
          ) : (
            <span className={styles.shotLabel}>Add project screenshot / screen recording here</span>
          )}
        </motion.div>

        <div className={styles.body}>
          <motion.section {...fadeUp} className={styles.section}>
            <h2 className={styles.sectionTitle}>Problem</h2>
            <p className={styles.sectionText}>{project.problem}</p>
          </motion.section>

          <motion.section {...fadeUp} className={styles.section}>
            <h2 className={styles.sectionTitle}>Approach</h2>
            <p className={styles.sectionText}>{project.approach}</p>
          </motion.section>

          <motion.section {...fadeUp} className={styles.section}>
            <h2 className={styles.sectionTitle}>Architecture</h2>
            <ul className={styles.list}>
              {project.architecture.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </motion.section>

          <motion.section {...fadeUp} className={styles.section}>
            <h2 className={styles.sectionTitle}>Key features</h2>
            <ul className={styles.list}>
              {project.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </motion.section>

          <motion.section {...fadeUp} className={styles.section}>
            <h2 className={styles.sectionTitle}>Challenges &amp; solutions</h2>
            <div className={styles.challengeGrid}>
              {project.challenges.map((c) => (
                <div key={c.challenge} className={styles.challengeCard}>
                  <div className={styles.challengeLabel}>Challenge</div>
                  <p className={styles.challengeText}>{c.challenge}</p>
                  <div className={styles.challengeLabel}>Solution</div>
                  <p className={styles.challengeText}>{c.solution}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeUp} className={styles.section}>
            <h2 className={styles.sectionTitle}>Stack</h2>
            <div className={styles.stackRow}>
              {project.stack.map((s) => <span key={s} className={styles.pill}>{s}</span>)}
            </div>
          </motion.section>

          <motion.section {...fadeUp} className={styles.section}>
            <h2 className={styles.sectionTitle}>Metrics</h2>
            <div className={styles.metricsRow}>
              {project.metrics.map((m) => (
                <div key={m.label} className={styles.metric}>
                  <span className={m.placeholder ? styles.metricValuePlaceholder : styles.metricValue}>
                    {m.value}
                  </span>
                  <span className={styles.metricLabel}>{m.label}</span>
                </div>
              ))}
            </div>
            {project.metrics.some((m) => m.placeholder) && (
              <p className={styles.metricsNote}>Some metrics are placeholders — swap in real numbers once measured.</p>
            )}
          </motion.section>

          <motion.section {...fadeUp} className={styles.section}>
            <h2 className={styles.sectionTitle}>What's next</h2>
            <ul className={styles.list}>
              {project.futureImprovements.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </motion.section>
        </div>

        <div className={styles.nav}>
          <Link to={`/work/${prev.id}`} className={styles.navCard} data-cursor="hover">
            <span className={styles.navLabel}>Previous</span>
            <span className={styles.navName}>{prev.name}</span>
          </Link>
          <Link to={`/work/${next.id}`} className={`${styles.navCard} ${styles.navCardRight}`} data-cursor="hover">
            <span className={styles.navLabel}>Next</span>
            <span className={styles.navName}>{next.name}</span>
          </Link>
        </div>
      </div>
    </main>
  );
}