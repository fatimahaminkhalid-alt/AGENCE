import Topbar from "@/components/dashboard/Topbar";
import NotificationsList from "@/components/dashboard/NotificationsList";
import { providerNotifications } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "الإشعارات | ايجنس" };

export default function ProviderNotificationsPage() {
  return (
    <main className={layout.main}>
      <Topbar title="الإشعارات" role="provider" />
      <NotificationsList notifications={providerNotifications} subtitle="آخر المستجدات على عروضك ومشروعاتك." />
    </main>
  );
}
