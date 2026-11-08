import Image from "next/image";
import Link from "next/link";
import { audiences } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import styles from "./Audiences.module.css";

export function Audiences() {
  return (
    <section className="section">
      <div className={`container ${styles.grid}`}>
        {audiences.map((item) => (
          <article key={item.title} className={styles.feature}>
            {/* sizes tells the browser the image's width on each screen so it downloads only the size it needs */}
            {/* data-clip: the image is revealed like a curtain as you scroll (HomeAnimations) */}
            <div className={styles.media} data-clip>
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={1240}
                height={832}
                sizes="(max-width: 680px) 100vw, 50vw"
                className={styles.img}
              />
            </div>
            <div className={styles.body} data-stagger>
              <Eyebrow>{item.eyebrow}</Eyebrow>
              <h3 className={`title-md ${styles.title}`}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
              <Link href={item.link.href} className="text-link">
                {item.link.label}
                <Icon name="arrowUpLeft" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
