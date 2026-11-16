"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, prefersReducedMotion, onReady, scrollToTarget } from "@/lib/gsap";
import SplitReveal from "./SplitReveal";
import StatCards from "./StatCards";
import { Button, JoinButton } from "./Buttons";
import { hero } from "@/config/content";
import { images } from "@/config/images";

// Red motion trails. Positions are percentages of the athlete frame.
const trails = [
  { top: 30, w: 46, h: 2, rot: -4, o: 0.9 }, { top: 36, w: 62, h: 1, rot: -3, o: 0.7 },
  { top: 44, w: 38, h: 3, rot: -5, o: 0.8 }, { top: 50, w: 70, h: 1, rot: -2, o: 0.6 },
  { top: 56, w: 52, h: 2, rot: -6, o: 0.85 }, { top: 62, w: 34, h: 1, rot: -3, o: 0.7 },
  { top: 68, w: 58, h: 2, rot: -4, o: 0.6 }, { top: 40, w: 28, h: 1, rot: -5, o: 0.9 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const runner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      const ins = gsap.utils.toArray<HTMLElement>("[data-in]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      const lines = gsap.utils.toArray<HTMLElement>(".trail");
      gsap.set(ins, { opacity: 0, y: 28 });
      gsap.set(cards, { opacity: 0, y: 34, scale: 0.94 });
      gsap.set(lines, { opacity: 0 });
      gsap.set(runner.current, { clipPath: "inset(0 100% 0 0)", scale: 1.1 });
    }, root);
    const off = onReady(() => {
      const c2 = gsap.context(() => {
        const tl = gsap.timeline();
        tl.to(runner.current, { clipPath: "inset(0 0% 0 0)", scale: 1, duration: 1.9, ease: "expo.out" })
          .to("[data-in]", { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.1 }, 0.5)
          .to("[data-card]", { opacity: 1, y: 0, scale: 1, duration: 1, ease: "expo.out", stagger: 0.16 }, 1.2);
        // Trails streak backwards from the athlete, each on its own loop
        gsap.utils.toArray<HTMLElement>(".trail").forEach((el, i) => {
          const o = Number(el.dataset.o);
          gsap.timeline({ repeat: -1, delay: 1.2 + i * 0.35, repeatDelay: 0.8 + (i % 4) * 0.7 })
            .fromTo(el, { xPercent: 30, opacity: 0 }, { xPercent: 0, opacity: o, duration: 0.35, ease: "power2.out" })
            .to(el, { xPercent: -120, opacity: 0, duration: 1.1, ease: "power2.in" });
        });
      }, root);
      return () => c2.revert();
    });
    return () => { off(); ctx.revert(); };
  }, []);

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-ink pb-16 pt-28 md:min-h-[100svh] md:pb-0 md:pt-0">
      {/* Atmosphere: deep red glow behind the athlete, grid floor lines */}
      <div aria-hidden className="absolute inset-0" style={{ background: "radial-gradient(55% 60% at 70% 45%, rgba(142,0,0,0.38), transparent 70%), radial-gradient(40% 40% at 15% 100%, rgba(237,16,21,0.10), transparent 70%), #000" }} />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

      <div className="container-x relative grid gap-y-8 md:min-h-[100svh] md:grid-cols-12 md:grid-rows-[1fr_auto_1fr] md:gap-y-0">
        {/* Headline */}
        <h1 className="display relative z-20 md:col-span-7 md:col-start-1 md:row-start-2 md:self-end">
          {hero.lines.map((line, i) => (
            <SplitReveal key={line} text={line} as="span" trigger="ready" delay={0.3 + i * 0.18} className="block text-[8.6vw] leading-[1] md:text-[clamp(3rem,5vw,6.2rem)]" />
          ))}
        </h1>

        {/* Athlete */}
        <div className="relative z-10 md:col-span-7 md:col-start-6 md:row-span-3 md:row-start-1 md:self-center">
          <div className="relative mx-auto aspect-square w-full max-w-[44rem] md:max-h-[92svh]">
            <div className="absolute inset-0" aria-hidden>
              {trails.map((t, i) => (
                <span key={i} className="trail absolute right-[42%] origin-right" data-o={t.o}
                  style={{ top: `${t.top}%`, width: `${t.w}%`, height: t.h, transform: `rotate(${t.rot}deg)`, background: "linear-gradient(90deg, transparent, #ed1015 70%, #ff6b6e)", boxShadow: "0 0 14px 1px rgba(237,16,21,0.55)" }} />
              ))}
            </div>
            <div ref={runner} className="absolute inset-0" style={{ mixBlendMode: "screen", WebkitMaskImage: "radial-gradient(closest-side, #000 58%, transparent 100%)", maskImage: "radial-gradient(closest-side, #000 58%, transparent 100%)" }}>
              <Image src={images.runner.src} alt={images.runner.alt} fill priority sizes="(min-width:768px) 48vw, 100vw" className="object-cover" style={{ filter: "grayscale(1) contrast(1.15) brightness(1.05)" }} />
              <div aria-hidden className="absolute inset-0" style={{ mixBlendMode: "color", background: "linear-gradient(100deg, rgba(237,16,21,0.75) 0%, rgba(237,16,21,0.25) 45%, rgba(237,16,21,0.55) 100%)" }} />
            </div>
            <StatCards />
          </div>
        </div>

        {/* Supporting copy + CTAs */}
        <div className="relative z-20 md:col-span-5 md:col-start-1 md:row-start-3 md:self-start md:pt-8">
          <p data-in className="max-w-md text-lg text-white/75">{hero.sub}</p>
          <div data-in className="mt-7 flex flex-wrap gap-3">
            <JoinButton />
            <Button variant="line" href="#about">Explore our studio</Button>
          </div>
          <p data-in className="mt-6 text-xs text-white/40">Stat cards show sample values for illustration.</p>
        </div>

        <button type="button" data-in onClick={() => scrollToTarget("#trust")} aria-label="Scroll down" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="relative block h-12 w-px overflow-hidden bg-white/25">
            <span className="absolute inset-0 bg-red" style={{ animation: "scrollcue 1.8s cubic-bezier(.65,0,.35,1) infinite" }} />
          </span>
        </button>
      </div>
    </section>
  );
}
