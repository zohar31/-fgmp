import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { WhoFor } from "@/components/WhoFor";
import { Demo } from "@/components/Demo";
import { Offer } from "@/components/Offer";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { AIAgent } from "@/components/AIAgent";
import { JsonLd, faqSchema } from "@/lib/jsonld";
import { faqs } from "@/lib/faqs";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <Nav />
      <main>
        <Hero />
        <TrustBar />
        <Problem />
        <Solution />
        <WhoFor />
        <Demo />
        <Offer />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <AIAgent />
    </>
  );
}
