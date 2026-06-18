import { useReveal } from '../../hooks/useReveal';

/** Thin wrapper applying bidirectional scroll-reveal classes to its child element. */
export default function Reveal({ as: Tag = 'div', delay, className = '', children, ...rest }) {
  const [ref, visible] = useReveal();
  const cls = ['reveal', delay, visible ? 'vis' : '', className].filter(Boolean).join(' ');
  return (
    <Tag ref={ref} className={cls} {...rest}>
      {children}
    </Tag>
  );
}
