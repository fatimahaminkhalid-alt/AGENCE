"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { routes } from "@/lib/content";
import { postJson } from "@/lib/api";
import {
  validateRegister,
  type AccountType,
  type Errors,
  type ProviderKind,
  type RegisterData,
} from "@/lib/auth-validation";
import { Checkbox } from "@/components/forms/Checkbox";
import { Field } from "@/components/forms/Field";
import { FormAlert } from "@/components/forms/FormAlert";
import { SocialButtons } from "./SocialButtons";
import styles from "./auth.module.css";

/**
 * One form for both account types:
 *   <RegisterForm accountType="client" />    beneficiary account
 *   <RegisterForm accountType="provider" />  service provider account (adds the freelancer/agency toggle)
 */

const copy = {
  client: {
    title: "أنشئ حساب مستفيد",
    sub: "أنشئ طلباتك، استقبل العروض، وقارن بين مقدمي الخدمات.",
  },
  provider: {
    title: "أنشئ حساب مقدم خدمة",
    sub: "اعرض خدماتك وأعمالك، واكتشف المشروعات المناسبة لتخصصك.",
  },
};

export function RegisterForm({ accountType }: { accountType: AccountType }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<RegisterData>({
    accountType,
    providerKind: accountType === "provider" ? "freelancer" : undefined,
    fullName: "",
    email: "",
    phone: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Errors<RegisterData>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "failed">("idle");

  const isAgency = values.providerKind === "agency";

  function update<K extends keyof RegisterData>(name: K, value: RegisterData[K]) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validateRegister(next)[name] }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("idle");

    const found = validateRegister(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    const res = await postJson<{ errors?: Errors<RegisterData> }>("/api/auth/register", values);

    if (res.ok) {
      router.push(`${routes.login}?registered=1`);
      return;
    }
    if ((res.status === 422 || res.status === 409) && res.data.errors) {
      setErrors(res.data.errors);
      setStatus("idle");
      return;
    }
    setStatus("failed");
  }

  return (
    <>
      <h1 className={styles.heading}>{copy[accountType].title}</h1>
      <p className={styles.sub}>{copy[accountType].sub}</p>

      <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
        {accountType === "provider" && (
          <fieldset className={styles.segmented}>
            <legend>نوع مقدم الخدمة</legend>
            {(
              [
                ["freelancer", "مستقل"],
                ["agency", "وكالة"],
              ] as [ProviderKind, string][]
            ).map(([value, label]) => (
              <label key={value}>
                <input
                  type="radio"
                  name="providerKind"
                  value={value}
                  checked={values.providerKind === value}
                  onChange={() => update("providerKind", value)}
                />
                {label}
              </label>
            ))}
          </fieldset>
        )}

        <SocialButtons />

        {status === "failed" && <FormAlert type="error">تعذّر إنشاء الحساب. حاول مرة أخرى.</FormAlert>}

        <Field
          label={isAgency ? "اسم الوكالة" : "الاسم الكامل"}
          name="fullName"
          type="text"
          autoComplete={isAgency ? "organization" : "name"}
          placeholder={isAgency ? "اكتب اسم الوكالة" : "اكتب اسمك الكامل"}
          value={values.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          error={errors.fullName}
        />

        <Field
          label="البريد الإلكتروني"
          name="email"
          type="email"
          dir="ltr"
          autoComplete="email"
          placeholder="name@example.com"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          error={errors.email}
        />

        <Field
          label="رقم الجوال"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="أدخل رقم الجوال"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          error={errors.phone}
        />

        <Field
          label="كلمة المرور"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="أنشئ كلمة مرور"
          value={values.password}
          onChange={(e) => update("password", e.target.value)}
          error={errors.password}
        />

        <Checkbox
          name="acceptTerms"
          checked={values.acceptTerms}
          onChange={(e) => update("acceptTerms", e.target.checked)}
          error={errors.acceptTerms}
        >
          أوافق على <Link href={routes.terms}>الشروط والأحكام</Link> و<Link href={routes.privacy}>سياسة الخصوصية</Link>
        </Checkbox>

        <button
          type="submit"
          className={`btn btn--primary btn--pill ${styles.submit}`}
          disabled={status === "sending"}
          aria-busy={status === "sending"}
        >
          {status === "sending" ? "جارٍ إنشاء الحساب…" : "إنشاء الحساب"}
        </button>

        <p className={styles.switch}>
          لديك حساب بالفعل؟ <Link href={routes.login}>تسجيل الدخول</Link>
        </p>
      </form>
    </>
  );
}
