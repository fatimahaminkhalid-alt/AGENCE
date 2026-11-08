import { hero, routes } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SplitWords } from "@/components/motion/SplitWords";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} data-hero>
      <video
        className={styles.bg}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        data-hero-bg
      >
        <source src="/AGENCE/hero-page.mp4" type="video/mp4" />
      </video>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content} data-hero-content>
          <p className={styles.tag} data-hero-item>
            <Icon name="sparkle" />
            {hero.tag}
          </p>
          <h1 className={styles.title}>
            <SplitWords text={hero.title} />
          </h1>
          <p className={styles.text} data-hero-item>
            {hero.text}
          </p>
          <div className={styles.actions} data-hero-item>
            <Button href={routes.registerClient} size="lg" magnetic>
              ابدأ مشروعك الآن
              <Icon name="arrowLeft" />
            </Button>
            <Button href="#how" variant="light" size="lg" magnetic>
              شاهد كيف تعمل المنصة
              <Icon name="play" className="icon--accent" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
