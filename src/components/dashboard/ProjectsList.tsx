"use client";

/**
 * "مشروعاتي" page: the "الحالية" and "المكتملة" tabs + the project cards.
 * "تسليم العمل" opens a window to attach the files and a note, and after sending,
 * the project status becomes "بانتظار مراجعة العميل". (Demo: it comes back on reload, until there's a database.)
 */

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { projectStatusLabels, type Project, type ProjectStatus } from "@/lib/provider-dashboard";
import Modal from "./Modal";
import ui from "./ui.module.css";
import styles from "./ProjectsList.module.css";

const pillTone: Record<ProjectStatus, string> = {
  inProgress: ui.pillBlue,
  awaitingReview: ui.pillOrange,
  completed: ui.pillGreen,
};
const barTone: Record<ProjectStatus, string> = {
  inProgress: "",
  awaitingReview: ui.progressOrange,
  completed: ui.progressGreen,
};
const percentTone: Record<ProjectStatus, string> = {
  inProgress: styles.percentBlue,
  awaitingReview: styles.percentOrange,
  completed: styles.percentGreen,
};

export default function ProjectsList({ projects }: { projects: Project[] }) {
  const [list, setList] = useState(projects);
  const [tab, setTab] = useState<"current" | "completed">("current");
  const [delivering, setDelivering] = useState<Project | null>(null);
  const [note, setNote] = useState("");
  const [delivered, setDelivered] = useState<string | null>(null);

  const current = list.filter((p) => p.status !== "completed");
  const completed = list.filter((p) => p.status === "completed");
  const shown = tab === "current" ? current : completed;

  function deliver(e: FormEvent) {
    e.preventDefault();
    if (!delivering) return;
    setList((l) => l.map((p) => (p.id === delivering.id ? { ...p, status: "awaitingReview" } : p)));
    setDelivered(delivering.id);
    setDelivering(null);
    setNote("");
  }

  const tabs = [
    { key: "current" as const, label: `الحالية (${current.length})` },
    { key: "completed" as const, label: `المكتملة (${completed.length})` },
  ];

  return (
    <div className={styles.wrap}>
      <div className={ui.chips} role="tablist" aria-label="حالة المشروعات">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={tab === t.key}
            aria-controls="projects-panel"
            className={ui.chip}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="projects-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className={styles.list}>
        {shown.map((p) => (
          <article key={p.id} className={`${ui.card} ${styles.card}`}>
            <div className={styles.head}>
              <div className={styles.headText}>
                <h2 className={styles.title}>{p.title}</h2>
                <p className={styles.client}>العميل: {p.client}</p>
              </div>
              <span className={`${ui.pill} ${pillTone[p.status]}`}>{projectStatusLabels[p.status]}</span>
            </div>

            <div className={styles.progressBox}>
              <div className={styles.progressHead}>
                <span id={`progress-${p.id}`}>نسبة الإنجاز</span>
                <span className={percentTone[p.status]}>{p.progress}%</span>
              </div>
              <div
                className={ui.progress}
                role="progressbar"
                aria-labelledby={`progress-${p.id}`}
                aria-valuenow={p.progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className={`${ui.progressFill} ${barTone[p.status]}`} style={{ width: `${p.progress}%` }} />
              </div>
            </div>

            <div className={styles.foot}>
              <dl className={styles.tiles}>
                <div className={ui.tile}>
                  <dt className={ui.tileLabel}>{p.status === "completed" ? "تاريخ التسليم" : "موعد التسليم"}</dt>
                  <dd className={ui.tileValue}>{p.dueDate}</dd>
                </div>
                <div className={ui.tile}>
                  <dt className={ui.tileLabel}>قيمة المشروع</dt>
                  <dd className={ui.tileValue}>{p.value}</dd>
                </div>
              </dl>
              <div className={styles.actions}>
                {delivered === p.id && (
                  <span className={styles.sent} role="status">
                    تم إرسال العمل إلى العميل للمراجعة.
                  </span>
                )}
                <Link href="/dashboard/provider/messages" className={`${ui.btn} ${ui.btnPrimary}`}>
                  مراسلة العميل
                </Link>
                {p.status !== "completed" && (
                  <button type="button" className={`${ui.btn} ${ui.btnOutline}`} onClick={() => setDelivering(p)}>
                    تسليم العمل
                  </button>
                )}
              </div>
            </div>
          </article>
        ))}
        {shown.length === 0 && <div className={`${ui.card} ${ui.emptyNote}`}>لا توجد مشروعات هنا بعد.</div>}
      </div>

      <Modal open={!!delivering} onClose={() => setDelivering(null)} title="تسليم العمل">
        <form className={styles.deliverForm} onSubmit={deliver}>
          <p className={styles.deliverIntro}>
            ارفع ملفات «{delivering?.title}» وأضف ملاحظة للعميل، وسيصله إشعار لمراجعة العمل.
          </p>
          <div className={ui.field}>
            <label htmlFor="deliver-files" className={ui.label}>
              ملفات العمل
            </label>
            <input id="deliver-files" type="file" multiple className={`${ui.input} ${styles.fileInput}`} />
          </div>
          <div className={ui.field}>
            <label htmlFor="deliver-note" className={ui.label}>
              ملاحظة للعميل (اختياري)
            </label>
            <textarea
              id="deliver-note"
              className={ui.input}
              placeholder="مثال: أرفقت النسخة النهائية مع نسخة بمقاس منصات التواصل."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className={ui.dialogActions}>
            <button type="button" className={`${ui.btn} ${ui.btnOutline}`} onClick={() => setDelivering(null)}>
              إلغاء
            </button>
            <button type="submit" className={`${ui.btn} ${ui.btnPrimary}`}>
              إرسال للعميل
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
