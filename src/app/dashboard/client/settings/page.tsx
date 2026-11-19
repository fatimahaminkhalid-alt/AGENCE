import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import SettingsForms from "@/components/dashboard/SettingsForms";
import layout from "../layout.module.css";

export const metadata = { title: "إعدادات الحساب | ايجنس" };

export default function SettingsPage() {
  return (
    <main className={layout.main}>
      <Topbar title="إعدادات الحساب" />
      <PageHeader title="إعدادات الحساب" subtitle="حدّث معلوماتك وتفضيلات الإشعارات." />
      <SettingsForms />
    </main>
  );
}
