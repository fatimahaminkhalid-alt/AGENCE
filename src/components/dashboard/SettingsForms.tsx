"use client";

/**
 * Account settings: three separate cards, each one saves on its own.
 * Validation uses the same rules as the sign-up form (lib/validators.ts).
 * Demo: a success message shows without saving anything, until it's connected to a database.
 */

import { useState, type FormEvent } from "react";
import { isEmail, isPhone, isStrongPassword } from "@/lib/validators";
import ui from "./ui.module.css";
import styles from "./SettingsForms.module.css";

type Errors = Record<string, string | undefined>;

function useSaved() {
  const [saved, setSaved] = useState(false);
  const flash = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
  };
  return [saved, flash] as const;
}

/* The account owner's data and notification preferences: they differ between the beneficiary and the service provider */
export type Pref = { key: string; title: string; desc: string; on: boolean };
export type Account = { fullName: string; email: string };

const CLIENT_ACCOUNT: Account = { fullName: "نورة السبيعي", email: "nora@example.com" };

const CLIENT_PREFS: Pref[] = [
  { key: "offers", title: "العروض الجديدة", desc: "تنبيه عند وصول عرض جديد على طلباتك.", on: true },
  { key: "messages", title: "الرسائل", desc: "تنبيه عند وصول رسالة من مقدم خدمة.", on: true },
  { key: "newsletter", title: "النشرة البريدية", desc: "أخبار المنصة ونصائح لمشاريعك الإعلامية.", on: false },
];

/* ---------- Personal information ---------- */
function ProfileCard({ account }: { account: Account }) {
  const [v, setV] = useState({ ...account, phone: "", org: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [saved, flash] = useSaved();

  function submit(e: FormEvent) {
    e.preventDefault();
    const er: Errors = {};
    if (v.fullName.trim().length < 2) er.fullName = "يرجى إدخال الاسم الكامل.";
    if (!isEmail(v.email)) er.email = "يرجى إدخال بريد إلكتروني صحيح.";
    if (v.phone && !isPhone(v.phone)) er.phone = "يرجى إدخال رقم جوال صحيح.";
    setErrors(er);
    if (Object.keys(er).length === 0) flash();
  }

  const field = (name: keyof typeof v, label: string, placeholder: string, type = "text", extra: object = {}) => (
    <div className={ui.field}>
      <label htmlFor={`s-${name}`} className={ui.label}>
        {label}
      </label>
      <input
        id={`s-${name}`}
        type={type}
        className={`${ui.input} ${errors[name] ? ui.inputError : ""}`}
        placeholder={placeholder}
        value={v[name]}
        onChange={(e) => setV({ ...v, [name]: e.target.value })}
        aria-invalid={!!errors[name] || undefined}
        aria-describedby={errors[name] ? `s-${name}-error` : undefined}
        {...extra}
      />
      {errors[name] && (
        <p id={`s-${name}-error`} className={ui.error}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form className={`${ui.card} ${ui.cardPad} ${styles.card}`} onSubmit={submit} noValidate aria-labelledby="profile-title">
      <h2 id="profile-title" className={ui.cardTitle}>
        المعلومات الشخصية
      </h2>
      <div className={ui.fieldRow}>
        {field("fullName", "الاسم الكامل", account.fullName, "text", { autoComplete: "name" })}
        {field("email", "البريد الإلكتروني", account.email, "email", { autoComplete: "email", dir: "ltr" })}
        {field("phone", "رقم الجوال", "05X XXX XXXX", "tel", { autoComplete: "tel", inputMode: "tel" })}
        {field("org", "اسم الجهة (اختياري)", "اكتب اسم الجهة أو الشركة", "text", { autoComplete: "organization" })}
      </div>
      <div className={styles.footer}>
        {saved && (
          <span className={styles.saved} role="status">
            تم حفظ التغييرات.
          </span>
        )}
        <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
          حفظ التغييرات
        </button>
      </div>
    </form>
  );
}

/* ---------- Password ---------- */
function PasswordCard() {
  const [v, setV] = useState({ current: "", next: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [saved, flash] = useSaved();

  function submit(e: FormEvent) {
    e.preventDefault();
    const er: Errors = {};
    if (!v.current) er.current = "يرجى إدخال كلمة المرور الحالية.";
    if (!isStrongPassword(v.next)) er.next = "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على حرف ورقم.";
    else if (v.next === v.current) er.next = "كلمة المرور الجديدة مطابقة للحالية.";
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setV({ current: "", next: "" });
      flash();
    }
  }

  return (
    <form className={`${ui.card} ${ui.cardPad} ${styles.card}`} onSubmit={submit} noValidate aria-labelledby="password-title">
      <h2 id="password-title" className={ui.cardTitle}>
        كلمة المرور
      </h2>
      <div className={ui.fieldRow}>
        {(
          [
            ["current", "كلمة المرور الحالية", "أدخل كلمة المرور الحالية", "current-password"],
            ["next", "كلمة المرور الجديدة", "أدخل كلمة المرور الجديدة", "new-password"],
          ] as const
        ).map(([name, label, ph, ac]) => (
          <div key={name} className={ui.field}>
            <label htmlFor={`pw-${name}`} className={ui.label}>
              {label}
            </label>
            <input
              id={`pw-${name}`}
              type="password"
              autoComplete={ac}
              className={`${ui.input} ${errors[name] ? ui.inputError : ""}`}
              placeholder={ph}
              value={v[name]}
              onChange={(e) => setV({ ...v, [name]: e.target.value })}
              aria-invalid={!!errors[name] || undefined}
              aria-describedby={errors[name] ? `pw-${name}-error` : undefined}
            />
            {errors[name] && (
              <p id={`pw-${name}-error`} className={ui.error}>
                {errors[name]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        {saved && (
          <span className={styles.saved} role="status">
            تم تحديث كلمة المرور.
          </span>
        )}
        <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
          تحديث كلمة المرور
        </button>
      </div>
    </form>
  );
}

/* ---------- Notification preferences (saves immediately when changed) ---------- */
function PrefsCard({ prefs }: { prefs: Pref[] }) {
  const [state, setState] = useState<Record<string, boolean>>(Object.fromEntries(prefs.map((p) => [p.key, p.on])));

  return (
    <section className={`${ui.card} ${ui.cardPad} ${styles.card}`} aria-labelledby="prefs-title">
      <h2 id="prefs-title" className={ui.cardTitle}>
        تفضيلات الإشعارات
      </h2>
      <ul className={styles.prefs}>
        {prefs.map((p) => (
          <li key={p.key} className={styles.pref}>
            <div>
              <p className={styles.prefTitle} id={`pref-${p.key}`}>
                {p.title}
              </p>
              <p className={styles.prefDesc}>{p.desc}</p>
            </div>
            {/* role="switch": screen readers read it as an on/off toggle */}
            <button
              type="button"
              role="switch"
              aria-checked={state[p.key]}
              aria-labelledby={`pref-${p.key}`}
              className={styles.switch}
              onClick={() => setState((s) => ({ ...s, [p.key]: !s[p.key] }))}
            >
              <span className={styles.knob} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

type Props = { account?: Account; prefs?: Pref[] };

export default function SettingsForms({ account = CLIENT_ACCOUNT, prefs = CLIENT_PREFS }: Props) {
  return (
    <div className={styles.stack}>
      <ProfileCard account={account} />
      <PasswordCard />
      <PrefsCard prefs={prefs} />
    </div>
  );
}
