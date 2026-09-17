import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import ComingSoon from "@/components/features/main/CompingSoon";

export const metadata: Metadata = {
  title: "Experiences & Services | The Preloved Professional",
};

export default function ExperiencesAndServicesPage() {
  return (
    <main className="bg-plp-parchment text-plp-maroon">
      <Container className="py-6 md:py-8" contentClassName="max-w-6xl">
        <ComingSoon
          title="Coming soon."
          description="We're putting together new ways to experience The Preloved Professional beyond the map. More details are on the way."
        />
      </Container>
    </main>
  );
}
