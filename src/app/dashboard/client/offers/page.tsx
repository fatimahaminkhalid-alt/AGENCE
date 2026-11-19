import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import OffersList from "@/components/dashboard/OffersList";
import { offers } from "@/lib/client-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "العروض المستلمة | ايجنس" };

export default function OffersPage() {
  return (
    <main className={layout.main}>
      <Topbar title="العروض المستلمة" />
      <PageHeader title="العروض المستلمة" subtitle="كل العروض على طلباتك في مكان واحد، قارن بينها واختر الأنسب." />
      <OffersList offers={offers} />
    </main>
  );
}
