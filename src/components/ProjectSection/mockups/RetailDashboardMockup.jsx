import styles from './RetailDashboardMockup.module.css';

const TILES = [
  { label: 'Revenue', value: '$1.23M', delta: '↑12.5%', up: true },
  { label: 'Users', value: '45.6K', delta: '↑8.3%', up: true },
  { label: 'Orders', value: '9.87K', delta: '↓3.2%', up: false },
  { label: 'Page Views', value: '1.23M', delta: '↑15.7%', up: true },
];

export default function RetailDashboardMockup() {
  return (
    <div className={styles.mdb}>
      <div className={styles.sidebar}>
        <div className={styles.sidebarLogo}>P</div>
        <div className={styles.sidebarDivider} />
        <div className={styles.sidebarItem + ' ' + styles.sidebarActive}>Over<br />view</div>
        <div className={styles.sidebarItem}>Sales</div>
        <div className={styles.sidebarItem}>Users</div>
        <div className={styles.sidebarItem}>AI</div>
      </div>
      <div className={styles.main}>
        <div className={styles.tabbar}>
          <span className={`${styles.dot} ${styles.dotR}`} />
          <span className={`${styles.dot} ${styles.dotY}`} />
          <span className={`${styles.dot} ${styles.dotG}`} />
          <span className={styles.url}>retailanalysis.vercel.app</span>
        </div>
        <div className={styles.tiles}>
          {TILES.map((t) => (
            <div key={t.label} className={styles.tile}>
              <div className={styles.tileLabel}>{t.label}</div>
              <div className={`${styles.tileValue} ${t.up ? styles.up : styles.down}`}>{t.value}</div>
              <div className={`${styles.tileDelta} ${t.up ? styles.up : styles.down}`}>{t.delta}</div>
            </div>
          ))}
        </div>
        <div className={styles.bottomRow}>
          <div className={styles.chartCard}>
            <div className={styles.chartHead}>
              <span>Sales Forecasting</span>
              <span className={styles.chartRange}>Jan–Jul 2024</span>
            </div>
            <svg viewBox="0 0 100 34" preserveAspectRatio="none" className={styles.chartSvg}>
              <defs>
                <linearGradient id="rfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(0,229,255,.28)" /><stop offset="100%" stopColor="rgba(0,229,255,0)" /></linearGradient>
                <linearGradient id="tfill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="rgba(166,108,255,.18)" /><stop offset="100%" stopColor="rgba(166,108,255,0)" /></linearGradient>
              </defs>
              <path d="M0,32 L14,30 L28,28 L42,26 L57,24 L71,21 L85,18 L100,15 L100,34 L0,34Z" fill="url(#tfill)" />
              <polyline points="0,32 14,30 28,28 42,26 57,24 71,21 85,18 100,15" fill="none" stroke="rgba(166,108,255,.45)" strokeWidth=".7" strokeDasharray="2,2" />
              <path d="M0,31 L14,27 L28,24 L42,21 L57,17 L71,13 L85,9 L100,6 L100,34 L0,34Z" fill="url(#rfill)" />
              <polyline className={styles.mekg} points="0,31 14,27 28,24 42,21 57,17 71,13 85,9 100,6" fill="none" stroke="rgba(0,229,255,.88)" strokeWidth="1.2" />
            </svg>
            <div className={styles.legend}>
              <span className={styles.legendRevenue}>● Revenue</span>
              <span className={styles.legendTarget}>- - Target</span>
            </div>
          </div>
          <div className={styles.aiPanels}>
            <div className={styles.aiPanel}>
              <div className={styles.tileLabel}>Forecast</div>
              <div className={styles.tileValue}>81%</div>
              <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '82%', background: 'linear-gradient(90deg,rgba(0,229,255,.7),rgba(0,229,255,.3))' }} /></div>
            </div>
            <div className={styles.aiPanel}>
              <div className={styles.tileLabel}>OCR Acc.</div>
              <div className={styles.tileValue}>95.0%</div>
              <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '95%', background: 'linear-gradient(90deg,rgba(74,222,128,.7),rgba(74,222,128,.3))' }} /></div>
            </div>
            <div className={styles.aiPanel}>
              <div className={styles.tileLabel}>Efficiency</div>
              <div className={styles.tileValue} style={{ color: 'rgba(166,108,255,.9)' }}>+70%</div>
              <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '70%', background: 'linear-gradient(90deg,rgba(166,108,255,.7),rgba(166,108,255,.3))' }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
