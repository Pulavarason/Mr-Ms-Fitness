"use client";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Recalculate scroll positions once fonts and lazy sections have settled. */
export default function Refresh() {
  useEffect(() => {
    const r = () => ScrollTrigger.refresh();
    const t = setTimeout(r, 1500);
    window.addEventListener("load", r);
    document.fonts?.ready.then(r);
    return () => { clearTimeout(t); window.removeEventListener("load", r); };
  }, []);
  return null;
}
