import Link from "next/link";
import {
  ArrowUpRight,
  BadgePercent,
  CalendarCheck,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copyright,
  FileText,
  HeartPulse,
  Info,
  ListOrdered,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  Scale,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { site } from "@/content/site";
import { legalDocs, type LegalBlock, type LegalDoc, type LegalIcon } from "@/content/legal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { Seal } from "@/components/ui/seal";
import { ToothWatermark } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { LegalToc } from "./legal-toc";

const icons: Record<LegalIcon, LucideIcon> = {
  shield: ShieldCheck,
  file: FileText,
  scale: Scale,
  mail: Mail,
  heart: HeartPulse,
  user: UserCheck,
  stethoscope: Stethoscope,
  calendar: CalendarCheck,
  phone: PhoneCall,
  copyright: Copyright,
  sparkles: Sparkles,
  star: Star,
  percent: BadgePercent,
};

const nn = (i: number) => String(i + 1).padStart(2, "0");

const blockText = (b: LegalBlock) => (typeof b === "string" ? b : "list" in b ? b.list.join(" ") : b.note);

/** Privacy Policy, Terms of Use and Disclaimer share this layout. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const words = doc.sections
    .flatMap((s) => s.body.map(blockText))
    .join(" ")
    .split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));

  return (
    <>
      <Hero doc={doc} minutes={minutes} />
      <Glance doc={doc} />

      {/* ---------- the full text ---------- */}
      <section className="bg-pearl section-y" aria-label={`${doc.title} in full`}>
        <div className="container-site grid grid-cols-1 gap-6 lg:grid-cols-[16rem_1fr] lg:gap-12 xl:grid-cols-[18rem_1fr] xl:gap-16">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <LegalToc items={doc.sections.map(({ id, title }) => ({ id, title }))} />
            <a
              href={site.phone.href}
              className="group mt-8 hidden items-center gap-4 rounded-3xl bg-ink p-5 text-white transition-shadow duration-500 hover:shadow-lift lg:flex"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-500">
                <Phone className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm text-white/60">Prefer to talk it through?</span>
                <span className="mt-1 block font-semibold">{site.phone.display}</span>
              </span>
            </a>
          </aside>

          <div className="min-w-0">
            <article className="rounded-4xl bg-white px-5 py-2 shadow-soft ring-1 ring-line sm:rounded-5xl sm:px-10 sm:py-4 lg:px-14 lg:py-6">
              {doc.sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  className="scroll-mt-32 border-b border-line py-8 last:border-b-0 sm:py-10"
                >
                  <p className="text-xs font-bold tracking-[0.16em] text-brand-500 uppercase">Section {nn(i)}</p>
                  <h2
                    id={`${s.id}-title`}
                    className="mt-2 text-2xl font-bold tracking-tight text-balance text-ink sm:text-[1.75rem]"
                  >
                    {s.title}
                  </h2>
                  <div className="mt-5 max-w-4xl space-y-5">
                    {s.body.map((b, j) => (
                      <Block key={j} block={b} />
                    ))}
                  </div>
                </section>
              ))}
            </article>

            <Questions />
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------------------------------------------------------------------
   Hero: dark card with the title and meta on the left, a stacked document
   with a rotating seal on the right; the three legal pages switch below it.
--------------------------------------------------------------------------- */
function Hero({ doc, minutes }: { doc: LegalDoc; minutes: number }) {
  const parts = doc.title.split(" ");
  const last = parts.pop();
  const first = parts.join(" ");
  const Icon = icons[doc.icon];

  const meta = [
    { Icon: CalendarClock, text: `Updated ${doc.updated}` },
    { Icon: Clock, text: `${minutes} min read` },
    { Icon: ListOrdered, text: `${doc.sections.length} sections` },
  ];

  return (
    <section className="relative bg-pearl pt-30 pb-6 lg:pt-36" aria-labelledby="legal-title">
      <div className="container-site">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
            </li>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <li aria-current="page" className="font-medium text-ink">
              {doc.title}
            </li>
          </ol>
        </nav>

        <div className="relative isolate overflow-hidden rounded-4xl bg-ink text-white sm:rounded-5xl">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(255_255_255/0.07)_1px,transparent_0)] mask-[radial-gradient(ellipse_at_70%_40%,#000_20%,transparent_70%)] bg-size-[26px_26px]" />
            <div className="absolute -top-40 right-0 size-160 rounded-full bg-brand-500/30 blur-[140px]" />
            <div className="absolute -bottom-48 -left-24 size-120 rounded-full bg-glow/15 blur-[120px]" />
            <ToothWatermark size={560} className="absolute -bottom-56 left-1/3 text-white/3" />
          </div>

          <div className="grid grid-cols-1 items-center gap-12 p-7 sm:p-12 lg:p-16 xl:grid-cols-[1.15fr_0.85fr] xl:gap-16">
            <Reveal y={30}>
              <Eyebrow tone="light">{doc.eyebrow}</Eyebrow>
              <h1 id="legal-title" className="mt-6 pb-2 text-display-lg font-bold text-white">
                {first && <>{first} </>}
                <span className="text-gradient-brand">{last}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{doc.intro}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {meta.map(({ Icon: M, text }) => (
                  <li
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full bg-white/7 px-3.5 py-2 text-[0.8125rem] whitespace-nowrap text-white/80 ring-1 ring-white/10 sm:px-4 sm:text-sm"
                  >
                    <M className="size-4 text-glow" />
                    {text}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* stacked document */}
            <Reveal y={50} delay={0.15} className="hidden xl:block" aria-hidden="true">
              <div className="relative mx-auto aspect-[4/4.3] w-full max-w-sm">
                <div className="absolute inset-0 translate-x-9 -translate-y-5 rotate-6 rounded-4xl bg-brand-500/30 ring-1 ring-white/10" />
                <div className="absolute inset-0 translate-x-4 -translate-y-2 rotate-3 rounded-4xl bg-white/10 ring-1 ring-white/15" />
                <div className="absolute inset-0 flex flex-col rounded-4xl bg-white p-7 text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)]">
                  <div className="flex items-center gap-3">
                    <span className="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-glow">
                      <Icon className="size-5.5" />
                    </span>
                    <span className="leading-tight">
                      <span className="block text-xs font-bold tracking-[0.16em] text-muted uppercase">
                        {site.name}
                      </span>
                      <span className="mt-1 block text-lg font-bold">{doc.title}</span>
                    </span>
                  </div>
                  <div className="mt-6 space-y-2.5 border-t border-line pt-6">
                    {["w-full", "w-11/12", "w-2/3"].map((w) => (
                      <span key={w} className={cn("block h-2 rounded-full bg-mist", w)} />
                    ))}
                  </div>
                  <ul className="mt-6 space-y-3">
                    {doc.glance.slice(0, 3).map((g) => (
                      <li key={g.title} className="flex items-center gap-2.5 text-sm font-semibold">
                        <CheckCircle2 className="size-5 shrink-0 text-brand-500" />
                        {g.title}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-end gap-2 border-t border-line pt-4 text-xs font-semibold text-brand-600">
                    <MapPin className="size-3.5" />
                    {site.address.full}
                  </div>
                </div>
                <Seal
                  id="legal-seal"
                  text={`${site.name} • ${doc.eyebrow} • `}
                  fit
                  className="absolute -bottom-10 -left-12"
                />
              </div>
            </Reveal>
          </div>
        </div>

        {/* switch between the three pages */}
        <nav aria-label="Policies" className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:gap-3">
          {legalDocs.map((d) => {
            const on = d.slug === doc.slug;
            const DIcon = icons[d.icon];
            return (
              <Link
                key={d.slug}
                href={`/${d.slug}`}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "group flex flex-col items-center gap-2 rounded-2xl p-3 text-center ring-1 transition-[box-shadow,background-color] duration-500 sm:rounded-3xl xl:flex-row xl:gap-4 xl:p-4 xl:pr-5 xl:text-left",
                  on
                    ? "bg-white shadow-lift ring-brand-500/30"
                    : "bg-white/60 ring-line hover:bg-white hover:shadow-soft",
                )}
              >
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-2xl transition-colors duration-300",
                    on
                      ? "bg-brand-500 text-white"
                      : "bg-mist text-brand-600 group-hover:bg-brand-500 group-hover:text-white",
                  )}
                >
                  <DIcon className="size-5" />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="block text-[0.8125rem] font-semibold text-ink sm:text-base">{d.title}</span>
                  <span className="mt-1 hidden text-sm text-muted xl:block">{d.blurb}</span>
                </span>
                {on ? (
                  <span className="hidden shrink-0 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-bold tracking-wide text-brand-700 uppercase xl:inline-block">
                    Reading
                  </span>
                ) : (
                  <ArrowUpRight className="hidden size-4 shrink-0 text-brand-500 transition-transform duration-500 group-hover:rotate-45 xl:block" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}

/* ---------- at a glance ---------- */
function Glance({ doc }: { doc: LegalDoc }) {
  return (
    <section className="bg-pearl pt-10 pb-4 sm:pt-14" aria-labelledby="glance-heading">
      <div className="container-site">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>At a glance</Eyebrow>
            <h2 id="glance-heading" className="mt-5 text-display-md font-bold">
              The short <span className="text-brand-500">version</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed">
            The four things worth knowing. The full {doc.title.toLowerCase()} follows below.
          </p>
        </div>
        <RevealGroup className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {doc.glance.map((g, i) => {
            const GIcon = icons[g.icon];
            return (
              <RevealItem key={g.title} className="h-full">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-4xl bg-white p-6 shadow-soft ring-1 ring-line transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-7">
                  <div className="flex items-start justify-between">
                    <span className="grid size-12 place-items-center rounded-2xl bg-mist text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                      <GIcon className="size-5.5" />
                    </span>
                    <span className="text-3xl leading-none font-bold tracking-tighter text-brand-500/15 tabular-nums sm:text-4xl">
                      {nn(i)}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl leading-snug font-bold tracking-tight text-balance text-ink sm:mt-7">
                    {g.title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed">{g.text}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}

/* ---------- article blocks ---------- */
function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return <p className="text-[1.0625rem] leading-relaxed wrap-anywhere">{block}</p>;
  }
  if ("list" in block) {
    return (
      <ul className="grid grid-cols-1 gap-3 rounded-3xl bg-pearl p-5 ring-1 ring-line sm:grid-cols-2 sm:p-6">
        {block.list.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-snug text-ink">
            <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
              <Check className="size-3" strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    );
  }
  if (block.call) {
    return (
      <div className="flex flex-col gap-5 rounded-3xl bg-ink p-5 text-white sm:flex-row sm:items-center sm:p-6">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500">
          <PhoneCall className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">{block.title}</p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-white/70">{block.note}</p>
        </div>
        <a
          href={site.phone.href}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors duration-300 hover:bg-glow"
        >
          <Phone className="size-4" /> {site.phone.display}
        </a>
      </div>
    );
  }
  return (
    <div className="flex gap-4 rounded-3xl bg-brand-50 p-5 ring-1 ring-brand-500/15 sm:p-6">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-soft">
        <Info className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-ink">{block.title}</p>
        <p className="mt-1 text-[0.9375rem] leading-relaxed">{block.note}</p>
      </div>
    </div>
  );
}

/* ---------- closing call to action ---------- */
function Questions() {
  return (
    <Reveal>
      <div className="relative isolate mt-6 overflow-hidden rounded-4xl bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 p-7 text-white sm:rounded-5xl sm:p-10 lg:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -right-16 size-96 rounded-full bg-glow/25 blur-[100px]" />
          <ToothWatermark size={340} className="absolute -right-16 -bottom-28 text-white/6" />
        </div>
        <div className="grid grid-cols-1 items-center gap-8 xl:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Questions? <span className="text-glow">We&apos;re happy to explain.</span>
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/75">
              Call the office or stop by. Our team will walk you through anything on this page.
            </p>
            <p className="mt-5 flex items-center gap-2 text-white/85">
              <MapPin className="size-5 shrink-0 text-glow" /> {site.address.full}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href={site.phone.href} variant="white" icon={<Phone className="size-4" />}>
              Call {site.phone.display}
            </Button>
            <Button href={site.address.directions} variant="outline-light" target="_blank" rel="noopener">
              Get directions
            </Button>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
