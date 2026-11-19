import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import Messenger from "@/components/dashboard/Messenger";
import { conversations } from "@/lib/client-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "الرسائل | ايجنس" };

export default function MessagesPage() {
  return (
    <main className={layout.main}>
      <Topbar title="الرسائل" />
      <PageHeader title="الرسائل" subtitle="تواصل مع مقدمي الخدمات حول طلباتك وعروضهم." />
      <Messenger conversations={conversations} />
    </main>
  );
}
