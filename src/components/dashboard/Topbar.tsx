import Link from "next/link";
import { Bell } from "lucide-react";
import styles from "./Topbar.module.css";

/**
 * The top bar of every dashboard page: the page name on the right, and the user's avatar + notifications bell on the left.
 * Later the user's name and the unread count come from the login session.
 */
export default function Topbar({ title }: { title: string }) {
  const user = { name: "نورة", hasUnread: true };

  return (
    <header className={styles.topbar}>
      <p className={styles.title}>{title}</p>
      <div className={styles.user}>
        <Link href="/dashboard/client/notifications" className={styles.bell} aria-label="الإشعارات">
          <Bell size={20} aria-hidden />
          {user.hasUnread && <span className={styles.dot} aria-hidden />}
        </Link>
        <span className={styles.avatar} aria-label={`حساب ${user.name}`}>
          {user.name.charAt(0)}
        </span>
      </div>
    </header>
  );
}
