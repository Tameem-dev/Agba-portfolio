import { motion } from 'framer-motion';
import Counter from '../Counter';
import { profile, aboutStats } from '../../data/content';
import styles from './About.module.css';

const VALUES = [
  {
    title: 'Craft over speed',
    text: 'Every interface ships fast, but never at the cost of the 200ms that make it feel considered.',
  },
  {
    title: 'Systems, not screens',
    text: 'I design component architecture the way I design UI — reusable, composable, built to outlast the first release.',
  },
  {
    title: 'Show the work',
    text: 'Case studies over claims. If I say a page is optimized, the Lighthouse score is in the repo.',
  },
];

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          01 — About
        </motion.p>

        <div className={styles.grid}>
          <motion.div
            className={styles.narrative}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className={styles.headline}>
              I didn't start with React. I started with{' '}
              <span className="gradient-text">curiosity about why interfaces feel good.</span>
            </h2>
            <p className={styles.bio}>{profile.bio}</p>
            <p className={styles.bio}>
              That curiosity turned into two internships, a growing production role, and a habit
              of rebuilding the same idea until it earns its place in the portfolio — not because
              it's finished, but because it's honest about what it does well.
            </p>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.statCard}>
              <Counter value={aboutStats.roles} className={styles.statNumber} />
              <span className={styles.statLabel}>Roles &amp; internships</span>
            </div>
            <div className={styles.statCard}>
              <Counter value={aboutStats.projects} suffix="+" className={styles.statNumber} />
              <span className={styles.statLabel}>Shipped projects</span>
            </div>
            <div className={styles.statCard}>
              <Counter value={aboutStats.tools} className={styles.statNumber} />
              <span className={styles.statLabel}>Core tools</span>
            </div>
          </motion.div>
        </div>

        <div className={styles.values}>
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              className={styles.valueCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.valueIndex}>0{i + 1}</span>
              <h3 className={styles.valueTitle}>{v.title}</h3>
              <p className={styles.valueText}>{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
