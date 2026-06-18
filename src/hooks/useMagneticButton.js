import { useEffect } from 'react';

/** Attaches magnetic hover-follow to all .btn elements within a container ref. */
export function useMagneticButtons(containerRef) {
  useEffect(() => {
    const container = containerRef?.current || document;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const btns = container.querySelectorAll('.btn');
    const cleanups = [];
    btns.forEach((b) => {
      function onMove(e) {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.2}px)`;
      }
      function onLeave() { b.style.transform = ''; }
      b.addEventListener('mousemove', onMove);
      b.addEventListener('mouseleave', onLeave);
      cleanups.push(() => { b.removeEventListener('mousemove', onMove); b.removeEventListener('mouseleave', onLeave); });
    });
    return () => cleanups.forEach((fn) => fn());
  }, [containerRef]);
}
