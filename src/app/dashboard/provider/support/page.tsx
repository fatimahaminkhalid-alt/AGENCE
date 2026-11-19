import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import SupportCenter from "@/components/dashboard/SupportCenter";
import { providerFaqs } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "الدعم | ايجنس" };

export default function ProviderSupportPage() {
  return (
    <main className={layout.main}>
      <Topbar title="الدعم" role="provider" />
      <PageHeader title="الدعم" subtitle="إجابات سريعة لأكثر الأسئلة شيوعًا، وفريقنا جاهز لمساعدتك." />
      <SupportCenter faqs={providerFaqs} />
    </main>
  );
}
