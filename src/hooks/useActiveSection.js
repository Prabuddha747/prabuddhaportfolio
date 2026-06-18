import { useEffect, useState } from 'react';

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const secs = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { threshold: 0.35 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
