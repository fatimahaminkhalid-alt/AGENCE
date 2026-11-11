import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Rubik, Montserrat } from "next/font/google";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageSwitcher } from "@/components/dev/PageSwitcher";
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

/**
 * A small script that runs before the page appears: it adds the js-motion class to hide the hero elements
 * until GSAP shows them (no "flash"). It doesn't run for people who turn off motion,
 * and if the animation doesn't start within 3 seconds it removes the class so the content always shows.
 */
const motionScript = `(function(){var d=document.documentElement;
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)return;
d.classList.add('js-motion');
setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('js-motion')},3000);})();`;

/**
 * Temporary pages menu: shows automatically during development (npm run dev),
 * and on a deployed site only if you add NEXT_PUBLIC_SHOW_PAGE_MENU=true to the settings.
 */
const showPageSwitcher =
  process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_SHOW_PAGE_MENU === "true";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: because the script above changes the html classes before React loads
    <html lang="ar" dir="rtl" className={`${rubik.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
        {showPageSwitcher && <PageSwitcher />}
      </body>
    </html>
  );
}
