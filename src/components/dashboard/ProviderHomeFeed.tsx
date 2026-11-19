"use client";

/**
 * Service provider dashboard home: the "أكمل ملفك المهني" banner + the suggested opportunities,
 * or the "فرصتك الأولى بانتظارك" state if there are no opportunities yet.
 *
 * Preview: add ?empty=1 to the URL to see the empty state even when sample data exists
 * (e.g. /dashboard/provider?empty=1). This is for development only and has no effect for real users.
 */

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserCheck } from "lucide-react";
import type { Opportunity } from "@/lib/opportunities";
import OpportunityCard from "./OpportunityCard";
import ui from "./ui.module.css";
import styles from "./ProviderHomeFeed.module.css";

export default function ProviderHomeFeed({ opportunities }: { opportunities: Opportunity[] }) {
  const forceEmpty = useSearchParams().get("empty") === "1";
  const list = forceEmpty ? [] : opportunities;
  const profileComplete = false; // later: from the provider's profile data

  if (list.length === 0) {
    return (
      <section className={`${ui.card} ${styles.empty}`}>
        <h2 className={styles.emptyTitle}>فرصتك الأولى بانتظارك</h2>
        <p className={styles.emptyText}>استكشف طلبات الخدمات التي تناسب تخصصك، وقدّم عرضك للمشروعات المناسبة.</p>
        <Link href="/dashboard/provider/opportunities" className={`${ui.btn} ${ui.btnPrimary}`}>
          استكشف الفرص
        </Link>
      </section>
    );
  }

  return (
    <>
      {!profileComplete && (
        <section className={styles.banner} aria-labelledby="complete-profile">
          <span className={styles.bannerIcon} aria-hidden>
            <UserCheck size={22} />
          </span>
          <div className={styles.bannerText}>
            <h2 id="complete-profile" className={styles.bannerTitle}>
              أكمل ملفك المهني
            </h2>
            <p className={styles.bannerSub}>أضف خدماتك وخبراتك ونماذج أعمالك ليتمكن المستفيدون من معرفة ما تقدمه.</p>
          </div>
          <Link href="/dashboard/provider/profile" className={`${ui.btn} ${ui.btnOutline} ${ui.btnLg} ${styles.bannerBtn}`}>
            أكمل ملفك
          </Link>
        </section>
      )}

      <section aria-labelledby="opportunities" className={styles.section}>
        <div className={ui.sectionHeader}>
          <h2 id="opportunities" className={ui.sectionTitle}>
            الفرص المتاحة
          </h2>
          <span className={ui.count}>{list.length} فرص</span>
        </div>
        <div className={styles.grid}>
          {list.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      </section>
    </>
  );
}
