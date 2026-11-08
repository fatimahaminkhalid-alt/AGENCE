import { hero, routes } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <video
        className={styles.bg}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/hero page.mp4" type="video/mp4" />
      </video>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <p className={styles.tag}>
            <Icon name="sparkle" />
            {hero.tag}
          </p>
          <h1 className={styles.title}>{hero.title}</h1>
          <p className={styles.text}>{hero.text}</p>
          <div className={styles.actions}>
            <Button href={routes.registerClient} size="lg">
              ابدأ مشروعك الآن
              <Icon name="arrowLeft" />
            </Button>
            <Button href="#how" variant="light" size="lg">
              شاهد كيف تعمل المنصة
              <Icon name="play" className="icon--accent" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
