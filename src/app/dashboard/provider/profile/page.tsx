import Topbar from "@/components/dashboard/Topbar";
import ProfileEditor from "@/components/dashboard/ProfileEditor";
import { provider } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "الملف المهني | ايجنس" };

export default function ProfilePage() {
  return (
    <main className={layout.main}>
      <Topbar title="الملف المهني" role="provider" />
      <ProfileEditor profile={provider} />
    </main>
  );
}
