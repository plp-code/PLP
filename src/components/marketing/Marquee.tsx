// change to carasoul animation

import { Plus } from "lucide-react";
import { Container } from "../common/Container";

interface MarqueeProps {
  text?: string[];
}

export default function Marquee({
  text = [
    "We’re changing what it means to show-up at work.",
    "style as a professional strategy",
  ],
}: MarqueeProps) {
  return (
    <Container
      fullBleed
      className="py-12 bg-plp-maroon text-plp-lime overflow-hidden whitespace-nowrap border-b-2 border-plp-maroon"
    >
      <div className="flex animate-marquee gap-16 items-center font-seventies text-6xl lg:text-8xl lowercase italic opacity-90">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-16 items-center">
            {text.map((phrase, j) => (
              <span key={j} className="flex gap-16 items-center">
                {phrase}
                <Plus className="w-8 h-8 rotate-45" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}
