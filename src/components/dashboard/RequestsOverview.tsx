"use client";

/**
 * "طلباتي" section on the dashboard home: the request list, or the "ابدأ بطلبك الأول" state if there are none.
 *
 * Preview: add ?empty=1 to the URL to see the empty state even when sample data exists
 * (e.g. /dashboard/client?empty=1). This is for development only and has no effect for real users.
 */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ServiceRequest } from "@/lib/requests";
import RequestCard from "./RequestCard";
import ui from "./ui.module.css";
import styles from "./RequestsOverview.module.css";

export default function RequestsOverview({ requests }: { requests: ServiceRequest[] }) {
  const forceEmpty = useSearchParams().get("empty") === "1";
  const list = forceEmpty ? [] : requests;

  if (list.length === 0) {
    return (
      <section className={`${ui.card} ${styles.empty}`}>
        <h2 className={styles.emptyTitle}>ابدأ بطلبك الأول</h2>
        <p className={styles.emptyText}>
          حدد الخدمة التي تحتاجها وأضف تفاصيل مشروعك لاستقبال عروض مقدمي الخدمات المهتمين.
        </p>
        <Link href="/dashboard/client/requests/new" className={`${ui.btn} ${ui.btnPrimary}`}>
          أنشئ طلبًا
        </Link>
      </section>
    );
  }

  return (
    <section aria-labelledby="my-requests" className={styles.section}>
      <div className={ui.sectionHeader}>
        <h2 id="my-requests" className={ui.sectionTitle}>
          طلباتي
        </h2>
        <span className={ui.count}>{list.length} طلبات</span>
      </div>
      <div className={styles.list}>
        {list.map((r) => (
          <RequestCard key={r.id} request={r} />
        ))}
      </div>
    </section>
  );
}
