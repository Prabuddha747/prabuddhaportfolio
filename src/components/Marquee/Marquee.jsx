import { marqueeItems } from '../../data/techStack';
import styles from './Marquee.module.css';

export default function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.track}>
        {items.map((item, i) => (
          <span key={i} className={styles.item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
