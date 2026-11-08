import type { ReactNode } from "react";

/** The small label above headings, e.g. "مجالات الخدمات". With star={true} it gets an orange star. */
export function Eyebrow({ children, star = false }: { children: ReactNode; star?: boolean }) {
  return <p className={star ? "eyebrow eyebrow--star" : "eyebrow"}>{children}</p>;
}
