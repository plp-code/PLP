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
    <main className="flex min-h-screen flex-col bg-plp-parchment selection:bg-plp-lime selection:text-plp-maroon">
      <div className="relative">
        <Banner
          title="PLP Thrift Maps"
          description="Your path to power, store by store."
          contentClassName="py-14 md:py-20"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-[25%]">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="relative mx-auto w-[210px] rotate-[1deg] bg-[#f4e58c] px-5 pb-5 pt-6 shadow-[3px_5px_12px_rgba(61,11,25,0.15)] sm:ml-auto sm:mr-0 sm:w-[230px] sm:rotate-[1.5deg]">
              <span
                aria-hidden="true"
                className="absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-2 bg-white/45"
              />

              <p className="font-handwriting text-[18px] leading-[1.25] text-plp-maroon md:text-[20px]">
                Not a PDF.
              </p>

              <p className="mt-2 font-prata text-[11px] leading-[1.65] text-plp-maroon/70 md:text-[12px]">
                Your map lives in your account, updates as stores change, and
                filters by what you&apos;re looking for.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Container
        as="section"
        className="flex-1 py-8 md:py-12"
        contentClassName="flex w-full max-w-6xl flex-col gap-8"
      >
        <MapDirectory />
      </Container>
    </main>
  );
}
