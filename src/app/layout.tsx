import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Rubik, Montserrat } from "next/font/google";
import "./globals.css";

/**
 * The frame that wraps every page on the site.
 * Here we set the language and direction, the fonts, and the default metadata.
 */

// next/font downloads the font at build time and serves it from your site, so there's no wait on Google
const rubik = Rubik({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://agence.sa"), // change it to your real domain
  title: {
    default: "AGENCE | كل ما يحتاجه مشروعك الإعلامي في مكان واحد",
    template: "%s | AGENCE",
  },
  description:
    "AGENCE منصة سعودية تربط المستفيدين من الخدمات الإعلامية بالوكالات والمستقلين المتخصصين. أنشئ طلبك، استقبل العروض، وقارن بينها لاختيار مقدم الخدمة المناسب لمشروعك.",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: "AGENCE",
    images: [{ url: "/images/hero.webp", width: 1280, height: 720 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#2505ED",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${rubik.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
