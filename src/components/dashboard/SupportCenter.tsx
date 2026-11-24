import Link from "next/link";
import { ChevronDown, Mail, Phone } from "lucide-react";
import ui from "./ui.module.css";
import styles from "./SupportCenter.module.css";

/**
 * Support page content (shared by the beneficiary and the service provider): FAQs + the contact card.
 * The questions use <details>, a built-in browser element that opens and closes
 * by itself without any JavaScript, and works with the keyboard and screen readers.
 */
export type Faq = { q: string; a: string };

export default function SupportCenter({ faqs }: { faqs: Faq[] }) {
  return (
    <div className={styles.grid}>
      <section className={`${ui.card} ${styles.faq}`} aria-label="الأسئلة الشائعة">
        {faqs.map((f, i) => (
          <details key={f.q} className={styles.item} open={i === 0}>
            <summary className={styles.q}>
              {f.q}
              <ChevronDown size={20} aria-hidden className={styles.chevron} />
            </summary>
            <p className={styles.a}>{f.a}</p>
          </details>
        ))}
      </section>

      <aside className={`${ui.card} ${styles.contact}`} aria-labelledby="contact-title">
        <h2 id="contact-title" className={ui.cardTitle}>
          تواصل مع الدعم
        </h2>
        <p className={styles.contactText}>لم تجد إجابتك؟ راسلنا وسنرد عليك في أقرب وقت.</p>
        <ul className={styles.channels}>
          <li>
            <span className={styles.channelIcon} aria-hidden>
              <Mail size={18} />
            </span>
            <span>
              <small>البريد الإلكتروني</small>
              <strong>يضاف البريد الرسمي</strong>
            </span>
          </li>
          <li>
            <span className={styles.channelIcon} aria-hidden>
              <Phone size={18} />
            </span>
            <span>
              <small>رقم التواصل</small>
              <strong>+966 50 704 2183</strong>
            </span>
          </li>
        </ul>
        {/* Opens the contact form on the home page */}
        <Link href="/#contact" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`}>
          أرسل استفسارًا
        </Link>
      </aside>
    </div>
  );
}
