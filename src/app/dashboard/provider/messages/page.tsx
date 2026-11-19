import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import Messenger from "@/components/dashboard/Messenger";
import { providerConversations } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "الرسائل | ايجنس" };

export default function ProviderMessagesPage() {
  return (
    <main className={layout.main}>
      <Topbar title="الرسائل" role="provider" />
      <PageHeader title="الرسائل" subtitle="تواصل مع المستفيدين حول الفرص والمشروعات." />
      <Messenger conversations={providerConversations} contextLabel="على مشروع" />
    </main>
  );
}
