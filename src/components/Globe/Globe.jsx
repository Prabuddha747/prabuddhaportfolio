import { useRef, useMemo } from 'react';
import Reveal from '../Reveal/Reveal';
import { useGlobe } from '../../hooks/useGlobe';
import styles from './Globe.module.css';

const PARTICLE_COLORS = ['rgba(255,180,60,.55)', 'rgba(255,140,40,.45)', 'rgba(255,200,80,.4)', 'rgba(255,100,20,.35)', 'rgba(255,220,100,.3)'];

export default function Globe() {
  const canvasRef = useRef(null);
  const labelsRef = useRef(null);
  useGlobe(canvasRef, labelsRef);

  const particles = useMemo(() => Array.from({ length: 22 }, () => {
    const size = Math.random() * 3 + 1.5;
    return {
      size,
      left: 15 + Math.random() * 70,
      top: 20 + Math.random() * 60,
      dur: 4 + Math.random() * 8,
      delay: -Math.random() * 12,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
    };
  }), []);

  return (
    <section id="globe" className={styles.globe} aria-label="Tech Stack Globe">
      <Reveal as="div" className={styles.title}>
        <div className="s-label" style={{ justifyContent: 'center' }}>Tech Stack</div>
        <h2 className="s-head">Technologies I Work With</h2>
        <p className={styles.lead}>Drag to rotate — each pin is a technology I've shipped real code with.</p>
      </Reveal>
      <Reveal as="div" delay="rd2" className={styles.wrap}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div ref={labelsRef} className={styles.labels} aria-hidden="true" />
        <div className={styles.particles} aria-hidden="true">
          {particles.map((p, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{
                width: p.size, height: p.size,
                left: `${p.left}%`, top: `${p.top}%`,
                background: p.color,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
