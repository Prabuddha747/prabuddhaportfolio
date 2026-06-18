import { useEffect, useState } from 'react';

export function useBackToTop(threshold = 500) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    function onScroll() { setShow(window.scrollY > threshold); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return show;
}
