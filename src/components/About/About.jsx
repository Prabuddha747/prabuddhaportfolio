import Reveal from '../Reveal/Reveal';
import JellyBlobs from '../JellyBlobs/JellyBlobs';
import { skillPills } from '../../data/techStack';
import styles from './About.module.css';

const JELLY = [
  { x: '72%', y: '20%', w: '360px', c1: 'rgba(166,108,255,.06)', c2: 'rgba(120,60,220,.02)', dur: '19s', del: '-6s' },
];

export default function About() {
  return (
    <section id="details" className={styles.about} aria-label="About Prabuddha">
      <JellyBlobs configs={JELLY} />
      <Reveal as="div" className={styles.avis}>
        <div className={styles.frame}>
          <div className={styles.bg} />
          <div className={styles.pin}><img src={`${import.meta.env.BASE_URL}profile.jpg`} className={styles.photo} alt="Prabuddha Verma" /></div>
          <div className={styles.badge}><div className={styles.badgeValue}>2</div><div className={styles.badgeLabel}>Patents Filed</div></div>
        </div>
      </Reveal>
      <div>
        <Reveal as="div" className="s-label">About me</Reveal>
        <Reveal as="h2" delay="rd1" className="s-head">Hi there</Reveal>
        <Reveal as="p" delay="rd2" className={styles.p}>
          I'm Prabuddha — a software engineer and freelancer who designs, builds, and ships full-stack products.{' '}
          <strong>Web apps, mobile apps, AI systems, automation pipelines, backend infrastructure.</strong>{' '}
          If it needs to be fast, reliable, and production-ready — that's my domain. Final year at{' '}
          <a href="https://vit.ac.in" target="_blank" rel="noopener" className={styles.link}>VIT Chennai</a>, graduating 2026.
        </Reveal>
        <Reveal as="p" delay="rd3" className={styles.p}>
          Available for <strong>freelance &amp; contract work</strong> across web development (React, Next.js),
          mobile apps (React Native), AI &amp; automation (RAG, LLMs, computer vision, workflow bots), and backend
          systems (Golang, Node.js, PostgreSQL, Docker). Two patents. Oracle GenAI &amp; AWS certified.
        </Reveal>
        <Reveal as="div" delay="rd2" className={styles.skillRow}>
          {skillPills.map((s) => <span key={s} className={styles.pill}>{s}</span>)}
        </Reveal>
        <Reveal as="div" delay="rd3" className={styles.certRow}>
          <div className={styles.certCard}>
            <img src={`${import.meta.env.BASE_URL}cert_aws.jpg`} className={styles.certThumb} alt="AWS CLF-C02 Certificate" />
            <div className={styles.certInfo}>
              <div className={styles.certName}>AWS Cloud Practitioner</div>
              <div className={styles.certBy}>CLF-C02 · Aug 2025</div>
            </div>
          </div>
          <div className={styles.certCard}>
            <img src={`${import.meta.env.BASE_URL}cert_oracle.jpg`} className={styles.certThumb} alt="Oracle GenAI Certificate" />
            <div className={styles.certInfo}>
              <div className={styles.certName}>Oracle GenAI Professional</div>
              <div className={styles.certBy}>OCI Certified · 2025</div>
            </div>
          </div>
        </Reveal>
        <Reveal delay="rd4"><a href="#contact" className="btn btn-fill">Get In Touch</a></Reveal>
      </div>
    </section>
  );
}
