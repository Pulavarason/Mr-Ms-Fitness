import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GalleryCollection from "@/components/GalleryCollection";

export default function GalleryPage() {
  return <main className="min-h-screen bg-bg pb-24 pt-28 md:pb-32 md:pt-36">
    <div className="container-x">
      <Link href="/#gallery" className="inline-flex items-center gap-2 cond text-sm uppercase tracking-[0.14em] text-white/65 transition-colors hover:text-white"><ArrowLeft size={16} /> Back to studio</Link>
      <p className="cond mb-5 mt-12 text-sm uppercase tracking-[0.22em] text-red">MR & MRS · Mugalivakkam</p>
      <h1 className="display text-[clamp(2.8rem,7vw,6rem)]">The studio, <span className="text-red">up close.</span></h1>
      <p className="mt-5 max-w-xl text-white/60">Take a look around the training floor, the equipment and the space where your next session happens.</p>
      <GalleryCollection />
    </div>
  </main>;
}
