import { useRef } from 'react';
import Loader from './components/Loader/Loader';
import Cursor from './components/Cursor/Cursor';
import Particles from './components/Particles/Particles';
import SideNav from './components/SideNav/SideNav';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import WorkExperience from './components/WorkExperience/WorkExperience';
import ProjectSection from './components/ProjectSection/ProjectSection';
import Globe from './components/Globe/Globe';
import Social from './components/Social/Social';
import Testimonials from './components/Testimonials/Testimonials';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import ResumeModal from './components/ResumeModal/ResumeModal';
import BackToTop from './components/BackToTop/BackToTop';
import { useTheme } from './hooks/useTheme';
import { useResumeModal } from './hooks/useResumeModal';
import { useMagneticButtons } from './hooks/useMagneticButton';
import { projects } from './data/projects';

export default function App() {
  const [light, toggleTheme] = useTheme();
  const resume = useResumeModal();
  const appRef = useRef(null);
  useMagneticButtons(appRef);

  return (
    <div ref={appRef}>
      <Loader />
      <ResumeModal open={resume.open} frameSrc={resume.frameSrc} onClose={resume.closeModal} />

      <a
        href="#main-content"
        style={{
          position: 'fixed', top: '-100%', left: '50%', transform: 'translateX(-50%)',
          background: 'var(--primary)', color: '#000', padding: '12px 24px',
          borderRadius: '0 0 8px 8px', fontWeight: 700, zIndex: 9999, transition: 'top .2s', textDecoration: 'none',
        }}
        onFocus={(e) => { e.currentTarget.style.top = '0'; }}
        onBlur={(e) => { e.currentTarget.style.top = '-100%'; }}
      >
        Skip to content
      </a>

      <Cursor />
      <Particles />
      <SideNav />
      <Header light={light} onToggleTheme={toggleTheme} onOpenResume={resume.openModal} />

      <main id="main-content">
        <Hero />
        <Marquee />
        <div className="divider" />
        <WorkExperience />

        <div className="divider" />
        <ProjectSection project={projects[0]} />
        <div className="divider" />
        <ProjectSection project={projects[1]} bgNumAlign="left" />
        <div className="divider" />
        <ProjectSection project={projects[2]} />
        <div className="divider" />
        <ProjectSection project={projects[3]} bgNumAlign="left" />

        <div className="divider" />
        <Globe />

        <div className="divider" />
        <Social />

        <div className="divider" />
        <Testimonials />

        <div className="divider" />
        <About />

        <div className="divider" />
        <Contact />
      </main>

      <BackToTop />
    </div>
  );
}
