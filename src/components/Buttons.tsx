"use client";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";
import { scrollToTarget } from "@/lib/gsap";
import { whatsappLink, hasWhatsapp, site } from "@/config/site";

type Variant = "solid" | "line";

const base =
  "group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 cond text-base uppercase tracking-[0.1em] transition-colors duration-300";
const styles: Record<Variant, string> = {
  solid: "bg-red text-white hover:bg-white hover:text-ink",
  line: "border border-white/40 text-white hover:border-white hover:bg-white hover:text-ink",
};

type Props = { children: React.ReactNode; variant?: Variant; className?: string; compact?: boolean } & (
  | { href: string; onClick?: never }
  | { href?: never; onClick: () => void }
);

export function Button({ children, variant = "solid", className = "", href, onClick, compact }: Props) {
  const cls = `${base} ${styles[variant]} ${compact ? "!px-5 !py-2.5 !text-sm" : ""} ${className}`;
  const inner = (<>{children}<ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" /></>);
  const external = href?.startsWith("http") || href?.startsWith("tel:");
  return (
    <Magnetic>
      {href && !href.startsWith("#") ? (
        <a href={href} className={cls} {...(external && href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
      ) : (
        <button
          type="button"
          className={cls}
          onClick={() => (href ? scrollToTarget(href) : onClick?.())}
        >{inner}</button>
      )}
    </Magnetic>
  );
}

/** Enquiry goes to WhatsApp when a number is configured, otherwise to the contact section. */
export function enquiryHref(message: string) {
  return hasWhatsapp() ? whatsappLink(message) : "#contact";
}

export function JoinButton({ variant = "solid", plan, compact }: { variant?: Variant; plan?: string; compact?: boolean }) {
  const msg = plan
    ? `Hi, I'd like to know more about the ${plan} membership at ${site.name}.`
    : `Hi, I'd like to join ${site.name}. Can you share the details?`;
  return <Button variant={variant} compact={compact} href={enquiryHref(msg)}>{plan ? "Ask about this plan" : "Join now"}</Button>;
}
