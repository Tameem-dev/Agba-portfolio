import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import { testimonials } from '../../data/content';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  // Real-time placeholder data for development/testing
  const placeholderTestimonials = [
    {
      quote: "This product exceeded all my expectations. The team's attention to detail is remarkable.",
      name: "Alimi Kehinde Maroof",
      title: "Project Lead, Marusoft Technology limited",
      placeholder: false
    },
    {
      quote: "Working with this team transformed our entire workflow. Highly recommended.",
      name: "Abdul-Mojeed Ogun dairo",
      title: "Product Director, InnovateCo",
      placeholder: false
    },
    {
      quote: "The quality and support we received was outstanding. We've seen a 40% increase in efficiency.",
      name: "Abdullah Olubiyi",
      title: "Operations Manager, Global Systems",
      placeholder: false
    },
    {
      quote: "A game-changer for our business. The implementation was seamless and the results speak for themselves.",
      name: "Chigozie",
      title: "Team Lead, Trueminds Innovation Limited",
      placeholder: false
    },
    {
      quote: "Exceptional craftsmanship and attention to user experience. A pleasure to work with.",
      name: "Hudhayfah Opadijo",
      title: "Design Lead, Creative Nexus",
      placeholder: false
    }
  ];

  // Use placeholder data if testimonials array has placeholder items
  const displayTestimonials = testimonials.some(t => t.placeholder) 
    ? placeholderTestimonials 
    : testimonials;

  return (
    <section className={styles.section}>
      <div className="container">
        <p className="eyebrow">What people say</p>
        <h2 className={styles.headline}>Testimonials</h2>
        {displayTestimonials.some((t) => t.placeholder) && (
          <p className={styles.note}>
            Placeholder content — swap in real quotes once you've collected them from clients or teammates.
          </p>
        )}

        <div className={styles.grid}>
          {displayTestimonials.map((t, i) => (
            <motion.div
              key={i}
              className={`${styles.card} ${t.placeholder ? styles.cardPlaceholder : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className={styles.stars}>
                {Array.from({ length: 5 }).map((_, s) => <FiStar key={s} />)}
              </div>
              <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
              <div className={styles.person}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.title}>{t.title}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}