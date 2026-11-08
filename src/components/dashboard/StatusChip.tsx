import type { RequestStatus } from "@/lib/requests";
import styles from "./StatusChip.module.css";

const LABELS: Record<RequestStatus, string> = {
  draft: "مسودة",
  published: "منشور",
  receiving: "يستقبل عروضًا",
  selected: "تم اختيار مقدم خدمة",
  completed: "مكتمل",
  cancelled: "ملغي",
};

export default function StatusChip({ status }: { status: RequestStatus }) {
  return (
    <span className={`${styles.chip} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden />
      {LABELS[status]}
    </span>
  );
}