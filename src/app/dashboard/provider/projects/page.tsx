import Topbar from "@/components/dashboard/Topbar";
import PageHeader from "@/components/dashboard/PageHeader";
import ProjectsList from "@/components/dashboard/ProjectsList";
import { projects } from "@/lib/provider-dashboard";
import layout from "../layout.module.css";

export const metadata = { title: "مشروعاتي | ايجنس" };

export default function ProjectsPage() {
  return (
    <main className={layout.main}>
      <Topbar title="مشروعاتي" role="provider" />
      <PageHeader title="مشروعاتي" subtitle="المشروعات التي تعمل عليها بعد قبول عروضك." />
      <ProjectsList projects={projects} />
    </main>
  );
}
