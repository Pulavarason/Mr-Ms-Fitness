"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Run a callback once the loader has finished (or immediately if it already has). */
export function onReady(cb: () => void) {
  if (typeof document === "undefined") return () => {};
  if (document.documentElement.dataset.ready === "true") {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener("app:ready", h, { once: true });
  return () => window.removeEventListener("app:ready", h);
}

export function scrollToTarget(target: string | number) {
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: string | number, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(target, { duration: 1.4, offset: 0 });
  else if (typeof target === "string") document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  else window.scrollTo({ top: target, behavior: "smooth" });
}
