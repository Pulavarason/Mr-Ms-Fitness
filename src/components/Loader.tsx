"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const reduce = prefersReducedMotion();
    const state = { v: 0 };
    const done = () => {
      document.documentElement.dataset.ready = "true";
      window.dispatchEvent(new Event("app:ready"));
    };
    const tl = gsap.timeline();
    tl.to(state, {
      v: 100,
      duration: reduce ? 0.3 : 1.7,
      ease: "power2.inOut",
      onUpdate: () => {
        setCount(Math.round(state.v));
        if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})`;
      },
    });
    tl.to(root.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: reduce ? 0.1 : 0.9,
      ease: "expo.inOut",
      delay: 0.15,
      onStart: done,
      onComplete: () => setGone(true),
    });
    return () => { tl.kill(); };
  }, []);

  if (gone) return null;
  return (
    <div
      ref={root}
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div className="w-[min(70vw,22rem)]">
        <Image src="/brand/logo.png" alt="MR & MRS Unisex Fitness Studio, Mugalivakkam" width={606} height={309} priority className="h-auto w-full" />
        <div className="mt-8 h-[2px] w-full bg-surface">
          <div ref={bar} className="h-full origin-left bg-red" style={{ transform: "scaleX(0)" }} />
        </div>
        <div className="cond mt-3 text-right text-sm tabular-nums text-mute">{count}%</div>
      </div>
    </div>
  );
}
