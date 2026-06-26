import Reveal from '../Reveal/Reveal';
import JellyBlobs from '../JellyBlobs/JellyBlobs';
import { experience } from '../../data/experience';
import styles from './WorkExperience.module.css';

const JELLY = [
  { x: '78%', y: '8%', w: 'min(420px, 52vw)', c1: 'rgba(0,229,255,.055)', c2: 'rgba(0,200,230,.02)', dur: '16s', del: '-3s' },
  { x: '5%', y: '55%', w: 'min(320px, 40vw)', c1: 'rgba(166,108,255,.05)', c2: 'rgba(140,80,240,.015)', dur: '13s', del: '-9s' },
];

export default function WorkExperience() {
  return (
    <section id="works" className={styles.works} aria-label="Work Experience">
      <JellyBlobs configs={JELLY} />
      <Reveal as="div" className="s-label">Experience</Reveal>
      <Reveal as="h2" delay="rd1" className="s-head">Work</Reveal>
      <div className={styles.grid}>
        {experience.map((job, i) => (
          <Reveal
            key={job.company}
            delay={i === 0 ? 'rd1' : 'rd2'}
            className={`${styles.card} ${job.accent ? styles.accent : ''}`}
          >
            <div className={styles.head2}>
              <div>
                <div className={styles.role}>{job.role}</div>
                <div className={styles.company}>{job.company}</div>
              </div>
              <span className={`${styles.period} ${job.live ? styles.live : ''}`}>
                {job.live ? '● ' : ''}{job.period}
              </span>
            </div>
            <div className={styles.tags}>
              {job.tags.map((t) => (
                <span key={t} className={`${styles.tag} ${job.accent ? styles.tagAccent : ''}`}>{t}</span>
              ))}
            </div>
            <ul className={styles.points}>
              {job.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
