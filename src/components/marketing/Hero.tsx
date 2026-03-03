import { Display, Label } from "../common/Typography";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-stretch min-h-screen overflow-hidden lg:h-screen lg:flex-row bg-plp-parchment"
    >
      <div className="flex flex-col w-full">
        <div className="flex flex-col justify-start items-center flex-1 px-6 pt-20 md:pt-32 lg:pt-40">
          <div className="w-full text-center">
            <Display className="inline-block whitespace-nowrap md:text-[8.25vw] leading-[0.8] tracking-tight mb-6">
              the preloved professional
            </Display>
          </div>

          <div className="w-full text-center">
            <Label className="md:text-[3vw] tracking-wide font-bold opacity-80 uppercase">
              Power never goes out of style.
            </Label>
          </div>

          <div className="w-full h-16 border-2 border-plp-maroon mt-28">
            <div className="text-center text-black text-sm font-bold py-4">
              something
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
