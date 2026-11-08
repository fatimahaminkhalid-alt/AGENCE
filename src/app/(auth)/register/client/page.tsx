import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

/** Beneficiary registration page: /register/client */

export const metadata: Metadata = {
  title: "إنشاء حساب مستفيد",
};

export default function RegisterClientPage() {
  return (
    <AuthShell panel="beneficiaries">
      <RegisterForm accountType="client" />
    </AuthShell>
  );
}
