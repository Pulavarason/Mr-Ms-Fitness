"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Dumbbell, HeartPulse, ClipboardList, UserCheck, Users, Flame, type LucideIcon } from "lucide-react";
import SplitReveal from "./SplitReveal";
import { features } from "@/config/content";

const icons: Record<string, LucideIcon> = { Dumbbell, HeartPulse, ClipboardList, UserCheck, Users, Flame };

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 200, damping: 20 });
  return (
    <div style={{ perspective: 900 }} className={className}>
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
        className="group relative h-full"
      >
        {/* back layer gives the card physical depth */}
        <span aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 border border-red/30 transition-transform duration-500 group-hover:translate-x-3.5 group-hover:translate-y-3.5" style={{ transform: "translateZ(-20px) translate(8px, 8px)" }} />
        <div className="relative h-full border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0b0b0b] p-8 transition-colors duration-300 group-hover:border-red/50">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default function Features() {
  return (
    <section id="features" className="bg-bg py-28 md:py-40">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-[1.4fr_1fr] md:items-end">
          <SplitReveal as="h2" text="Built for people who show up." className="display text-[clamp(2.2rem,4.8vw,4.6rem)]" />
          <p className="max-w-sm text-lg text-white/65">Everything under one roof, for men and women at every level.</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 md:mt-24 lg:grid-cols-3 lg:gap-8">
          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <TiltCard key={f.title} className={i % 3 === 1 ? "lg:translate-y-12" : ""}>
                <div className="grid h-12 w-12 place-items-center border border-red/50 bg-red/10 text-red" style={{ transform: "translateZ(30px)" }}><Icon size={22} /></div>
                <h3 className="display mt-8 text-2xl md:text-[1.7rem]" style={{ transform: "translateZ(20px)" }}>{f.title}</h3>
                <p className="mt-3 max-w-xs text-white/65">{f.text}</p>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
