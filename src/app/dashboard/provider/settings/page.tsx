import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import SettingsForms from "@/components/dashboard/SettingsForms";
import { providerAccount, providerPrefs } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "إعدادات الحساب | ايجنس" };

export default function ProviderSettingsPage() {
  return (
    <main className={layout.main}>
      <Topbar title="إعدادات الحساب" role="provider" />
      <PageHeader title="إعدادات الحساب" subtitle="حدّث معلوماتك وتفضيلات الإشعارات." />
      <SettingsForms account={providerAccount} prefs={providerPrefs} />
    </main>
  );
}
