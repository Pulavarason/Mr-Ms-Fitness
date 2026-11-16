"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/config/content";
import { scrollToTarget, onReady } from "@/lib/gsap";
import { JoinButton } from "./Buttons";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > last && y > 240) setHidden(true);
      else if (y < last) setHidden(false);
      last = y;
    };
    const off = onReady(() => setHidden(false));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { off(); window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop(); else if (document.documentElement.dataset.ready === "true") lenis?.start();
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const go = (href: string) => { setOpen(false); setTimeout(() => scrollToTarget(href), open ? 350 : 0); };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden && !open ? "-110%" : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-3 z-50 px-3 md:top-5 md:px-5"
      >
        <div className={`mx-auto flex h-[3.75rem] max-w-6xl items-center justify-between rounded-full border pl-3 pr-2 backdrop-blur-xl transition-colors duration-500 md:pl-4 ${scrolled ? "border-white/15 bg-black/75" : "border-white/10 bg-black/40"}`}>
          <a href="#top" onClick={(e) => { e.preventDefault(); go("#top"); }} aria-label="MR & MRS Unisex Fitness Studio, home">
            <Image src="/brand/logo.png" alt="MR & MRS Unisex Fitness Studio, Mugalivakkam" width={606} height={309} priority className="h-10 w-auto rounded-[3px] md:h-11" />
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); go(n.href); }} className="cond group relative text-[0.8rem] uppercase tracking-[0.14em] text-white/80 transition-colors hover:text-white">
                {n.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-red transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:block"><JoinButton compact /></div>
            <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white lg:hidden">
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 pt-20"
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              {nav.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={(e) => { e.preventDefault(); go(n.href); }}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
                  className="display text-[2.6rem] uppercase text-white active:text-red"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
            <div className="mt-10" onClick={() => setOpen(false)}><JoinButton /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
