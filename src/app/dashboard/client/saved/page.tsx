import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import SavedProviders from "@/components/dashboard/SavedProviders";
import { savedProviders } from "@/lib/client-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "مقدمو الخدمات المحفوظون | ايجنس" };

export default function SavedPage() {
  return (
    <main className={layout.main}>
      <Topbar title="مقدمو الخدمات المحفوظون" />
      <PageHeader title="مقدمو الخدمات المحفوظون" subtitle="احفظ مقدمي الخدمات الذين أعجبتك أعمالهم للرجوع إليهم لاحقًا." />
      <SavedProviders providers={savedProviders} />
    </main>
  );
}
