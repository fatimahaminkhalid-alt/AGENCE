import styles from "./MeshBackground.module.css";

/**
 * Animated gradient background: large blurred color patches that drift slowly and blend.
 * Put it inside any element that has: position: relative; overflow: hidden; isolation: isolate;
 *
 *   <MeshBackground />                 vivid colors (red and lavender) as in the "ابدأ مع AGENCE" band
 *   <MeshBackground variant="calm" />  calmer blue and purple tones, as in the account-page panel
 */
export function MeshBackground({ variant = "vivid" }: { variant?: "vivid" | "calm" }) {
  return (
    <div className={`${styles.mesh} ${styles[variant]}`} aria-hidden="true">
      <span className={`${styles.blob} ${styles.b1}`} />
      <span className={`${styles.blob} ${styles.b2}`} />
      <span className={`${styles.blob} ${styles.b3}`} />
      <span className={`${styles.blob} ${styles.b4}`} />
    </div>
  );
}
