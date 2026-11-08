/**
 * Contact-form validation rules.
 * The same file runs in the browser (instant messages for the user)
 * and on the server (real protection, since the browser can't be trusted).
 */

import { isEmail, isPhone } from "./validators";

export const inquiryTypes = [
  { value: "general", label: "استفسار عام" },
  { value: "support", label: "طلب دعم" },
  { value: "partnership", label: "شراكة" },
  { value: "feedback", label: "ملاحظة أو اقتراح" },
  { value: "other", label: "غير ذلك" },
] as const;

export type ContactData = {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactData, string>>;

export const emptyContact: ContactData = {
  fullName: "",
  email: "",
  phone: "",
  inquiryType: "",
  subject: "",
  message: "",
};


export const errorMessages: Record<keyof ContactData, string> = {
  fullName: "يرجى إدخال الاسم الكامل.",
  email: "يرجى إدخال بريد إلكتروني صحيح.",
  phone: "يرجى إدخال رقم جوال صحيح.",
  inquiryType: "يرجى اختيار نوع الاستفسار.",
  subject: "العنوان طويل جدًا.",
  message: "يرجى كتابة تفاصيل الرسالة.",
};

/** Check one field and return its error message, or an empty string if it's valid */
export function validateField(name: keyof ContactData, raw: string): string {
  const value = raw.trim();
  switch (name) {
    case "fullName":
      return value.length >= 2 && value.length <= 100 ? "" : errorMessages.fullName;
    case "email":
      return isEmail(value) ? "" : errorMessages.email;
    case "phone":
      return isPhone(value) ? "" : errorMessages.phone;
    case "inquiryType":
      return inquiryTypes.some((t) => t.value === value) ? "" : errorMessages.inquiryType;
    case "subject": // optional
      return value.length <= 150 ? "" : errorMessages.subject;
    case "message":
      return value.length >= 5 && value.length <= 5000 ? "" : errorMessages.message;
  }
}

/** Check the whole form */
export function validateContact(data: ContactData): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(emptyContact) as (keyof ContactData)[]).forEach((key) => {
    const msg = validateField(key, String(data[key] ?? ""));
    if (msg) errors[key] = msg;
  });
  return errors;
}
