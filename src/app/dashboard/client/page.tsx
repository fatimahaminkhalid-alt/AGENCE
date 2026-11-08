import Link from "next/link";
import { Bell } from "lucide-react";
import RequestCard from "@/components/dashboard/RequestCard";
import { requests } from "@/lib/requests";
import styles from "./layout.module.css";

export const metadata = { title: "لوحة التحكم | AGENCE" };

export default function ClientDashboardPage() {
  const user = { name: "نورة", hasUnreadNotifications: true };
  const hasRequests = requests.length > 0;

  return (
    <main className={styles.main}>
      <header className={styles.topbar}>
        <h1 className={styles.pageTitle}>لوحة التحكم</h1>
        <div className={styles.user}>
          <span className={styles.avatar} aria-label={user.name}>{user.name.charAt(0)}</span>
          <Link href="/dashboard/client/notifications" className={styles.bell} aria-label="الإشعارات">
            <Bell size={20} />
            {user.hasUnreadNotifications && <span className={styles.badge} aria-hidden />}
          </Link>
        </div>
      </header>

      <section className={styles.welcome}>
        <div className={styles.welcomeText}>
          <h2>مرحبًا، {user.name}</h2>
          <p>ابدأ طلبًا جديدًا أو تابع طلباتك الحالية من مكان واحد.</p>
          <Link href="/dashboard/client/requests/new" className={styles.primaryBtn}>
            أنشئ طلبًا جديدًا
          </Link>
        </div>
      </section>

      {hasRequests ? (
        <section aria-labelledby="my-requests">
          <div className={styles.sectionHeader}>
            <h2 id="my-requests">طلباتي</h2>
            <span className={styles.count}>{requests.length} طلبات</span>
          </div>
          <div className={styles.list}>
            {requests.map((r) => (
              <RequestCard key={r.id} request={r} />
            ))}
          </div>
        </section>
      ) : (
        <section className={styles.empty}>
          <h2>ابدأ بطلبك الأول</h2>
          <p>حدد الخدمة التي تحتاجها وأضف تفاصيل مشروعك لاستقبال عروض مقدمي الخدمات المهتمين.</p>
          <Link href="/dashboard/client/requests/new" className={styles.primaryBtn}>
            أنشئ طلبك
          </Link>
        </section>
      )}
    </main>
  );
}