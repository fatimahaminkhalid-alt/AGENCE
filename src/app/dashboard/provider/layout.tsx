import ProviderSidebar from "@/components/dashboard/ProviderSidebar";
import styles from "./layout.module.css";

export default function ProviderDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.shell}>
      <ProviderSidebar />
      <div className={styles.content}>{children}</div>
    </div>
  );
}