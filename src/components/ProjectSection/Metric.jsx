import { useCounter } from '../../hooks/useCounter';
import styles from './ProjectSection.module.css';

export default function Metric({ metric }) {
  const [ref, count] = useCounter(metric.value);
  return (
    <div>
      <div className={styles.metricValue}>
        {metric.value != null ? (
          <span ref={ref}>{count}</span>
        ) : (
          metric.display
        )}
        {metric.decimal && <span>{metric.decimal}</span>}
        <span>{metric.suffix || metric.mark}</span>
      </div>
      <div className={styles.metricLabel}>{metric.label}</div>
    </div>
  );
}
