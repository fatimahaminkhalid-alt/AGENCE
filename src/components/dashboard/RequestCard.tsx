import Link from "next/link";
import { CalendarDays, Inbox, RefreshCw } from "lucide-react";
import type { ReactNode } from "react";
import type { ServiceRequest } from "@/lib/requests";
import StatusChip from "./StatusChip";
import styles from "./RequestCard.module.css";

function Meta({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className={styles.meta}>
      <span className={styles.metaIcon} aria-hidden>{icon}</span>
      <div>
        <p className={styles.metaLabel}>{label}</p>
        <p className={styles.metaValue}>{value}</p>
      </div>
    </div>
  );
}

export default function RequestCard({ request }: { request: ServiceRequest }) {
  const offers = request.offersCount > 0 ? `${request.offersCount} عروض` : "لا توجد عروض";

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <h3 className={styles.title}>{request.title}</h3>
        <div className={styles.sub}>
          <span className={styles.category}>{request.category}</span>
          <StatusChip status={request.status} />
        </div>
      </div>

      <div className={styles.metas}>
        <Meta icon={<CalendarDays size={18} />} label="تاريخ النشر" value={request.publishedAt ?? "لم يُنشر بعد"} />
        <Meta icon={<Inbox size={18} />} label="عدد العروض" value={offers} />
        <Meta icon={<RefreshCw size={18} />} label="آخر تحديث" value={request.updatedAt} />
      </div>

      <Link href={`/dashboard/client/requests/${request.id}`} className={styles.button}>
        عرض التفاصيل
      </Link>
    </article>
  );
}