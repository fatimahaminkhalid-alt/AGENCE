"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { routes } from "@/lib/content";
import { postJson } from "@/lib/api";
import { validateForgot } from "@/lib/auth-validation";
import { Field } from "@/components/forms/Field";
import { FormAlert } from "@/components/forms/FormAlert";
import { Icon } from "@/components/ui/Icon";
import styles from "./auth.module.css";

/**
 * Password recovery. Its states as in the design:
 * - account not found → red alert + red field border
 * - success          → green alert
 */

type Status = "idle" | "sending" | "sent" | "notFound" | "failed";

export function ForgotPasswordForm() {
  const [identifier, setIdentifier] = useState("");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validateForgot({ identifier });
    setError(found.identifier);
    if (found.identifier) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    const res = await postJson("/api/auth/forgot-password", { identifier });
    setStatus(res.ok ? "sent" : res.status === 404 ? "notFound" : "failed");
  }

  return (
    <>
      <h1 className={styles.heading}>استعادة كلمة المرور</h1>
      <p className={styles.sub}>أدخل بريدك الإلكتروني أو رقم جوالك، وسنرسل إليك تعليمات استعادة كلمة المرور.</p>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {status === "notFound" && (
          <FormAlert type="error">لم نتمكن من العثور على حساب بهذه البيانات. تحقق منها وحاول مرة أخرى.</FormAlert>
        )}
        {status === "failed" && <FormAlert type="error">تعذّر إرسال التعليمات. حاول مرة أخرى.</FormAlert>}
        {status === "sent" && <FormAlert type="success">تم إرسال تعليمات استعادة كلمة المرور.</FormAlert>}

        <Field
          label="البريد الإلكتروني أو رقم الجوال"
          name="identifier"
          type="text"
          autoComplete="username"
          placeholder="أدخل بريدك الإلكتروني أو رقم جوالك"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
            if (error) setError(validateForgot({ identifier: e.target.value }).identifier);
            if (status === "notFound") setStatus("idle");
          }}
          error={error}
          invalid={status === "notFound"}
        />

        <button
          type="submit"
          className={`btn btn--primary btn--pill ${styles.submit}`}
          disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? "جارٍ الإرسال…" : "إرسال التعليمات"}
        </button>

        <Link href={routes.login} className={styles.backLink}>
          <Icon name="arrowRight" />
          العودة إلى تسجيل الدخول
        </Link>
      </form>
    </>
  );
}
