import { routes, services } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { SplitWords } from "@/components/motion/SplitWords";
import styles from "./Services.module.css";

export function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className={styles.head}>
          <div>
            <Eyebrow star>مجالات الخدمات</Eyebrow>
            <h2 className="title-lg">
              <SplitWords text="خدمات إعلامية لمختلف احتياجات مشروعك" />
            </h2>
          </div>
          <p className={styles.desc} data-reveal>اكتشف مقدمي الخدمات المتخصصين في أربعة مجالات إعلامية رئيسية.</p>
        </div>

        {/* One card repeats over the data: adding a service in content.ts adds a card here automatically */}
        <div className={styles.grid} data-stagger>
          {services.map((service, i) => (
            <article key={service.title} className={styles.card}>
              <div className={styles.top}>
                <span className={styles.icon}>
                  <Icon name={service.icon} />
                </span>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className={styles.title}>{service.title}</h3>
              <ul className={styles.chips}>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div data-reveal>
          <Button href={routes.registerClient} shape="pill" magnetic>
            اطلب الخدمة التي تحتاجها
            <Icon name="arrowUpLeft" />
          </Button>
        </div>
      </div>
    </section>
  );
}
