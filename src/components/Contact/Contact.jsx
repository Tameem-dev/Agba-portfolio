import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiMail, FiClock, FiCalendar } from 'react-icons/fi';
import Magnetic from '../Magnetic';
import { profile, socials } from '../../data/content';
import styles from './Contact.module.css';

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [sent, setSent] = useState(false);

  const onSubmit = (data) => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.name}`);
    const body = encodeURIComponent(
      `${data.message}\n\n— ${data.name} (${data.email})`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className={styles.section}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <p className="eyebrow">05 — Contact</p>
            <h2 className={styles.headline}>
              Let's build something <span className="gradient-text">worth shipping.</span>
            </h2>
            <p className={styles.sub}>
              Open to senior frontend roles, contract work, and interesting problems.
            </p>

            <div className={styles.meta}>
              <span className={styles.metaItem}><FiClock /> WAT (UTC+1), Lagos</span>
              <span className={styles.metaItem}><FiMail /> Replies within 24–48h</span>
            </div>

            <div className={styles.socials}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor="hover">
                  {s.label}
                </a>
              ))}
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent('Booking a call with Agba Dev')}`}
                data-cursor="hover"
                className={styles.calendarLink}
              >
                <FiCalendar /> Request a call
              </a>
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={styles.field}>
              <input
                type="text"
                placeholder="Your name"
                {...register('name', { required: 'Your name is required' })}
                className={errors.name ? styles.inputError : ''}
              />
              {errors.name && <span className={styles.error}>{errors.name.message}</span>}
            </div>

            <div className={styles.field}>
              <input
                type="email"
                placeholder="Your email"
                {...register('email', {
                  required: 'Your email is required',
                  pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                })}
                className={errors.email ? styles.inputError : ''}
              />
              {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.field}>
              <textarea
                rows={4}
                placeholder="What are you building?"
                {...register('message', {
                  required: 'Tell me a little about the project',
                  minLength: { value: 10, message: 'A bit more detail helps' },
                })}
                className={errors.message ? styles.inputError : ''}
              />
              {errors.message && <span className={styles.error}>{errors.message.message}</span>}
            </div>

            <Magnetic as="button" type="submit" className={styles.submit} disabled={isSubmitting} data-cursor="hover">
              Send message
            </Magnetic>

            <AnimatePresence>
              {sent && (
                <motion.div
                  className={styles.successToast}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  <FiCheck /> Opening your email client — send it off!
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </section>
  );
}
