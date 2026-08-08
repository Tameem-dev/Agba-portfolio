import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../../data/content';
import SkillCard from './SkillCard';
import styles from './Skills.module.css';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].category);
  const current = skillCategories.find((c) => c.category === activeCategory);

  return (
    <section id="skills" className={styles.section}>
      <div className="container">
        <p className="eyebrow">03 — Skills</p>
        <h2 className={styles.headline}>The lab</h2>
        <p className={styles.sub}>What I reach for, and how often I reach for it.</p>

        <div className={styles.tabs}>
          {skillCategories.map((c) => (
            <button
              key={c.category}
              className={`${styles.tab} ${activeCategory === c.category ? styles.tabActive : ''}`}
              onClick={() => setActiveCategory(c.category)}
              data-cursor="hover"
            >
              {c.category}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        >
          {current.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
