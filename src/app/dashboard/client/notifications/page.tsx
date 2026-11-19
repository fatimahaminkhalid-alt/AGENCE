import Topbar from "@/components/dashboard/Topbar";
import NotificationsList from "@/components/dashboard/NotificationsList";
import { notifications } from "@/lib/client-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "الإشعارات | ايجنس" };

export default function NotificationsPage() {
  return (
    <main className={layout.main}>
      <Topbar title="الإشعارات" />
      {/* The page header is inside the list because the "تحديد الكل كمقروء" button changes the list's state */}
      <NotificationsList notifications={notifications} />
    </main>
  );
}
