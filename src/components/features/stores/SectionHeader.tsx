import { Display, Subtitle } from "@/components/ui/Typography";

export function SectionHeader({
  id,
  tag,
  title,
  blurb,
}: {
  id: string;
  tag: string;
  title: string;
  blurb: string;
}) {
  return (
    <header className="mb-6 max-w-3xl md:mb-8">
      <p className="mb-3 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-plp-navy/45">
        {tag}
      </p>
      <Display as="h2" id={id} className="text-[clamp(2.25rem,5vw,3.75rem)]">
        {title}
      </Display>
      <Subtitle className="mt-3 max-w-2xl text-[18px] italic text-plp-clay md:text-[24px]">
        {blurb}
      </Subtitle>
    </header>
  );
}
