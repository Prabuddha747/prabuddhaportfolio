import { useRef } from 'react';
import Reveal from '../Reveal/Reveal';
import { useDeviceParallax } from '../../hooks/useDeviceParallax';
import Metric from './Metric';
import RetailDashboardMockup from './mockups/RetailDashboardMockup';
import PlantMonitorMockup from './mockups/PlantMonitorMockup';
import DriverHealthMockup from './mockups/DriverHealthMockup';
import SentimentMockup from './mockups/SentimentMockup';
import styles from './ProjectSection.module.css';

const MOCKUPS = {
  retail: RetailDashboardMockup,
  plant: PlantMonitorMockup,
  driver: DriverHealthMockup,
  sentiment: SentimentMockup,
};

export default function ProjectSection({ project, bgNumAlign }) {
  const sectionRef = useRef(null);
  const deviceRef = useRef(null);
  const isPhone = project.device === 'phone';
  useDeviceParallax(sectionRef, deviceRef, isPhone);

  const Mockup = MOCKUPS[project.mockup];

  return (
    <section
      id={project.id}
      ref={sectionRef}
      className={`${styles.proj} ${project.reversed ? styles.rev : ''}`}
      aria-label={project.numLabel}
    >
      <div className={styles.bgNum} style={bgNumAlign === 'left' ? { left: '16px', right: 'auto' } : undefined}>
        {project.num}
      </div>
      <Reveal as="div" className={styles.info}>
        <div className={styles.numLabel} style={project.accentNum ? { color: 'var(--accent)' } : undefined}>{project.numLabel}</div>
        <h2 className={styles.title} dangerouslySetInnerHTML={{ __html: project.title }} />
        <p className={styles.desc}>{project.desc}</p>
        <div className={styles.tags}>
          {project.tags.map((t) => (
            <span key={t} className={`${styles.tag} ${project.accentTags ? styles.tagAccent : ''}`}>{t}</span>
          ))}
        </div>
        <div className={styles.metrics}>
          {project.metrics.map((m, i) => <Metric key={i} metric={m} />)}
        </div>
        <div className={styles.links}>
          <a href={project.nextHref} className="btn btn-out">{project.nextLabel}</a>
        </div>
      </Reveal>
      <Reveal as="div" delay="rd2" className={styles.vis}>
        {isPhone ? (
          <div ref={deviceRef} className={styles.devPhone}>
            <div className={styles.dsc}>
              <Mockup />
            </div>
          </div>
        ) : (
          <div ref={deviceRef} className={styles.devLaptop}>
            <div className={styles.devLs}>
              <div className={styles.dsi}>
                <Mockup />
              </div>
            </div>
            <div className={styles.devLb} />
          </div>
        )}
      </Reveal>
    </section>
  );
}
