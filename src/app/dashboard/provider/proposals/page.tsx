import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import ProposalsList from "@/components/dashboard/ProposalsList";
import { proposals, proposalStats } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "عروضي | ايجنس" };

export default function ProposalsPage() {
  return (
    <main className={layout.main}>
      <Topbar title="عروضي" role="provider" />
      <PageHeader title="عروضي" subtitle="تابع حالة العروض التي قدّمتها على الفرص." />
      <ProposalsList proposals={proposals} stats={proposalStats} />
    </main>
  );
}
