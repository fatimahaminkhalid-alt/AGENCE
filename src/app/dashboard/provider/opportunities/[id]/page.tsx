import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import OfferForm from "@/components/dashboard/OfferForm";
import { getOpportunity, opportunities } from "@/lib/opportunities";
import ui from "@/components/dashboard/ui.module.css";
import layout from "../../layout.module.css";
import styles from "./opportunity.module.css";

/**
 * Opportunity details page: /dashboard/provider/opportunities/2
 *
 * GitHub Pages hosts static files only, so Next.js has to build a page for each opportunity at build time.
 * generateStaticParams tells it which IDs to build, and dynamicParams = false means any other ID shows "not found".
 */
export function generateStaticParams() {
  return opportunities.map((o) => ({ id: o.id }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `${getOpportunity(id)?.title ?? "تفاصيل الفرصة"} | ايجنس` };
}

export default async function OpportunityDetailsPage({ params }: Props) {
  const { id } = await params;
  const opportunity = getOpportunity(id);
  if (!opportunity) notFound();

  const stats = [
    { label: "الميزانية", value: opportunity.budget },
    { label: "مدة التنفيذ", value: opportunity.duration },
    { label: "آخر موعد للعرض", value: opportunity.deadline },
    { label: "عدد العروض", value: `${opportunity.offersCount} عروض` },
  ];

  return (
    <main className={layout.main}>
      <Topbar title="تفاصيل الفرصة" role="provider" />
      <PageHeader
        title={opportunity.title}
        subtitle={`${opportunity.category} · ${opportunity.postedAt}`}
        action={<span className={`${ui.pill} ${ui.pillBlue}`}>متاحة للتقديم</span>}
      />

      <div className={styles.grid}>
        <div className={styles.details}>
          <section className={`${ui.card} ${styles.card}`} aria-labelledby="about-title">
            <h2 id="about-title" className={styles.cardTitle}>
              عن المشروع
            </h2>
            <p className={styles.about}>{opportunity.about}</p>
            <dl className={styles.stats}>
              {stats.map((s) => (
                <div key={s.label} className={ui.tile}>
                  <dt className={ui.tileLabel}>{s.label}</dt>
                  <dd className={ui.tileValue}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className={`${ui.card} ${styles.card}`} aria-labelledby="req-title">
            <h2 id="req-title" className={styles.cardTitle}>
              المطلوب
            </h2>
            <ul className={styles.checklist}>
              {opportunity.requirements.map((r) => (
                <li key={r}>
                  <Check size={18} aria-hidden className={styles.check} />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <section className={`${ui.card} ${styles.card}`} aria-labelledby="client-title">
            <h2 id="client-title" className={styles.cardTitle}>
              عن المستفيد
            </h2>
            <div className={styles.client}>
              <span className={`${ui.avatar} ${ui.avatarOrange} ${styles.clientAvatar}`} aria-hidden>
                {opportunity.client.initial}
              </span>
              <div>
                <p className={styles.clientName}>{opportunity.client.name}</p>
                <p className={styles.clientMeta}>
                  {opportunity.client.city} · عضو منذ {opportunity.client.memberSince}
                </p>
              </div>
            </div>
          </section>
        </div>

        <OfferForm opportunityTitle={opportunity.title} />
      </div>
    </main>
  );
}
