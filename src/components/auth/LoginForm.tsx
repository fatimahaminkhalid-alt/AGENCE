"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { routes } from "@/lib/content";
import { postJson } from "@/lib/api";
import { validateLogin, type Errors, type LoginData } from "@/lib/auth-validation";
import { Field } from "@/components/forms/Field";
import { FormAlert } from "@/components/forms/FormAlert";
import { SocialButtons } from "./SocialButtons";
import styles from "./auth.module.css";

/**
 * Login form. Its states as in the design:
 * - empty fields   → a message under each field
 * - wrong details  → "بيانات الدخول غير صحيحة..."
 * - server/network failure → "تعذّر تسجيل الدخول..."
 */

type Status = "idle" | "sending" | "invalid" | "failed";

export function LoginForm({ registered = false }: { registered?: boolean }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<LoginData>({ identifier: "", password: "" });
  const [errors, setErrors] = useState<Errors<LoginData>>({});
  const [status, setStatus] = useState<Status>("idle");

  function update(name: keyof LoginData, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    // If the field had an error, re-check it as soon as the user fixes it
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validateLogin(next)[name] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("idle");

    const found = validateLogin(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const res = await postJson<{ errors?: Errors<LoginData> }>("/api/auth/login", values);

    if (res.ok) {
      router.push(routes.dashboardClient);
      return;
    }
    if (res.status === 422 && res.data.errors) {
      setErrors(res.data.errors);
      setStatus("idle");
      return;
    }
    setStatus(res.status === 401 ? "invalid" : "failed");
  }

  return (
    <>
      <h1 className={styles.heading}>مرحبًا بعودتك</h1>
      <p className={styles.sub}>سجّل الدخول إلى حسابك في AGENCE.</p>

      <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
        {registered && status === "idle" && (
          <FormAlert type="success">تم إنشاء حسابك بنجاح. سجّل الدخول للمتابعة.</FormAlert>
        )}

        <SocialButtons />

        {status === "invalid" && <FormAlert type="error">بيانات الدخول غير صحيحة. تحقق منها وحاول مرة أخرى.</FormAlert>}
        {status === "failed" && <FormAlert type="error">تعذّر تسجيل الدخول. حاول مرة أخرى.</FormAlert>}

        <Field
          label="البريد الإلكتروني أو رقم الجوال"
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="أدخل بريدك الإلكتروني أو رقم جوالك"
          value={values.identifier}
          onChange={(e) => update("identifier", e.target.value)}
          error={errors.identifier}
        />

        <Field
          label="كلمة المرور"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="أدخل كلمة المرور"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          error={errors.password}
        />

        <Link href={routes.forgotPassword} className={styles.forgot}>
          نسيت كلمة المرور؟
        </Link>

        <button
          type="submit"
          className={`btn btn--primary btn--pill ${styles.submit}`}
          disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? "جارٍ تسجيل الدخول…" : "تسجيل الدخول"}
        </button>

        <p className={styles.switch}>
          ليس لديك حساب؟ <Link href={routes.register}>أنشئ حسابًا جديدًا</Link>
        </p>
      </form>
    </>
  );
}
