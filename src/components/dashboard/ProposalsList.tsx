"use client";

/**
 * "عروضي" page: 4 stat cards + status filters + the proposals list.
 * Each row: the opportunity name, the beneficiary and the date, the status, the offer value, and "عرض التفاصيل".
 */

import { useState } from "react";
import Link from "next/link";
import { proposalStatusLabels, type Proposal, type ProposalStatus } from "@/lib/provider-dashboard";
import ui from "./ui.module.css";
import styles from "./ProposalsList.module.css";

const filters: { key: ProposalStatus | "all"; label: string }[] = [
  { key: "all", label: "الكل" },
  { key: "review", label: "قيد المراجعة" },
  { key: "accepted", label: "مقبولة" },
  { key: "rejected", label: "غير مقبولة" },
];

const pillTone: Record<ProposalStatus, string> = {
  accepted: ui.pillGreen,
  review: ui.pillBlue,
  rejected: ui.pillGrey,
};

type Props = {
  proposals: Proposal[];
  stats: { total: number; review: number; accepted: number; rejected: number };
};

export default function ProposalsList({ proposals, stats }: Props) {
  const [filter, setFilter] = useState<(typeof filters)[number]["key"]>("all");
  const list = filter === "all" ? proposals : proposals.filter((p) => p.status === filter);

  const statCards = [
    { label: "إجمالي العروض", value: stats.total },
    { label: "قيد المراجعة", value: stats.review },
    { label: "مقبولة", value: stats.accepted },
    { label: "غير مقبولة", value: stats.rejected },
  ];

  return (
    <div className={styles.wrap}>
      <dl className={styles.stats}>
        {statCards.map((s) => (
          <div key={s.label} className={`${ui.card} ${styles.stat}`}>
            <dt className={styles.statLabel}>{s.label}</dt>
            <dd className={styles.statValue}>{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className={ui.chips} role="group" aria-label="تصفية حسب الحالة">
        {filters.map((f) => (
          <button key={f.key} type="button" className={ui.chip} aria-pressed={filter === f.key} onClick={() => setFilter(f.key)}>
            {f.label}
          </button>
        ))}
      </div>

      {list.length > 0 ? (
        <ul className={styles.list}>
          {list.map((p) => (
            <li key={p.id} className={`${ui.card} ${styles.row}`}>
              <div className={styles.main}>
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.meta}>
                  المستفيد: {p.client} · قُدّم في {p.submittedAt}
                </p>
              </div>
              <span className={`${ui.pill} ${pillTone[p.status]} ${styles.status}`}>{proposalStatusLabels[p.status]}</span>
              <div className={styles.price}>
                <span className={styles.priceValue}>{p.price}</span>
                <span className={styles.priceLabel}>قيمة العرض</span>
              </div>
              <Link
                href={`/dashboard/provider/opportunities/${p.opportunityId}`}
                className={`${ui.btn} ${ui.btnOutline} ${styles.action}`}
                aria-label={`عرض تفاصيل ${p.title}`}
              >
                عرض التفاصيل
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className={`${ui.card} ${ui.emptyNote}`}>لا توجد عروض بهذه الحالة.</div>
      )}
    </div>
  );
}
