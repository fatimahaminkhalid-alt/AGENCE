import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import SupportCenter from "@/components/dashboard/SupportCenter";
import { faqs } from "@/lib/client-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "الدعم | ايجنس" };

export default function SupportPage() {
  return (
    <main className={layout.main}>
      <Topbar title="الدعم" />
      <PageHeader title="الدعم" subtitle="إجابات سريعة لأكثر الأسئلة شيوعًا، وفريقنا جاهز لمساعدتك." />
      <SupportCenter faqs={faqs} />
    </main>
  );
}
