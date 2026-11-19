import Topbar from "@/components/dashboard/Topbar";
import PortfolioGallery from "@/components/dashboard/PortfolioGallery";
import { works } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "معرض الأعمال | ايجنس" };

export default function PortfolioPage() {
  return (
    <main className={layout.main}>
      <Topbar title="معرض الأعمال" role="provider" />
      {/* The page header is inside the component because the "أضف عملًا" button opens its window */}
      <PortfolioGallery works={works} />
    </main>
  );
}
