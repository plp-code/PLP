import Hero from "@/components/marketing/Hero";
import Marquee from "@/components/marketing/Marquee";
import PhilosophyGrid from "@/components/marketing/PhilosophyGrid";
import Manifesto from "@/components/marketing/Manifesto";
import AboutUs from "@/components/marketing/AboutUs";
import EmailCapture from "@/components/marketing/EmailCapture";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <EmailCapture />
      <Manifesto />
      <Marquee />
      <PhilosophyGrid />
      <AboutUs />
    </main>
  );
}
