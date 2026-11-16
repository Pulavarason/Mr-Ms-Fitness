"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ChevronLeft, ChevronRight } from "lucide-react";
import { images } from "@/config/images";
import SplitReveal from "./SplitReveal";
import Photo from "./Photo";

export default function Gallery() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();
  const list = images.gallery;
  const step = (direction: number) => setActive((index) => (index + direction + list.length) % list.length);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % list.length), 6200);
    return () => window.clearInterval(timer);
  }, [list.length, reducedMotion]);

  return (
    <section id="gallery" className="overflow-hidden bg-bg py-28 md:py-40">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="cond mb-5 text-sm uppercase tracking-[0.22em] text-red">A look around</p>
            <SplitReveal as="h2" text="Inside the studio" className="display text-[clamp(2.4rem,6vw,5.6rem)]" />
          </div>
          <Link href="/gallery" className="group inline-flex items-center gap-2 border-b border-red pb-2 cond text-sm uppercase tracking-[0.14em] hover:text-red">See all photos <ArrowDownRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></Link>
        </div>

        <div className="relative mt-14 md:mt-20" aria-roledescription="carousel" aria-label="Studio photos">
          <div className="relative mx-auto h-[min(105vw,30rem)] max-w-5xl" style={{ perspective: 1400 }}>
            {list.map((img, index) => {
              const distance = (index - active + list.length) % list.length;
              const center = distance === 0;
              const side = distance === 1 || distance === list.length - 1;
              const offset = distance === 1 ? 1 : distance === list.length - 1 ? -1 : 0;
              return (
                <motion.button key={img.src} type="button" aria-label={`Show photo ${index + 1} of ${list.length}`} aria-hidden={!center && !side} tabIndex={center || side ? 0 : -1} onClick={() => setActive(index)}
                  className="absolute left-1/2 top-1/2 aspect-[4/5] w-[54vw] max-w-[24rem] overflow-hidden border border-white/10 bg-surface"
                  initial={false} animate={{ left: center ? "50%" : side ? (offset < 0 ? "calc(50% - min(34vw, 19rem))" : "calc(50% + min(34vw, 19rem))") : "50%", x: "-50%", y: "-50%", rotateY: center ? 0 : offset * -30, scale: center ? 1 : side ? 0.76 : 0.68, opacity: center ? 1 : side ? 0.52 : 0, filter: center ? "blur(0px)" : "blur(3px)", zIndex: center ? 3 : side ? 2 : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }} style={{ transformPerspective: 1400, pointerEvents: side || center ? "auto" : "none", boxShadow: center ? "0 30px 100px -35px rgba(237,16,21,0.42)" : "none" }}>
                  <Photo img={img} reveal={false} sizes="(min-width:768px) 40vw, 54vw" className="h-full w-full" />
                  {!center && <span className="absolute inset-0 bg-black/20" />}
                </motion.button>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="cond text-sm tracking-[0.16em] text-white/55"><span className="text-white">{String(active + 1).padStart(2, "0")}</span> / {String(list.length).padStart(2, "0")}</p>
            <div className="flex gap-2">
              <button type="button" aria-label="Previous photo" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center border border-white/20 transition-colors hover:border-red hover:bg-red"><ChevronLeft size={21} /></button>
              <button type="button" aria-label="Next photo" onClick={() => step(1)} className="grid h-12 w-12 place-items-center border border-white/20 transition-colors hover:border-red hover:bg-red"><ChevronRight size={21} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
