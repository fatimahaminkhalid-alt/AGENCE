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
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={1240}
              height={832}
              sizes="(max-width: 680px) 100vw, 50vw"
              className={styles.img}
            />
            <Eyebrow>{item.eyebrow}</Eyebrow>
            <h3 className={`title-md ${styles.title}`}>{item.title}</h3>
            <p className={styles.text}>{item.text}</p>
            <Link href={item.link.href} className="text-link">
              {item.link.label}
              <Icon name="arrowUpLeft" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
