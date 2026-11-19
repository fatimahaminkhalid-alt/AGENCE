import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Topbar from "@/components/dashboard/Topbar";
import ProviderHomeFeed from "@/components/dashboard/ProviderHomeFeed";
import { suggestedOpportunities } from "@/lib/opportunities";
import { provider } from "@/lib/provider-dashboard";
import ui from "@/components/dashboard/ui.module.css";
import layout from "./layout.module.css";
import styles from "./home.module.css";

export const metadata = { title: "لوحة التحكم | ايجنس" };

export default function ProviderDashboardPage() {
  return (
    <main className={layout.main}>
      <Topbar title="لوحة التحكم" role="provider" />

      {/* Welcome card */}
      <section className={`${ui.card} ${styles.welcome}`}>
        <div className={styles.welcomeText}>
          <h1 className={styles.welcomeTitle}>مرحبًا، {provider.firstName}</h1>
          <p className={styles.welcomeSub}>اكتشف فرصًا تناسب تخصصك وتابع عروضك من مكان واحد.</p>
          <Link href="/dashboard/provider/opportunities" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnLg}`}>
            استكشف الفرص
          </Link>
        </div>
        {/* basePath (/AGENCE) is written by hand, as in the rest of the project, because images on GitHub Pages need it */}
        <Image
          src="/AGENCE/images/dashboard-provider.webp"
          alt=""
          width={280}
          height={176}
          className={styles.welcomeImg}
          priority
        />
      </section>

      {/* "أكمل ملفك" banner + suggested opportunities, or the empty state.
          Suspense is needed because the component reads ?empty=1 from the URL */}
      <Suspense fallback={null}>
        <ProviderHomeFeed opportunities={suggestedOpportunities} />
      </Suspense>
    </main>
  );
}
