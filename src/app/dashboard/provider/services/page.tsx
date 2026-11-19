import Topbar from "@/components/dashboard/Topbar";
import ServicesManager from "@/components/dashboard/ServicesManager";
import { services } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "خدماتي | ايجنس" };

export default function ServicesPage() {
  return (
    <main className={layout.main}>
      <Topbar title="خدماتي" role="provider" />
      {/* The page header is inside the component because the "أضف خدمة" button opens its window */}
      <ServicesManager services={services} />
    </main>
  );
}
