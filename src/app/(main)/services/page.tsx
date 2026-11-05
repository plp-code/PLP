import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import Banner from "@/components/ui/Banner";
import { OneOnOneList } from "@/components/features/services/OneOnOneList";

export const metadata: Metadata = {
  title: "In-Person Services | The Preloved Professional",
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-plp-parchment selection:bg-plp-lime selection:text-plp-maroon">
      <div className="relative -mt-[calc(var(--header-offset)_-_var(--header-h))]">
        <Banner
          titleAs="h1"
          title="By Inquiry"
          description="A limited number of personal wardrobe projects each season, sourced and built around you."
          contentClassName="py-14 md:py-20"
        />
      </div>

      <Container
        as="div"
        className="flex-1 pb-16 pt-10 md:pb-24 md:pt-14"
        contentClassName="flex w-full max-w-6xl flex-col"
      >
        <OneOnOneList services={[]} />
      </Container>
    </div>
  );
}
