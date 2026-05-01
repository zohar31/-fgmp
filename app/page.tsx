import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Problem } from "@/components/Problem";
import { HowItWorks } from "@/components/HowItWorks";
import { Solution } from "@/components/Solution";
import { WhoFor } from "@/components/WhoFor";
import { Demo } from "@/components/Demo";
import { Offer } from "@/components/Offer";
import { CustomerStories } from "@/components/CustomerStories";
import { GuidesPreview } from "@/components/GuidesPreview";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { AIAgent } from "@/components/AIAgent";
import { JsonLd, faqSchema, softwareApplicationSchema, reviewsSchema, howToSchema } from "@/lib/jsonld";
import { faqs } from "@/lib/faqs";
import { SITE } from "@/lib/config";
import { customerReviews } from "@/lib/reviews";

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema(faqs)} />
      <JsonLd data={softwareApplicationSchema(customerReviews)} />
      <JsonLd data={reviewsSchema(customerReviews)} />
      <JsonLd data={howToSchema()} />
      <Nav />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Problem />
        <HowItWorks />
        <Solution />
        <WhoFor />
        <Demo />
        <Offer />
        <CustomerStories />
        <GuidesPreview />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <AIAgent />
    </>
  );
}
