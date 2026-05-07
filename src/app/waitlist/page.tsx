"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { Container } from "@/components/common/Container";
import { Display, Label, Subtitle } from "@/components/common/Typography";

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <main className="min-h-screen bg-plp-parchment flex flex-col font-text selection:bg-plp-lime selection:text-plp-maroon">
      <Container className="flex-1 flex flex-col justify-center py-20 md:py-28">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-24 items-center">
            {/* LEFT SIDE: SIMPLE MESSAGE */}
            <div className="space-y-6">
              <div className="space-y-4">
                <Display className="text-6xl md:text-8xl leading-[0.85] lowercase text-plp-maroon tracking-tighter">
                  Join Today
                </Display>
              </div>

              <div className="h-px w-12 bg-plp-maroon" />

              <Subtitle className="text-base md:text-lg text-plp-maroon/90 max-w-sm leading-relaxed font-serif italic">
                Provide your email to receive updates and exclusive access to
                the [content].
              </Subtitle>

              <div className="flex items-center gap-2 text-plp-maroon/50 pt-2">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Secure & Private Connection
                </span>
              </div>
            </div>

            <div className="relative">
              <form className="space-y-10">
                <div className="group relative">
                  <div className="flex items-center gap-2 mb-4 opacity-30">
                    <Lock size={12} className="text-plp-maroon" />
                    <Label className="text-[9px] uppercase tracking-[0.2em]">
                      Verified Email
                    </Label>
                  </div>

                  <input
                    type="email"
                    autoFocus
                    placeholder="YOUR@EMAIL.COM"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="w-full bg-transparent py-4 font-bodoni italic text-xl md:text-3xl outline-none border-b border-plp-maroon/20 focus:border-plp-maroon transition-colors placeholder:opacity-10 text-plp-maroon"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <div
                    className={`absolute bottom-0 left-0 h-px bg-plp-maroon transition-all duration-700 ease-in-out
                    ${isFocused ? "w-full" : "w-0"}
                  `}
                  />
                </div>

                <div className="space-y-8">
                  <button
                    type="submit"
                    className="group relative w-full border border-plp-maroon bg-plp-maroon py-5 text-plp-parchment transition-all duration-500 hover:bg-transparent hover:text-plp-maroon"
                  >
                    <div className="relative z-10 flex items-center justify-between px-8">
                      <Label className="text-xs tracking-[0.3em] font-black uppercase">
                        Join Us
                      </Label>
                      <ArrowRight className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1.5" />
                    </div>
                  </button>

                  <p className="text-[9px] leading-relaxed text-plp-maroon/40 max-w-xs uppercase tracking-wider font-bold">
                    By joining, you agree to receive digital updates. Your data
                    is never shared.
                  </p>
                </div>
              </form>

              <div className="absolute -top-6 -right-6 w-12 h-12 border-t border-r border-plp-maroon/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
