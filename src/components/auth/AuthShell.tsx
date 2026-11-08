import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import { MeshBackground } from "@/components/ui/MeshBackground";
import styles from "./AuthShell.module.css";

/**
 * The shared frame for every account page:
 * - top bar: logo + "العودة إلى الرئيسية"
 * - on the right: the page content (the form)
 * - on the left: a blue panel with an image and text (hidden on mobile)
 *
 * Without `panel` the page shows the content alone across the full width (the "account type" page).
 */

type Props = {
  children: ReactNode;
  panel?: "beneficiaries" | "providers";
};

const panelImages = {
  beneficiaries: { src: "/images/صورة المستفيد.jpg", alt: "صورة توضيحية للمستفيدين من منصة AGENCE" },
  providers: { src: "/images/صورة مقدم الخدمة.jpg", alt: "صورة توضيحية لمقدمي الخدمات على منصة AGENCE" },
};

export function AuthShell({ children, panel }: Props) {
  return (
    <div className={`${styles.shell} ${panel ? styles.split : styles.single}`}>
      {panel && <MeshBackground variant="calm" />}
      <div className={styles.main}>
        <header className={styles.top}>
          <Link href={routes.home} className={styles.logo} aria-label="الصفحة الرئيسية">
            <Image src="/images/logo.webp" alt="أيجنس" width={46} height={69} priority />
          </Link>
          <Link href={routes.home} className={styles.back}>
            <Icon name="arrowRight" />
            العودة إلى الرئيسية
          </Link>
        </header>

        <main className={styles.content}>{children}</main>
      </div>

      {panel && (
        <aside className={styles.panel}>
          <MeshBackground variant="calm" />
          <div className={styles.panelInner}>
            <Image
              src={panelImages[panel].src}
              alt={panelImages[panel].alt}
              width={1240}
              height={832}
              sizes="560px"
              className={styles.panelImg}
              priority
            />
            <h2 className={styles.panelTitle}>كل ما يحتاجه مشروعك الإعلامي في مكان واحد</h2>
            <p className={styles.panelText}>أنشئ طلبك، استقبل العروض، وقارن بينها لاختيار مقدم الخدمة المناسب لمشروعك.</p>
          </div>
        </aside>
      )}
    </div>
  );
}
