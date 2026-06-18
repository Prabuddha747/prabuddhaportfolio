import { resumeLinks } from '../../data/socialLinks';
import styles from './ResumeModal.module.css';

export default function ResumeModal({ open, frameSrc, onClose }) {
  return (
    <div className={`${styles.modal} ${open ? styles.open : ''}`} aria-hidden={!open} role="dialog" aria-label="Resume Preview">
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.box}>
        <div className={styles.head}>
          <span className={styles.title}>Prabuddha Verma — Résumé</span>
          <div className={styles.acts}>
            <a href={resumeLinks.download} className={`btn btn-fill ${styles.dl}`} target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
              Download PDF
            </a>
            <button className={styles.close} onClick={onClose} aria-label="Close resume">
              <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>
        <iframe className={styles.frame} src={frameSrc} allow="autoplay" title="Resume PDF" loading="lazy" />
      </div>
    </div>
  );
}
