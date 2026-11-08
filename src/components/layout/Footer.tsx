import Link from "next/link";
import { footerColumns } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid} data-stagger>
          <div className={styles.about}>
            <Logo size="lg" />
            <p>AGENCE منصة سعودية تربط المستفيدين من الخدمات الإعلامية بالوكالات والمستقلين المتخصصين.</p>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} className={styles.col} aria-label={col.title}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className={styles.copy}>جميع الحقوق محفوظة لـ AGENCE © {year}</p>
      </div>

      {/* Each letter in its own element so they rise one after another (fine because the word is English) */}
      <div className={styles.wordmark} aria-hidden="true" data-wordmark>
        {"AGENCE".split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </footer>
  );
}
