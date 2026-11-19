"use client";

/**
 * Offer card from a service provider (used on the "تفاصيل الطلب" and "العروض المستلمة" pages).
 * - "اختيار مقدم الخدمة": selects this offer (demo: changes the button's state only, until there's a database)
 * - "عرض العرض": opens the full offer details under the card
 */

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import type { Offer } from "@/lib/client-dashboard";
import ui from "./ui.module.css";
import styles from "./OfferCard.module.css";

type Props = {
  offer: Offer;
  showRequest?: boolean; // shows the "على طلب: ..." line on the offers page
};

export default function OfferCard({ offer, showRequest = false }: Props) {
  const [chosen, setChosen] = useState(false);
  const [open, setOpen] = useState(false);
  const detailsId = `offer-details-${offer.id}`;

  return (
    <article className={`${ui.card} ${styles.card}`}>
      <div className={styles.top}>
        <div className={styles.who}>
          <span className={ui.avatar} aria-hidden>
            {offer.initial}
          </span>
          <div>
            <h3 className={styles.name}>{offer.provider}</h3>
            <p className={styles.kind}>
              {offer.kind} · {offer.specialty}
            </p>
          </div>
        </div>
        <div className={styles.price}>
          <p className={styles.amount}>{offer.price}</p>
          <p className={styles.duration}>مدة التنفيذ: {offer.duration}</p>
        </div>
      </div>

      {showRequest && <p className={styles.request}>على طلب: {offer.requestTitle}</p>}
      <p className={styles.summary}>{offer.summary}</p>

      {open && (
        <dl id={detailsId} className={styles.details}>
          <div>
            <dt>قيمة العرض</dt>
            <dd>{offer.price}</dd>
          </div>
          <div>
            <dt>مدة التنفيذ</dt>
            <dd>{offer.duration}</dd>
          </div>
          <div>
            <dt>نوع مقدم الخدمة</dt>
            <dd>{offer.kind}</dd>
          </div>
          <div>
            <dt>التخصص</dt>
            <dd>{offer.specialty}</dd>
          </div>
          <Link href="/dashboard/client/messages" className={styles.message}>
            مراسلة {offer.provider}
          </Link>
        </dl>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          className={`${ui.btn} ${chosen ? styles.chosen : ui.btnPrimary}`}
          onClick={() => setChosen((v) => !v)}
          aria-pressed={chosen}
        >
          {chosen && <Check size={18} aria-hidden />}
          {chosen ? "تم اختيار مقدم الخدمة" : "اختيار مقدم الخدمة"}
        </button>
        <button
          type="button"
          className={`${ui.btn} ${ui.btnOutline}`}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={detailsId}
        >
          {open ? "إخفاء العرض" : "عرض العرض"}
        </button>
      </div>
    </article>
  );
}
