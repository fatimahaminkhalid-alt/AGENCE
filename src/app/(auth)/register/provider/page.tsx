import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

/** Service provider registration page: /register/provider */

export const metadata: Metadata = {
  title: "إنشاء حساب مقدم خدمة",
};

export default function RegisterProviderPage() {
  return (
    <AuthShell panel="providers">
      <RegisterForm accountType="provider" />
    </AuthShell>
  );
}
