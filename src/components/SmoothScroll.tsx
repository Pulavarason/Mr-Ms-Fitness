"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    (window as unknown as { __lenis: Lenis }).__lenis = lenis;
    lenis.stop(); // locked until the loader finishes
    const unlock = () => lenis.start();
    if (document.documentElement.dataset.ready === "true") unlock();
    else window.addEventListener("app:ready", unlock, { once: true });

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      window.removeEventListener("app:ready", unlock);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}
