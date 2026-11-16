"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import type { Img } from "@/config/images";

type Props = {
  img: Img;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Clip-path reveal on scroll. */
  reveal?: boolean;
  /** Inner parallax travel in percent. 0 disables. */
  parallax?: number;
  fit?: "cover" | "natural";
};

export default function Photo({ img, className = "", sizes = "(min-width:1024px) 50vw, 100vw", priority, reveal = true, parallax = 0, fit = "cover" }: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const isSvg = img.src.endsWith(".svg");

  useEffect(() => {
    if (prefersReducedMotion() || !wrap.current) return;
    const ctx = gsap.context(() => {
      if (reveal) {
        gsap.fromTo(wrap.current, { clipPath: "inset(12% 12% 12% 12%)" }, {
          clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out",
          scrollTrigger: { trigger: wrap.current, start: "top 90%", once: true },
        });
      }
      if (parallax && inner.current) {
        gsap.fromTo(inner.current, { yPercent: -parallax }, {
          yPercent: parallax, ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      }
    }, wrap);
    return () => ctx.revert();
  }, [reveal, parallax]);

  const scale = parallax ? 1 + (parallax / 100) * 2 + 0.02 : 1;
  return (
    <div ref={wrap} className={`relative overflow-hidden bg-surface ${className}`} style={fit === "natural" ? { aspectRatio: `${img.w}/${img.h}` } : undefined}>
      <div ref={inner} className="absolute inset-0" style={parallax ? { transform: `scale(${scale})` } : undefined}>
        <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} unoptimized={isSvg} className="object-cover" />
      </div>
    </div>
  );
}
