import { about } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SplitWords } from "@/components/motion/SplitWords";
import styles from "./About.module.css";

export function About() {
  return (
    <section id="about" className="section section--tint">
      <div className={`container ${styles.grid}`}>
        <div>
          <Eyebrow>{about.eyebrow}</Eyebrow>
          <h2 className="title-xl">
            <SplitWords text={about.title} />
          </h2>
        </div>
        <div className={styles.text} data-divider data-stagger>
          {about.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
