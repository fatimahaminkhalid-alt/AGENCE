import { Suspense } from "react";
import Link from "next/link";
import Topbar from "@/components/dashboard/Topbar";
import RequestsOverview from "@/components/dashboard/RequestsOverview";
import { requests } from "@/lib/requests";
import ui from "@/components/dashboard/ui.module.css";
import layout from "./layout.module.css";
import styles from "./home.module.css";

export const metadata = { title: "لوحة التحكم | ايجنس" };

export default function ClientDashboardPage() {
  const user = { name: "نورة" };

  return (
    <main className={layout.main}>
      <Topbar title="لوحة التحكم" />

      {/* Welcome card */}
      <section className={`${ui.card} ${styles.welcome}`}>
        <div className={styles.welcomeText}>
          <h1 className={styles.welcomeTitle}>مرحبًا، {user.name}</h1>
          <p className={styles.welcomeSub}>ابدأ طلبًا جديدًا أو تابع طلباتك الحالية من مكان واحد.</p>
          <Link href="/dashboard/client/requests/new" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnLg}`}>
            أنشئ طلبًا جديدًا
          </Link>
        </div>
      </section>

      {/* "طلباتي" list, or the empty state. Suspense is needed because the component reads ?empty=1 from the URL */}
      <Suspense fallback={null}>
        <RequestsOverview requests={requests} />
      </Suspense>
    </main>
  );
}
