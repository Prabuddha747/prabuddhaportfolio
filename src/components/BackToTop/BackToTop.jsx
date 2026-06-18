import { useBackToTop } from '../../hooks/useBackToTop';
import styles from './BackToTop.module.css';

export default function BackToTop() {
  const show = useBackToTop();
  return (
    <a href="#hero" className={`${styles.btt} ${show ? styles.show : ''}`} aria-label="Back to top">
      <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>
    </a>
  );
}
