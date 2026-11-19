import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { routes } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";
import styles from "./AuthShell.module.css";

/**
 * The shared frame for every account page:
 * - top bar: logo + "العودة إلى الرئيسية"
 * - centered page content (the form or account type choices)
 */

type Props = {
  children: ReactNode;
  wide?: boolean;
};

export function AuthShell({ children, wide = false }: Props) {
  return (
    <div className={styles.shell}>
      <div className={styles.main}>
        <header className={styles.top}>
          <Link href={routes.home} className={styles.logo} aria-label="الصفحة الرئيسية">
            <Image src="/AGENCE/images/logo.webp" alt="ايجنس" width={46} height={69} priority />
          </Link>
          <Link href={routes.home} className={styles.back}>
            <Icon name="arrowRight" />
            العودة إلى الرئيسية
          </Link>
        </header>

        <main className={`${styles.content} ${wide ? styles.wide : ""}`}>{children}</main>
      </div>
    </div>
  );
}
