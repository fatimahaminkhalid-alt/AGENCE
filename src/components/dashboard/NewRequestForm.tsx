"use client";

/**
 * Create request form.
 * - "نشر الطلب": requires the title, the service type, and the project details
 * - "حفظ كمسودة": requires the title only
 * Demo mode: shows a success message without saving anything, until it's connected to a database.
 */

import { useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { ChevronDown, FileText, Upload, X } from "lucide-react";
import { serviceTypes } from "@/lib/client-dashboard";
import ui from "./ui.module.css";
import styles from "./NewRequestForm.module.css";

type Values = {
  title: string;
  service: string;
  details: string;
  budget: string;
  duration: string;
  deadline: string;
};
type Errors = Partial<Record<keyof Values | "files", string>>;

const empty: Values = { title: "", service: "", details: "", budget: "", duration: "", deadline: "" };
const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPT = "application/pdf,image/*";

export default function NewRequestForm() {
  const [values, setValues] = useState<Values>(empty);
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState<"published" | "draft" | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dateFocused, setDateFocused] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = (name: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [name]: e.target.value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  function addFiles(list: FileList | null) {
    if (!list) return;
    const added = Array.from(list);
    const tooBig = added.find((f) => f.size > MAX_SIZE);
    const wrongType = added.find((f) => !(f.type === "application/pdf" || f.type.startsWith("image/")));
    if (tooBig || wrongType) {
      setErrors((er) => ({
        ...er,
        files: tooBig ? `الملف «${tooBig.name}» أكبر من 10 ميغابايت.` : "يمكن إرفاق ملفات PDF أو صور فقط.",
      }));
      return;
    }
    setErrors((er) => ({ ...er, files: undefined }));
    setFiles((prev) => [...prev, ...added]);
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function validate(mode: "publish" | "draft"): Errors {
    const e: Errors = {};
    if (values.title.trim().length < 3) e.title = "يرجى كتابة عنوان للطلب.";
    if (mode === "publish") {
      if (!values.service) e.service = "يرجى اختيار نوع الخدمة.";
      if (values.details.trim().length < 20) e.details = "يرجى وصف المشروع في 20 حرفًا على الأقل.";
    }
    return e;
  }

  function submit(mode: "publish" | "draft") {
    const found = validate(mode);
    setErrors((er) => ({ ...found, files: er.files }));
    const first = Object.keys(found)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setDone(null);
      return;
    }
    // Later: send the data (with the files) to the server here
    setDone(mode === "publish" ? "published" : "draft");
    setValues(empty);
    setFiles([]);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    submit("publish");
  }

  const fieldClass = (name: keyof Values) => `${ui.input} ${errors[name] ? ui.inputError : ""}`;
  const describedBy = (name: keyof Values) => (errors[name] ? `${name}-error` : undefined);
  const err = (name: keyof Errors) =>
    errors[name] ? (
      <p id={`${name}-error`} className={ui.error}>
        {errors[name]}
      </p>
    ) : null;

  return (
    <form ref={formRef} className={`${ui.card} ${styles.form}`} onSubmit={onSubmit} noValidate>
      {done && (
        <p className={`${ui.notice} ${ui.noticeSuccess}`} role="status">
          {done === "published"
            ? "تم نشر طلبك. سيصلك إشعار عند وصول أول عرض."
            : "تم حفظ الطلب كمسودة. يمكنك إكماله ونشره لاحقًا."}
        </p>
      )}

      <div className={ui.field}>
        <label htmlFor="title" className={ui.label}>
          عنوان الطلب
        </label>
        <input
          id="title"
          name="title"
          className={fieldClass("title")}
          placeholder="مثال: فيديو تعريفي لمنتج جديد"
          value={values.title}
          onChange={set("title")}
          aria-invalid={!!errors.title || undefined}
          aria-describedby={describedBy("title")}
        />
        {err("title")}
      </div>

      <div className={ui.field}>
        <label htmlFor="service" className={ui.label}>
          نوع الخدمة
        </label>
        <div className={styles.select}>
          <select
            id="service"
            name="service"
            className={`${fieldClass("service")} ${values.service ? "" : styles.placeholder}`}
            value={values.service}
            onChange={set("service")}
            aria-invalid={!!errors.service || undefined}
            aria-describedby={describedBy("service")}
          >
            <option value="" disabled>
              اختر الخدمة المطلوبة
            </option>
            {serviceTypes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <ChevronDown size={18} aria-hidden className={styles.chevron} />
        </div>
        {err("service")}
      </div>

      <div className={ui.field}>
        <label htmlFor="details" className={ui.label}>
          تفاصيل المشروع
        </label>
        <textarea
          id="details"
          name="details"
          rows={5}
          className={fieldClass("details")}
          placeholder="صف مشروعك وأهدافه والجمهور المستهدف"
          value={values.details}
          onChange={set("details")}
          aria-invalid={!!errors.details || undefined}
          aria-describedby={describedBy("details")}
        />
        {err("details")}
      </div>

      <div className={ui.fieldRow}>
        <div className={ui.field}>
          <label htmlFor="budget" className={ui.label}>
            الميزانية المتوقعة
          </label>
          <input
            id="budget"
            name="budget"
            inputMode="numeric"
            className={fieldClass("budget")}
            placeholder="مثال: 10,000 ر.س"
            value={values.budget}
            onChange={set("budget")}
          />
        </div>
        <div className={ui.field}>
          <label htmlFor="duration" className={ui.label}>
            مدة التنفيذ
          </label>
          <input
            id="duration"
            name="duration"
            className={fieldClass("duration")}
            placeholder="مثال: أسبوعان"
            value={values.duration}
            onChange={set("duration")}
          />
        </div>
      </div>

      <div className={ui.field}>
        <label htmlFor="deadline" className={ui.label}>
          آخر موعد لاستقبال العروض
        </label>
        {/* The browser's date field shows mm/dd/yyyy and doesn't accept placeholder text,
            so it starts as a text field showing "اختر التاريخ" and becomes a date picker on click */}
        <input
          id="deadline"
          name="deadline"
          type={values.deadline || dateFocused ? "date" : "text"}
          className={fieldClass("deadline")}
          placeholder="اختر التاريخ"
          value={values.deadline}
          onChange={set("deadline")}
          onFocus={(e) => {
            setDateFocused(true);
            // open the calendar directly in browsers that support it
            const el = e.currentTarget;
            requestAnimationFrame(() => {
              try {
                el.showPicker?.();
              } catch {
                /* some browsers refuse to open it automatically */
              }
            });
          }}
          onBlur={() => setDateFocused(false)}
        />
      </div>

      <div className={ui.field}>
        <span className={ui.label} id="files-label">
          المرفقات (اختياري)
        </span>
        <div
          className={`${styles.drop} ${dragging ? styles.dragging : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <Upload size={22} aria-hidden className={styles.dropIcon} />
          <button
            type="button"
            className={styles.dropButton}
            onClick={() => fileInput.current?.click()}
            aria-describedby="files-hint"
          >
            اسحب الملفات هنا أو اختر من جهازك
          </button>
          <p id="files-hint" className={styles.dropHint}>
            PDF أو صور، حتى 10 ميغابايت
          </p>
          <input
            ref={fileInput}
            type="file"
            name="files"
            multiple
            accept={ACCEPT}
            hidden
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = ""; // so the same file can be chosen again after removing it
            }}
          />
        </div>
        {err("files")}
        {files.length > 0 && (
          <ul className={styles.files} aria-label="الملفات المرفقة">
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`}>
                <FileText size={18} aria-hidden />
                <span className={styles.fileName}>{f.name}</span>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                  aria-label={`إزالة ${f.name}`}
                >
                  <X size={16} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.actions}>
        <button type="submit" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnLg}`}>
          نشر الطلب
        </button>
        <button type="button" className={`${ui.btn} ${ui.btnOutline} ${ui.btnLg}`} onClick={() => submit("draft")}>
          حفظ كمسودة
        </button>
      </div>
    </form>
  );
}
