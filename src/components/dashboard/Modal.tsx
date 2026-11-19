"use client";

/**
 * Modal window built on the browser's <dialog> element:
 * it traps keyboard focus inside, closes with Esc, and returns focus to the button that opened it.
 * Closing by clicking the dark background is also supported.
 */

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import ui from "./ui.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

export default function Modal({ open, onClose, title, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className={ui.dialog}
      aria-labelledby="modal-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose(); // a click on the background, outside the content
      }}
    >
      {open && (
        <div className={ui.dialogBody}>
          <div className={ui.dialogHead}>
            <h2 id="modal-title" className={ui.cardTitle}>
              {title}
            </h2>
            <button type="button" className={ui.dialogClose} onClick={onClose} aria-label="إغلاق">
              <X size={20} aria-hidden />
            </button>
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}
