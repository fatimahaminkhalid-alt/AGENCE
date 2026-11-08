import Image from "next/image";
import Link from "next/link";

/** The logo: an image that includes the name "أيجنس" and the tagline. size="lg" for the footer. */
export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  const width = size === "lg" ? 84 : 46;
  return (
    <Link href="#home" className={`brand brand--${size}`} aria-label="الصفحة الرئيسية">
      <Image src="/AGENCE/images/logo.webp" alt="أيجنس" width={width} height={Math.round(width * 1.5)} />
    </Link>
  );
}
