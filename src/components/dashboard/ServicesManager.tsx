"use client";

/**
 * "خدماتي" page: the service cards + the add/edit window.
 * "أضف خدمة" opens an empty form, and "تعديل" opens the same form filled with the service data.
 * Demo: changes disappear on reload, until it's connected to a database.
 */

import { useState, type FormEvent } from "react";
import { Briefcase, Camera, CirclePlay, PenLine, Video } from "lucide-react";
import type { Service, ServiceIcon } from "@/lib/provider-dashboard";
import { serviceTypes } from "@/lib/client-dashboard";
import PageHeader from "./PageHeader";
import Modal from "./Modal";
import ui from "./ui.module.css";
import styles from "./ServicesManager.module.css";

const icons: Record<ServiceIcon, typeof Camera> = {
  camera: Camera,
  video: Video,
  pen: PenLine,
  motion: CirclePlay,
  other: Briefcase,
};

/** The card icon from the service type */
function iconFor(title: string): ServiceIcon {
  if (title.includes("التصوير")) return "camera";
  if (title.includes("الفيديو")) return "video";
  if (title.includes("الموشن")) return "motion";
  if (title.includes("كتابة") || title.includes("المحتوى")) return "pen";
  return "other";
}

const blank = { title: "", description: "", startingPrice: "", duration: "", active: true };
type Draft = typeof blank;
type Errors = Partial<Record<keyof Draft, string>>;

export default function ServicesManager({ services }: { services: Service[] }) {
  const [list, setList] = useState(services);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Draft>(blank);
  const [errors, setErrors] = useState<Errors>({});

  // The service types not yet added, plus the type being edited, and "كتابة المحتوى" which is in the design
  const types = Array.from(new Set([...serviceTypes, "كتابة المحتوى", ...list.map((s) => s.title)]));

  function openNew() {
    setDraft(blank);
    setErrors({});
    setEditing("new");
  }
  function openEdit(s: Service) {
    const { title, description, startingPrice, duration, active } = s;
    setDraft({ title, description, startingPrice, duration, active });
    setErrors({});
    setEditing(s.id);
  }

  function save(e: FormEvent) {
    e.preventDefault();
    const er: Errors = {};
    if (!draft.title) er.title = "يرجى اختيار نوع الخدمة.";
    else if (list.some((s) => s.title === draft.title && s.id !== editing)) er.title = "هذه الخدمة مضافة بالفعل.";
    if (draft.description.trim().length < 10) er.description = "يرجى كتابة وصف قصير للخدمة.";
    if (!/^[\d,٠-٩٬]+$/.test(draft.startingPrice.trim())) er.startingPrice = "يرجى إدخال السعر بالأرقام، مثل 3,000.";
    if (!draft.duration.trim()) er.duration = "يرجى إدخال مدة التنفيذ.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const data = { ...draft, startingPrice: draft.startingPrice.trim(), icon: iconFor(draft.title) };
    setList((l) =>
      editing === "new" ? [...l, { id: `s${Date.now()}`, ...data }] : l.map((s) => (s.id === editing ? { ...s, ...data } : s)),
    );
    setEditing(null);
  }

  function remove() {
    setList((l) => l.filter((s) => s.id !== editing));
    setEditing(null);
  }

  const err = (name: keyof Draft) =>
    errors[name] && (
      <p id={`svc-${name}-error`} className={ui.error}>
        {errors[name]}
      </p>
    );
  const aria = (name: keyof Draft) => ({
    "aria-invalid": !!errors[name] || undefined,
    "aria-describedby": errors[name] ? `svc-${name}-error` : undefined,
  });

  return (
    <>
      <PageHeader
        title="خدماتي"
        subtitle="الخدمات التي تقدمها وتظهر في ملفك للمستفيدين."
        action={
          <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={openNew}>
            أضف خدمة
          </button>
        }
      />

      <ul className={styles.grid}>
        {list.map((s) => {
          const Icon = icons[s.icon];
          return (
            <li key={s.id} className={`${ui.card} ${styles.card}`}>
              <div className={styles.top}>
                <span className={styles.icon} aria-hidden>
                  <Icon size={22} />
                </span>
                <span className={`${ui.pill} ${s.active ? ui.pillGreen : ui.pillGrey}`}>{s.active ? "مفعّلة" : "متوقفة"}</span>
              </div>
              <h2 className={styles.title}>{s.title}</h2>
              <p className={styles.desc}>{s.description}</p>
              <div className={styles.foot}>
                <dl className={styles.tiles}>
                  <div className={ui.tile}>
                    <dt className={ui.tileLabel}>تبدأ من</dt>
                    <dd className={ui.tileValue}>{s.startingPrice} ر.س</dd>
                  </div>
                  <div className={ui.tile}>
                    <dt className={ui.tileLabel}>مدة التنفيذ</dt>
                    <dd className={ui.tileValue}>{s.duration}</dd>
                  </div>
                </dl>
                <button type="button" className={ui.linkBtn} onClick={() => openEdit(s)} aria-label={`تعديل ${s.title}`}>
                  تعديل
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {list.length === 0 && <div className={`${ui.card} ${ui.emptyNote}`}>لم تضف أي خدمة بعد. اضغط «أضف خدمة» للبدء.</div>}

      <Modal open={editing !== null} onClose={() => setEditing(null)} title={editing === "new" ? "أضف خدمة" : "تعديل الخدمة"}>
        <form className={styles.form} onSubmit={save} noValidate>
          <div className={ui.field}>
            <label htmlFor="svc-title" className={ui.label}>
              نوع الخدمة
            </label>
            <select
              id="svc-title"
              className={`${ui.input} ${errors.title ? ui.inputError : ""}`}
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              {...aria("title")}
            >
              <option value="" disabled>
                اختر نوع الخدمة
              </option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {err("title")}
          </div>

          <div className={ui.field}>
            <label htmlFor="svc-description" className={ui.label}>
              وصف الخدمة
            </label>
            <textarea
              id="svc-description"
              className={`${ui.input} ${styles.textarea} ${errors.description ? ui.inputError : ""}`}
              placeholder="ماذا تشمل الخدمة؟"
              value={draft.description}
              onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              {...aria("description")}
            />
            {err("description")}
          </div>

          <div className={ui.fieldRow}>
            <div className={ui.field}>
              <label htmlFor="svc-startingPrice" className={ui.label}>
                تبدأ من (ر.س)
              </label>
              <input
                id="svc-startingPrice"
                inputMode="numeric"
                className={`${ui.input} ${errors.startingPrice ? ui.inputError : ""}`}
                placeholder="مثال: 3,000"
                value={draft.startingPrice}
                onChange={(e) => setDraft({ ...draft, startingPrice: e.target.value })}
                {...aria("startingPrice")}
              />
              {err("startingPrice")}
            </div>
            <div className={ui.field}>
              <label htmlFor="svc-duration" className={ui.label}>
                مدة التنفيذ
              </label>
              <input
                id="svc-duration"
                className={`${ui.input} ${errors.duration ? ui.inputError : ""}`}
                placeholder="مثال: من 5 أيام"
                value={draft.duration}
                onChange={(e) => setDraft({ ...draft, duration: e.target.value })}
                {...aria("duration")}
              />
              {err("duration")}
            </div>
          </div>

          <label className={styles.check}>
            <input type="checkbox" checked={draft.active} onChange={(e) => setDraft({ ...draft, active: e.target.checked })} />
            الخدمة مفعّلة وتظهر للمستفيدين
          </label>

          <div className={`${ui.dialogActions} ${styles.actions}`}>
            {editing !== "new" && (
              <button type="button" className={styles.delete} onClick={remove}>
                حذف الخدمة
              </button>
            )}
            <button type="button" className={`${ui.btn} ${ui.btnOutline}`} onClick={() => setEditing(null)}>
              إلغاء
            </button>
            <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
              حفظ
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
