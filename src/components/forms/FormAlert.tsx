import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import styles from "./forms.module.css";

const variant = { success: "success", error: "danger", info: "info" } as const;

/** Alert at the top of a form: success (green), error (red), or info (blue) */
export function FormAlert({ type, children }: { type: "success" | "error" | "info"; children: ReactNode }) {
  return (
    <div className={`${styles.alert} ${styles[variant[type]]}`} role={type === "error" ? "alert" : "status"}>
      <Icon name={type === "success" ? "checkCircle" : "alertCircle"} />
      <span>{children}</span>
    </div>
  );
}
