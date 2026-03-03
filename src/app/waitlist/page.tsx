"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Display, Label, Subtitle } from "@/components/common/Typography";
import Footer from "@/components/layout/Footer";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();
  const archiveCode = `Archive Series: ${currentYear.toString().slice(-2)}-2`;

  return (
    <main className="min-h-screen bg-plp-parchment flex flex-col">
      <nav className="p-6 border-b-2 border-plp-maroon flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <Label className="text-[10px]">Back to Index</Label>
        </Link>
        <Label className="text-plp-maroon font-black uppercase tracking-tighter">
          {archiveCode}
        </Label>
      </nav>

      <Container
        bg="bg-transparent"
        className="flex-1 flex flex-col justify-center py-12 md:py-24"
      >
        <div className="max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <div className="space-y-8">
              <Label className="text-plp-maroon/40 block">
                Subject: Membership Intake
              </Label>
              <Display className="text-7xl md:text-9xl leading-[0.8] lowercase">
                request for <br /> archive access
              </Display>
              <Subtitle className="text-lg md:text-xl opacity-80 max-w-sm">
                Participation is by invitation or request. Please submit your
                primary electronic mail address to begin the verification
                process.
              </Subtitle>
            </div>

            <form className="space-y-8 pb-4">
              <div className="relative border-b-2 border-plp-maroon pb-4 transition-all focus-within:border-plp-lime">
                <Label className="text-[9px] mb-4 block opacity-50 uppercase tracking-widest">
                  Official Communication Channel [Email]
                </Label>
                <input
                  type="email"
                  autoFocus
                  placeholder="USER@LOCATION.COM"
                  className="w-full bg-transparent font-Bodoni italic text-2xl md:text-4xl outline-none placeholder:opacity-10 text-plp-maroon"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-col gap-6">
                <button
                  type="submit"
                  className="w-full bg-plp-maroon text-plp-parchment py-6 px-8 flex justify-between items-center group hover:bg-plp-lime hover:text-plp-maroon transition-all duration-500 shadow-lg"
                >
                  <Label className="text-sm tracking-[0.3em]">
                    Submit Credentials
                  </Label>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>

                <p className="text-[8px] uppercase tracking-[0.2em] leading-loose opacity-40 italic max-w-xs">
                  Legal Notice: By submitting this form, you authorize the
                  Preloved Professional to transmit periodic digital
                  correspondence. Data is processed according to archive
                  confidentiality standards.
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>

      <Footer />
    </main>
  );
}
