"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Photo from "./Photo";
import { programs } from "@/config/content";

export default function Programs() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const el = track.current!;
      const dist = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: () => -dist(), ease: "none",
        scrollTrigger: { trigger: section.current, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="programs" ref={section} className="bg-ink lg:h-screen lg:overflow-hidden">
      <div ref={track} className="flex flex-col gap-20 px-6 py-24 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-[6vw] lg:px-[8vw] lg:py-0">
        <div className="lg:w-[28vw] lg:shrink-0">
          <h2 className="display text-[clamp(2.6rem,6vw,5.8rem)]">Training programs</h2>
          <p className="mt-6 max-w-sm text-lg text-white/70">Pick a goal. We build the training around it.</p>
        </div>
        {programs.map((p, i) => (
          <article key={p.name} className={`group lg:w-[40vw] lg:shrink-0 ${i % 2 ? "lg:mt-24" : "lg:-mt-16"}`}>
            <div className="relative">
              <Photo img={p.image} reveal={false} sizes="(min-width:1024px) 40vw, 100vw" className="aspect-[4/3] w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
              <div className="absolute -bottom-3 left-0 h-1 w-0 bg-red transition-[width] duration-700 ease-out group-hover:w-full" />
            </div>
            <h3 className="display mt-7 text-[clamp(1.9rem,3.4vw,3.2rem)]">{p.name}</h3>
            <p className="mt-3 max-w-md text-white/70">{p.text}</p>
          </article>
        ))}
        <div className="hidden w-[10vw] shrink-0 lg:block" aria-hidden />
      </div>
    </section>
  );
}
