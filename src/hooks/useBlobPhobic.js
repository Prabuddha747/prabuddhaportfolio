import { useEffect, useRef } from 'react';

/** Makes the hero blob flee from the cursor inside the hero section. */
export function useBlobPhobic(heroRef, blobRef) {
  const stateRef = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const blob = blobRef.current;
    const hero = heroRef.current;
    if (!blob || !hero) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const lerp = (a, b, t) => a + (b - a) * t;
    let rafId;
    function loop() {
      const s = stateRef.current;
      s.tx = lerp(s.tx, s.cx, 0.06);
      s.ty = lerp(s.ty, s.cy, 0.06);
      blob.style.translate = `${s.tx.toFixed(1)}px ${s.ty.toFixed(1)}px`;
      rafId = requestAnimationFrame(loop);
    }
    loop();

    function onMove(e) {
      const r = blob.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const trigger = 380;
      const s = stateRef.current;
      if (dist < trigger) {
        const force = Math.pow(1 - dist / trigger, 1.6) * 140;
        const ang = Math.atan2(dy, dx);
        s.cx = -Math.cos(ang) * force;
        s.cy = -Math.sin(ang) * force;
      } else { s.cx = 0; s.cy = 0; }
    }
    function onLeave() { stateRef.current.cx = 0; stateRef.current.cy = 0; }

    hero.addEventListener('mousemove', onMove, { passive: true });
    hero.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
    };
  }, [heroRef, blobRef]);
}
