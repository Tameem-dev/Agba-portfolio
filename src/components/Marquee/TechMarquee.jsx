import { stack } from '../../data/content';
import styles from './TechMarquee.module.css';

export default function TechMarquee() {
  const items = [...stack, ...stack];

  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {items.map((tech, i) => (
          <span key={`${tech}-${i}`} className={styles.item}>
            {tech}
            <span className={styles.dot}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
