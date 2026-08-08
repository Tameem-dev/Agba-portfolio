import { motion } from 'framer-motion';
import { services } from '../../data/content';
import styles from './Services.module.css';

export default function Services() {
  return (
    <section id="services" className={styles.section}>
      <div className="container">
        <p className="eyebrow">Services</p>
        <h2 className={styles.headline}>What I can take off your plate</h2>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              data-cursor="hover"
            >
              <span className={styles.index}>0{i + 1}</span>
              <h3 className={styles.title}>{s.title}</h3>
              <p className={styles.text}>{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
