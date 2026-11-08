import { paths } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { SplitWords } from "@/components/motion/SplitWords";
import styles from "./HowItWorks.module.css";

export function HowItWorks() {
  return (
    <section id="how" className="section section--tint">
      <div className="container">
        <Eyebrow star>كيف تعمل AGENCE؟</Eyebrow>
        <h2 className={`title-lg ${styles.heading}`}>
          <SplitWords text="اختر مسارك وابدأ بخطوات واضحة" />
        </h2>

        <div className={styles.grid} data-stagger>
          {paths.map((path) => {
            const blue = path.variant === "blue";
            return (
              <article key={path.title} className={`${styles.card} ${blue ? styles.blue : ""}`}>
                <span className={styles.badge}>{path.badge}</span>
                <h3 className={styles.title}>{path.title}</h3>

                {/* <ol> because order matters here: step 1 then 2 then 3 */}
                <ol className={styles.steps} data-steps>
                  {path.steps.map((step) => (
                    <li key={step.title}>
                      <h4>{step.title}</h4>
                      <p>{step.text}</p>
                    </li>
                  ))}
                </ol>

                <Button href={path.cta.href} variant={blue ? "light" : "primary"} shape="pill" className={styles.cta}>
                  {path.cta.label}
                  <Icon name="arrowUpLeft" />
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
