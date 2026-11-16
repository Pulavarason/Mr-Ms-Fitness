import Photo from "./Photo";
import SplitReveal from "./SplitReveal";
import { about } from "@/config/content";
import { images } from "@/config/images";

/** The red/black split echoes the logo's two halves. The ampersand straddles the seam. */
export default function About() {
  return (
    <section id="about" className="relative">
      <div className="grid md:grid-cols-2">
        <div className="bg-ink px-6 py-24 md:px-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))] md:py-40 md:pr-24">
          <SplitReveal as="h2" text={about.title} className="display max-w-[12ch] text-[clamp(2.4rem,5.4vw,5.2rem)]" />
          <div className="mt-10 max-w-[28rem] space-y-5 text-lg leading-relaxed text-white/75">
            {about.body.map((p) => <p key={p}>{p}</p>)}
          </div>
          <p className="cond mt-12 text-2xl uppercase tracking-wide text-white/90">Mugalivakkam, Chennai</p>
        </div>
        <div className="relative bg-red px-6 pb-24 pt-20 md:px-16 md:py-40">
          <div className="relative mx-auto max-w-md md:-mt-24">
            <Photo img={images.about.main} className="aspect-[4/5] w-full" sizes="(min-width:768px) 36vw, 90vw" parallax={6} />
            <Photo img={images.about.detail} className="absolute -bottom-12 -left-6 hidden aspect-[4/5] w-2/5 border-4 border-red md:block" sizes="15vw" />
          </div>
        </div>
      </div>
      <span aria-hidden className="display pointer-events-none absolute left-1/2 top-[calc(50%-1rem)] hidden -translate-x-1/2 -translate-y-1/2 select-none text-[clamp(14rem,26vw,28rem)] leading-none text-white md:block md:top-[58%]" style={{ mixBlendMode: "normal" }}>&amp;</span>
    </section>
  );
}
