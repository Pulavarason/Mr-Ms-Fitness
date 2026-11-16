"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Desktop-only cursor: a small dot plus a trailing ring that grows over links/buttons. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });
    const move = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2, overwrite: "auto" });
    };
    const over = (e: PointerEvent) => {
      const hot = (e.target as HTMLElement).closest("a,button,[data-cursor]");
      gsap.to(ring.current, {
        scale: hot ? 1.9 : 1,
        backgroundColor: hot ? "rgba(237,16,21,0.18)" : "rgba(237,16,21,0)",
        duration: 0.3,
      });
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[95] -ml-5 -mt-5 h-10 w-10 rounded-full border border-red opacity-0" />
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[96] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-white opacity-0" />
    </>
  );
}
