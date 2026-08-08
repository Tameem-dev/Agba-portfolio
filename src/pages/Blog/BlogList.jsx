import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { blogPosts } from '../../data/content';
import { readingTime, formatDate } from './blogUtils';
import styles from './Blog.module.css';

export default function BlogList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(
    () => ['All', ...new Set(blogPosts.map((p) => p.category))],
    []
  );

  const filtered = useMemo(() => {
    return blogPosts.filter((p) => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <main className={styles.page}>
      <div className="container">
        <p className="eyebrow">Writing</p>
        <h1 className={styles.title}>Notes from the build</h1>
        <p className={styles.sub}>Short, specific write-ups — real bugs, real tradeoffs, no filler.</p>

        <div className={styles.controls}>
          <input
            type="search"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.search}
          />
          <div className={styles.categories}>
            {categories.map((c) => (
              <button
                key={c}
                className={`${styles.categoryBtn} ${category === c ? styles.categoryActive : ''}`}
                onClick={() => setCategory(c)}
                data-cursor="hover"
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <p className={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
          {query && <> matching "{query}"</>}
          {category !== 'All' && <> in {category}</>}
        </p>

        <div className={styles.list}>
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 && (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className={styles.empty}
              >
                No posts match that search.
              </motion.p>
            )}
            {filtered.map((post, i) => (
              <motion.div
                key={post.slug}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
              >
                <Link to={`/blog/${post.slug}`} className={styles.postRow} data-cursor="hover">
                  <div className={styles.postMeta}>
                    <span className={styles.postCategory}>{post.category}</span>
                    <span className={styles.postDate}>{formatDate(post.date)}</span>
                    <span className={styles.postReadTime}>{readingTime(post.body)} min read</span>
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}