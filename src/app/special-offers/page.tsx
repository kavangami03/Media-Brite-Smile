import type { Metadata } from "next";
import { topicImages as T } from "@/content/topic-images";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  CreditCard,
  Crown,
  Gift,
  PiggyBank,
  Receipt,
  Smile,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { membership, site } from "@/content/site";
import { PageHero, type Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { FaqAccordion, type QA } from "@/components/page/faq-accordion";
import { LinkTile, Steps } from "@/components/page/bits";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd, pageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const title = "Affordable Dentist in Media, PA | $99 New Patient";
const description =
  "Current offers at Media Brite Smile in Media, PA: $99 new patient exam, $1,000 off Invisalign, $500 off implants, $100 off whitening.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/special-offers" },
};

const crumbs: Crumb[] = [{ label: "Home", href: "/" }, { label: "Special Offers" }];

/* Every figure below is from the approved fact sheet (Offers and prices). */
const deals = [
  {
    id: "new-patient",
    icon: UserPlus,
    short: "$99 new patient",
    value: "$99",
    unit: "exam",
    name: "New Patient Special",
    regular: "Regular price $315",
    who: "For uninsured patients",
    includes: ["A full new patient examination", "For under a third of the usual fee"],
    body: "The offer to use if you have been putting off a check-up because you do not have dental insurance and did not want an open-ended bill.",
    links: [{ label: "Book the $99 special", href: site.bookingHref }],
    featured: true,
  },
  {
    id: "invisalign",
    icon: Smile,
    short: "$1,000 off Invisalign",
    value: "$1,000",
    unit: "off",
    name: "Invisalign Treatment",
    regular: "Regular price $5,800",
    who: "Teens and adults",
    includes: ["Free consultation", "Free take-home whitening kit when you start"],
    body: "Clear removable aligners rather than fixed braces. Dr. Zan Chaudhary is Invisalign certified, and treatment typically runs 6 to 18 months depending on the case.",
    links: [
      { label: "How Invisalign works", href: "/cosmetic-dentistry/invisalign" },
      { label: "Book a free consultation", href: site.bookingHref },
    ],
  },
  {
    id: "implants",
    icon: Crown,
    short: "$500 off implants",
    value: "$500",
    unit: "off",
    name: "Implant, Abutment & Crown",
    regular: "Regular price starting at $3,999",
    who: "Single tooth implants",
    includes: ["Free consultation", "All three parts of the implant"],
    body: "The post placed in the jaw, the abutment connecting it, and the crown on top. Implants are placed by Dr. Bhadresh Makani DDS and planned on CBCT 3D imaging.",
    links: [
      { label: "About dental implants", href: "/restorative-dentistry/dental-implants" },
      { label: "Book a free consultation", href: site.bookingHref },
    ],
  },
  {
    id: "whitening",
    icon: Sparkles,
    short: "$100 off whitening",
    value: "$100",
    unit: "off",
    name: "Teeth Whitening",
    regular: "Regular price $550",
    who: "Professional whitening",
    includes: ["$249 take-home whitening kit", "Lifetime refills"],
    body: "The lifetime refills are the part worth noticing. Most whitening is a one-off, and this keeps you topped up afterwards.",
    links: [
      { label: "About teeth whitening", href: "/cosmetic-dentistry/teeth-whitening" },
      { label: "Book whitening", href: site.bookingHref },
    ],
  },
];

const faqs: QA[] = [
  {
    q: "Who can use the $99 New Patient Special?",
    a: `It is for new patients without dental insurance, against a regular price of $315 for the examination. If you do have insurance, call ${site.phone.display} with your plan name and the team will work out what your policy covers before you book.`,
  },
  {
    q: "Can I combine two offers?",
    a: "Ask when you book. Each offer applies to a specific treatment, so combining depends on what you are having done. The $1,000 off Invisalign already includes a free take-home whitening kit at the start of treatment, so that pairing is built in.",
  },
  {
    q: "Is the free consultation really free?",
    a: "Yes, for Invisalign and for implants. You get the assessment and a plan with costs, and you decide afterwards. There is no obligation to proceed, and nothing is booked at the consultation unless you ask for it.",
  },
  {
    q: "What does the $500 off implant offer actually include?",
    a: "The implant post, the abutment that connects it, and the crown on top, against a regular price starting at $3,999. A free consultation is included. Ask any practice whether their quoted implant price covers all three parts, because many quote them separately.",
  },
  {
    q: "Does the whitening kit really come with lifetime refills?",
    a: "Yes. The $249 take-home kit included with the whitening offer comes with lifetime refills, which is what separates it from a one-off whitening appointment. Results still depend on the type of staining, and whitening does not lighten crowns, veneers or fillings.",
  },
  {
    q: "How do I claim one of these?",
    a: `Mention the offer when you call ${site.phone.display} or when you send an appointment request. It is applied to that appointment. For Invisalign and implants the free consultation is the first step.`,
  },
];

/** A price-tag card: value stub on top, a perforated tear line, then what is included and the claim button. */
function Coupon({ d }: { d: (typeof deals)[number] }) {
  const dark = d.featured;
  const Icon = d.icon;
  const book = d.links.find((l) => l.href === site.bookingHref);
  const more = d.links.filter((l) => l !== book);
  return (
    <article
      id={d.id}
      aria-labelledby={`${d.id}-name`}
      className={cn(
        "group relative flex h-full scroll-mt-28 flex-col rounded-4xl shadow-lift transition-transform duration-500 ease-out-expo hover:-translate-y-1.5",
        dark ? "bg-linear-to-br from-brand-500 via-brand-600 to-brand-800 text-white" : "bg-white text-ink",
      )}
    >
      {/* value */}
      <div className="relative p-6 pb-5 sm:p-7 sm:pb-6">
        <div className="flex items-center justify-between gap-3">
          <p className={cn("text-xs font-bold tracking-[0.16em] uppercase", dark ? "text-white/85" : "text-brand-600")}>
            {d.who}
          </p>
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-2xl",
              dark ? "bg-white/15 text-white ring-1 ring-white/25" : "bg-brand-50 text-brand-600 ring-1 ring-brand-100",
            )}
          >
            <Icon className="size-5" />
          </span>
        </div>
        <p className="mt-5 flex items-baseline gap-2">
          <span className="text-[clamp(3rem,2.4rem+1.8vw,4rem)] leading-none font-bold tracking-tighter">
            {d.value}
          </span>
          <span className={cn("text-base font-semibold", dark ? "text-white/80" : "text-muted")}>{d.unit}</span>
        </p>
        <p className={cn("mt-2 text-sm line-through decoration-1", dark ? "text-white/65" : "text-muted")}>
          {d.regular}
        </p>
      </div>

      {/* perforation: dashed tear line with notches cut into the card edges */}
      <div aria-hidden="true" className="relative h-6">
        <span
          className={cn(
            "absolute inset-x-6 top-1/2 border-t-2 border-dashed",
            dark ? "border-white/30" : "border-line",
          )}
        />
        <span className="absolute top-0 -left-3 size-6 rounded-full bg-ink" />
        <span className="absolute top-0 -right-3 size-6 rounded-full bg-ink" />
      </div>

      {/* details */}
      <div className="flex flex-1 flex-col p-6 pt-4 sm:p-7 sm:pt-5">
        <h3
          id={`${d.id}-name`}
          className={cn("text-xl leading-snug font-bold tracking-tight sm:text-2xl", dark ? "text-white" : "text-ink")}
        >
          {d.name}
        </h3>
        <ul className="mt-4 space-y-2">
          {d.includes.map((i) => (
            <li key={i} className="flex items-start gap-2.5 font-medium">
              <span
                className={cn(
                  "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                  dark ? "bg-white text-brand-600" : "bg-brand-500 text-white",
                )}
              >
                <Check className="size-3" strokeWidth={3} />
              </span>
              {i}
            </li>
          ))}
        </ul>
        <p className={cn("mt-4 leading-relaxed", dark ? "text-white/80" : "text-body")}>{d.body}</p>

        <div className="mt-auto pt-6">
          {more.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={cn(
                "mb-3 inline-flex min-h-11 items-center gap-2 font-semibold",
                dark ? "text-white hover:text-glow" : "text-brand-600 hover:text-brand-700",
              )}
            >
              {l.label} <ArrowUpRight className="size-4" />
            </Link>
          ))}
          {book && (
            <Link
              href={book.href}
              className={cn(
                "flex min-h-13 w-full items-center justify-between gap-3 rounded-full py-2 pr-2 pl-6 font-semibold transition-colors duration-300",
                dark ? "bg-white text-ink hover:bg-brand-50" : "bg-ink text-white hover:bg-brand-600",
              )}
            >
              {book.label}
              <span
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-45",
                  dark ? "bg-brand-500 text-white" : "bg-white/15 text-white",
                )}
              >
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function SpecialOffersPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/special-offers",
          name: title,
          description,
          crumbs,
          faqs,
          extra: [
            {
              "@type": "OfferCatalog",
              name: `${site.name} special offers`,
              itemListElement: deals.map((d) => ({
                "@type": "Offer",
                name: `${d.value} ${d.unit === "off" ? "off " : ""}${d.name}`,
                description: `${d.regular}. ${d.includes.join(", ")}.`,
                seller: { "@id": `${site.url}/#dentist` },
              })),
            },
          ],
        })}
      />

      <PageHero
        eyebrow="Special offers"
        title={
          <>
            Affordable dentist in Media, PA: <span className="text-brand-500">current offers</span>
          </>
        }
        lead="Four current offers, each with the regular price beside it so you can see what you are actually saving. The $99 new patient exam is aimed squarely at people with no dental insurance."
        primary={{ label: "Claim an Offer", href: site.bookingHref }}
        aside={
          <div className="relative mx-auto max-w-md">
            <div className="absolute inset-0 translate-x-6 -translate-y-4 rotate-6 rounded-5xl bg-brand-500/20" />
            <div className="absolute inset-0 translate-x-3 -translate-y-2 rotate-3 rounded-5xl bg-white ring-1 ring-line" />
            <div className="relative overflow-hidden rounded-5xl bg-linear-to-br from-brand-500 via-brand-600 to-brand-900 p-8 text-white shadow-lift sm:p-10">
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 size-72 rounded-full glow-blob text-glow/35"
              />
              <div className="relative">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-glow uppercase">
                  <Gift className="size-4" /> New patient special
                </p>
                <p className="mt-6 text-[clamp(5rem,14vw,8rem)] leading-none font-bold tracking-tighter">$99</p>
                <p className="mt-2 text-lg text-white/80">
                  <span className="line-through decoration-1">Regular $315</span> · for uninsured patients
                </p>
                <div className="mt-8 border-t-2 border-dashed border-white/25 pt-6">
                  <p className="text-sm text-white/70">Plus three more offers on Invisalign, implants and whitening.</p>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ---------- Offers: a dark band so the four price tags stand out ---------- */}
      <section
        className="relative isolate overflow-hidden bg-ink pt-[clamp(2.5rem,1.5rem+3vw,4.5rem)] pb-[clamp(2rem,1.5rem+1.5vw,3rem)] text-white"
        aria-labelledby="offers-heading"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-48 -left-40 size-160 rounded-full glow-blob text-brand-500/30" />
          <div className="absolute -right-40 -bottom-56 size-160 rounded-full glow-blob text-glow/15" />
          <div className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.07)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] [background-size:22px_22px]" />
        </div>
        <div className="container-site">
          <SectionHead
            id="offers-heading"
            tone="light"
            eyebrow="The four offers"
            title={
              <>
                Every price next to <span className="text-glow">what it replaces</span>
              </>
            }
            aside={
              <nav aria-label="Jump to an offer" className="flex flex-wrap gap-2">
                {deals.map((d) => (
                  <a
                    key={d.id}
                    href={`#${d.id}`}
                    className="inline-flex min-h-11 items-center rounded-full bg-white/5 px-4 text-sm font-semibold text-white ring-1 ring-white/15 transition-colors hover:bg-white/10 hover:ring-glow/60"
                  >
                    {d.short}
                  </a>
                ))}
              </nav>
            }
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
            {deals.map((d) => (
              <RevealItem key={d.id} className="h-full">
                <Coupon d={d} />
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-6">
            <p className="text-sm text-white/60">
              Mention the offer when you call {site.phone.display} or send an appointment request. Prices are the
              practice&apos;s published rates.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Savings plan ---------- */}
      <section className="bg-white section-y" aria-labelledby="plan-heading">
        <div className="container-site">
          <Reveal>
            <div className="grid grid-cols-1 overflow-hidden rounded-4xl bg-ink text-white sm:rounded-5xl lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-12">
                <p className="flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-glow uppercase">
                  <PiggyBank className="size-4" /> No insurance?
                </p>
                <h2 id="plan-heading" className="mt-4 text-display-md font-bold text-balance text-white">
                  There is a plan for <span className="text-glow">that too</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">
                  Separate from the offers above, the in-house Dental Savings Plan covers a year of routine care for a
                  flat fee, plus {membership.discount.replace(", including fillings, crowns, dentures and more", "")}{" "}
                  such as fillings, crowns and dentures.
                </p>
                <Link
                  href="/about-us/dental-savings-plan"
                  className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 font-semibold text-ink hover:bg-glow"
                >
                  The Dental Savings Plan in full <ArrowUpRight className="size-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/10">
                {membership.prices.map((p) => (
                  <div key={p.label} className="flex min-w-0 flex-col justify-center bg-white/5 p-5 sm:p-8">
                    <p className="text-sm text-white/60">{p.label}</p>
                    <p className="mt-1 text-4xl font-bold tracking-tighter sm:text-5xl">${p.price}</p>
                    <p className="text-sm text-white/60">per year</p>
                  </div>
                ))}
                <ul className="col-span-2 grid grid-cols-1 gap-2 bg-white/5 p-8 sm:grid-cols-2">
                  {membership.includes.map((i) => (
                    <li key={i} className="flex gap-2 text-sm text-white/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-glow" /> {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- How to claim ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="claim-heading">
        <div className="container-site">
          <SectionHead
            id="claim-heading"
            eyebrow="How to claim an offer"
            title={
              <>
                Mention it when you book. <span className="text-brand-500">That is the whole process.</span>
              </>
            }
          />
          <Reveal className="mt-12">
            <Steps
              items={[
                {
                  title: "Call or send a request",
                  text: `Call ${site.phone.display}, or send an appointment request and say which offer you want.`,
                },
                { title: "It is applied", text: "The offer is applied to that appointment. Nothing else to fill in." },
                {
                  title: "Consult first",
                  text: "For Invisalign and implants, the free consultation comes first and you decide afterwards.",
                },
                {
                  title: "Insurance explained",
                  text: "If you have insurance, the team tells you how the offer and your coverage interact before anything starts.",
                },
              ]}
            />
          </Reveal>
          <RevealGroup className="mt-6 grid grid-cols-1 gap-3 lg:grid-cols-3" stagger={0.08}>
            <RevealItem>
              <LinkTile
                href="/patient-information/insurance-payment-options"
                icon={<Receipt className="size-5" />}
                title="Insurance & payment"
                text="More than 40 plans billed directly."
              />
            </RevealItem>
            <RevealItem>
              <LinkTile
                href="/patient-information/care-credit"
                icon={<CreditCard className="size-5" />}
                title="Financing with CareCredit"
                text="Spread larger treatment monthly."
              />
            </RevealItem>
            <RevealItem>
              <LinkTile
                href="/patient-information/new-patients"
                icon={<UserPlus className="size-5" />}
                title="New patients"
                text="What to expect at your first visit."
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-white section-y" aria-labelledby="offers-faq-heading">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead
            id="offers-faq-heading"
            eyebrow="Offer questions"
            title={
              <>
                The small print, <span className="text-brand-500">in plain words</span>
              </>
            }
          />
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        image={T.forms5.src}
        imageAlt={T.forms5.alt}
        title={
          <>
            Book with an offer <span className="text-glow">applied</span>
          </>
        }
        text="Say which one you want when you call, and it is applied to the appointment."
        primary={{ label: "Claim an Offer", href: site.bookingHref }}
      />
    </>
  );
}
