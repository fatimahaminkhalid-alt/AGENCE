/**
 * Validation rules for the account forms (login, register, password recovery).
 * Like contact.ts: the same file runs in the browser and on the server.
 */

import { isEmail, isEmailOrPhone, isPhone, isStrongPassword } from "./validators";

export type Errors<T> = Partial<Record<keyof T, string>>;

/* ---------- Login ---------- */
export type LoginData = { identifier: string; password: string };

export function validateLogin(d: LoginData): Errors<LoginData> {
  const e: Errors<LoginData> = {};
  if (!isEmailOrPhone(d.identifier)) e.identifier = "يرجى إدخال البريد الإلكتروني أو رقم الجوال.";
  if (!d.password) e.password = "يرجى إدخال كلمة المرور.";
  return e;
}

/* ---------- Register ---------- */
export type AccountType = "client" | "provider";
export type ProviderKind = "freelancer" | "agency";

export type RegisterData = {
  accountType: AccountType;
  providerKind?: ProviderKind;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  acceptTerms: boolean;
};

export function validateRegister(d: RegisterData): Errors<RegisterData> {
  const e: Errors<RegisterData> = {};
  const name = d.fullName.trim();
  const isAgency = d.accountType === "provider" && d.providerKind === "agency";

  if (name.length < 2 || name.length > 100) e.fullName = isAgency ? "يرجى إدخال اسم الوكالة." : "يرجى إدخال الاسم الكامل.";
  if (!isEmail(d.email)) e.email = "يرجى إدخال بريد إلكتروني صحيح.";
  if (!isPhone(d.phone)) e.phone = "يرجى إدخال رقم جوال صحيح.";
  if (!isStrongPassword(d.password)) e.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف ورقم.";
  if (!d.acceptTerms) e.acceptTerms = "يجب الموافقة على الشروط والأحكام وسياسة الخصوصية.";
  return e;
}

/* ---------- Password recovery ---------- */
export type ForgotData = { identifier: string };

export function validateForgot(d: ForgotData): Errors<ForgotData> {
  return isEmailOrPhone(d.identifier) ? {} : { identifier: "يرجى إدخال البريد الإلكتروني أو رقم الجوال." };
}
