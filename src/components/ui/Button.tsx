import Link from "next/link";
import type { ReactNode } from "react";

/**
 * One button for the whole site. Every style from the design is a "variant":
 *   <Button href="/register" variant="primary" shape="pill">سجّل</Button>
 * The styles are in globals.css under "Buttons".
 */

type Variant = "primary" | "accent" | "light" | "outline-light";
type Size = "sm" | "md" | "lg";
type Shape = "rounded" | "pill";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  shape?: Shape;
  className?: string;
};

export function Button({ href, children, variant = "primary", size = "md", shape = "rounded", className }: Props) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size !== "md" && `btn--${size}`,
    shape === "pill" && "btn--pill",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
