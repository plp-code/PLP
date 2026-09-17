import type { Metadata } from "next";
import Banner from "@/components/ui/Banner";
import { Container } from "@/components/ui/Container";
import MapDirectory from "@/components/features/maps/MapDirectory";

export const metadata: Metadata = {
  title: "Maps | The Preloved Professional",
  description:
    "Explore curated map directories and browse available locations and routes.",
};  

export default function MapsPage() {
  return (
    <section className="min-h-screen bg-plp-parchment flex flex-col font-text selection:bg-plp-lime selection:text-plp-maroon">
     {/* Your path to power, store by store.  */}
      <Banner
        title="PLP Thrift Maps"
        description="Not a PDF. Your map lives in your account, updates as stores change, and filters by what you&apos;re looking for."
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