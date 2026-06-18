import { useRef } from 'react';
import { useRoleScramble } from '../../hooks/useRoleScramble';
import { useBlobPhobic } from '../../hooks/useBlobPhobic';
import BlobFace from './BlobFace';
import styles from './Hero.module.css';

export default function Hero() {
  const heroRef = useRef(null);
  const blobRef = useRef(null);
  const roleHtml = useRoleScramble();
  useBlobPhobic(heroRef, blobRef);

  return (
    <section id="hero" ref={heroRef} className={styles.hero} aria-label="Introduction">
      <div ref={blobRef} className={styles.blob} aria-hidden="true">
        <BlobFace heroRef={heroRef} />
      </div>
      <div className={styles.inner}>
        <div className={styles.pre}>Prabuddha Verma</div>
        <h1 className={styles.title}>
          <span className={styles.roleCycle} dangerouslySetInnerHTML={{ __html: roleHtml }} />
        </h1>
        <p className={styles.sub}>
          Freelance engineer — <strong>web apps, mobile apps, AI systems &amp; automation</strong>.
          Full-stack from React to Golang to production ML. Two patents. Graduating 2026.
        </p>
        <div className={styles.cta}>
          <a href="#works" className="btn btn-fill">
            <svg viewBox="0 0 16 16"><path d="M8 1v10M3 7l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            View My Work
          </a>
          <a href="#contact" className="btn btn-out">Let's Talk</a>
        </div>
      </div>
      <div className={styles.scrollCue} aria-hidden="true">
        <div className={styles.mouseIcon}><div className={styles.mouseWheel} /></div>
        <span className={styles.scrollLabel}>Scroll to explore</span>
      </div>
    </section>
  );
}
