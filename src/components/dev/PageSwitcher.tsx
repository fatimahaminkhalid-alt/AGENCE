"use client";

/**
 * 🧭 Temporary pages menu, for development only.
 *
 * A floating button in the corner of the screen that opens a list of every page on the site, so you can move
 * between them directly without hunting for the links. It also includes ready "states" for some pages
 * (like the login page after creating an account) and a button that copies the demo account details.
 *
 * When does it show?
 * - Automatically while you work on your machine (npm run dev).
 * - On a deployed site (Vercel) only if you add the setting NEXT_PUBLIC_SHOW_PAGE_MENU=true.
 * To remove it permanently: delete the src/components/dev folder and its line in layout.tsx.
 *
 * Shortcut: Alt + P opens and closes it.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { routes } from "@/lib/content";
import styles from "./PageSwitcher.module.css";

type PageLink = { href: string; label: string; note?: string };

const groups: { title: string; links: PageLink[] }[] = [
  {
    title: "الصفحة الرئيسية",
    links: [
      { href: routes.home, label: "الرئيسية" },
      { href: "/#services", label: "قسم الخدمات" },
      { href: "/#how", label: "قسم كيف تعمل المنصة" },
      { href: "/#contact", label: "قسم تواصل معنا" },
    ],
  },
  {
    title: "صفحات الحساب",
    links: [
      { href: routes.login, label: "تسجيل الدخول" },
      { href: `${routes.login}?registered=1`, label: "تسجيل الدخول", note: "بعد إنشاء حساب" },
      { href: routes.register, label: "اختيار نوع الحساب" },
      { href: routes.registerClient, label: "حساب مستفيد" },
      { href: routes.registerProvider, label: "حساب مقدم خدمة" },
      { href: routes.forgotPassword, label: "استعادة كلمة المرور" },
    ],
  },
];

const DEMO = { email: "demo@agence.sa", password: "Agence123" };

export function PageSwitcher() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);

  // Alt + P to open and close, Esc to close, and clicking outside closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === "p" || e.key === "P" || e.code === "KeyP")) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  async function copy(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      setCopied(null);
    }
  }

  const isCurrent = (href: string) => href === pathname;

  return (
    <div ref={rootRef} className={styles.root}>
      {open && (
        // data-lenis-prevent: so the list scrolls normally and smooth scrolling doesn't affect it
        <div id="page-switcher" className={styles.panel} role="dialog" aria-label="قائمة الصفحات المؤقتة" data-lenis-prevent>
          <div className={styles.head}>
            <strong>الصفحات</strong>
            <span className={styles.badge}>للتطوير فقط</span>
          </div>

          {groups.map((group) => (
            <nav key={group.title} className={styles.group} aria-label={group.title}>
              <p className={styles.groupTitle}>{group.title}</p>
              <ul>
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${styles.link} ${isCurrent(link.href) ? styles.current : ""}`}
                      aria-current={isCurrent(link.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                    >
                      <span>
                        {link.label}
                        {link.note && <small className={styles.note}> · {link.note}</small>}
                      </span>
                      <code dir="ltr">{link.href}</code>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.group}>
            <p className={styles.groupTitle}>الحساب التجريبي</p>
            <div className={styles.demo}>
              <button type="button" onClick={() => copy(DEMO.email, "email")}>
                <code dir="ltr">{DEMO.email}</code>
                <span>{copied === "email" ? "تم النسخ ✓" : "نسخ"}</span>
              </button>
              <button type="button" onClick={() => copy(DEMO.password, "password")}>
                <code dir="ltr">{DEMO.password}</code>
                <span>{copied === "password" ? "تم النسخ ✓" : "نسخ"}</span>
              </button>
            </div>
          </div>

          <p className={styles.hint}>
            الاختصار: <kbd>Alt</kbd> + <kbd>P</kbd>
          </p>
        </div>
      )}

      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        aria-controls="page-switcher"
        aria-label={open ? "إغلاق قائمة الصفحات" : "فتح قائمة الصفحات"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <>
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
            </>
          )}
        </svg>
      </button>
    </div>
  );
}