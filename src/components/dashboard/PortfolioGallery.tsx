"use client";

/**
 * "معرض الأعمال" page: type filters + a 3-column grid + the "أضف عملًا" window.
 * Until real images are added, each card shows a gradient cover from the design with the work type icon.
 * When you add a work with an image, the image is shown as its cover (demo: it disappears on reload, until there's a database).
 */

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Camera, CirclePlay, Video } from "lucide-react";
import { workCategories, type Work, type WorkCategory } from "@/lib/provider-dashboard";
import PageHeader from "./PageHeader";
import Modal from "./Modal";
import ui from "./ui.module.css";
import styles from "./PortfolioGallery.module.css";

const icons: Record<WorkCategory, typeof Camera> = {
  "إنتاج الفيديو": Video,
  "التصوير الفوتوغرافي": Camera,
  "الموشن جرافيك": CirclePlay,
};

type GalleryWork = Work & { image?: string };
const blank = { title: "", category: "" as WorkCategory | "", year: String(new Date().getFullYear()) };
type Errors = Partial<Record<"title" | "category" | "year", string>>;

export default function PortfolioGallery({ works }: { works: Work[] }) {
  const [list, setList] = useState<GalleryWork[]>(works);
  const [filter, setFilter] = useState<WorkCategory | "all">("all");
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState(blank);
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  // Free the memory of the image previews when leaving the page
  const previews = useRef<string[]>([]);
  useEffect(() => () => previews.current.forEach((url) => URL.revokeObjectURL(url)), []);

  const shown = filter === "all" ? list : list.filter((w) => w.category === filter);

  function openAdd() {
    setDraft(blank);
    setFile(null);
    setErrors({});
    setAdding(true);
  }

  function save(e: FormEvent) {
    e.preventDefault();
    const er: Errors = {};
    if (draft.title.trim().length < 3) er.title = "يرجى إدخال عنوان العمل.";
    if (!draft.category) er.category = "يرجى اختيار نوع العمل.";
    if (!/^(19|20)\d{2}$/.test(draft.year)) er.year = "يرجى إدخال سنة صحيحة، مثل 2026.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const image = file && file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined;
    if (image) previews.current.push(image);
    setList((l) => [
      {
        id: `w${Date.now()}`,
        title: draft.title.trim(),
        category: draft.category as WorkCategory,
        year: draft.year,
        cover: "linear-gradient(135deg, #3b1cf0 0%, #b9adf7 50%, #fbf8f8 100%)",
        image,
      },
      ...l,
    ]);
    setFilter("all");
    setAdding(false);
  }

  const aria = (name: keyof Errors) => ({
    "aria-invalid": !!errors[name] || undefined,
    "aria-describedby": errors[name] ? `work-${name}-error` : undefined,
  });
  const err = (name: keyof Errors) =>
    errors[name] && (
      <p id={`work-${name}-error`} className={ui.error}>
        {errors[name]}
      </p>
    );

  return (
    <>
      <PageHeader
        title="معرض الأعمال"
        subtitle="نماذج من أعمالك السابقة تساعد المستفيدين على اختيارك."
        action={
          <button type="button" className={`${ui.btn} ${ui.btnPrimary}`} onClick={openAdd}>
            أضف عملًا
          </button>
        }
      />

      <div className={ui.chips} role="group" aria-label="تصفية حسب نوع العمل">
        <button type="button" className={ui.chip} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          الكل
        </button>
        {workCategories.map((c) => (
          <button key={c} type="button" className={ui.chip} aria-pressed={filter === c} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <ul className={styles.grid}>
        {shown.map((w) => {
          const Icon = icons[w.category];
          return (
            <li key={w.id} className={`${ui.card} ${styles.card}`}>
              <div
                className={styles.cover}
                style={w.image ? { backgroundImage: `url(${w.image})` } : { backgroundImage: w.cover }}
              >
                {!w.image && (
                  <span className={styles.play} aria-hidden>
                    <Icon size={22} />
                  </span>
                )}
              </div>
              <div className={styles.body}>
                <h2 className={styles.title}>{w.title}</h2>
                <p className={styles.meta}>
                  {w.category} · {w.year}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
      {shown.length === 0 && <div className={`${ui.card} ${ui.emptyNote}`}>لا توجد أعمال من هذا النوع بعد.</div>}

      <Modal open={adding} onClose={() => setAdding(false)} title="أضف عملًا">
        <form className={styles.form} onSubmit={save} noValidate>
          <div className={ui.field}>
            <label htmlFor="work-title" className={ui.label}>
              عنوان العمل
            </label>
            <input
              id="work-title"
              className={`${ui.input} ${errors.title ? ui.inputError : ""}`}
              placeholder="مثال: فيديو إطلاق تطبيق توصيل"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              {...aria("title")}
            />
            {err("title")}
          </div>
          <div className={ui.fieldRow}>
            <div className={ui.field}>
              <label htmlFor="work-category" className={ui.label}>
                نوع العمل
              </label>
              <select
                id="work-category"
                className={`${ui.input} ${errors.category ? ui.inputError : ""}`}
                value={draft.category}
                onChange={(e) => setDraft({ ...draft, category: e.target.value as WorkCategory })}
                {...aria("category")}
              >
                <option value="" disabled>
                  اختر النوع
                </option>
                {workCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {err("category")}
            </div>
            <div className={ui.field}>
              <label htmlFor="work-year" className={ui.label}>
                سنة التنفيذ
              </label>
              <input
                id="work-year"
                inputMode="numeric"
                maxLength={4}
                className={`${ui.input} ${errors.year ? ui.inputError : ""}`}
                value={draft.year}
                onChange={(e) => setDraft({ ...draft, year: e.target.value })}
                {...aria("year")}
              />
              {err("year")}
            </div>
          </div>
          <div className={ui.field}>
            <label htmlFor="work-file" className={ui.label}>
              صورة الغلاف أو الفيديو (اختياري)
            </label>
            <input
              id="work-file"
              type="file"
              accept="image/*,video/*"
              className={`${ui.input} ${styles.fileInput}`}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className={ui.dialogActions}>
            <button type="button" className={`${ui.btn} ${ui.btnOutline}`} onClick={() => setAdding(false)}>
              إلغاء
            </button>
            <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
              إضافة إلى المعرض
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
