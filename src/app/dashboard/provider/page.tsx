import Link from "next/link";
import { Bell, UserCheck } from "lucide-react";
import OpportunityCard from "@/components/dashboard/OpportunityCard";
import { opportunities } from "@/lib/opportunities";
import styles from "./layout.module.css";

export const metadata = { title: "لوحة التحكم | AGENCE" };

export default function ProviderDashboardPage() {
  const user = { name: "خالد", hasUnreadNotifications: true, profileComplete: false };
  const hasOpportunities = opportunities.length > 0;

  return (
    <main className={styles.main}>
      <header className={styles.topbar}>
        <h1 className={styles.pageTitle}>لوحة التحكم</h1>
        <div className={styles.user}>
          <span className={styles.avatar} aria-label={user.name}>{user.name.charAt(0)}</span>
          <Link href="/dashboard/provider/notifications" className={styles.bell} aria-label="الإشعارات">
            <Bell size={20} />
            {user.hasUnreadNotifications && <span className={styles.badge} aria-hidden />}
          </Link>
        </div>
      </header>

      <section className={styles.welcome}>
        <div className={styles.welcomeText}>
          <h2>مرحبًا، {user.name}</h2>
          <p>اكتشف فرصًا تناسب تخصصك وتابع عروضك من مكان واحد.</p>
          <Link href="/dashboard/provider/opportunities" className={styles.primaryBtn}>
            استكشاف الفرص
          </Link>
        </div>
      </section>

      {!user.profileComplete && (
        <section className={styles.profileBanner} aria-labelledby="complete-profile">
          <span className={styles.bannerIcon} aria-hidden>
            <UserCheck size={22} />
          </span>
          <div className={styles.bannerText}>
            <h2 id="complete-profile">أكمل ملفك المهني</h2>
            <p>أضف خدماتك وخبراتك ونماذج أعمالك ليتمكن المستفيدون من معرفة ما تقدمه.</p>
          </div>
          <Link href="/dashboard/provider/profile" className={styles.outlineBtn}>
            أكمل ملفك
          </Link>
        </section>
      )}

      {hasOpportunities ? (
        <section aria-labelledby="opportunities">
          <div className={styles.sectionHeader}>
            <h2 id="opportunities">الفرص المتاحة</h2>
            <span className={styles.count}>{opportunities.length} فرص</span>
          </div>
          <div className={styles.grid}>
            {opportunities.map((o) => (
              <OpportunityCard key={o.id} opportunity={o} />
            ))}
          </div>
        </section>
      ) : (
        <section className={styles.empty}>
          <h2>فرصتك الأولى بانتظارك</h2>
          <p>استكشف طلبات الخدمات التي تناسب تخصصك، وقدّم عرضك للمشروعات المناسبة.</p>
          <Link href="/dashboard/provider/opportunities" className={styles.primaryBtn}>
            استكشاف الفرص
          </Link>
        </section>
      )}
    </main>
  );
}