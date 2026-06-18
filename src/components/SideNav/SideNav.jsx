import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './SideNav.module.css';

const LINKS = [
  { id: 'works', label: 'Work' },
  { id: 'project-1', label: 'Projects' },
  { id: 'globe', label: 'Skills' },
  { id: 'social', label: 'Social' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

export default function SideNav() {
  const active = useActiveSection(LINKS.map((l) => l.id));

  return (
    <nav className={styles.sideNav} aria-label="Side navigation">
      {LINKS.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          className={`${styles.link} ${active === l.id ? styles.active : ''}`}
        >
          {l.label}
        </a>
      ))}
    </nav>
  );
}
