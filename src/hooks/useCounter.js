import { useEffect, useRef, useState } from 'react';

/** Counts up from 0 to target once the element scrolls into view. */
export function useCounter(target) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || target == null) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        let s = 0;
        const inc = target / 88;
        const timer = setInterval(() => {
          s = Math.min(s + inc, target);
          setValue(Math.round(s));
          if (s >= target) clearInterval(timer);
        }, 16);
        io.unobserve(el);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return [ref, value];
}
