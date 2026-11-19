"use client";

/**
 * "قدّم عرضك" form on the opportunity details page.
 * - Value: numbers only (Arabic or English digits, with or without commas)
 * - Duration and description are required (description: 20 characters at least)
 * - Attachments are optional: you can choose files or drag them onto the box
 * Demo: after sending, a confirmation shows without saving anything, until it's connected to a database.
 */

import { useRef, useState, type DragEvent, type FormEvent } from "react";
import Link from "next/link";
import { CircleCheck, Upload, X } from "lucide-react";
import ui from "./ui.module.css";
import styles from "./OfferForm.module.css";

type Errors = Partial<Record<"price" | "duration" | "description", string>>;

/** "٧٬٥٠٠" or "7,500" → 7500 */
function toNumber(value: string) {
  const western = value.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d))).replace(/[,٬\s]/g, "");
  return /^\d+(\.\d+)?$/.test(western) ? Number(western) : NaN;
}

export default function OfferForm({ opportunityTitle }: { opportunityTitle: string }) {
  const [v, setV] = useState({ price: "", duration: "", description: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [dragging, setDragging] = useState(false);
  const [sent, setSent] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function addFiles(list: FileList | null) {
    if (!list) return;
    // Copy the files now: the input is cleared right after this, which empties its list
    const added = Array.from(list);
    setFiles((f) => [...f, ...added].slice(0, 5)); // 5 files maximum
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const er: Errors = {};
    const price = toNumber(v.price);
    if (!v.price.trim()) er.price = "يرجى إدخال قيمة العرض.";
    else if (!(price > 0)) er.price = "يرجى إدخال رقم صحيح، مثل 7,500.";
    if (!v.duration.trim()) er.duration = "يرجى إدخال مدة التنفيذ.";
    if (v.description.trim().length < 20) er.description = "يرجى وصف العرض في 20 حرفًا على الأقل.";
    setErrors(er);
    if (Object.keys(er).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <section className={`${ui.card} ${styles.card} ${styles.done}`} aria-live="polite">
        <span className={styles.doneIcon} aria-hidden>
          <CircleCheck size={28} />
        </span>
        <h2 className={styles.title}>تم إرسال عرضك</h2>
        <p className={styles.intro}>
          وصل عرضك على «{opportunityTitle}» إلى المستفيد، وسيصلك إشعار عند مراجعته.
        </p>
        <Link href="/dashboard/provider/proposals" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnBlock}`}>
          متابعة عروضي
        </Link>
        <button type="button" className={ui.linkBtn} onClick={() => setSent(false)}>
          تعديل العرض
        </button>
      </section>
    );
  }

  const describedBy = (name: keyof Errors) => (errors[name] ? `offer-${name}-error` : undefined);

  return (
    <form className={`${ui.card} ${styles.card}`} onSubmit={submit} noValidate aria-labelledby="offer-title">
      <h2 id="offer-title" className={styles.title}>
        قدّم عرضك
      </h2>
      <p className={styles.intro}>يصل عرضك إلى المستفيد مباشرة، ويمكنك تعديله قبل آخر موعد للتقديم.</p>

      <div className={ui.field}>
        <label htmlFor="offer-price" className={ui.label}>
          قيمة العرض (ر.س)
        </label>
        <input
          id="offer-price"
          inputMode="decimal"
          className={`${ui.input} ${errors.price ? ui.inputError : ""}`}
          placeholder="مثال: 7,500"
          value={v.price}
          onChange={(e) => setV({ ...v, price: e.target.value })}
          aria-invalid={!!errors.price || undefined}
          aria-describedby={describedBy("price")}
        />
        {errors.price && (
          <p id="offer-price-error" className={ui.error}>
            {errors.price}
          </p>
        )}
      </div>

      <div className={ui.field}>
        <label htmlFor="offer-duration" className={ui.label}>
          مدة التنفيذ
        </label>
        <input
          id="offer-duration"
          className={`${ui.input} ${errors.duration ? ui.inputError : ""}`}
          placeholder="مثال: 8 أيام"
          value={v.duration}
          onChange={(e) => setV({ ...v, duration: e.target.value })}
          aria-invalid={!!errors.duration || undefined}
          aria-describedby={describedBy("duration")}
        />
        {errors.duration && (
          <p id="offer-duration-error" className={ui.error}>
            {errors.duration}
          </p>
        )}
      </div>

      <div className={ui.field}>
        <label htmlFor="offer-description" className={ui.label}>
          وصف العرض
        </label>
        <textarea
          id="offer-description"
          className={`${ui.input} ${errors.description ? ui.inputError : ""}`}
          placeholder="اشرح طريقة التنفيذ وما يشمله عرضك"
          value={v.description}
          onChange={(e) => setV({ ...v, description: e.target.value })}
          aria-invalid={!!errors.description || undefined}
          aria-describedby={describedBy("description")}
        />
        {errors.description && (
          <p id="offer-description-error" className={ui.error}>
            {errors.description}
          </p>
        )}
      </div>

      {/* Attachments: a button that opens file selection, and you can also drag files onto it */}
      <div>
        <button
          type="button"
          className={`${styles.drop} ${dragging ? styles.dragging : ""}`}
          onClick={() => fileInput.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
        >
          <Upload size={22} aria-hidden />
          أرفق نماذج أعمال مشابهة (اختياري)
        </button>
        <input
          ref={fileInput}
          type="file"
          multiple
          accept="image/*,video/*,.pdf"
          hidden
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
        {files.length > 0 && (
          <ul className={styles.files}>
            {files.map((f, i) => (
              <li key={`${f.name}-${i}`}>
                <span className={styles.fileName}>{f.name}</span>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => setFiles((l) => l.filter((_, j) => j !== i))}
                  aria-label={`حذف ${f.name}`}
                >
                  <X size={16} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button type="submit" className={`${ui.btn} ${ui.btnPrimary} ${ui.btnLg} ${ui.btnBlock}`}>
        تقديم العرض
      </button>
    </form>
  );
}
