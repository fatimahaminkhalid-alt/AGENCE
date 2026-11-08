import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

/**
 * Login page: /login
 * The page itself is a server component (so it can set the page title), and inside it is the form (a client component).
 */

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default function LoginPage() {
  return (
    <AuthShell panel="beneficiaries">
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
