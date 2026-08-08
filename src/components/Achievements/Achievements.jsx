import { motion } from 'framer-motion';
import Counter from '../Counter';
import { achievements } from '../../data/content';
import styles from './Achievements.module.css';

export default function Achievements() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.grid}`}>
        {achievements.map((a, i) => (
          <motion.div
            key={a.label}
            className={styles.item}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <Counter value={a.value} className={styles.value} />
            <span className={styles.label}>{a.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
