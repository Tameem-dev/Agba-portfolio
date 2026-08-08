import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useLenis from './hooks/useLenis';
import ErrorBoundary from './components/ErrorBoundary';
import Loader from './components/Loader/Loader';
import Cursor from './components/Cursor/Cursor';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';

const CaseStudy = lazy(() => import('./pages/CaseStudy/CaseStudy'));
const GitHubDashboard = lazy(() => import('./pages/GitHubDashboard/GitHubDashboard'));
const Playground = lazy(() => import('./pages/Playground/Playground'));
const BlogList = lazy(() => import('./pages/Blog/BlogList'));
const BlogPost = lazy(() => import('./pages/Blog/BlogPost'));

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  useEffect(() => {
    // Top-level failsafe: if the loader's own internal logic never calls
    // back for any reason, this guarantees the page still becomes usable.
    const failsafe = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(failsafe);
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        {loading && <Loader onDone={() => setLoading(false)} />}
        <div className="noise-overlay" />
        <Cursor />
        <Nav />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home ready={!loading} />} />
            <Route path="/work/:id" element={<CaseStudy />} />
            <Route path="/github" element={<GitHubDashboard />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
