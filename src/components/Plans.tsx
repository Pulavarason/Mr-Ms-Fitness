import { Check, Sparkles } from "lucide-react";
import SplitReveal from "./SplitReveal";
import { JoinButton } from "./Buttons";
import { plans } from "@/config/content";

export default function Plans() {
  return <section id="plans" className="bg-ink py-28 md:py-40">
    <div className="container-x">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="cond mb-5 text-sm uppercase tracking-[0.22em] text-red">Pick your pace</p><SplitReveal as="h2" text="Membership plans" className="display text-[clamp(2.4rem,6vw,5.6rem)]" /></div>
        <p className="max-w-sm text-white/60">Choose a plan that fits your training routine. Message us to confirm current rates and what’s included.</p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:mt-16 xl:grid-cols-4">
        {plans.map((p) => <article key={p.id} className={`relative flex flex-col border p-6 md:p-7 ${p.featured ? "border-red bg-gradient-to-b from-red/20 to-[#111] shadow-[0_0_55px_-25px_rgba(237,16,21,0.7)]" : "border-white/12 bg-[#101010]"}`}>
          {p.featured && <div className="absolute -top-3 left-6 inline-flex items-center gap-1.5 bg-red px-3 py-1 cond text-[0.68rem] uppercase tracking-[0.16em]"><Sparkles size={12} /> Recommended</div>}
          <p className="cond text-sm uppercase tracking-[0.18em] text-white/55">{p.name}</p>
          <div className="mt-6 flex items-baseline gap-2"><h3 className="display text-4xl">{p.price}</h3><span className="text-xs text-white/50">{p.period}</span></div>
          <p className="mt-4 min-h-14 text-sm leading-relaxed text-white/65">{p.text}</p>
          <div className="my-6 h-px bg-white/10" />
          <p className="cond text-xs uppercase tracking-[0.16em] text-white/55">Plan includes</p>
          <ul className="mt-4 flex-1 space-y-3">{p.includes.map((item: string) => <li key={item} className="flex gap-2.5 text-sm text-white/75"><Check size={16} className="mt-0.5 shrink-0 text-red" />{item}</li>)}</ul>
          <JoinButton variant={p.featured ? "solid" : "line"} plan={p.name} />
        </article>)}
      </div>
      <p className="mt-7 text-xs text-white/40">Sample packages and prices for demonstration only. Contact the studio for confirmed membership details.</p>
    </div>
  </section>;
}
