import styles from './JellyBlobs.module.css';

/**
 * Renders ambient gel-like blobs absolutely positioned within the parent section.
 * configs: [{ x, y, w, c1, c2, dur, del }]
 */
export default function JellyBlobs({ configs }) {
  return (
    <>
      {configs.map((b, i) => (
        <div
          key={i}
          className={styles.jellyBlob}
          aria-hidden="true"
          style={{
            left: b.x,
            top: b.y,
            width: b.w,
            height: b.w,
            background: `radial-gradient(circle,${b.c1} 0%,${b.c2} 55%,transparent 75%)`,
            '--jd': b.dur,
            '--jdel': b.del,
          }}
        />
      ))}
    </>
  );
}
