import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

/**
 * Inner page header: a large title + a subtitle, with an optional button on the left
 * (like "تعديل الطلب" or "تحديد الكل كمقروء").
 */
type Props = {
  title: string;
  subtitle?: ReactNode;
  action?: ReactNode;
};

export default function PageHeader({ title, subtitle, action }: Props) {
  return (
    <div className={styles.header}>
      <div className={styles.text}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      {action && <div className={styles.action}>{action}</div>}
    </div>
  );
}
