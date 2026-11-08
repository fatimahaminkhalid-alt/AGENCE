import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

/**
 * Login page: /login
 * The page itself is a server component (so it can set the page title), and inside it is the form (a client component).
 */

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

type Props = { searchParams: Promise<{ registered?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  // ?registered=1 means they just created an account, so we show a success message
  const { registered } = await searchParams;

  return (
    <AuthShell panel="beneficiaries">
      <LoginForm registered={registered === "1"} />
    </AuthShell>
  );
}
