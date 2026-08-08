import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft,
  FiGithub,
  FiExternalLink,
} from 'react-icons/fi';

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
  initial: {
    opacity: 0,
    y: 20,
  },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  viewport: {
    once: true,
  },

  transition: {
    duration: 0.5,
    ease: [0.16, 1, 0.3, 1],
  },
};

export default function CaseStudy() {
  const { id } = useParams();

  const index = projects.findIndex(
    (p) => p.id === id
  );

  const project = projects[index];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  /*
   * If the project ID doesn't exist,
   * send the user back to the Work page.
   */
  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const prev =
    projects[
      (index - 1 + projects.length) %
        projects.length
    ];

  const next =
    projects[
      (index + 1) %
        projects.length
    ];

  const image = projectImages[project.id];

  return (
    <main className={styles.page}>

      <div className={styles.container}>

        {/* Back to all projects */}
        <Link
          to="/work"
          className={styles.back}
          data-cursor="hover"
        >
          <FiArrowLeft />
          <span>All projects</span>
        </Link>

        {/* Header */}
        <motion.div
          {...fadeUp}
          className={styles.header}
        >
          <span className={styles.tag}>
            {project.tag} — {project.year}
          </span>

          <h1 className={styles.title}>
            {project.name}
          </h1>

          <p className={styles.description}>
            {project.description}
          </p>

          <div className={styles.linkRow}>

            {/* GitHub */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className={styles.linkBtn}
                data-cursor="hover"
              >
                <FiGithub />
                <span>View code</span>
              </a>
            )}

            {/* Live Demo */}
            {project.liveDemo ? (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noreferrer"
                className={styles.linkBtnPrimary}
                data-cursor="hover"
              >
                <FiExternalLink />
                <span>Live demo</span>
              </a>
            ) : (
              <span
                className={styles.linkBtnDisabled}
                title="No public deployment yet"
              >
                <FiExternalLink />
                <span>Live demo — not deployed</span>
              </span>
            )}

          </div>
        </motion.div>

        {/* Project Image */}
        <motion.div
          {...fadeUp}
          className={styles.shot}
        >
          {image ? (
            <img
              src={image}
              alt={`${project.name} screenshot`}
              className={styles.shotMedia}
            />
          ) : (
            <span className={styles.shotLabel}>
              Add project screenshot / screen recording here
            </span>
          )}
        </motion.div>

        {/* Case Study Content */}
        <div className={styles.body}>

          {/* Problem */}
          {project.problem && (
            <motion.section
              {...fadeUp}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                Problem
              </h2>

              <p className={styles.sectionText}>
                {project.problem}
              </p>
            </motion.section>
          )}

          {/* Approach */}
          {project.approach && (
            <motion.section
              {...fadeUp}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                Approach
              </h2>

              <p className={styles.sectionText}>
                {project.approach}
              </p>
            </motion.section>
          )}

          {/* Architecture */}
          {project.architecture?.length > 0 && (
            <motion.section
              {...fadeUp}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                Architecture
              </h2>

              <ul className={styles.list}>
                {project.architecture.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Key Features */}
          {project.features?.length > 0 && (
            <motion.section
              {...fadeUp}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                Key features
              </h2>

              <ul className={styles.list}>
                {project.features.map((feature) => (
                  <li key={feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {/* Challenges */}
          {project.challenges?.length > 0 && (
            <motion.section
              {...fadeUp}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                Challenges &amp; solutions
              </h2>

              <div className={styles.challengeGrid}>
                {project.challenges.map((challenge) => (
                  <div
                    key={challenge.challenge}
                    className={styles.challengeCard}
                  >
                    <div className={styles.challengeLabel}>
                      Challenge
                    </div>

                    <p className={styles.challengeText}>
                      {challenge.challenge}
                    </p>

                    <div className={styles.challengeLabel}>
                      Solution
                    </div>

                    <p className={styles.challengeText}>
                      {challenge.solution}
                    </p>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* Stack */}
          {project.stack?.length > 0 && (
            <motion.section
              {...fadeUp}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                Stack
              </h2>

              <div className={styles.stackRow}>
                {project.stack.map((technology) => (
                  <span
                    key={technology}
                    className={styles.pill}
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </motion.section>
          )}

          {/* Metrics */}
          {project.metrics?.length > 0 && (
            <motion.section
              {...fadeUp}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                Metrics
              </h2>

              <div className={styles.metricsRow}>
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className={styles.metric}
                  >
                    <span
                      className={
                        metric.placeholder
                          ? styles.metricValuePlaceholder
                          : styles.metricValue
                      }
                    >
                      {metric.value}
                    </span>

                    <span className={styles.metricLabel}>
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

              {project.metrics.some(
                (metric) => metric.placeholder
              ) && (
                <p className={styles.metricsNote}>
                  Some metrics are placeholders — swap
                  in real numbers once measured.
                </p>
              )}
            </motion.section>
          )}

          {/* Future Improvements */}
          {project.futureImprovements?.length > 0 && (
            <motion.section
              {...fadeUp}
              className={styles.section}
            >
              <h2 className={styles.sectionTitle}>
                What's next
              </h2>

              <ul className={styles.list}>
                {project.futureImprovements.map(
                  (improvement) => (
                    <li key={improvement}>
                      {improvement}
                    </li>
                  )
                )}
              </ul>
            </motion.section>
          )}

        </div>

        {/* Previous / Next Navigation */}
        <div className={styles.nav}>

          <Link
            to={`/work/${prev.id}`}
            className={styles.navCard}
            data-cursor="hover"
          >
            <span className={styles.navLabel}>
              Previous
            </span>

            <span className={styles.navName}>
              {prev.name}
            </span>
          </Link>

          <Link
            to={`/work/${next.id}`}
            className={`${styles.navCard} ${styles.navCardRight}`}
            data-cursor="hover"
          >
            <span className={styles.navLabel}>
              Next
            </span>

            <span className={styles.navName}>
              {next.name}
            </span>
          </Link>

        </div>

      </div>

    </main>
  );
}