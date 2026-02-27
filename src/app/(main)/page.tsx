import Hero from "@/components/marketing/Hero";
import Marquee from "@/components/marketing/Marquee";
import PhilosophyGrid from "@/components/marketing/PhilosophyGrid";
import Manifesto from "@/components/marketing/Manifesto";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      {/* <Manifesto /> */}
      <Marquee />
      <PhilosophyGrid />
    </main>
  );
}
