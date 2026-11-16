import Image from "next/image";
import { nav } from "@/config/content";
import { site, hasPhone, telLink, mapsLink } from "@/config/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 md:pt-32">
      <div className="container-x grid gap-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Image src="/brand/logo.png" alt="MR & MRS Unisex Fitness Studio, Mugalivakkam" width={606} height={309} className="h-auto w-56" />
          <p className="mt-6 max-w-xs text-white/65">Strength, discipline and transformation for men and women, in {site.locality}, {site.city}.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid gap-3 cond text-xl uppercase tracking-wider">
            {nav.map((n) => <li key={n.href}><a href={n.href} className="text-white/75 transition-colors hover:text-red">{n.label}</a></li>)}
          </ul>
        </nav>
        <div className="grid content-start gap-3 text-white/75">
          <a href={mapsLink()} target="_blank" rel="noopener noreferrer" className="hover:text-red">{site.address || `${site.locality}, ${site.city}`}</a>
          {hasPhone() && <a href={telLink()} className="hover:text-red">+{site.phone}</a>}
          {Object.entries(site.social).filter(([, u]) => u).map(([n, u]) => (
            <a key={n} href={u} target="_blank" rel="noopener noreferrer" className="capitalize hover:text-red">{n}</a>
          ))}
        </div>
      </div>
      <p aria-hidden className="display outline-text mt-20 select-none whitespace-nowrap text-center text-[clamp(4rem,19vw,20rem)] leading-[0.8]" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.18)" }}>MR &amp; MRS</p>
      <div className="container-x flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-sm text-white/50">
        <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <a href="#top" className="cond uppercase tracking-[0.2em] hover:text-white">Back to top</a>
      </div>
    </footer>
  );
}
