"use client";

/**
 * All of the home page's animations in one place.
 *
 * How it works: the sections (server components) only put simple markers on their elements, like
 *   data-reveal   → appears from below as the visitor scrolls to it
 *   data-stagger  → its children appear one after another
 *   data-split    → the heading's words rise one after another (made by the SplitWords component)
 *   data-magnetic → the button follows the mouse slightly (from ReactBits' "Magnet" effect)
 * and this component finds those markers and gives them their motion.
 * The benefit: the sections stay fast server components, and all the motion is here, easy to edit or turn off.
 *
 * Everything inside gsap.matchMedia: if the visitor has turned off motion in their device settings, nothing moves.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const EASE = "power3.out";

export function HomeAnimations() {
  useGSAP(() => {
    const root = document.documentElement;
    root.classList.add("motion-ready"); // tell the safety script that the animation started

    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduce: "(prefers-reduced-motion: reduce)",
        finePointer: "(hover: hover) and (pointer: fine)",
      },
      (context) => {
        const { motion, finePointer } = context.conditions as Record<string, boolean>;

        // No motion: show everything immediately
        if (!motion) {
          root.classList.remove("js-motion");
          return;
        }

        heroIntro();
        heroParallax();
        sectionHeadings();
        reveals();
        staggers();
        stepLines();
        aboutDivider();
        imageReveals();
        ctaGrow();
        footerWordmark();
        const stopTicker = velocityTicker();
        const stopMagnets = finePointer ? magnetic() : undefined;

        // Recalculate positions after images and fonts load
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);

        return () => {
          stopTicker?.();
          stopMagnets?.();
          window.removeEventListener("load", refresh);
        };
      }
    );

    return () => mm.revert();
  });

  return null;
}

/* =========================================================
   1. Hero entrance: the header drops in, the image zooms in slowly, then the words rise
   ========================================================= */
function heroIntro() {
  const tl = gsap.timeline({
    defaults: { ease: EASE },
    onComplete: () => document.documentElement.classList.remove("js-motion"),
  });

  tl.fromTo("[data-header]", { autoAlpha: 0, y: -40 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0)
    .fromTo("[data-hero-bg]", { scale: 1.15 }, { scale: 1, duration: 2.2, ease: "power2.out" }, 0)
    .fromTo(
      "[data-hero-item]",
      { autoAlpha: 0, y: 30 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
      0.25
    )
    .fromTo(
      "[data-hero] [data-split] .split-inner",
      { y: 0, yPercent: 110 },
      { yPercent: 0, duration: 1.1, stagger: 0.07 },
      0.35
    );
}

/* The hero image moves slower than the page while scrolling (depth), and the text fades a little */
function heroParallax() {
  const trigger = { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true };
  gsap.to("[data-hero-bg]", { yPercent: 14, ease: "none", scrollTrigger: trigger });
  gsap.to("[data-hero-content]", { y: -80, autoAlpha: 0.15, ease: "none", scrollTrigger: trigger });
}

/* =========================================================
   2. Section headings: words rise one after another (like ReactBits' SplitText, but by word)
   ========================================================= */
function sectionHeadings() {
  gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
    if (el.closest("[data-hero]")) return; // the hero has its own timeline
    gsap.from(el.querySelectorAll(".split-inner"), {
      yPercent: 110,
      duration: 1,
      ease: EASE,
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}

/* =========================================================
   3. A single element appears from below as you scroll to it
   ========================================================= */
function reveals() {
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    // If the element is inside a stagger group, the group handles it. Two "from" animations on the same element
    // conflict: the second records the element as hidden and it stays invisible.
    if (el.parentElement?.hasAttribute("data-stagger")) return;
    gsap.from(el, {
      autoAlpha: 0,
      y: 40,
      duration: 0.9,
      ease: EASE,
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
}

/* =========================================================
   4. Group: its children appear one after another (cards, lists...)
   ========================================================= */
function staggers() {
  gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
    gsap.from(group.children, {
      autoAlpha: 0,
      y: 50,
      duration: 0.9,
      ease: EASE,
      stagger: 0.12,
      scrollTrigger: { trigger: group, start: "top 85%", once: true },
    });
  });
}

/* =========================================================
   5. The steps line in "كيف تعمل المنصة" draws itself as you scroll, and the numbers pop
   (the line and circle are CSS ::before/::after, so we move them through the --line and --dot variables)
   ========================================================= */
function stepLines() {
  gsap.utils.toArray<HTMLElement>("[data-steps] > li").forEach((li) => {
    gsap.fromTo(
      li,
      { "--dot": 0.3 },
      { "--dot": 1, duration: 0.7, ease: "back.out(2.5)", scrollTrigger: { trigger: li, start: "top 85%", once: true } }
    );
    gsap.fromTo(
      li,
      { "--line": 0 },
      { "--line": 1, ease: "none", scrollTrigger: { trigger: li, start: "top 75%", end: "bottom 60%", scrub: true } }
    );
  });
}

/* The divider line in the "عن AGENCE" section grows from top to bottom */
function aboutDivider() {
  gsap.utils.toArray<HTMLElement>("[data-divider]").forEach((el) => {
    gsap.fromTo(
      el,
      { "--divider": 0 },
      { "--divider": 1, duration: 1.4, ease: "power2.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } }
    );
  });
}

/* =========================================================
   6. Images are revealed like a curtain opening from bottom to top, and settle from a slight zoom
   ========================================================= */
function imageReveals() {
  gsap.utils.toArray<HTMLElement>("[data-clip]").forEach((wrap) => {
    const img = wrap.querySelector("img");
    const tl = gsap.timeline({ scrollTrigger: { trigger: wrap, start: "top 85%", once: true } });
    tl.fromTo(
      wrap,
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "power4.inOut" }
    );
    if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
  });
}

/* =========================================================
   7. The "ابدأ مع AGENCE" band grows as it enters the screen
   ========================================================= */
function ctaGrow() {
  gsap.utils.toArray<HTMLElement>("[data-cta]").forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.9, borderRadius: 64 },
      {
        scale: 1,
        borderRadius: 32,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 100%", end: "top 55%", scrub: true },
      }
    );
  });
}

/* =========================================================
   8. The large "AGENCE" word in the footer: letters rise one after another (English, so splitting by letter is fine)
   ========================================================= */
function footerWordmark() {
  const letters = gsap.utils.toArray<HTMLElement>("[data-wordmark] span");
  if (!letters.length) return;
  gsap.from(letters, {
    yPercent: 100,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.06,
    scrollTrigger: { trigger: "[data-wordmark]", start: "top 98%", once: true },
  });
}

/* =========================================================
   9. The services strip: speeds up with scroll speed and reverses direction when scrolling up
   (like ReactBits' "Scroll Velocity" effect)
   ========================================================= */
function velocityTicker() {
  const track = document.querySelector<HTMLElement>("[data-ticker]");
  if (!track) return;

  track.style.animation = "none"; // turn off the CSS animation; GSAP takes over
  const loop = gsap.to(track, { xPercent: 50, ease: "none", duration: 40, repeat: -1 });
  loop.totalTime(loop.duration() * 50); // start from the "middle" so it can run in reverse

  let direction = 1;
  const st = ScrollTrigger.create({
    start: 0,
    end: "max",
    onUpdate(self) {
      direction = self.direction === -1 ? -1 : 1;
      const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 250, 8);
      gsap.to(loop, {
        timeScale: direction * boost,
        duration: 0.2,
        overwrite: true,
        onComplete: () => {
          // after scrolling stops: go back to normal speed slowly
          gsap.to(loop, { timeScale: direction, duration: 1.4, ease: "power2.out", overwrite: true });
        },
      });
    },
  });

  return () => {
    st.kill();
    loop.kill();
    track.style.animation = "";
  };
}

/* =========================================================
   10. Magnetic buttons: they follow the mouse slightly when it comes close (like ReactBits' "Magnet")
   Only on devices with a mouse, not on touch screens
   ========================================================= */
function magnetic() {
  const cleanups: (() => void)[] = [];

  gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.5)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.5)" });

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    cleanups.push(() => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    });
  });

  return () => cleanups.forEach((fn) => fn());
}
