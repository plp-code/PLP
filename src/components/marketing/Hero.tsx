import { Display, Manifesto, Label } from "../common/Typography";

const SUB_LABELS = ["Preloved Style", "Development", "Identity"];

export default function Hero() {
  const currentYear = new Date().getFullYear();
  const archiveCode = `Archive Series: ${currentYear.toString().slice(-2)}-2`;

  return (
    <section className="relative flex flex-col items-stretch min-h-screen overflow-hidden lg:h-screen lg:flex-row bg-plp-parchment">
      <div className="flex flex-col w-full border-b-2 lg:flex-7 lg:border-b-0 lg:border-r-2 border-plp-maroon">
        <div className="flex flex-col items-start justify-between gap-4 p-4 md:p-10 border-b-2 border-plp-maroon sm:flex-row sm:items-center bg-plp-parchment/50">
          <Label className="font-black text-plp-maroon whitespace-nowrap">
            {archiveCode}
          </Label>
          <div className="flex items-center gap-4 font-bold md:gap-8">
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] opacity-40 italic">
              New York / Los Angeles
            </span>
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em]">
              Est. 2026
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 p-6 md:p-16 lg:p-20">
          <div className="lg:-mt-12">
            <Display className="text-[16vw] lg:text-[10vw] leading-[0.8] lg:leading-[0.75] -ml-1 lg:-ml-3 mb-8 lg:mb-12">
              the preloved <br /> professional
            </Display>

            <div className="flex flex-wrap items-center gap-y-3 gap-x-6">
              {SUB_LABELS.map((word, index) => (
                <div key={word} className="flex items-center gap-6">
                  <Label className="text-[10px] md:text-sm tracking-[0.3em] opacity-80 italic">
                    {word}
                  </Label>
                  {index < SUB_LABELS.length - 1 && (
                    <span className="hidden w-px h-4 sm:block bg-plp-maroon/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between w-full h-full p-6 lg:flex-5 bg-plp-parchment md:p-10">
        <div className="w-full mt-8 mb-12 lg:mt-24 lg:mb-20">
          <div className="relative w-full h-[35vh] md:h-[45vh] border-y-2 border-plp-maroon py-2 bg-plp-maroon/5 flex items-center justify-center overflow-hidden">
            <Label className="absolute top-4 left-6 opacity-30 text-[9px] tracking-widest">
              Campaign Asset 01
            </Label>

            <div className="italic text-plp-maroon/10 tracking-[0.6em] uppercase text-[10px] md:text-xs select-none">
              [ Image Asset ]
            </div>

            <Label className="absolute bottom-4 left-6 text-[8px] opacity-40 italic lowercase">
              Ref: Suitcase_Archive_v1
            </Label>
          </div>
        </div>

        <div className="max-w-md pb-8 lg:pb-12">
          <Manifesto className="text-xl leading-tight opacity-90 md:text-2xl lg:text-3xl">
            We&apos;re changing what it means to show-up at work. (some text
            here?)
          </Manifesto>
        </div>

        <div className="absolute top-0 hidden w-px h-28 right-20 bg-plp-maroon/10 lg:block" />
      </div>
    </section>
  );
}
