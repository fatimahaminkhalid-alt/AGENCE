import Image from "next/image";
import { hero, routes } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SplitWords } from "@/components/motion/SplitWords";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="home" className={styles.hero} data-hero>
      {/* priority: this is the first image the visitor sees, so it loads before anything else */}
      <Image
        src="/images/hero.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className={styles.bg}
        data-hero-bg
      />

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
