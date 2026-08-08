import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { blogPosts } from '../../data/content';
import { readingTime, formatDate } from './blogUtils';
import styles from './Blog.module.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className={styles.postPage}>
      <div className={styles.progressTrack}>
        <motion.div className={styles.progressFill} style={{ scaleX: progress }} />
      </div>

      <div className="container">
        <Link to="/blog" className={styles.back} data-cursor="hover">
          <FiArrowLeft /> All posts
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.postMeta}>
            <span className={styles.postCategory}>{post.category}</span>
            <span className={styles.postDate}>{formatDate(post.date)}</span>
            <span className={styles.postReadTime}>{readingTime(post.body)} min read</span>
          </div>
          <h1 className={styles.postHeading}>{post.title}</h1>
        </motion.div>

        <article className={styles.articleBody}>
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>

        <div className={styles.related}>
          <span className={styles.colLabel}>Read next</span>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className={styles.relatedCard} data-cursor="hover">
                <span className={styles.postCategory}>{r.category}</span>
                <span className={styles.relatedTitle}>{r.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
