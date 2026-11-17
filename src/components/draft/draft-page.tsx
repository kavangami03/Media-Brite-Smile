import Image from "next/image";
import type { ReactNode } from "react";
import { Phone, Siren } from "lucide-react";
import { site } from "@/content/site";
import type { DraftPage } from "@/content/pages/types";
import type { TopicImage } from "@/content/topic-images";
import { PageHero, type Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { FaqAccordion } from "@/components/page/faq-accordion";
import { RatingCard } from "@/components/page/bits";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd, pageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";
import { DraftSectionView, type Tone } from "./draft-section";

export type DraftLook = {
  eyebrow: string;
  /** hero photo and the closing CTA photo (different, so no photo repeats on a page) */
  image: string;
  imageAlt: string;
  ctaImage: string;
  ctaImageAlt: string;
  /** index of the section shown on the dark band */
  dark?: number;
  /** words of the H1 to colour; defaults to "Media, PA" when present */
  accent?: string;
  crumbs: Crumb[];
  /** topic photo per section, by section index (null = no photo) */
  images?: (TopicImage | null)[];
  /** main hero button; defaults to the booking page */
  primary?: { label: string; href: string };
  /** extra sections rendered after the section with this index (e.g. a treatment card grid) */
  extras?: Record<number, ReactNode>;
};

const COST = /cost|price|spreading|ways to pay|how to spread/i;

/** "At a glance" table rows -> [label, value] pairs for the hero card. */
function glanceFacts(page: DraftPage): { index: number; facts: [string, string][] } | null {
  const index = page.sections.findIndex((s) => s.kind === "at-a-glance");
  if (index < 0) return null;
  const table = page.sections[index].items.find((i) => i.type === "table");
  if (!table || table.type !== "table") return null;
  const facts = table.rows.filter((r) => r.length === 2 && r[0]).map((r) => [r[0], r[1]] as [string, string]);
  return facts.length ? { index, facts } : null;
}

/** Section colours (white / pearl alternating, one dark band, first cost section on the brand
 *  gradient) and the displayed section numbers (blocks moved into the hero are not counted). */
function layoutSections(page: DraftPage, darkIndex: number | undefined, glanceIndex: number | undefined) {
  let light = 0;
  let brandUsed = false;
  let shown = 0;
  const tones: Tone[] = [];
  const numbers: number[] = [];
  page.sections.forEach((s, i) => {
    if (i === darkIndex) tones.push("dark");
    else if (!brandUsed && s.heading && COST.test(s.heading) && i - 1 !== darkIndex) {
      brandUsed = true;
      tones.push("brand");
    } else tones.push(light++ % 2 === 0 ? "white" : "pearl");
    numbers.push(s.kind === "safety-notice" || i === glanceIndex ? -1 : shown++);
  });
  return { tones, numbers };
}

/** Red call-first banner for urgent-care pages. */
function SafetyBanner({ text }: { text: string }) {
  return (
    <section className="bg-pearl pb-4" aria-label="Safety notice">
      <div className="container-site">
        <Reveal>
          <div className="flex flex-col gap-5 rounded-4xl bg-linear-to-r from-rose-600 to-rose-500 p-6 text-white shadow-lift sm:flex-row sm:items-center sm:p-8">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-rose-600">
              <Siren className="size-6" />
            </span>
            <p className="flex-1 text-lg leading-relaxed font-medium">{text}</p>
            <a
              href={site.phone.href}
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-rose-700 transition-colors hover:bg-rose-50"
            >
              <Phone className="size-4" /> {site.phone.display}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Accent({ text, accent }: { text: string; accent?: string }) {
  const a = accent ?? (text.includes("Media, PA") ? "Media, PA" : undefined);
  const i = a ? text.indexOf(a) : -1;
  if (!a || i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-brand-500">{a}</span>
      {text.slice(i + a.length)}
    </>
  );
}

/** Renders an approved content draft as a full page. */
export function DraftPageView({ page, look, hero }: { page: DraftPage; look: DraftLook; hero?: ReactNode }) {
  const [lead, ...more] = page.intro;
  const named = page.sections.filter((s) => s.heading);
  const glance = glanceFacts(page);
  const { tones, numbers } = layoutSections(page, look.dark, glance?.index);

  return (
    <>
      <JsonLd
        data={pageSchema({
          path: page.url,
          name: page.title,
          description: page.description,
          crumbs: look.crumbs,
          faqs: page.faqs,
        })}
      />

      <PageHero
        eyebrow={look.eyebrow}
        title={<Accent text={page.h1} accent={look.accent} />}
        lead={lead}
        primary={look.primary}
        aside={
          hero ?? (
            <div className={cn("relative sm:pb-12", !glance && "pb-10")}>
              <ImageReveal className="aspect-4/3 rounded-4xl shadow-lift sm:rounded-5xl" immediate delay={0.2}>
                <Image
                  data-reveal-media
                  src={look.image}
                  alt={look.imageAlt}
                  fill
                  priority
                  sizes="(min-width:1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </ImageReveal>
              {glance ? (
                <dl className="relative mx-3 -mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-line/60 shadow-lift ring-1 ring-white/60 min-[481px]:grid-cols-2 sm:absolute sm:inset-x-6 sm:bottom-0 sm:mx-0 sm:mt-0">
                  {glance.facts.slice(0, 4).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex min-w-0 flex-col bg-white/90 px-4 py-3 max-[375px]:px-3 sm:px-5 sm:py-4"
                    >
                      <dt className="text-xs font-bold tracking-[0.12em] text-brand-600 uppercase max-[375px]:tracking-[0.02em]">
                        {k}
                      </dt>
                      <dd className="order-first text-[0.9375rem] leading-snug font-semibold text-ink sm:text-base">
                        {v}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <RatingCard className="absolute bottom-0 left-4 w-56 sm:left-6 lg:-left-8" />
              )}
            </div>
          )
        }
      >
        {more.map((p) => (
          <p
            key={p.slice(0, 24)}
            className="mt-5 max-w-2xl rounded-2xl bg-white/70 px-4 py-3 text-[0.9375rem] leading-relaxed ring-1 ring-line"
          >
            {p}
          </p>
        ))}
        {named.length >= 4 && (
          <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
            {page.sections.map((s, i) =>
              s.heading ? (
                <a
                  key={s.heading}
                  href={`#s-${i + 1}`}
                  className="inline-flex min-h-10 items-center rounded-full bg-white px-3.5 text-sm font-medium text-ink ring-1 ring-line transition-colors hover:text-brand-700 hover:ring-brand-400"
                >
                  {s.heading}
                </a>
              ) : null,
            )}
          </nav>
        )}
      </PageHero>

      {page.sections.map((s, i) => {
        if (i === glance?.index) return look.extras?.[i] ?? null;
        if (s.kind === "safety-notice") {
          const text = s.items.find((it) => it.type === "p");
          return text && text.type === "p" ? <SafetyBanner key={i} text={text.text} /> : null;
        }
        return (
          <div key={s.heading ?? s.kind ?? i} className="contents">
            <DraftSectionView
              section={s}
              index={i}
              n={numbers[i]}
              tone={tones[i]}
              image={look.images?.[i] ?? undefined}
            />
            {look.extras?.[i]}
          </div>
        );
      })}

      {page.faqs.length > 0 && (
        <section className="bg-white section-y" aria-labelledby="draft-faq-heading">
          <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="min-w-0">
              <div className="lg:sticky lg:top-32">
                <SectionHead id="draft-faq-heading" eyebrow="Questions" title={page.faqHeading ?? "Common questions"} />
              </div>
            </div>
            <Reveal className="min-w-0">
              <FaqAccordion items={page.faqs} />
            </Reveal>
          </div>
        </section>
      )}

      {page.cta.title && (
        <CtaBand title={page.cta.title} text={page.cta.text} image={look.ctaImage} imageAlt={look.ctaImageAlt} />
      )}
    </>
  );
}

export const officeAlt = (room: string) => `${room} at ${site.name}, Media PA`;
