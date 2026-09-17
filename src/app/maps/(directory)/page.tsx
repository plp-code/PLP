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

        {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-[50%] sm:translate-y-[22%]">
          <div className="mx-auto flex max-w-7xl justify-end px-3 sm:px-6 lg:px-8">
            <div className="relative w-[150px] rotate-[2deg] bg-[#f4e58c] px-3.5 pb-3.5 pt-4 shadow-[3px_5px_12px_rgba(61,11,25,0.15)] sm:w-[210px] sm:rotate-[1.5deg] sm:px-5 sm:pb-5 sm:pt-6 ">
              <span
                aria-hidden="true"
                className="absolute -top-2 left-1/2 h-3.5 w-10 -translate-x-1/2 -rotate-2 bg-white/45 sm:-top-2.5 sm:h-5 sm:w-16"
              />

              <p className="font-handwriting text-[15px] leading-none text-plp-maroon sm:text-[19px] md:text-[20px]">
                Not a PDF.
              </p>

              <p className="mt-1.5 font-prata text-[8.5px] leading-[1.55] text-plp-maroon/70 sm:mt-2 sm:text-[11px] sm:leading-[1.6] md:text-[12px]">
                <span className="sm:hidden">
                  Lives in your account. Updates with stores. Filters to what
                  you need.
                </span>

                <span className="hidden sm:inline">
                  Your map lives in your account, updates as stores change, and
                  filters by what you&apos;re looking for.
                </span>
              </p>
            </div>
          </div>
        </div> */}
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
