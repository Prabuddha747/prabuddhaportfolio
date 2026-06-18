import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

const NAME = 'PRABUDDHA';

export default function Loader() {
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const pStart = Date.now();
    const pDur = 2500;
    const pTick = setInterval(() => {
      const t = Math.min(1, (Date.now() - pStart) / pDur);
      const p = Math.round(t < 0.6 ? (t / 0.6) * 80 : t < 0.85 ? ((t - 0.6) / 0.25) * 13 + 80 : ((t - 0.85) / 0.15) * 7 + 93);
      setPct(p);
      if (p >= 100) clearInterval(pTick);
    }, 32);

    function dismiss() { setDone(true); setPct(100); clearInterval(pTick); }
    const minTime = new Promise((r) => setTimeout(r, 2600));
    const pageLoad = new Promise((r) => {
      if (document.readyState === 'complete') r();
      else window.addEventListener('load', r);
    });
    Promise.all([minTime, pageLoad]).then(dismiss);

    return () => clearInterval(pTick);
  }, []);

  return (
    <div className={`${styles.loader} ${done ? styles.done : ''}`} aria-hidden="true">
      <div className={styles.grid} />
      <div className={styles.logo}>P</div>
      <div className={styles.name}>
        {NAME.split('').map((ch, i) => (
          <span key={i} style={{ animationDelay: `${0.3 + i * 0.06}s` }}>{ch}</span>
        ))}
      </div>
      <div className={styles.sub}>AI Engineer&nbsp;&nbsp;&middot;&nbsp;&nbsp;Backend Developer</div>
      <div className={styles.barWrap}><div className={styles.bar} /></div>
      <div className={styles.pct}>{pct}%</div>
    </div>
  );
}
