import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Experience from '../components/Experience/Experience';
import Skills from '../components/Skills/Skills';
import TechMarquee from '../components/Marquee/TechMarquee';
import Work from '../components/Work/Work';
import Services from '../components/Services/Services';
import Achievements from '../components/Achievements/Achievements';
import Testimonials from '../components/Testimonials/Testimonials';
import Contact from '../components/Contact/Contact';

export default function Home({ ready }) {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      // slight delay lets layout/loader settle before measuring position
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
    }
  }, [location.hash]);

  return (
    <main>
      <Hero ready={ready} />
      <About />
      <Experience />
      <TechMarquee />
      <Skills />
      <Work />
      <Achievements />
      <Services />
      <Testimonials />
      <Contact />
    </main>
  );
}
