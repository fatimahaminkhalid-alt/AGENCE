"use client";

/** Offers list with filter buttons by request ("كل الطلبات" or a specific request) */

import { useMemo, useState } from "react";
import type { Offer } from "@/lib/client-dashboard";
import OfferCard from "./OfferCard";
import styles from "./OffersList.module.css";

export default function OffersList({ offers }: { offers: Offer[] }) {
  const [filter, setFilter] = useState<string>("all");

  // Requests that have offers, without repeats and in the order they appear
  const requestFilters = useMemo(() => {
    const seen = new Map<string, string>();
    offers.forEach((o) => seen.set(o.requestId, o.requestTitle));
    return [...seen.entries()].map(([id, title]) => ({ id, title }));
  }, [offers]);

  const shown = filter === "all" ? offers : offers.filter((o) => o.requestId === filter);

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="group" aria-label="تصفية العروض حسب الطلب">
        {[{ id: "all", title: "كل الطلبات" }, ...requestFilters].map((f) => (
          <button
            key={f.id}
            type="button"
            className={`${styles.filter} ${filter === f.id ? styles.active : ""}`}
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
          >
            {f.title}
          </button>
        ))}
      </div>

      <div className={styles.list}>
        {shown.map((o) => (
          <OfferCard key={o.id} offer={o} showRequest />
        ))}
      </div>
    </div>
  );
}
