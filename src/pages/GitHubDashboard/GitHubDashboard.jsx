import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiStar, FiGitBranch, FiExternalLink, FiGithub, FiMapPin,
  FiBriefcase, FiLink, FiSearch,
} from 'react-icons/fi';
import { githubUsername } from '../../data/content';
import useDocumentHead from '../../hooks/useDocumentHead';
import styles from './GitHubDashboard.module.css';

const SORTS = {
  stars: (a, b) => b.stargazers_count - a.stargazers_count,
  updated: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
  name: (a, b) => a.name.localeCompare(b.name),
};

function timeAgo(iso) {
  const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
  if (days < 1) return 'today';
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export default function GitHubDashboard() {
  useDocumentHead({
    title: 'GitHub',
    description: `Live GitHub activity, repositories, and contribution graph for @${githubUsername}.`,
    path: '/github',
  });

  const [profile, setProfile] = useState(null);
  const [allRepos, setAllRepos] = useState([]);
  const [status, setStatus] = useState('loading');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('stars');
  const [language, setLanguage] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
    let cancelled = false;

    async function load() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${githubUsername}`),
          fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error('GitHub API request failed');
        const profileData = await profileRes.json();
        const reposData = await reposRes.json();
        if (cancelled) return;
        setProfile(profileData);
        setAllRepos(reposData.filter((r) => !r.fork));
        setStatus('ready');
      } catch (e) {
        if (!cancelled) setStatus('error');
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const languages = useMemo(() => {
    const set = new Set(allRepos.map((r) => r.language).filter(Boolean));
    return ['All', ...set];
  }, [allRepos]);

  const filteredRepos = useMemo(() => {
    return allRepos
      .filter((r) => language === 'All' || r.language === language)
      .filter((r) => !query || r.name.toLowerCase().includes(query.toLowerCase()))
      .sort(SORTS[sortBy]);
  }, [allRepos, query, sortBy, language]);

  return (
    <main className={styles.page}>
      <div className="container">
        <p className="eyebrow">Live from GitHub</p>
        <h1 className={styles.title}>@{githubUsername}</h1>
        <p className={styles.sub}>
          Pulled live from the public GitHub API — this is real, current data, not a snapshot.
        </p>

        {status === 'loading' && <p className={styles.status}>Loading live GitHub data…</p>}
        {status === 'error' && (
          <p className={styles.status}>
            Couldn't reach the GitHub API right now (likely rate-limited — it's unauthenticated and capped at 60 requests/hour per IP). Try again shortly, or view the profile directly on{' '}
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        )}

        {status === 'ready' && profile && (
          <>
            <motion.div
              className={styles.profileCard}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src={profile.avatar_url} alt={profile.login} className={styles.avatar} />

              <div className={styles.profileInfo}>
                <div className={styles.profileHead}>
                  <h2 className={styles.profileName}>{profile.name || profile.login}</h2>
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.profileBtn}
                    data-cursor="hover"
                    data-cursor-text="Open"
                  >
                    <FiGithub /> View GitHub profile
                  </a>
                </div>

                {profile.bio && <p className={styles.profileBio}>{profile.bio}</p>}

                <div className={styles.profileMeta}>
                  {profile.company && <span><FiBriefcase /> {profile.company}</span>}
                  {profile.location && <span><FiMapPin /> {profile.location}</span>}
                  {profile.blog && (
                    <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer">
                      <FiLink /> {profile.blog}
                    </a>
                  )}
                </div>

                <div className={styles.statsRow}>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{profile.public_repos}</span>
                    <span className={styles.statLabel}>Public repos</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{profile.followers}</span>
                    <span className={styles.statLabel}>Followers</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statValue}>{profile.following}</span>
                    <span className={styles.statLabel}>Following</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className={styles.heatmapBlock}>
              <span className={styles.colLabel}>Contribution activity</span>
              <img
                src={`https://ghchart.rshah.org/17e9a6/${githubUsername}`}
                alt={`${githubUsername} GitHub contribution graph`}
                className={styles.heatmap}
                loading="lazy"
              />
              <p className={styles.heatmapNote}>
                Rendered by a public unauthenticated chart service — the real full-year graph lives on your{' '}
                <a href={profile.html_url} target="_blank" rel="noreferrer">GitHub profile</a>.
              </p>
            </div>

            <div className={styles.repoHeader}>
              <span className={styles.colLabel}>
                Repositories — showing {filteredRepos.length} of {allRepos.length}
              </span>

              <div className={styles.repoControls}>
                <div className={styles.searchBox}>
                  <FiSearch />
                  <input
                    type="search"
                    placeholder="Filter by name…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className={styles.select}
                >
                  {languages.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>

                <div className={styles.sortTabs}>
                  {[
                    ['stars', 'Stars'],
                    ['updated', 'Recent'],
                    ['name', 'Name'],
                  ].map(([key, label]) => (
                    <button
                      key={key}
                      className={`${styles.sortTab} ${sortBy === key ? styles.sortActive : ''}`}
                      onClick={() => setSortBy(key)}
                      data-cursor="hover"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.repoGrid}>
              {filteredRepos.length === 0 && (
                <p className={styles.empty}>No repos match that filter.</p>
              )}
              {filteredRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.repoCard}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.04 }}
                  data-cursor="hover"
                >
                  <div className={styles.repoTop}>
                    <span className={styles.repoName}>{repo.name}</span>
                    <FiExternalLink />
                  </div>
                  <p className={styles.repoDesc}>{repo.description || 'No description provided.'}</p>
                  <div className={styles.repoMeta}>
                    {repo.language && <span><FiGitBranch /> {repo.language}</span>}
                    <span><FiStar /> {repo.stargazers_count}</span>
                    <span className={styles.repoUpdated}>Updated {timeAgo(repo.updated_at)}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className={styles.footerCta}>
              <a
                href={profile.html_url}
                target="_blank"
                rel="noreferrer"
                className={styles.footerBtn}
                data-cursor="hover"
              >
                <FiGithub /> See everything on GitHub
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  );
}