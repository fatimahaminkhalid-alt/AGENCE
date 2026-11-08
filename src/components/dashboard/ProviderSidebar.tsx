"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell, Briefcase, Folder, HelpCircle, ImageIcon, MessageSquare,
  Search, Send, SlidersHorizontal, User,
} from "lucide-react";
import styles from "./Sidebar.module.css";

const main = [
  { href: "/dashboard/provider", label: "الفرص المتاحة", icon: Search },
  { href: "/dashboard/provider/proposals", label: "عروضي", icon: Send },
  { href: "/dashboard/provider/projects", label: "مشروعاتي", icon: Folder },
  { href: "/dashboard/provider/services", label: "خدماتي", icon: Briefcase },
  { href: "/dashboard/provider/portfolio", label: "معرض الأعمال", icon: ImageIcon },
  { href: "/dashboard/provider/messages", label: "الرسائل", icon: MessageSquare },
  { href: "/dashboard/provider/notifications", label: "الإشعارات", icon: Bell },
  { href: "/dashboard/provider/profile", label: "الملف المهني", icon: User },
];

const bottom = [
  { href: "/dashboard/provider/settings", label: "إعدادات الحساب", icon: SlidersHorizontal },
  { href: "/dashboard/provider/support", label: "الدعم", icon: HelpCircle },
];

export default function ProviderSidebar() {
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
        <Image src="/black-Pearls/images/logo.webp" alt="أيجنس" width={48} height={72} priority />
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