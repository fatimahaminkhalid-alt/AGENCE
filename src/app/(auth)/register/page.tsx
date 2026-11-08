import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { AccountTypeChoice } from "@/components/auth/AccountTypeChoice";

/** Account type choice page: /register (full width, with no side panel) */

export const metadata: Metadata = {
  title: "إنشاء حساب",
};

export default function RegisterPage() {
  return (
    <AuthShell>
      <AccountTypeChoice />
    </AuthShell>
  );
}
