import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Trust from "@/components/Trust";
import Features from "@/components/Features";
import Plans from "@/components/Plans";
import Footer from "@/components/Footer";
import Refresh from "@/components/Refresh";

// Heavier client sections are split out of the first bundle.
const Programs = dynamic(() => import("@/components/Programs"));
const Gallery = dynamic(() => import("@/components/Gallery"));
const Contact = dynamic(() => import("@/components/Contact"));

export default function Page() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Nav />
      <main>
        <Hero />
        <Trust />
        <Features />
        <About />
        <Programs />
        <Gallery />
        <Plans />
        <Contact />
      </main>
      <Footer />
      <Refresh />
    </>
  );
}
