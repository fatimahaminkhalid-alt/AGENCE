import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

/** Password recovery page: /forgot-password */

export const metadata: Metadata = {
  title: "استعادة كلمة المرور",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell panel="beneficiaries">
      <ForgotPasswordForm />
    </AuthShell>
  );
}
