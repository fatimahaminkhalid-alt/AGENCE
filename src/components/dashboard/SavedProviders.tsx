"use client";

/**
 * Saved service provider cards. The bookmark icon removes the provider from the list.
 * Demo: the removal is temporary and comes back on reload, until it's connected to a database.
 */

import Link from "next/link";
import { useState } from "react";
import { Bookmark, MapPin } from "lucide-react";
import type { SavedProvider } from "@/lib/client-dashboard";
import ui from "./ui.module.css";
import styles from "./SavedProviders.module.css";

export default function SavedProviders({ providers }: { providers: SavedProvider[] }) {
  const [list, setList] = useState(providers);

  if (list.length === 0) {
    return (
      <div className={`${ui.card} ${styles.empty}`}>
        <Bookmark size={28} aria-hidden />
        <p>لا يوجد مقدمو خدمات محفوظون بعد. احفظ مقدم الخدمة من ملفه أو من عرضه للرجوع إليه لاحقًا.</p>
      </div>
    );
  }

  return (
    <ul className={styles.grid}>
      {list.map((p) => (
        <li key={p.id} className={`${ui.card} ${styles.card}`}>
          <button
            type="button"
            className={styles.unsave}
            onClick={() => setList((l) => l.filter((x) => x.id !== p.id))}
            aria-label={`إزالة ${p.name} من المحفوظين`}
            title="إزالة من المحفوظين"
          >
            <Bookmark size={20} fill="currentColor" aria-hidden />
          </button>

          <span className={`${ui.avatar} ${ui.avatarLg} ${p.tone === "orange" ? ui.avatarOrange : ""}`} aria-hidden>
            {p.initial}
          </span>
          <h2 className={styles.name}>{p.name}</h2>
          <p className={styles.kind}>
            {p.kind} · {p.specialty}
          </p>
          <p className={styles.city}>
            <MapPin size={16} aria-hidden />
            {p.city}
          </p>
          <div className={styles.tags}>
            {p.tags.map((t) => (
              <span key={t} className={ui.tag}>
                {t}
              </span>
            ))}
          </div>
          {/* The provider's profile page isn't in the beneficiary design yet */}
          <Link href="/dashboard/client/messages" className={`${ui.btn} ${ui.btnOutline} ${ui.btnBlock}`}>
            عرض الملف
          </Link>
        </li>
      ))}
    </ul>
  );
}
