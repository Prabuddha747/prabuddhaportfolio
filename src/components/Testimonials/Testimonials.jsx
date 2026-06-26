import Reveal from '../Reveal/Reveal';
import JellyBlobs from '../JellyBlobs/JellyBlobs';
import { testimonials } from '../../data/testimonials';
import styles from './Testimonials.module.css';

const JELLY = [
  { x: '60%', y: '5%', w: 'min(400px, 50vw)', c1: 'rgba(0,229,255,.05)', c2: 'rgba(0,200,240,.015)', dur: '15s', del: '-7s' },
  { x: '-5%', y: '50%', w: 'min(340px, 42vw)', c1: 'rgba(166,108,255,.055)', c2: 'transparent', dur: '17s', del: '-2s' },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.testi} aria-label="Testimonials">
      <JellyBlobs configs={JELLY} />
      <Reveal as="div" className={styles.title}>
        <div className="s-label" style={{ justifyContent: 'center' }}>Testimonials</div>
        <h2 className="s-head">What People Say</h2>
      </Reveal>
      <div className={styles.grid}>
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i === 0 ? undefined : i === 1 ? 'rd1' : 'rd2'} className={styles.card}>
            <span className={styles.quote}>&ldquo;</span>
            <p className={styles.text}>{t.text}</p>
            <div className={styles.sep} />
            <div className={styles.name}>{t.name}</div>
            <div className={styles.role}>{t.role}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
