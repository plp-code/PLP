import type { Metadata } from "next";
import Banner from "@/components/ui/Banner";
import { Container } from "@/components/ui/Container";
import { Subtitle } from "@/components/ui/Typography";
import WaitlistForm from "@/components/features/marketing/WaitlistForm";

export const metadata: Metadata = {
  title: "Waitlist",
  description:
    "Join the PLP waitlist to receive launch updates and early access to new releases.",
};

export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-plp-parchment flex flex-col font-text selection:bg-plp-lime selection:text-plp-maroon">
      <Banner
        eyebrow="Access request"
        title="Join the waitlist"
        description="Sign up for early access, launch updates, and editorial announcements."
        contentClassName="py-14 md:py-20"
      />

      <Container
        as="section"
        className="flex-1 flex flex-col items-center py-8 md:py-12"
        contentClassName="max-w-3xl w-full flex flex-col items-center"
      >
        <div className="w-full space-y-12">
          <div className="text-center">
            <Subtitle className="text-base md:text-lg text-plp-maroon/90 leading-relaxed font-serif italic max-w-2xl mx-auto">
              Provide your email to receive updates and exclusive access to the
              launch path.
            </Subtitle>
          </div>

          <div className="relative w-full p-8 md:p-12 border border-plp-maroon/10 bg-[#f8f5ee] shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
            <WaitlistForm />

            <div className="absolute -top-3 -right-3 w-8 h-8 border-t border-r border-plp-maroon/30 pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b border-l border-plp-maroon/30 pointer-events-none" />
          </div>
        </div>
      </Container>
    </main>
  );
}