"use client";

/**
 * Opportunities page: search + service type filters + the cards grid.
 * The search looks in the title, the description and the service type.
 */

import { useState } from "react";
import { Search } from "lucide-react";
import { opportunityFilters, type Opportunity } from "@/lib/opportunities";
import OpportunityCard from "./OpportunityCard";
import ui from "./ui.module.css";
import styles from "./OpportunitiesBrowser.module.css";

export default function OpportunitiesBrowser({ opportunities }: { opportunities: Opportunity[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState(opportunityFilters[0].label);

  const q = query.trim();
  const match = opportunityFilters.find((f) => f.label === filter)?.match ?? "";
  const list = opportunities.filter(
    (o) =>
      (!match || o.category.includes(match)) &&
      (!q || o.title.includes(q) || o.description.includes(q) || o.category.includes(q)),
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.controls}>
        <label className={ui.search}>
          <Search size={20} aria-hidden />
          <input
            type="search"
            placeholder="ابحث باسم الفرصة أو نوع الخدمة"
            aria-label="ابحث باسم الفرصة أو نوع الخدمة"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>

        <div className={ui.chips} role="group" aria-label="تصفية حسب نوع الخدمة">
          {opportunityFilters.map((f) => (
            <button
              key={f.label}
              type="button"
              className={ui.chip}
              aria-pressed={filter === f.label}
              onClick={() => setFilter(f.label)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <p className="sr-only" role="status">
        {list.length} فرص
      </p>

      {list.length > 0 ? (
        <div className={styles.grid}>
          {list.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      ) : (
        <div className={`${ui.card} ${ui.emptyNote}`}>
          لا توجد فرص مطابقة{q ? ` لـ «${q}»` : ""}. جرّب كلمة أخرى أو نوع خدمة مختلفًا.
        </div>
      )}
    </div>
  );
}
