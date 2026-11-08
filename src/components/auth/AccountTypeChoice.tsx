import Image from "next/image";
import Link from "next/link";
import { routes } from "@/lib/content";
import styles from "./AccountTypeChoice.module.css";

const options = [
  {
    image: { src: "/images/صورة المستفيد.jpg", alt: "صورة توضيحية للمستفيدين من منصة AGENCE" },
    title: "أبحث عن خدمة إعلامية",
    text: "أنشئ طلباتك، استقبل العروض، وقارن بين مقدمي الخدمات.",
    cta: "إنشاء حساب مستفيد",
    href: routes.registerClient,
    primary: true,
  },
  {
    image: { src: "/images/صورة مقدم الخدمة.jpg", alt: "صورة توضيحية لمقدمي الخدمات على منصة AGENCE" },
    title: "أقدم خدمات إعلامية",
    text: "اعرض خدماتك وأعمالك، واكتشف المشروعات المناسبة لتخصصك.",
    cta: "إنشاء حساب مقدم خدمة",
    href: routes.registerProvider,
    primary: false,
  },
];

export function AccountTypeChoice() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>
        كيف ترغب في استخدام <span className="latin">AGENCE</span>؟
      </h1>
      <p className={styles.sub}>اختر نوع الحساب المناسب لك لإكمال التسجيل.</p>

      <div className={styles.grid}>
        {options.map((o) => (
          <article key={o.href} className={styles.card}>
            <Image
              src={o.image.src}
              alt={o.image.alt}
              width={1240}
              height={832}
              sizes="(max-width: 760px) 100vw, 480px"
              className={styles.img}
              priority
            />
            <div className={styles.body}>
              <h2 className={styles.cardTitle}>{o.title}</h2>
              <p className={styles.cardText}>{o.text}</p>
              <Link href={o.href} className={`btn btn--pill ${o.primary ? "btn--primary" : styles.outline} ${styles.cta}`}>
                {o.cta}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <p className={styles.switch}>
        لديك حساب بالفعل؟ <Link href={routes.login}>تسجيل الدخول</Link>
      </p>
    </div>
  );
}
