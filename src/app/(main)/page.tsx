import Hero from "@/components/features/main/Hero";
import QuoteCarousel from "@/components/features/main/QuoteCarousel";
import PhilosophyGrid from "@/components/features/main/PhilosophyGrid";
import Manifesto from "@/components/features/main/Manifesto";
import EmailCapture from "@/components/features/marketing/EmailCapture";

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
