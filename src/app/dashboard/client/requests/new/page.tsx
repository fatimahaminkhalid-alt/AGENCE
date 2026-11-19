import { Check, Lightbulb } from "lucide-react";
import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import NewRequestForm from "@/components/dashboard/NewRequestForm";
import layout from "../../layout.module.css";
import styles from "./new.module.css";

export const metadata = { title: "إنشاء طلب جديد | ايجنس" };

const tips = [
  "اكتب هدف المشروع والجمهور المستهدف.",
  "حدد ميزانية تقريبية لتصلك عروض أدق.",
  "أرفق أمثلة لأعمال أعجبتك إن وُجدت.",
];

export default function NewRequestPage() {
  return (
    <main className={layout.main}>
      <Topbar title="إنشاء طلب جديد" />
      <PageHeader title="إنشاء طلب جديد" subtitle="أضف تفاصيل مشروعك ليصل طلبك إلى مقدمي الخدمات المناسبين." />

      <div className={styles.grid}>
        <NewRequestForm />

        <aside className={styles.tips} aria-labelledby="tips-title">
          <h2 id="tips-title" className={styles.tipsTitle}>
            <Lightbulb size={20} aria-hidden />
            نصائح لطلب أوضح
          </h2>
          <ul className={styles.tipsList}>
            {tips.map((t) => (
              <li key={t}>
                <Check size={18} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
