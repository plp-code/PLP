import type { Metadata } from "next";
import Link from "next/link"; // 🟢 1. Import Next.js native Link
import Banner from "@/components/ui/Banner";
import { Container } from "@/components/ui/Container";
import MapDirectory from "@/components/features/maps/MapDirectory";

export const metadata: Metadata = {
  title: "Maps",
};  

export default function MapsPage() {
  return (
    <section className="min-h-screen bg-plp-parchment flex flex-col font-text selection:bg-plp-lime selection:text-plp-maroon">
      <Banner
        title="Maps"
        description="A clean place to sketch the structure of the project before the content system expands."
        contentClassName="py-14 md:py-20"
      />

      <Container
        as="section"
        className="flex-1 py-8 md:py-12"
        contentClassName="max-w-6xl w-full flex flex-col gap-8" 
      >      
        <MapDirectory />
      </Container>
    </section>
  );
}