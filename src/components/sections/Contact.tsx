import { contactInfo } from "@/lib/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "./ContactForm";
import styles from "./Contact.module.css";

/**
 * This section is a "server component": it renders on the server and sends no JavaScript.
 * Only the form inside it (ContactForm) is a client component, because it needs interaction.
 */
export function Contact() {
  return (
    <section id="contact" className="section section--tint">
      <div className={`container ${styles.grid}`}>
        <div>
          <Eyebrow star>تواصل معنا</Eyebrow>
          <h2 className="title-lg">كيف يمكننا مساعدتك؟</h2>
          <p className={styles.lead}>
            تواصل مع فريق AGENCE للاستفسارات العامة، أو الدعم، أو فرص الشراكة، وسنرد عليك عبر بيانات التواصل التي تسجلها في النموذج.
          </p>

          <ul className={styles.list}>
            {contactInfo.map((item) => (
              <li key={item.label}>
                <span className={styles.icon}>
                  <Icon name={item.icon} />
                </span>
                <div>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
