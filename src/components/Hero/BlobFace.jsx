import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

const EXPRS = [
  { d: 'M5 6 Q28 22 51 6', fill: 'none', stroke: 'rgba(0,229,255,.38)', dur: 4500 },
  { d: 'M2 3 Q28 23 54 3', fill: 'none', stroke: 'rgba(0,229,255,.52)', dur: 2200 },
  { d: 'M22 5 C22 1 34 1 34 7 C34 17 22 17 22 7 C22 1 22 5 22 5', fill: 'rgba(0,229,255,.12)', stroke: 'rgba(0,229,255,.5)', dur: 2000 },
  { d: 'M10 10 Q28 8 46 10', fill: 'none', stroke: 'rgba(0,229,255,.28)', dur: 1600 },
];

export default function BlobFace({ heroRef }) {
  const eyeLRef = useRef(null);
  const eyeRRef = useRef(null);
  const mouthRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const eyeL = eyeLRef.current, eyeR = eyeRRef.current, mouth = mouthRef.current;
    if (!hero || !eyeL || !eyeR || !mouth) return;

    function wink(eye, dur) { eye.classList.add(styles.wink); setTimeout(() => eye.classList.remove(styles.wink), dur || 320); }
    const t1 = setTimeout(() => wink(eyeR, 420), 3400);
    const winkInterval = setInterval(() => { if (Math.random() < 0.45) wink(Math.random() < 0.5 ? eyeL : eyeR, 300); }, 7500);

    let ei = 0;
    let exprTimer;
    function nextExpr() {
      const e = EXPRS[ei = (ei + 1) % EXPRS.length];
      mouth.setAttribute('d', e.d);
      mouth.setAttribute('fill', e.fill);
      mouth.setAttribute('stroke', e.stroke);
      exprTimer = setTimeout(nextExpr, e.dur + Math.random() * 1800);
    }
    const exprStart = setTimeout(nextExpr, 4000);

    let active = true;
    const io = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; }, { threshold: 0.05 });
    io.observe(hero);

    const blob = hero.querySelector(`.${styles.blob}`);
    function onMove(e) {
      if (!active || !blob) return;
      const r = blob.getBoundingClientRect();
      const bx = r.left + r.width * 0.5, by = r.top + r.height * 0.5;
      const dx = e.clientX - bx, dy = e.clientY - by;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = Math.min(dist / 120, 1);
      const px = (dx / dist) * 7 * force, py = (dy / dist) * 7 * force;
      [eyeL, eyeR].forEach((eye) => {
        const pupil = eye.querySelector(`.${styles.pupil}`);
        if (pupil) pupil.style.transform = `translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`;
      });
    }
    function onLeave() {
      [eyeL, eyeR].forEach((eye) => {
        const pupil = eye.querySelector(`.${styles.pupil}`);
        if (pupil) pupil.style.transform = '';
      });
    }
    document.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave);

    return () => {
      clearTimeout(t1); clearInterval(winkInterval);
      clearTimeout(exprStart); clearTimeout(exprTimer);
      io.disconnect();
      document.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, [heroRef]);

  return (
    <div className={styles.bface}>
      <div className={styles.bfaceEyes}>
        <div ref={eyeLRef} className={styles.bfaceEye}><span className={styles.pupil} /></div>
        <div ref={eyeRRef} className={styles.bfaceEye}><span className={styles.pupil} /></div>
      </div>
      <svg className={styles.bfaceSmile} viewBox="0 0 56 24" fill="none">
        <path ref={mouthRef} d="M5 6 Q28 22 51 6" stroke="rgba(0,229,255,.38)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  );
}
