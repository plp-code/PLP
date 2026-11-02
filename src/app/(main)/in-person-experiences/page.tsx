import type { Metadata } from "next";
import Banner from "@/components/ui/Banner";
import { Container } from "@/components/ui/Container";
import { InPersonList } from "@/components/features/experiences/InPersonList";
import { IN_PERSON_EVENTS } from "@/data/experiences";

export const metadata: Metadata = {
  title: "In-Person Experiences | The Preloved Professional",
};

export default function InPersonExperiencesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-plp-parchment selection:bg-plp-lime selection:text-plp-maroon">
      <div className="relative -mt-[calc(var(--header-offset)_-_var(--header-h))]">
        <Banner
          titleAs="h1"
          title="Off The Clock"
          description="Pop-ups, swap parties, group thrift trips, and events that bring women together through clothing and conversation."
          contentClassName="py-14 md:py-20"
        />
      </div>

      <Container
        as="div"
        className="flex-1 pb-16 pt-10 md:pb-24 md:pt-14"
        contentClassName="flex w-full max-w-6xl flex-col"
      >
        <InPersonList events={IN_PERSON_EVENTS} />
      </Container>
    </div>
  );
}


