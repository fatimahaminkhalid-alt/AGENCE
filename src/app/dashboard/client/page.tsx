import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
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
        {/* basePath (/AGENCE) is written by hand, as in the rest of the project, because images on GitHub Pages need it */}
        <Image
          src="/AGENCE/images/dashboard-welcome.webp"
          alt=""
          width={280}
          height={176}
          className={styles.welcomeImg}
          priority
        />
      </section>

      {/* "طلباتي" list, or the empty state. Suspense is needed because the component reads ?empty=1 from the URL */}
      <Suspense fallback={null}>
        <RequestsOverview requests={requests} />
      </Suspense>
    </main>
  );
}
