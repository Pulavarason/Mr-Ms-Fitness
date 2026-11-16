"use client";
import { useEffect, useRef, type ElementType } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, onReady } from "@/lib/gsap";

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** "scroll" reveals on entering the viewport, "ready" reveals when the loader ends. */
  trigger?: "scroll" | "ready";
  delay?: number;
  stagger?: number;
};

/** Splits text into words that rise out of a mask. Screen readers get the plain text. */
export default function SplitReveal({ text, as: Tag = "div", className, trigger = "scroll", delay = 0, stagger = 0.06 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll<HTMLElement>("[data-w]");
    if (prefersReducedMotion()) { gsap.set(targets, { yPercent: 0 }); return; }
    gsap.set(targets, { yPercent: 115 });
    const play = () => gsap.to(targets, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger, delay });
    if (trigger === "ready") return onReady(play);
    const st = ScrollTrigger.create({ trigger: el, start: "top 88%", once: true, onEnter: play });
    return () => st.kill();
  }, [trigger, delay, stagger, text]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-top">
          <span data-w className="inline-block will-change-transform">{w}{i < words.length - 1 ? " " : ""}</span>
        </span>
      ))}
    </Tag>
  );
}
