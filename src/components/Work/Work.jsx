import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiGithub, FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../../data/content';
import styles from './Work.module.css';

import finflow from './../../assets/finflow.png';
import nocturne from './../../assets/nocturne.png';
import devbridge from './../../assets/devbridge.png';
import foodbridge from './../../assets/foodbridge.png';
import chucksKitchen from './../../assets/chucks-kitchen.png';
import estatein from './../../assets/estatien.png';

export const projectImages = {
  finflow,
  nocturne,
  devbridge,
  foodbridge,
  'chucks-kitchen': chucksKitchen,
  estatein,
};

export default function Work() {
  return (
    <section id="work" className={styles.section}>
      <div className="container">
        <p className="eyebrow">04 — Work</p>
        <h2 className={styles.headline}>Selected projects</h2>
        <p className={styles.hint}>Open a project for the full case study — problem, architecture, and what I'd change next.</p>

        <div className={styles.grid}>
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              className={styles.card}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
            >
              <Link
                to={`/work/${p.id}`}
                className={styles.cardLink}
                data-cursor="view"
                data-cursor-text="Case study"
              >
                {projectImages[p.id] && (
                  <div className={styles.thumbWrap}>
                    <img
                      src={projectImages[p.id]}
                      alt={p.name}
                      className={styles.thumb}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className={styles.cardTop}>
                  <span className={styles.tag}>{p.tag}</span>
                  <span className={styles.year}>{p.year}</span>
                </div>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.desc}>{p.description}</p>
                <div className={styles.stackRow}>
                  {p.stack.map((s) => (
                    <span key={s} className={styles.pill}>{s}</span>
                  ))}
                </div>
                <span className={styles.readMore}>
                  View case study <FiArrowUpRight />
                </span>
              </Link>
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className={styles.githubLink}
                data-cursor="hover"
                data-cursor-text="Code"
                aria-label={`${p.name} on GitHub`}
              >
                <FiGithub />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
