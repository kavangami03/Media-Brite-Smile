import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { ScrubText } from "@/components/motion/scrub-text";
import { Counter } from "@/components/motion/counter";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { site } from "@/content/site";

function Pill({ src, alt, w = "w-28 md:w-36" }: { src: string; alt: string; w?: string }) {
  return (
    <span
      data-pill
      className={`relative mx-2 inline-block h-12 ${w} translate-y-1 overflow-hidden rounded-full align-baseline shadow-soft ring-4 ring-white md:h-16`}
    >
      <Image src={src} alt={alt} fill sizes="10rem" className="object-cover" />
    </span>
  );
}

const stats = [
  { value: site.since, label: "Caring for Media since", decimals: 0, plain: true },
  { value: site.rating.score, label: "Average patient rating", decimals: 2, suffix: "★" },
  { value: site.rating.count, label: "Patient reviews", decimals: 0 },
  { value: 3, label: "Experienced dentists", decimals: 0 },
];

export function Intro() {
  return (
    <section className="section-y relative bg-white" aria-labelledby="intro-heading">
      <div className="container-site">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Welcome to Media Brite Smile</Eyebrow>
          <h2 id="intro-heading" className="sr-only">
            About Media Brite Smile
          </h2>
          <ScrubText className="mt-10 max-w-[68rem] text-[clamp(1.75rem,1.1rem+2.6vw,3.5rem)] leading-[1.18] font-semibold tracking-[-0.025em] text-ink">
            <span data-scrub>Where your comfort and oral health come first.</span>
            <Pill src="/images/office/waiting-room.webp" alt="Our bright, modern waiting room" />
            <span data-scrub>Our team blends</span>
            <Pill src="/images/office/cbct-scanner.webp" alt="3D CBCT imaging" w="w-24 md:w-32" />
            <span data-scrub>modern technology, mercury-free materials and a genuinely caring approach</span>
            <Pill src="/images/hero/section-bg.jpg" alt="A happy mother and daughter" />
            <span data-scrub>for every generation, from toddlers to grandparents.</span>
          </ScrubText>
        </div>

        <RevealGroup className="mt-24 grid grid-cols-2 gap-px overflow-hidden rounded-4xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label} className="group relative bg-white p-5 sm:p-8 md:p-10">
              <div className="absolute inset-x-0 bottom-0 h-0 bg-linear-to-t from-brand-50 to-transparent transition-all duration-700 ease-out-expo group-hover:h-full" />
              <p className="relative text-[clamp(1.875rem,1.2rem+3vw,4.25rem)] leading-none font-bold tracking-[-0.04em] text-ink">
                {s.plain ? (
                  <span>{s.value}</span>
                ) : (
                  <Counter to={s.value} decimals={s.decimals} />
                )}
                {s.suffix && <span className="ml-1 text-brand-500">{s.suffix}</span>}
              </p>
              <p className="relative mt-4 text-sm font-medium tracking-wide text-muted uppercase">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <Button href="/patient-information/why-choose-us" variant="outline">
            Why patients choose us
          </Button>
        </div>
      </div>
    </section>
  );
}
