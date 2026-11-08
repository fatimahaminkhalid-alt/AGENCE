import Link from "next/link";
import { Clock, Flag, Wallet } from "lucide-react";
import type { ReactNode } from "react";
import type { Opportunity } from "@/lib/opportunities";
import styles from "./OpportunityCard.module.css";

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

export default function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <span className={styles.tag}>{opportunity.category}</span>
        <span className={styles.posted}>{opportunity.postedAt}</span>
      </div>

      <h3 className={styles.title}>{opportunity.title}</h3>
      <p className={styles.desc}>{opportunity.description}</p>

      <div className={styles.metas}>
        <Meta icon={<Wallet size={18} />} label="الميزانية" value={opportunity.budget} />
        <Meta icon={<Clock size={18} />} label="مدة التنفيذ" value={opportunity.duration} />
        <Meta icon={<Flag size={18} />} label="آخر موعد للعرض" value={opportunity.deadline} />
      </div>

      <div className={styles.footer}>
        <Link href={`/dashboard/provider/opportunities/${opportunity.id}`} className={styles.button}>
          عرض التفاصيل
        </Link>
      </div>
    </article>
  );
}