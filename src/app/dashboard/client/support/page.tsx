import Link from "next/link";
import { ChevronDown, Mail, Phone } from "lucide-react";
import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import { faqs } from "@/lib/client-dashboard";
import ui from "@/components/dashboard/ui.module.css";
import layout from "../layout.module.css";
import styles from "./support.module.css";

export const metadata = { title: "الدعم | ايجنس" };

/**
 * Support page. The questions use <details>, a built-in browser element that opens and closes
 * by itself without any JavaScript, and works with the keyboard and screen readers.
 */
export default function SupportPage() {
  return (
    <main className={layout.main}>
      <Topbar title="الدعم" />
      <PageHeader title="الدعم" subtitle="إجابات سريعة لأكثر الأسئلة شيوعًا، وفريقنا جاهز لمساعدتك." />

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
                <strong>يضاف الرقم الرسمي</strong>
              </span>
            </li>
          </ul>
          {/* Opens the contact form on the home page */}
          <Link href="/#contact" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`}>
            أرسل استفسارًا
          </Link>
        </aside>
      </div>
    </main>
  );
}
