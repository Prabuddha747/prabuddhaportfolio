import styles from './SensorMockup.module.css';

const SENSORS = [
  { icon: '🌡', label: 'Temperature', value: '28', unit: '°C', status: 'Optimal', tone: 'good' },
  { icon: '💧', label: 'Moisture', value: '35', unit: '%', status: 'Good', tone: 'good' },
  { icon: 'N', label: 'Nitrogen', value: '32', unit: 'mg/kg', status: 'Normal', tone: 'neutral' },
  { icon: 'P', label: 'Phosphorus', value: '120', unit: 'mg/kg', status: 'High', tone: 'warn' },
  { icon: '⚖', label: 'pH Level', value: '6.3', unit: 'pH', status: 'Normal', tone: 'neutral' },
  { icon: '⚡', label: 'Conductivity', value: '339', unit: 'μS', status: 'Low', tone: 'bad' },
];

export default function PlantMonitorMockup() {
  return (
    <div className={styles.wrap} style={{ background: 'linear-gradient(160deg,#030e06,#061208)' }}>
      <div className={styles.appbar} style={{ background: 'rgba(74,222,128,.1)', borderColor: 'rgba(74,222,128,.2)' }}>
        <div className={styles.appbarLeft}>
          <span className={styles.appbarIcon}>🌱</span>
          <span className={styles.appbarTitle} style={{ color: 'rgba(74,222,128,.92)' }}>Sensor Readings</span>
        </div>
        <span className={styles.live} style={{ color: 'rgba(74,222,128,.8)' }}>● LIVE</span>
      </div>

      <div className={styles.grid}>
        {SENSORS.map((s) => (
          <div key={s.label} className={`${styles.card} ${styles[s.tone]}`}>
            <div className={styles.cardTop}>
              <span className={styles.cardIcon}>{s.icon}</span>
              <span className={`${styles.badge} ${styles['badge_' + s.tone]}`}>{s.status}</span>
            </div>
            <div className={`${styles.value} ${styles['value_' + s.tone]}`}>{s.value}<span className={styles.unit}>{s.unit}</span></div>
            <div className={styles.label}>{s.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.wave} style={{ borderColor: 'rgba(74,222,128,.07)' }}>
        <svg viewBox="0 0 200 28" preserveAspectRatio="none">
          <polyline className={styles.ekg} points="0,20 25,12 45,22 65,7 85,17 110,9 130,21 150,6 170,15 185,8 200,18" fill="none" stroke="rgba(74,222,128,.65)" strokeWidth="1.5" />
        </svg>
      </div>

      <div className={styles.motorRow}>
        <div className={styles.motorCard} style={{ background: 'rgba(74,222,128,.07)', borderColor: 'rgba(74,222,128,.18)' }}>
          <div className={styles.motorLabel}>Irrigation</div>
          <div className={styles.motorOn} style={{ color: 'rgba(74,222,128,.9)' }}>● ON</div>
        </div>
        <div className={styles.motorCard} style={{ background: 'rgba(255,255,255,.03)', borderColor: 'rgba(255,255,255,.07)' }}>
          <div className={styles.motorLabel}>Fertiliser</div>
          <div className={styles.motorOff}>○ OFF</div>
        </div>
      </div>
    </div>
  );
}
