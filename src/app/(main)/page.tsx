import Hero from "@/components/marketing/Hero";
import QuoteCarousel from "@/components/marketing/QuoteCarousel";
import PhilosophyGrid from "@/components/marketing/PhilosophyGrid";
import Manifesto from "@/components/marketing/Manifesto";
import EmailCapture from "@/components/marketing/EmailCapture";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <EmailCapture />
      <Manifesto />
      <QuoteCarousel />
      <PhilosophyGrid />
    </main>
  );
}
