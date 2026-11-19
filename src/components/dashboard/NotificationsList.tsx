"use client";

/**
 * Notifications grouped into "اليوم" and "هذا الأسبوع".
 * Unread ones have a lavender background and an orange dot. Clicking a notification marks it read,
 * and "تحديد الكل كمقروء" marks them all. (Demo: they come back unread on reload, until there's a database.)
 */

import { useState } from "react";
import { CircleCheck, Clock, Inbox, MessageSquare } from "lucide-react";
import type { AppNotification, NotificationIcon } from "@/lib/client-dashboard";
import PageHeader from "./PageHeader";
import ui from "./ui.module.css";
import styles from "./NotificationsList.module.css";

const icons: Record<NotificationIcon, typeof Inbox> = {
  offer: Inbox,
  message: MessageSquare,
  published: CircleCheck,
  deadline: Clock,
};

const groups = [
  { key: "today", title: "اليوم" },
  { key: "week", title: "هذا الأسبوع" },
] as const;

export default function NotificationsList({ notifications }: { notifications: AppNotification[] }) {
  const [list, setList] = useState(notifications);
  const unreadCount = list.filter((n) => n.unread).length;

  const markRead = (id: string) => setList((l) => l.map((n) => (n.id === id ? { ...n, unread: false } : n)));
  const markAll = () => setList((l) => l.map((n) => ({ ...n, unread: false })));

  return (
    <>
      <PageHeader
        title="الإشعارات"
        subtitle="آخر المستجدات على طلباتك وعروضك."
        action={
          <button type="button" className={ui.linkBtn} onClick={markAll} disabled={unreadCount === 0}>
            تحديد الكل كمقروء
          </button>
        }
      />

      {groups.map((g) => {
        const items = list.filter((n) => n.group === g.key);
        if (items.length === 0) return null;
        return (
          <section key={g.key} className={styles.group} aria-labelledby={`group-${g.key}`}>
            <h2 id={`group-${g.key}`} className={styles.groupTitle}>
              {g.title}
            </h2>
            <ul className={`${ui.card} ${styles.list}`}>
              {items.map((n) => {
                const Icon = icons[n.icon];
                return (
                  <li key={n.id}>
                    <button
                      type="button"
                      className={`${styles.item} ${n.unread ? styles.unread : ""}`}
                      onClick={() => markRead(n.id)}
                    >
                      <span className={styles.icon} aria-hidden>
                        <Icon size={20} />
                      </span>
                      <span className={styles.text}>
                        {n.unread && <span className="sr-only">غير مقروء: </span>}
                        {n.text}
                      </span>
                      <span className={styles.time}>
                        {n.unread && <span className={styles.dot} aria-hidden />}
                        {n.time}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </>
  );
}
