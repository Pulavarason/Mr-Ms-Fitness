"use client";
import { useState } from "react";
import { MapPin, Phone, MessageCircle, Clock, Mail, Camera, Share2, Play, ArrowUpRight } from "lucide-react";
import SplitReveal from "./SplitReveal";
import { site, hasPhone, hasWhatsapp, telLink, whatsappLink, mapsLink, mapsEmbed } from "@/config/site";
import { programs, plans } from "@/config/content";

const socials = [
  { name: "Instagram", href: site.social.instagram || "https://www.instagram.com/", Icon: Camera },
  { name: "Facebook", href: site.social.facebook || "https://www.facebook.com/", Icon: Share2 },
  { name: "YouTube", href: site.social.youtube || "https://www.youtube.com/", Icon: Play },
];

function EnquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasWhatsapp()) {
      setNote("Thanks! Please contact the studio directly to complete your enquiry.");
      return;
    }
    const msg = `Hi, I'm ${name}. My phone is ${phone}${email ? ` and email is ${email}` : ""}. I'm interested in ${goal || "training"}${plan ? ` with the ${plan} plan` : ""}.${message ? ` More details: ${message}` : ""}`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    setNote("Your enquiry is ready in WhatsApp.");
  };

  const field = "w-full border border-white/15 bg-black/35 px-4 py-3.5 text-white placeholder:text-white/35 transition-colors focus:border-red focus:outline-none";
  return <form onSubmit={submit} className="mt-8 grid gap-5">
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 text-sm text-white/65">Your name<input required value={name} onChange={e => setName(e.target.value)} autoComplete="name" className={field} placeholder="Full name" /></label>
      <label className="grid gap-2 text-sm text-white/65">Phone number<input required value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" type="tel" className={field} placeholder="Your number" /></label>
    </div>
    <label className="grid gap-2 text-sm text-white/65">Email address <span className="text-white/35">(optional)</span><input value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" type="email" className={field} placeholder="you@example.com" /></label>
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="grid gap-2 text-sm text-white/65">Training goal<select value={goal} onChange={e => setGoal(e.target.value)} className={`${field} bg-[#101010]`}><option value="">Choose a goal</option>{programs.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}</select></label>
      <label className="grid gap-2 text-sm text-white/65">Membership plan<select value={plan} onChange={e => setPlan(e.target.value)} className={`${field} bg-[#101010]`}><option value="">Help me choose</option>{plans.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}</select></label>
    </div>
    <label className="grid gap-2 text-sm text-white/65">Anything you’d like us to know? <span className="text-white/35">(optional)</span><textarea value={message} onChange={e => setMessage(e.target.value)} rows={4} className={`${field} resize-y`} placeholder="Tell us what you’re working towards" /></label>
    <div className="flex flex-wrap items-center gap-4">
      <button type="submit" className="group inline-flex items-center gap-3 bg-red px-7 py-4 cond text-sm uppercase tracking-[0.12em] transition-colors hover:bg-white hover:text-ink">Send enquiry <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
      <p role="status" aria-live="polite" className="text-sm text-white/65">{note}</p>
    </div>
  </form>;
}

export default function Contact() {
  const hours = site.hours.length ? site.hours.map(h => `${h.days}: ${h.time}`).join(" · ") : "Ask us for today’s schedule";
  return <section id="contact" className="bg-bg py-24 md:py-36">
    <div className="container-x">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <p className="cond mb-5 text-sm uppercase tracking-[0.22em] text-red">We’re here to help</p>
          <SplitReveal as="h2" text="Come train with us" className="display text-[clamp(2.4rem,5.4vw,5rem)]" />
          <p className="mt-5 max-w-md text-white/60">Questions about training or membership? Send us a note or stop by the studio.</p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <div className="flex gap-3 text-white/75"><MapPin size={19} className="mt-1 shrink-0 text-red" /><div><p className="cond text-xs uppercase tracking-[0.16em] text-white/45">Visit us</p><p className="mt-1">{site.address || `${site.locality}, ${site.city}, ${site.country}`}</p></div></div>
            <div className="flex gap-3 text-white/75"><Clock size={19} className="mt-1 shrink-0 text-red" /><div><p className="cond text-xs uppercase tracking-[0.16em] text-white/45">Studio hours</p><p className="mt-1">{hours}</p></div></div>
            <div className="flex gap-3 text-white/75"><Phone size={19} className="mt-1 shrink-0 text-red" /><div><p className="cond text-xs uppercase tracking-[0.16em] text-white/45">Call</p>{hasPhone() ? <a className="mt-1 inline-block hover:text-white" href={telLink()}>+{site.phone}</a> : <p className="mt-1">Contact details shared on enquiry</p>}</div></div>
            <div className="flex gap-3 text-white/75"><Mail size={19} className="mt-1 shrink-0 text-red" /><div><p className="cond text-xs uppercase tracking-[0.16em] text-white/45">Email</p>{site.email ? <a className="mt-1 inline-block break-all hover:text-white" href={`mailto:${site.email}`}>{site.email}</a> : <p className="mt-1">Email details shared on enquiry</p>}</div></div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3" aria-label="Social media links">{socials.map(({ name, href, Icon }) => <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-sm text-white/65 transition-colors hover:border-red hover:text-white"><Icon size={16} />{name}</a>)}</div>

          <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-end">
            <div className="relative aspect-square w-full max-w-[15rem] shrink-0 overflow-hidden border border-white/10 bg-surface">
              <iframe title={`Map showing ${site.name}`} src={mapsEmbed()} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 h-full w-full border-0 opacity-90" style={{ filter: "invert(0.92) hue-rotate(180deg) saturate(0.6) contrast(0.95)" }} />
            </div>
            <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 cond text-xs uppercase tracking-[0.14em] text-white/65 hover:text-white">Open directions <ArrowUpRight size={15} /></a>
          </div>
        </div>

        <div className="border border-white/10 bg-[#101010] p-6 md:p-9 lg:p-10">
          <p className="cond text-xs uppercase tracking-[0.2em] text-red">Start a conversation</p>
          <h3 className="display mt-3 text-3xl md:text-4xl">Tell us about your goals.</h3>
          <p className="mt-3 text-sm text-white/55">Share a few details and the studio can help you find a good place to start.</p>
          <EnquiryForm />
          {hasWhatsapp() && <a href={whatsappLink(`Hi, I have a question about ${site.name}.`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm text-white/50 hover:text-white"><MessageCircle size={16} /> Or message us directly on WhatsApp</a>}
        </div>
      </div>
    </div>
  </section>;
}
