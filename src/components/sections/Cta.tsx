import Link from "next/link";
import { routes } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { MeshBackground } from "@/components/ui/MeshBackground";
import styles from "./Cta.module.css";

export function Cta() {
  return (
    <section className="section">
      <div className="container">
        <div className={styles.cta} data-cta>
          {/* Animated gradient background (shared component in ui/MeshBackground) */}
          <MeshBackground />

          {/* decorative shapes */}
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <span key={n} className={`${styles.dot} ${styles[`dot${n}`]}`} aria-hidden="true" />
          ))}

          <h2 className={styles.title} data-reveal>
            ابدأ مع <span className="latin">AGENCE</span>
          </h2>
          <p data-reveal>سواء كنت تبحث عن خدمة إعلامية أو ترغب في تقديم خدماتك، اختر مسارك وابدأ من مكان واحد.</p>
          <div className={styles.actions} data-reveal>
            <Button href={routes.registerClient} variant="light" shape="pill" className={styles.primary} magnetic>
              اطلب خدمة إعلامية
              <Icon name="arrowUpLeft" />
            </Button>
            <Button href={routes.registerProvider} variant="outline-light" shape="pill" magnetic>
              سجّل كمقدم خدمة
            </Button>
          </div>
          <p className={styles.login} data-reveal>
            لديك حساب بالفعل؟ <Link href={routes.login}>تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
