"use client";

/**
 * Smooth scrolling for the whole site with Lenis, synced with GSAP.
 *
 * Why the sync? GSAP and Lenis each have their own animation loop. If they run separately,
 * the scroll-linked animations (ScrollTrigger) jitter slightly. So we let GSAP's loop drive Lenis,
 * and tell ScrollTrigger on every scroll step.
 *
 * Disabled automatically for people who turn off motion in their device settings.
 */

import { useEffect, useRef, useState } from "react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

function ScrollTriggerSync() {
  // On every Lenis scroll step: update ScrollTrigger positions
  useLenis(() => ScrollTrigger.update());
  return null;
}

export function SmoothScroll() {
  const lenisRef = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setEnabled(!media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    // GSAP's loop drives Lenis (time arrives in seconds, Lenis expects milliseconds)
    const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false, // GSAP drives it (see above)
        lerp: 0.1, // smoothness: smaller = smoother and slower
        anchors: { offset: -100 }, // links like #services scroll smoothly and stop below the fixed header
      }}
    >
      <ScrollTriggerSync />
    </ReactLenis>
  );
}
