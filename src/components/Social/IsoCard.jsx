import Reveal from '../Reveal/Reveal';
import styles from './Social.module.css';

export default function IsoCard({ href, label, name, handle, accent, delayCss, icon }) {
  return (
    <Reveal
      as="a"
      href={href}
      target="_blank"
      rel="noopener"
      className={styles.scene}
      style={{ '--d': delayCss }}
      aria-label={label}
    >
      <div className={styles.card}>
        <div className={`${styles.face} ${styles.top}`}>{label}</div>
        <div className={`${styles.face} ${styles.front}`} style={{ '--sc': accent }}>
          <div className={styles.icon}>{icon}</div>
          <div>
            <div className={styles.name}>{name}</div>
            <div className={styles.handle}>{handle}</div>
          </div>
        </div>
        <div className={`${styles.face} ${styles.right}`} />
        <div className={`${styles.face} ${styles.bottom}`} />
      </div>
    </Reveal>
  );
}
