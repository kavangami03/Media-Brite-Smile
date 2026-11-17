import { Phone } from "lucide-react";
import { site } from "@/content/site";
import type { Town } from "@/content/towns";
import { SectionHead } from "@/components/page/section-head";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { Reveal } from "@/components/motion/reveal";

/** The town draft's own questions, beside a call card. */
export function TownFaq({ town }: { town: Town }) {
  return (
    <section className="bg-white section-y" aria-labelledby="town-faq-heading">
      <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="min-w-0">
          <div className="lg:sticky lg:top-32">
            <SectionHead
              id="town-faq-heading"
              eyebrow="Questions"
              title={
                <>
                  Questions from <span className="text-brand-500">{town.name}</span> patients
                </>
              }
            />
            <Reveal className="mt-8">
              <a
                href={site.phone.href}
                className="group flex items-center gap-4 rounded-3xl bg-ink p-5 text-white transition-shadow duration-500 hover:shadow-lift"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500">
                  <Phone className="size-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm text-white/60">Something not covered here?</span>
                  <span className="mt-1 block text-lg font-semibold">Call {site.phone.display}</span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
        <Reveal className="min-w-0">
          <FaqAccordion items={town.faqs} />
        </Reveal>
      </div>
    </section>
  );
}
