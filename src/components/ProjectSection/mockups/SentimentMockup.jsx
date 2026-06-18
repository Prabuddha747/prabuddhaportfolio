import styles from './SentimentMockup.module.css';

const MODALITIES = [
  { icon: '🎤', label: 'Audio', value: '89%', color: 'rgba(0,229,255,.9)', bg: 'rgba(0,229,255,.06)', border: 'rgba(0,229,255,.14)' },
  { icon: '💬', label: 'Text', value: '85%', color: 'rgba(166,108,255,.9)', bg: 'rgba(166,108,255,.06)', border: 'rgba(166,108,255,.14)' },
  { icon: '👁', label: 'Vision', value: '87%', color: 'rgba(74,222,128,.9)', bg: 'rgba(74,222,128,.06)', border: 'rgba(74,222,128,.14)' },
];

const EMOTIONS = [
  { label: 'Happy', pct: 87, color: 'linear-gradient(90deg,rgba(0,229,255,.82),rgba(0,229,255,.42))' },
  { label: 'Neutral', pct: 18, color: 'rgba(166,108,255,.6)' },
  { label: 'Sad', pct: 6, color: 'rgba(100,140,255,.55)' },
  { label: 'Angry', pct: 3, color: 'rgba(255,100,100,.55)' },
];

export default function SentimentMockup() {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>Live Sentiment Analysis</div>
      <div className={styles.face}>😊</div>
      <div className={styles.status}>POSITIVE · 87%</div>

      <div className={styles.modalities}>
        {MODALITIES.map((m) => (
          <div key={m.label} className={styles.modCard} style={{ background: m.bg, borderColor: m.border }}>
            <div className={styles.modIcon}>{m.icon}</div>
            <div className={styles.modLabel} style={{ color: m.color }}>{m.label}</div>
            <div className={styles.modValue} style={{ color: m.color }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className={styles.bars}>
        {EMOTIONS.map((e, i) => (
          <div key={e.label} className={styles.barRow}>
            <span className={styles.barLabel}>{e.label}</span>
            <div className={styles.barTrack}>
              <div className={styles.barFill} style={{ width: `${e.pct}%`, background: e.color, animationDelay: `${i * 0.12}s` }} />
            </div>
            <span className={styles.barValue}>{e.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
