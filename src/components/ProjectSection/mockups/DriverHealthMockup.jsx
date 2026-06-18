import styles from './SensorMockup.module.css';

const VITALS = [
  { icon: '♥', label: 'Heart Rate', value: '102', unit: 'bpm', tone: 'bad' },
  { icon: 'O₂', label: 'SpO₂', value: '92', unit: '%', tone: 'good' },
  { icon: '🧠', label: 'Stress Idx', value: '78', unit: '', tone: 'warn' },
  { icon: '🚗', label: 'Steering', value: '65', unit: '%', tone: 'warn' },
];

export default function DriverHealthMockup() {
  return (
    <div className={styles.wrap} style={{ background: 'linear-gradient(160deg,#040d10,#051418)' }}>
      <div className={styles.appbar} style={{ background: 'transparent' }}>
        <div className={styles.appbarLeft}>
          <span className={styles.appbarTitle} style={{ color: 'rgba(0,229,255,.7)', lineHeight: 1.4 }}>
            AI Predictive<br />Safety System
          </span>
        </div>
        <span className={styles.live} style={{ color: 'rgba(74,222,128,.8)' }}>● LIVE</span>
      </div>

      <div className={styles.alertBanner} style={{ background: 'rgba(255,70,70,.08)', border: '1px solid rgba(255,70,70,.3)' }}>
        <div className={styles.alertTitle} style={{ color: 'rgba(255,90,90,.92)' }}>⚠ Fatigue Detected · Driver 1</div>
        <div className={styles.alertSub}>NH 48, India · 07:42 AM</div>
      </div>

      <div className={styles.grid}>
        {VITALS.map((v) => (
          <div key={v.label} className={`${styles.card} ${styles[v.tone]}`}>
            <div className={styles.cardIcon} style={{ marginBottom: 2 }}>{v.icon}</div>
            <div className={`${styles.value} ${styles['value_' + v.tone]}`}>{v.value}<span className={styles.unit}>{v.unit}</span></div>
            <div className={styles.label}>{v.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.wave} style={{ borderColor: 'rgba(255,80,80,.1)', background: 'rgba(255,80,80,.03)' }}>
        <svg viewBox="0 0 200 34" preserveAspectRatio="none">
          <polyline
            className={styles.ekg}
            points="0,17 20,17 35,17 40,4 45,30 50,17 65,17 80,17 85,9 93,26 98,17 118,17 133,17 138,4 143,30 148,17 163,17 178,17 183,9 191,26 196,17 200,17"
            fill="none" stroke="rgba(255,90,90,.82)" strokeWidth="1.5"
            style={{ animationDuration: '2s' }}
          />
        </svg>
      </div>

      <div className={styles.motorRow}>
        <div className={styles.motorCard} style={{ background: 'rgba(255,60,60,.1)', borderColor: 'rgba(255,60,60,.28)' }}>
          <div className={styles.motorLabel}>Driver Status</div>
          <div className={styles.motorOn} style={{ color: 'rgba(255,80,80,.9)' }}>ABNORMAL</div>
        </div>
        <div className={styles.motorCard} style={{ background: 'rgba(255,60,60,.12)', borderColor: 'rgba(255,60,60,.32)' }}>
          <div className={styles.motorLabel}>Alert</div>
          <div className={styles.motorOn} style={{ color: 'rgba(255,80,80,.9)' }}>🚨 SOS SENT</div>
        </div>
      </div>
    </div>
  );
}
