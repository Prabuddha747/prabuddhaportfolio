import { useEffect } from 'react';

/** Tilts the device mockup toward the cursor within a project section. */
export function useDeviceParallax(sectionRef, deviceRef, isPhone) {
  useEffect(() => {
    const sec = sectionRef.current;
    const dev = deviceRef.current;
    if (!sec || !dev) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    function onMove(e) {
      const r = sec.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 16;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
      dev.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg) translateZ(10px)`;
    }
    function onLeave() {
      dev.style.transform = isPhone ? '' : 'perspective(1000px) rotateY(-4deg) rotateX(2deg)';
    }
    sec.addEventListener('mousemove', onMove);
    sec.addEventListener('mouseleave', onLeave);
    return () => {
      sec.removeEventListener('mousemove', onMove);
      sec.removeEventListener('mouseleave', onLeave);
    };
  }, [sectionRef, deviceRef, isPhone]);
}
