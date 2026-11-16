import { trust } from "@/config/content";

export default function Trust() {
  const items = Array.from({ length: 4 });
  return (
    <section id="trust" aria-label={trust} className="overflow-hidden border-y border-white/10 bg-bg py-7 md:py-10">
      <div className="flex w-max" style={{ animation: "marquee 46s linear infinite" }} aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.map((_, i) => (
              <span key={i} className="display flex items-center whitespace-nowrap text-[clamp(1.6rem,3.6vw,3.4rem)]">
                <span className="px-8">TRAIN WITH PURPOSE.</span>
                <span className="outline-text px-8">TRANSFORM WITH CONFIDENCE.</span>
                <span className="h-2 w-2 rotate-45 bg-red" />
              </span>
            ))}
          </div>
        ))}
      </div>
      <span className="sr-only">{trust}</span>
    </section>
  );
}
