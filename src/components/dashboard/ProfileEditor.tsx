"use client";

/**
 * "الملف المهني" page: the profile card with the completion percentage, the basic information, and the specialties.
 * - The completion percentage updates while you type (5 items: name, city, website, bio, specialties)
 * - Specialties: remove with ×, and add with "أضف تخصصًا"
 * Demo: "حفظ التغييرات" shows a confirmation without saving anything, until it's connected to a database.
 */

import { useState, type FormEvent } from "react";
import { Plus, X } from "lucide-react";
import type { provider as ProviderData } from "@/lib/provider-dashboard";
import { serviceTypes } from "@/lib/client-dashboard";
import PageHeader from "./PageHeader";
import ui from "./ui.module.css";
import styles from "./ProfileEditor.module.css";

type Errors = Partial<Record<"name" | "city" | "website" | "bio", string>>;

export default function ProfileEditor({ profile }: { profile: typeof ProviderData }) {
  const [v, setV] = useState({
    name: profile.name,
    kind: profile.kind,
    city: profile.city,
    website: profile.website,
    bio: profile.bio,
  });
  const [specialties, setSpecialties] = useState(profile.specialties);
  const [picking, setPicking] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);
  const [previewNote, setPreviewNote] = useState(false);

  // Completion percentage
  const checks = [v.name.trim(), v.city.trim(), v.website.trim(), v.bio.trim(), specialties.length > 0];
  const percent = Math.round((checks.filter(Boolean).length / checks.length) * 100);

  const available = serviceTypes.filter((t) => !specialties.includes(t));

  function submit(e: FormEvent) {
    e.preventDefault();
    const er: Errors = {};
    if (v.name.trim().length < 2) er.name = "يرجى إدخال الاسم الظاهر.";
    if (!v.city.trim()) er.city = "يرجى إدخال المدينة.";
    if (v.website && !/^(https?:\/\/)?[\w-]+(\.[\w-]+)+(\/\S*)?$/i.test(v.website.trim())) er.website = "يرجى إدخال رابط صحيح، مثل example.com";
    setErrors(er);
    if (Object.keys(er).length === 0) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3500);
    }
  }

  const field = (name: keyof Errors, label: string, placeholder: string, extra: object = {}) => (
    <div className={ui.field}>
      <label htmlFor={`pf-${name}`} className={ui.label}>
        {label}
      </label>
      <input
        id={`pf-${name}`}
        className={`${ui.input} ${errors[name] ? ui.inputError : ""}`}
        placeholder={placeholder}
        value={v[name]}
        onChange={(e) => setV({ ...v, [name]: e.target.value })}
        aria-invalid={!!errors[name] || undefined}
        aria-describedby={errors[name] ? `pf-${name}-error` : undefined}
        {...extra}
      />
      {errors[name] && (
        <p id={`pf-${name}-error`} className={ui.error}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <>
      <PageHeader
        title="الملف المهني"
        subtitle="هذا ما يراه المستفيدون عنك، احرص على أن يكون مكتملًا."
        action={
          <button type="button" className={`${ui.btn} ${ui.btnOutline}`} onClick={() => setPreviewNote(true)}>
            معاينة الملف العام
          </button>
        }
      />
      {previewNote && (
        <p className={`${ui.notice} ${styles.previewNote}`} role="status">
          صفحة الملف العام كما يراها المستفيدون ستُضاف لاحقًا.
        </p>
      )}

      <form className={styles.stack} onSubmit={submit} noValidate>
        {/* Profile card + completion */}
        <section className={`${ui.card} ${styles.card}`} aria-label="ملخص الملف">
          <div className={styles.identity}>
            <span className={`${ui.avatar} ${ui.avatarLg}`} aria-hidden>
              {v.name.trim().charAt(0) || profile.initial}
            </span>
            <div>
              <p className={styles.name}>{v.name || profile.name}</p>
              <p className={styles.headline}>
                {v.kind} · {profile.headline} · {v.city || "—"}
              </p>
            </div>
          </div>

          <div className={styles.completion}>
            <div className={styles.completionHead}>
              <span id="completion-label">اكتمال الملف المهني</span>
              <span className={styles.percent}>{percent}%</span>
            </div>
            <div
              className={ui.progress}
              role="progressbar"
              aria-labelledby="completion-label"
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div className={`${ui.progressFill} ${ui.progressOrange}`} style={{ width: `${percent}%` }} />
            </div>
            <p className={styles.completionHint}>
              {percent < 100 ? "أضف خدماتك ونماذج أعمالك لتظهر بشكل أفضل للمستفيدين." : "ملفك مكتمل، أحسنت!"}
            </p>
          </div>
        </section>

        {/* Basic information */}
        <section className={`${ui.card} ${styles.card}`} aria-labelledby="basic-title">
          <h2 id="basic-title" className={styles.cardTitle}>
            المعلومات الأساسية
          </h2>
          <div className={ui.fieldRow}>
            {field("name", "الاسم الظاهر", "خالد العتيبي", { autoComplete: "name" })}
            <div className={ui.field}>
              <label htmlFor="pf-kind" className={ui.label}>
                نوع الحساب
              </label>
              <select id="pf-kind" className={ui.input} value={v.kind} onChange={(e) => setV({ ...v, kind: e.target.value })}>
                <option value="مستقل">مستقل</option>
                <option value="وكالة">وكالة</option>
              </select>
            </div>
            {field("city", "المدينة", "الرياض", { autoComplete: "address-level2" })}
            {field("website", "الموقع الإلكتروني (اختياري)", "example.com", { dir: "ltr", inputMode: "url", autoComplete: "url" })}
          </div>
          <div className={ui.field}>
            <label htmlFor="pf-bio" className={ui.label}>
              النبذة التعريفية
            </label>
            <textarea
              id="pf-bio"
              className={ui.input}
              placeholder="عرّف بنفسك وبخبراتك في المجال الإعلامي"
              value={v.bio}
              onChange={(e) => setV({ ...v, bio: e.target.value })}
            />
          </div>
        </section>

        {/* Specialties */}
        <section className={`${ui.card} ${styles.card}`} aria-labelledby="spec-title">
          <h2 id="spec-title" className={styles.cardTitle}>
            التخصصات
          </h2>
          <ul className={styles.tags}>
            {specialties.map((s) => (
              <li key={s} className={styles.tag}>
                {s}
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={() => setSpecialties((l) => l.filter((x) => x !== s))}
                  aria-label={`حذف ${s}`}
                >
                  <X size={14} aria-hidden />
                </button>
              </li>
            ))}
            <li>
              {picking ? (
                <select
                  className={styles.picker}
                  autoFocus
                  defaultValue=""
                  aria-label="اختر تخصصًا"
                  onChange={(e) => {
                    if (e.target.value) setSpecialties((l) => [...l, e.target.value]);
                    setPicking(false);
                  }}
                  onBlur={() => setPicking(false)}
                >
                  <option value="" disabled>
                    اختر تخصصًا
                  </option>
                  {available.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              ) : (
                <button type="button" className={styles.addTag} onClick={() => setPicking(true)} disabled={available.length === 0}>
                  <Plus size={16} aria-hidden />
                  أضف تخصصًا
                </button>
              )}
            </li>
          </ul>
        </section>

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
    </>
  );
}
