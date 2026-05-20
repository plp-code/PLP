"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck, Lock } from "lucide-react";
import { Label } from "../../ui/Typography";

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
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

        <div className="flex items-center gap-2 text-plp-maroon/50 pt-2">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Secure & Private Connection
          </span>
        </div>

        <p className="text-[9px] leading-relaxed text-plp-maroon/40 max-w-xs uppercase tracking-wider font-bold">
          By joining, you agree to receive digital updates. Your data is never shared.
        </p>
      </div>
    </form>
  );
}
