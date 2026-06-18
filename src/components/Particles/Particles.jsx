import { useMemo } from 'react';
import styles from './Particles.module.css';

export default function Particles({ count = 26 }) {
  const particles = useMemo(() => Array.from({ length: count }, () => ({
    left: Math.random() * 100,
    dur: 14 + Math.random() * 18,
    del: -Math.random() * 18,
    dx: (Math.random() - 0.5) * 100,
    opacity: 0.15 + Math.random() * 0.4,
  })), [count]);

  return (
    <div className={styles.particles} aria-hidden="true">
      {particles.map((p, i) => (
        <div
          key={i}
          className={styles.particle}
          style={{
            left: `${p.left}%`,
            '--dur': `${p.dur}s`,
            '--del': `${p.del}s`,
            '--dx': `${p.dx}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
