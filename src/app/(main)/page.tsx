import type { Metadata } from "next";
import Hero from "@/components/features/main/Hero";
import QuoteCarousel from "@/components/features/main/QuoteCarousel";
import Manifesto from "@/components/features/main/Manifesto";
import MapsSection from "@/components/features/main/MapsSection";
import JoinBanner from "@/components/features/marketing/JoinBanner";

export const metadata: Metadata = {
  title: "The Preloved Professional",
  description:
    "A curated marketplace and editorial home for preloved fashion, access, and map-based discovery.",
  openGraph: {
    title: "The Preloved Professional",
    description:
      "A curated marketplace and editorial home for preloved fashion, access, and map-based discovery.",
    type: "website",
  },
};

export default function LandingPage() {
  return (
    <div>
      <Hero />
      <JoinBanner />
      <Manifesto />
      <QuoteCarousel />
      <MapsSection />
    </div>
  );
}
