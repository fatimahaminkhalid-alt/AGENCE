import Link from "next/link";
import { notFound } from "next/navigation";
import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusChip from "@/components/dashboard/StatusChip";
import OfferCard from "@/components/dashboard/OfferCard";
import { getRequest, requests } from "@/lib/requests";
import { offers } from "@/lib/client-dashboard";
import ui from "@/components/dashboard/ui.module.css";
import layout from "../../layout.module.css";
import styles from "./details.module.css";

/**
 * Request details page: /dashboard/client/requests/1
 *
 * GitHub Pages hosts static files only, so Next.js has to build a page for each request at build time.
 * generateStaticParams tells it which IDs to build, and dynamicParams = false means any other ID shows "not found".
 * When you connect a database, this function fetches the IDs from it.
 */
export function generateStaticParams() {
  return requests.map((r) => ({ id: r.id }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  return { title: `${getRequest(id)?.title ?? "تفاصيل الطلب"} | ايجنس` };
}

export default async function RequestDetailsPage({ params }: Props) {
  const { id } = await params;
  const request = getRequest(id);
  if (!request) notFound();

  const requestOffers = offers.filter((o) => o.requestId === request.id);
  const stats = [
    { label: "الميزانية", value: request.budget },
    { label: "مدة التنفيذ", value: request.duration },
    { label: "تاريخ النشر", value: request.publishedAt ?? "لم يُنشر بعد" },
    { label: "آخر موعد للعروض", value: request.deadline ?? "لم يُحدد" },
  ];

  return (
    <main className={layout.main}>
      <Topbar title="تفاصيل الطلب" />

      <PageHeader
        title={request.title}
        subtitle={
          <span className={styles.sub}>
            {request.category}
            <StatusChip status={request.status} />
          </span>
        }
        action={
          // Edit page: a request-edit screen isn't in the design yet, so it opens the request form
          <Link href="/dashboard/client/requests/new" className={`${ui.btn} ${ui.btnOutline}`}>
            تعديل الطلب
          </Link>
        }
      />

      <section className={`${ui.card} ${ui.cardPad} ${styles.about}`} aria-labelledby="about-request">
        <h2 id="about-request" className={ui.cardTitle}>
          عن الطلب
        </h2>
        <p className={styles.description}>{request.description}</p>
        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.offers} aria-labelledby="request-offers">
        <div className={ui.sectionHeader}>
          <h2 id="request-offers" className={ui.sectionTitle}>
            العروض المستلمة
          </h2>
          <span className={ui.count}>{requestOffers.length} عروض</span>
        </div>

        {requestOffers.length > 0 ? (
          requestOffers.map((o) => <OfferCard key={o.id} offer={o} />)
        ) : (
          <p className={`${ui.card} ${styles.noOffers}`}>
            {request.status === "draft"
              ? "هذا الطلب مسودة ولم يُنشر بعد. انشره لتبدأ العروض بالوصول."
              : "لم تصل عروض على هذا الطلب بعد. سنرسل لك إشعارًا عند وصول أول عرض."}
          </p>
        )}
      </section>
    </main>
  );
}
