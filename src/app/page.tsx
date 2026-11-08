import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Audiences } from "@/components/sections/Audiences";
import { Contact } from "@/components/sections/Contact";
import { Cta } from "@/components/sections/Cta";

/**
 * The home page: just stacks the sections in the same order as the design.
 * To reorder or hide a section, edit this list.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Services />
        <HowItWorks />
        <Audiences />
        <Contact />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
