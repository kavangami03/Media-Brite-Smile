import type { Metadata } from "next";
import { topicImages as T } from "@/content/topic-images";
import Link from "next/link";
import { ArrowUpRight, Clock, MessageCircleHeart, PencilLine, Phone, Receipt, Scale, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { PageHero, type Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { Reviews } from "@/components/sections/reviews";
import { GoogleIcon } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd, pageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const title = "Patient Reviews | Media Brite Smile, Media PA";
const description = `Media Brite Smile holds ${site.rating.score} stars from ${site.rating.count} Google reviews. Read what patients in Media, PA say, and leave a review of your own visit.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about-us/patient-reviews" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Patient Reviews" },
];

/* Themes from the Patient Reviews draft; quotes are the customer phrases recorded in the fact sheet. */
const themes: { icon: typeof Clock; title: string; quote: string | null }[] = [
  {
    icon: MessageCircleHeart,
    title: "Treatment explained before it starts",
    quote: "explained everything before they started",
  },
  {
    icon: ShieldCheck,
    title: "No judgement about the gap",
    quote: "did not make me feel judged for leaving it so long",
  },
  { icon: Clock, title: "Appointments close to their booked time", quote: null },
  { icon: Receipt, title: "Options with the costs next to them", quote: "told me what it would cost up front" },
];

function Dots({ n, className }: { n: number; className?: string }) {
  return (
    <span className="flex flex-wrap gap-[3px]" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={cn("size-1.5 rounded-full sm:size-2", className)} />
      ))}
    </span>
  );
}

export default function PatientReviewsPage() {
  return (
    <>
      <JsonLd data={pageSchema({ path: "/about-us/patient-reviews", name: title, description, crumbs })} />

      <PageHero
        eyebrow="Patient reviews"
        title={
          <>
            Media Brite Smile <span className="text-brand-500">reviews</span>
          </>
        }
        lead={`${site.rating.score} stars from ${site.rating.count} Google reviews. Read them on Google rather than taking a curated selection on our own website at face value.`}
        primary={{ label: "Read Our Google Reviews", href: site.gbp }}
        aside={
          <div className="relative overflow-hidden rounded-4xl bg-ink p-8 text-white shadow-lift sm:rounded-5xl sm:p-10">
            <div
              aria-hidden="true"
              className="absolute -top-24 -right-24 size-96 rounded-full glow-blob text-brand-500/35"
            />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-3 font-semibold">
                  <span className="grid size-11 place-items-center rounded-full bg-white">
                    <GoogleIcon size={22} />
                  </span>
                  Google reviews
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/75 ring-1 ring-white/15">
                  Unedited
                </span>
              </div>
              <p className="mt-10 text-[clamp(5rem,12vw,8.5rem)] leading-none font-bold tracking-tighter">
                {site.rating.score}
              </p>
              <div className="mt-3 flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" className="size-7 fill-amber-400">
                    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z" />
                  </svg>
                ))}
              </div>
              <p className="mt-4 text-lg text-white/75">
                from <strong className="text-white">{site.rating.count}</strong> reviews on our Google Business Profile
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                <a
                  href={site.gbp}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-ink hover:bg-glow"
                >
                  Read on Google <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={site.gbp}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white ring-1 ring-white/25 hover:bg-white/10"
                >
                  <PencilLine className="size-4" /> Leave a review
                </a>
              </div>
            </div>
          </div>
        }
      />

      {/* ---------- Where the reviews live ---------- */}
      <section className="bg-white section-y" aria-labelledby="live-heading">
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHead
              id="live-heading"
              eyebrow="Where the reviews live"
              title={
                <>
                  The one place a practice <span className="text-brand-500">cannot edit</span>
                </>
              }
            />
            <Reveal y={20}>
              <div className="mt-6 space-y-4 text-lg leading-relaxed">
                <p>
                  You will find them on our Google Business Profile. Anyone treated here can leave one, and they stay up
                  whether they are flattering or not. That is why this page links out instead of pasting a hand-picked
                  selection of quotes.
                </p>
                <p>
                  If you are comparing dentists across Delaware County, compare review counts as well as star ratings.
                </p>
              </div>
              <a
                href={site.gbp}
                target="_blank"
                rel="noopener"
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
              >
                Open our Google profile <ArrowUpRight className="size-4" />
              </a>
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-4xl bg-pearl p-6 ring-1 ring-line sm:p-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <Scale className="size-4 text-brand-500" /> Why the count matters
              </p>
              <div className="mt-6 rounded-3xl bg-white p-5 ring-1 ring-line">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-3xl font-bold tracking-tight text-ink">5.0★</span>
                  <span className="text-sm text-muted">from 11 reviews</span>
                </div>
                <div className="mt-4">
                  <Dots n={11} className="bg-slate-300" />
                </div>
              </div>
              <div className="mt-3 rounded-3xl bg-white p-5 ring-1 ring-brand-500/30">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-3xl font-bold tracking-tight text-brand-600">{site.rating.score}★</span>
                  <span className="text-sm text-muted">from {site.rating.count} reviews</span>
                </div>
                <div className="mt-4">
                  <Dots n={site.rating.count} className="bg-brand-500/80" />
                </div>
              </div>
              <p className="mt-5 text-[0.9375rem] leading-relaxed">
                A 5.0 from eleven reviews tells you far less than a {site.rating.score} from several hundred. Each dot
                is one review.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- What patients mention ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="themes-heading">
        <div className="container-site">
          <SectionHead
            id="themes-heading"
            eyebrow="What patients mention most"
            title={
              <>
                The same few things <span className="text-brand-500">keep coming up</span>
              </>
            }
            lead="If that is what you want from a dentist in Media, PA, read the reviews and see whether you believe them."
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {themes.map(({ icon: Icon, title: t, quote }) => (
              <RevealItem key={t}>
                <figure className="group flex h-full flex-col rounded-4xl bg-white p-7 ring-1 ring-line transition-shadow duration-500 hover:shadow-lift">
                  <span className="grid size-12 place-items-center rounded-2xl bg-mist text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <figcaption className="mt-6 text-xl leading-snug font-bold tracking-tight text-ink">{t}</figcaption>
                  {quote ? (
                    <blockquote className="mt-auto border-t border-line pt-5 text-[0.9375rem] text-body">
                      <span className="mb-1 block text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                        In patients&apos; words
                      </span>
                      &ldquo;{quote}&rdquo;
                    </blockquote>
                  ) : (
                    <p className="mt-auto border-t border-line pt-5 text-[0.9375rem] text-body">
                      Mentioned again and again in the reviews on Google.
                    </p>
                  )}
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/about-us/smile-gallery"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-brand-600"
            >
              See before-and-after results <ArrowUpRight className="size-4" />
            </Link>
            <Link
              href="/about-us"
              className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-ink ring-1 ring-line hover:ring-brand-400"
            >
              More about the practice and the team
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------- Reviews in full (published on the practice's current reviews page) ---------- */}
      <Reviews />

      {/* ---------- Leave a review / something went wrong ---------- */}
      <section className="bg-white pb-[clamp(2.5rem,1.5rem+3vw,4.5rem)]" aria-label="Leave a review">
        <div className="container-site grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-4xl bg-linear-to-br from-brand-500 to-brand-800 p-8 text-white sm:p-10">
              <div
                aria-hidden="true"
                className="absolute -right-16 -bottom-16 size-72 rounded-full glow-blob text-glow/30"
              />
              <div className="relative">
                <span className="grid size-14 place-items-center rounded-2xl bg-white">
                  <GoogleIcon size={28} />
                </span>
                <h2 className="mt-7 text-3xl font-bold tracking-tight text-white">Leave a review</h2>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-white/80">
                  If you have been treated here, a review helps the next person decide. It takes a minute, and it does
                  not need to be long. What you came in for and how it went is enough.
                </p>
                <a
                  href={site.gbp}
                  target="_blank"
                  rel="noopener"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink hover:bg-glow"
                >
                  <PencilLine className="size-4" /> Leave a Google review
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-4xl bg-pearl p-8 ring-1 ring-line sm:p-10">
              <span className="grid size-14 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
                <Phone className="size-6" />
              </span>
              <h2 className="mt-7 text-3xl font-bold tracking-tight">If something went wrong</h2>
              <p className="mt-3 max-w-md text-lg leading-relaxed">
                Call {site.phone.display} and ask to speak to the practice about it. You will get a faster fix that way
                than through a review, and the practice would rather hear it directly. Either way, your review stays up.
              </p>
              <a
                href={site.phone.href}
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 font-semibold text-white hover:bg-brand-600"
              >
                <Phone className="size-4" /> Call {site.phone.display}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={
          <>
            See what {site.rating.count} patients <span className="text-glow">thought</span>
          </>
        }
        text="Then book a first visit and judge for yourself."
        image={T.seniors2.src}
        imageAlt={T.seniors2.alt}
      />
    </>
  );
}
