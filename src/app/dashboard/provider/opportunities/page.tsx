import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import OpportunitiesBrowser from "@/components/dashboard/OpportunitiesBrowser";
import { opportunities } from "@/lib/opportunities";
import layout from "../layout.module.css";

export const metadata = { title: "الفرص المتاحة | ايجنس" };

export default function OpportunitiesPage() {
  return (
    <main className={layout.main}>
      <Topbar title="الفرص المتاحة" role="provider" />
      <PageHeader title="الفرص المتاحة" subtitle="طلبات خدمات منشورة من المستفيدين، قدّم عرضك على ما يناسب تخصصك." />
      <OpportunitiesBrowser opportunities={opportunities} />
    </main>
  );
}
