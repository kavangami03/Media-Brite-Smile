import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CalendarClock,
  HeartHandshake,
  MapPin,
  Microscope,
  PiggyBank,
  ScanLine,
  Stethoscope,
  Users,
  Zap,
} from "lucide-react";
import { doctors, site } from "@/content/site";
import { PageHero, type Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { DoctorStack, LinkTile, RatingCard } from "@/components/page/bits";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { Counter } from "@/components/motion/counter";
import { JsonLd, pageSchema } from "@/lib/schema";

const title = "About Media Brite Smile | Dentist in Media, PA";
const description = `Meet the team at Media Brite Smile in Media, PA: three dentists, microscope-assisted restorations and ${site.rating.score} stars from ${site.rating.count} Google reviews.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about-us" },
};

const crumbs: Crumb[] = [{ label: "Home", href: "/" }, { label: "About Us" }];

const pillars = [
  {
    icon: Stethoscope,
    title: "The treatment stays here",
    text: "Implants, root canals, extractions and dentures are all done in this building. You are not handed a referral letter halfway through a treatment plan.",
  },
  {
    icon: Users,
    title: "Three dentists, not one",
    text: "More appointment times, cover when someone is away, and a colleague to look at a difficult case without sending you elsewhere.",
  },
  {
    icon: PiggyBank,
    title: "A way to pay without insurance",
    text: "The in-house Dental Savings Plan covers routine care for a set annual cost, and CareCredit spreads bigger treatment monthly. You know the cost before treatment starts.",
  },
];

const tech = [
  {
    icon: Microscope,
    title: "High-powered microscopes",
    text: "Fillings and crowns are prepared and checked magnified, at the margin where restorations usually fail.",
  },
  {
    icon: ScanLine,
    title: "Intraoral scanner",
    text: "Teeth are scanned digitally rather than with impression putty. It fits better and avoids the gag reflex.",
  },
  {
    icon: Zap,
    title: "Digital X-rays",
    text: "Images appear on screen in seconds, so the dentist can show you what they are looking at.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageSchema({ path: "/about-us", name: title, description, crumbs, type: "AboutPage" })} />

      <PageHero
        eyebrow="About us"
        title={
          <>
            About <span className="text-brand-500">Media Brite Smile</span>
          </>
        }
        lead="A three-dentist practice on N Pennell Road in Media, treating families, nervous patients and anyone who has been told they need work done and wants a second look at it."
        aside={
          <div className="relative pb-10 sm:pb-12">
            <ImageReveal className="aspect-4/3 rounded-4xl shadow-lift sm:rounded-5xl" immediate delay={0.2}>
              <Image
                data-reveal-media
                src="/images/office/office-5.jpg"
                alt={`Reception at ${site.name}, ${site.address.full}`}
                fill
                priority
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <RatingCard className="absolute bottom-0 left-4 w-56 sm:left-6 lg:-left-8" />
            <div className="absolute top-4 right-4 flex items-center gap-3 rounded-full bg-white/95 py-2 pr-4 pl-2 shadow-lift sm:top-6 sm:right-6">
              <DoctorStack size="size-9" />
              <span className="text-sm leading-tight font-semibold text-ink">
                3 dentists
                <span className="block text-xs font-medium text-muted">one practice</span>
              </span>
            </div>
          </div>
        }
      />

      {/* ---------- Who we are ---------- */}
      <section className="bg-white section-y" aria-labelledby="who-heading">
        <div className="container-site grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead
              id="who-heading"
              eyebrow="Who we are"
              title={
                <>
                  A family, cosmetic and <span className="text-brand-500">implant</span> practice
                </>
              }
            />
            <Reveal y={24}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed">
                <p>
                  {site.name} is a family, cosmetic and implant practice at {site.address.full}. Three dentists work
                  here, and between them they cover routine care, gum treatment, cosmetic work, implants, dentures and
                  root canals.
                </p>
                <p>
                  That matters more than it sounds. A lot of practices this size refer the harder work out, which means
                  a new office, a new set of X-rays and a wait. Here it stays in one place.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="flex min-w-0 flex-col gap-4 lg:justify-center">
            {/* three portrait cards: a swipeable row on phones, three columns from 640px */}
            <RevealGroup
              className="-mx-4 flex snap-x snap-mandatory [scrollbar-width:none] gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden"
              stagger={0.08}
            >
              {doctors.map((d) => (
                <RevealItem key={d.href} className="w-[68%] shrink-0 snap-start min-[481px]:w-[46%] sm:w-auto">
                  <Link
                    href={d.href}
                    className="group relative block aspect-3/4 overflow-hidden rounded-3xl bg-mist ring-1 ring-line"
                  >
                    <Image
                      src={d.image}
                      alt={`${d.name}, ${d.credential}`}
                      fill
                      sizes="(min-width:1024px) 17vw, (min-width:640px) 31vw, 68vw"
                      className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                      style={{ objectPosition: d.position }}
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-3/5 bg-linear-to-t from-ink/90 via-ink/45 to-transparent"
                    />
                    <span className="absolute top-3 left-3 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold tracking-[0.12em] text-brand-700">
                      {d.credential}
                    </span>
                    <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/95 text-ink transition-[transform,background-color,color] duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-4">
                      <span className="block text-base leading-tight font-bold tracking-tight text-white sm:text-lg">
                        {d.name}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-white/80">{d.focus}</span>
                    </span>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal y={16}>
              <Link
                href="/about-us/meet-the-staff"
                className="group flex items-center gap-4 rounded-3xl bg-ink p-4 text-white transition-shadow duration-500 hover:shadow-lift sm:p-5"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-glow">
                  <Users className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block leading-snug font-bold tracking-tight sm:text-lg">The rest of the team</span>
                  <span className="mt-0.5 block text-sm text-white/65">Hygienists, assistants and the front desk</span>
                </span>
                <span className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-glow transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white min-[481px]:inline-flex">
                  Meet the team
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-glow min-[481px]:hidden" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Numbers ---------- */}
      <section className="bg-white pb-[clamp(2.5rem,1.5rem+3vw,4.5rem)]" aria-label="The practice in numbers">
        <div className="container-site">
          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-4xl bg-white/10 bg-linear-to-br from-ink to-brand-950 text-white lg:grid-cols-4">
              {[
                { to: 3, label: "Dentists under one roof" },
                { to: site.rating.score, decimals: 1, label: "Google rating", suffix: "★" },
                { to: site.rating.count, label: "Google reviews" },
                { to: 40, label: "Dental plans billed directly", suffix: "+" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-2 px-6 py-8 sm:px-8 sm:py-10">
                  <dt className="text-sm text-white/60">{s.label}</dt>
                  <dd className="order-first text-4xl font-bold tracking-tighter text-white tabular-nums sm:text-5xl">
                    <Counter to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------- Nervous patients ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="nervous-heading">
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <ImageReveal className="aspect-5/4 rounded-4xl sm:rounded-5xl" direction="left">
            <Image
              data-reveal-media
              src="/images/office/waiting-room.webp"
              alt={`Waiting area at ${site.name}, Media PA`}
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </ImageReveal>
          <div>
            <SectionHead
              id="nervous-heading"
              eyebrow="Nervous patients"
              title={
                <>
                  Tell us <span className="text-brand-500">before</span> you book
                </>
              }
              lead="Not when you are already in the chair. Dental anxiety is common, and it changes how an appointment should be paced."
            />
            <RevealGroup className="mt-8 space-y-3" stagger={0.08}>
              {[
                "The first visit can be a look and a conversation rather than treatment.",
                "You can agree a signal to stop at any point.",
                "If it has been years since your last visit, you get the findings and the options without a lecture about the gap.",
              ].map((t) => (
                <RevealItem key={t}>
                  <p className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-line">
                    <HeartHandshake className="mt-0.5 size-5 shrink-0 text-brand-500" />
                    <span className="text-[1.0625rem] leading-relaxed text-ink">{t}</span>
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal className="mt-6">
              <Link
                href="/patient-information/care-and-comfort"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
              >
                Care and comfort for anxious patients <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Microscopes ---------- */}
      <section className="relative isolate overflow-hidden bg-ink section-y text-white" aria-labelledby="micro-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 right-0 size-160 rounded-full glow-blob text-brand-500/25" />
        </div>
        <div className="container-site grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* the room, with a "lens" that magnifies part of it: the idea of the section in one picture */}
          <Reveal>
            <div className="relative pb-10 sm:pb-14 lg:pb-0">
              <div className="relative aspect-4/3 overflow-hidden rounded-4xl ring-1 ring-white/10 lg:aspect-4/5">
                <Image
                  src="/images/office/operatory-1.webp"
                  alt={`Treatment room at ${site.name}, Media PA`}
                  fill
                  sizes="(min-width:1024px) 45vw, 100vw"
                  className="object-cover"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-transparent"
                />
                <span className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-ink/80 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-white/15">
                  <Microscope className="size-4 text-glow" /> Treatment room, Media PA
                </span>
              </div>

              {/* magnifier: the same photo, zoomed in on the chair and light */}
              <div
                aria-hidden="true"
                className="absolute right-4 bottom-0 size-36 rounded-full bg-ink p-2 shadow-lift sm:right-8 sm:size-48 lg:-right-6 lg:-bottom-6 lg:size-56"
              >
                <div className="relative size-full overflow-hidden rounded-full ring-2 ring-glow/70">
                  <Image
                    src="/images/office/operatory-1.webp"
                    alt=""
                    fill
                    sizes="240px"
                    className="origin-[18%_50%] scale-[2.4] object-cover"
                  />
                  {/* reticle */}
                  <span className="absolute inset-x-1/2 top-3 bottom-3 w-px -translate-x-1/2 bg-white/35" />
                  <span className="absolute inset-y-1/2 right-3 left-3 h-px -translate-y-1/2 bg-white/35" />
                  <span className="absolute inset-[22%] rounded-full ring-1 ring-white/40" />
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHead
              id="micro-heading"
              tone="light"
              eyebrow="Why we work under a microscope"
              title={
                <>
                  A filling fails where it <span className="text-glow">meets</span> your tooth
                </>
              }
              lead="A margin that looks fine to the naked eye can still leave a gap for bacteria. Restorative work here is prepared and checked under magnification. It is slower. It is also the difference between a restoration that lasts and one you are back for."
            />
            <RevealGroup className="mt-10" stagger={0.1}>
              <ol className="border-b border-white/10">
                {tech.map(({ icon: Icon, title: t, text }, i) => (
                  <li key={t} className="border-t border-white/10">
                    <RevealItem className="group grid grid-cols-[auto_1fr] items-start gap-5 py-6">
                      <span className="relative grid size-14 place-items-center rounded-2xl bg-white/5 text-glow ring-1 ring-white/10 transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                        <Icon className="size-6" />
                        <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-brand-500 text-xs font-bold text-white ring-2 ring-ink">
                          {i + 1}
                        </span>
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xl font-semibold tracking-tight text-white">{t}</span>
                        <span className="mt-1.5 block leading-relaxed text-white/65">{text}</span>
                      </span>
                    </RevealItem>
                  </li>
                ))}
              </ol>
            </RevealGroup>
            <Reveal className="mt-8">
              <Link
                href="/patient-information/care-and-comfort/advanced-technology"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white/10 px-6 font-semibold text-glow ring-1 ring-white/15 transition-colors hover:bg-brand-500 hover:text-white"
              >
                The equipment we use and why <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- What makes us different ---------- */}
      <section className="bg-white section-y" aria-labelledby="diff-heading">
        <div className="container-site">
          <SectionHead
            id="diff-heading"
            eyebrow="What makes us different"
            title={
              <>
                Three things, and none of them are <span className="text-brand-500">slogans</span>
              </>
            }
            aside={
              <Link
                href="/patient-information/why-choose-us"
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
              >
                Why patients choose us <ArrowUpRight className="size-4" />
              </Link>
            }
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
            {pillars.map(({ icon: Icon, title: t, text }, i) => (
              <RevealItem key={t}>
                <div className="group relative h-full overflow-hidden rounded-4xl bg-pearl p-8 ring-1 ring-line transition-shadow duration-500 hover:shadow-lift">
                  <span className="absolute top-6 right-7 text-6xl leading-none font-bold tracking-tighter text-brand-500/10 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="grid size-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-6" />
                  </span>
                  <p className="mt-8 text-2xl font-bold tracking-tight text-ink">{t}</p>
                  <p className="mt-3 leading-relaxed">{text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- Proof + where to find us ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="find-heading">
        <div className="container-site grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="flex h-full flex-col justify-between gap-8 rounded-4xl bg-linear-to-br from-brand-600 to-brand-900 p-8 text-white sm:p-10">
              <div>
                <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">What patients say</p>
                <p className="mt-4 text-3xl leading-tight font-bold tracking-tight text-balance">
                  {site.rating.score} stars from {site.rating.count} Google reviews
                </p>
                <p className="mt-3 text-white/75">
                  More reviews than most practices in Media have collected, and the rating has held up across them.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/about-us/patient-reviews"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink hover:bg-glow"
                >
                  Read the reviews <ArrowUpRight className="size-4" />
                </Link>
                <Link
                  href="/about-us/smile-gallery"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/10"
                >
                  Before-and-after results
                </Link>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHead
              id="find-heading"
              eyebrow="Where to find us"
              title={
                <>
                  {site.address.street}, <span className="text-brand-500">Media</span>
                </>
              }
              lead="Open from 8am Monday to Friday. Patients travel in from across eastern and central Delaware County, including Swarthmore, Wallingford, Springfield, Brookhaven and Aston."
            />
            <RevealGroup className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3" stagger={0.08}>
              <RevealItem>
                <LinkTile
                  stacked
                  href="/contact-us"
                  icon={<CalendarClock className="size-5" />}
                  title="Hours & directions"
                  text="Map, opening hours and how to reach us."
                />
              </RevealItem>
              <RevealItem>
                <LinkTile
                  stacked
                  href="/about-us/office-tour"
                  icon={<Building2 className="size-5" />}
                  title="Office tour"
                  text="Take a look around before you visit."
                />
              </RevealItem>
              <RevealItem>
                <LinkTile
                  stacked
                  href="/areas-we-serve"
                  icon={<MapPin className="size-5" />}
                  title="Areas we serve"
                  text="Every town we cover and the route in."
                />
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Meet the team <span className="text-glow">in person</span>
          </>
        }
        text="Book a first visit and find out what is actually going on with your teeth, in plain words."
        image="/images/office/waiting-room-2.webp"
      />
    </>
  );
}
