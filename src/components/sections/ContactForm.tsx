"use client";

/**
 * The contact form. A client component because it holds the fields and errors in "state" and updates them live.
 * Flow: the user types → we validate in the browser → we send to /api/contact → the server validates again and sends.
 */

import { useRef, useState, type ChangeEvent, type FocusEvent, type FormEvent } from "react";
import {
  emptyContact,
  inquiryTypes,
  validateContact,
  validateField,
  type ContactData,
  type ContactErrors,
} from "@/lib/contact";
import { Icon } from "@/components/ui/Icon";
import styles from "./ContactForm.module.css";

type Status = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [values, setValues] = useState<ContactData>(emptyContact);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  // On every change: update the value, and if the field had an error, re-check it right away
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof ContactData;
    const value = e.target.value;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: validateField(name, value) || undefined }));
  }

  // On leaving a filled field: check it
  function handleBlur(e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const name = e.target.name as keyof ContactData;
    if (e.target.value.trim()) setErrors((err) => ({ ...err, [name]: validateField(name, e.target.value) || undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("idle");

    const found = validateContact(values);
    setErrors(found);
    const firstError = Object.keys(found)[0];
    if (firstError) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: formData.get("website") }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setValues(emptyContact);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  // Shared props for each field so they're not repeated
  const field = (name: keyof ContactData) => ({
    id: name,
    name,
    value: values[name],
    onChange: handleChange,
    onBlur: handleBlur,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const errorText = (name: keyof ContactData) =>
    errors[name] ? (
      <p id={`${name}-error`} className={styles.error}>
        {errors[name]}
      </p>
    ) : null;

  const wrap = (name: keyof ContactData) => `${styles.field} ${errors[name] ? styles.hasError : ""}`;

  return (
    <form ref={formRef} className={styles.form} onSubmit={handleSubmit} noValidate>
      {status === "success" && (
        <div className={`${styles.alert} ${styles.success}`} role="status">
          <Icon name="checkCircle" />
          تم استلام رسالتك بنجاح. سيتواصل معك فريق AGENCE عبر بيانات التواصل المسجلة.
        </div>
      )}
      {status === "error" && (
        <div className={`${styles.alert} ${styles.failure}`} role="alert">
          <Icon name="alertCircle" />
          تعذّر إرسال رسالتك. تحقق من البيانات وحاول مرة أخرى.
        </div>
      )}

      <div className={wrap("fullName")}>
        <label htmlFor="fullName">الاسم الكامل</label>
        <input type="text" autoComplete="name" placeholder="اكتب اسمك الكامل" {...field("fullName")} />
        {errorText("fullName")}
      </div>

      <div className={wrap("email")}>
        <label htmlFor="email">البريد الإلكتروني</label>
        <input type="email" autoComplete="email" dir="ltr" placeholder="name@example.com" {...field("email")} />
        {errorText("email")}
      </div>

      <div className={wrap("phone")}>
        <label htmlFor="phone">رقم الجوال</label>
        <input type="tel" autoComplete="tel" inputMode="tel" placeholder="أدخل رقم الجوال" {...field("phone")} />
        {errorText("phone")}
      </div>

      <div className={wrap("inquiryType")}>
        <label htmlFor="inquiryType">نوع الاستفسار</label>
        <div className={styles.select}>
          <select {...field("inquiryType")} className={values.inquiryType ? undefined : styles.placeholder}>
            <option value="" disabled>
              اختر نوع الاستفسار
            </option>
            {inquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        {errorText("inquiryType")}
      </div>

      <div className={wrap("subject")}>
        <label htmlFor="subject">عنوان الرسالة</label>
        <input type="text" placeholder="اكتب عنوانًا مختصرًا لاستفسارك" {...field("subject")} />
        {errorText("subject")}
      </div>

      <div className={wrap("message")}>
        <label htmlFor="message">تفاصيل الرسالة</label>
        <textarea rows={5} placeholder="اكتب تفاصيل استفسارك هنا" {...field("message")} />
        {errorText("message")}
      </div>

      {/* Hidden spam trap: people don't see it, and automated bots fill it in */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className={styles.trap} aria-hidden="true" />

      <button
        type="submit"
        className={`btn btn--primary btn--pill ${styles.submit}`}
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        {status === "sending" ? "جارٍ الإرسال…" : "إرسال الرسالة"}
      </button>
    </form>
  );
}
