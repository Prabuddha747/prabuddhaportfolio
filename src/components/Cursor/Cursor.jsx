import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const c = dotRef.current, r = ringRef.current;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my;
    function onMove(e) { mx = e.clientX; my = e.clientY; }
    document.addEventListener('mousemove', onMove);
    let rafId;
    function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      c.style.left = mx + 'px'; c.style.top = my + 'px';
      r.style.left = rx + 'px'; r.style.top = ry + 'px';
      rafId = requestAnimationFrame(loop);
    }
    loop();

    function onEnter() { r.style.width = '52px'; r.style.height = '52px'; r.style.borderColor = 'rgba(0,229,255,.6)'; }
    function onLeave() { r.style.width = '36px'; r.style.height = '36px'; r.style.borderColor = 'rgba(0,229,255,.45)'; }
    const targets = document.querySelectorAll('a,button');
    targets.forEach((el) => { el.addEventListener('mouseenter', onEnter); el.addEventListener('mouseleave', onLeave); });

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMove);
      targets.forEach((el) => { el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave); });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cur} />
      <div ref={ringRef} className={styles.curRing} />
    </>
  );
}
