import Link from "next/link";
import { Bell } from "lucide-react";
import styles from "./Topbar.module.css";

/**
 * The top bar of every dashboard page: the page name on the right, and the user's avatar + notifications bell on the left.
 * role: "client" (beneficiary, the default) or "provider" (service provider). It sets the user and the bell link.
 * Later the user's name and the unread count come from the login session.
 */
const USERS = {
  client: { name: "نورة", hasUnread: true, notifications: "/dashboard/client/notifications" },
  provider: { name: "خالد", hasUnread: true, notifications: "/dashboard/provider/notifications" },
};

type Props = { title: string; role?: keyof typeof USERS };

export default function Topbar({ title, role = "client" }: Props) {
  const user = USERS[role];

  return (
    <header className={styles.topbar}>
      <p className={styles.title}>{title}</p>
      <div className={styles.user}>
        <Link href={user.notifications} className={styles.bell} aria-label="الإشعارات">
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
