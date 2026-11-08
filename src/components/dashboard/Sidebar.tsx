"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, Bookmark, FileText, HelpCircle, Inbox, MessageSquare, SlidersHorizontal,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const main = [
  { href: "/dashboard/client", label: "طلباتي", icon: FileText },
  { href: "/dashboard/client/offers", label: "العروض المستلمة", icon: Inbox },
  { href: "/dashboard/client/saved", label: "مقدمو الخدمات المحفوظون", icon: Bookmark },
  { href: "/dashboard/client/messages", label: "الرسائل", icon: MessageSquare },
  { href: "/dashboard/client/notifications", label: "الإشعارات", icon: Bell },
];

const bottom = [
  { href: "/dashboard/client/settings", label: "إعدادات الحساب", icon: SlidersHorizontal },
  { href: "/dashboard/client/support", label: "الدعم", icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  const renderItem = ({ href, label, icon: Icon }: (typeof main)[number]) => {
    const active = pathname === href;
    return (
      <li key={href}>
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`${styles.item} ${active ? styles.active : ""}`}
        >
          <Icon size={20} aria-hidden />
          <span>{label}</span>
        </Link>
      </li>
    );
  };

  return (
    <aside className={styles.sidebar}>
      <Link href="/" className={styles.logo} aria-label="AGENCE — الرئيسية">
        <Image src="/images/logo.webp" alt="أيجنس" width={48} height={72} priority />
      </Link>

      <nav aria-label="القائمة الرئيسية" className={styles.nav}>
        <ul>{main.map(renderItem)}</ul>
      </nav>

      <nav aria-label="الحساب والدعم" className={styles.bottom}>
        <ul>{bottom.map(renderItem)}</ul>
      </nav>
    </aside>
  );
}