"use client";
import { motion } from "framer-motion";
import { Flame, Timer, TrendingUp, Target } from "lucide-react";
import { heroStats } from "@/config/content";

/** Dark glass card shell. Outer div floats (CSS), inner responds to hover. */
function Card({ className = "", delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  return (
    <div data-card className={`absolute ${className}`}>
      <div style={{ animation: `floaty ${6 + delay}s ease-in-out ${delay * -1}s infinite` }}>
        <motion.div
          whileHover={{ y: -4, scale: 1.04 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="glass group w-[10.5rem] p-4 transition-colors duration-300 hover:border-red/70 md:w-[13rem] md:p-5"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

const Label = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
  <p className="flex items-center gap-2 text-[0.7rem] text-white/60 md:text-xs"><span className="text-red">{icon}</span>{children}</p>
);

export default function StatCards() {
  const { calories, activeMinutes, week, progress } = heroStats;
  const r = 20, c = 2 * Math.PI * r, pct = calories.value / calories.goal;
  const max = Math.max(...week);
  const spark = week.map((v, i) => `${(i / (week.length - 1)) * 100},${34 - (v / max) * 30}`).join(" ");

  return (
    <>
      <Card className="-left-2 top-[9%] md:left-[-6%]" delay={0}>
        <Label icon={<Flame size={14} />}>Calories burned</Label>
        <div className="mt-2 flex items-center justify-between">
          <p className="display text-3xl md:text-4xl">{calories.value}<span className="ml-1 text-xs font-medium text-white/50">kcal</span></p>
          <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden className="shrink-0 -rotate-90">
            <circle cx="24" cy="24" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
            <circle cx="24" cy="24" r={r} fill="none" stroke="#ed1015" strokeWidth="4" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
          </svg>
        </div>
      </Card>

      <Card className="hidden md:block md:right-[-4%] md:top-[26%]" delay={1.2}>
        <Label icon={<Timer size={14} />}>Active time</Label>
        <p className="display mt-2 text-4xl">{activeMinutes}<span className="ml-1 text-xs font-medium text-white/50">min</span></p>
        <div className="mt-3 flex h-8 items-end gap-1" aria-hidden>
          {week.map((v, i) => (
            <span key={i} className={`flex-1 ${i === 5 ? "bg-red" : "bg-white/25"}`} style={{ height: `${(v / max) * 100}%` }} />
          ))}
        </div>
      </Card>

      <Card className="hidden md:block md:bottom-[15%] md:left-[-2%]" delay={2.1}>
        <Label icon={<TrendingUp size={14} />}>Workout progress</Label>
        <svg viewBox="0 0 100 38" className="mt-3 h-10 w-full" aria-hidden preserveAspectRatio="none">
          <polyline points={spark} fill="none" stroke="#ed1015" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <p className="mt-2 text-xs text-white/50">This week</p>
      </Card>

      <Card className="-right-2 bottom-[4%] md:bottom-[8%] md:right-[4%]" delay={0.8}>
        <Label icon={<Target size={14} />}>Fitness goals</Label>
        <p className="display mt-2 text-3xl md:text-4xl">{progress}<span className="ml-0.5 text-xs font-medium text-white/50">%</span></p>
        <div className="mt-3 h-1.5 w-full bg-white/15"><div className="h-full bg-red" style={{ width: `${progress}%` }} /></div>
      </Card>
    </>
  );
}
