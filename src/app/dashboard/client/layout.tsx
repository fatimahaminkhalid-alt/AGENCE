import Sidebar from "@/components/dashboard/Sidebar";
import styles from "./layout.module.css";

export default function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <Sidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}