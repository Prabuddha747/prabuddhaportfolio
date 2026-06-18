import { useEffect, useState } from 'react';

export function useTheme() {
  const [light, setLight] = useState(() => localStorage.getItem('theme') === 'light');

  useEffect(() => {
    document.body.classList.toggle('light', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }, [light]);

  return [light, () => setLight((v) => !v)];
}
