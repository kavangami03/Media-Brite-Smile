import type { Metadata } from "next";
import { topicImages as T } from "@/content/topic-images";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Building, Check, CircleAlert, Hourglass, Minus, Sunset, X } from "lucide-react";
import { membership, site } from "@/content/site";
import { PageHero, type Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { FaqAccordion, type QA } from "@/components/page/faq-accordion";
import { Steps } from "@/components/page/bits";
import { ToothWatermark } from "@/components/ui/icons";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd, pageSchema } from "@/lib/schema";

const title = "Dental Savings Plan in Media, PA | $300 a Year";
const description =
  "No dental insurance? Our in-house plan is $300 a year, covering exams, screenings and X-rays, plus 10-15% off treatment. Media, PA.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about-us/dental-savings-plan" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Dental Savings Plan" },
];

const faqs: QA[] = [
  {
    q: "How much does the Dental Savings Plan cost?",
    a: "It is $300 a year for the first member and $275 for a second member. That covers two annual exams, one emergency exam, two oral cancer screenings, four bitewing X-rays, all individual X-rays for the year, and a full mouth series or Panorex.",
  },
  {
    q: "Is a dental savings plan the same as insurance?",
    a: "No. It is a membership with this practice, not an insurance policy, so there are no claims to file. It also does not pay out and cannot be used at another dentist. It is prepaid routine care for a year, plus 10 to 15% off additional procedures such as fillings, crowns and dentures.",
  },
  {
    q: "What is not covered by the plan?",
    a: "Treatment beyond the preventative items listed. Fillings, crowns and dentures are not covered outright; members get 10 to 15% off them instead. The plan covers the exams, screenings and X-rays in full.",
  },
  {
    q: "Can my family join on one plan?",
    a: "A second member is $275 a year. Ask when you call about adding further household members, because pricing beyond the second person is set by the practice rather than published here.",
  },
  {
    q: "How do I join the plan?",
    a: `Call ${site.phone.display} or ask at the practice. The team will explain how membership starts, what is included for the year and whether it can apply to your next visit. It is $300 for the first member and $275 for a second, so you know the cost before you join.`,
  },
  {
    q: "Is the plan worth it if I only go once a year?",
    a: "Probably not on the exams alone. It makes sense if you attend twice a year as recommended, need X-rays, or expect treatment during the year where the 10 to 15% discount applies. The team will tell you honestly if the $99 new patient offer suits you better.",
  },
];

const audiences = [
  { icon: Briefcase, title: "Self-employed", text: "No employer plan to fall back on." },
  { icon: Building, title: "No dental cover at work", text: "Your employer does not offer dental insurance." },
  { icon: Sunset, title: "Recently retired", text: "Cover ended when you stopped working." },
  { icon: Hourglass, title: "Waiting on insurance", text: "Partway through an insurance waiting period." },
];

/* Only rows the fact sheet supports. Waiting periods, annual maximums and exclusions are still to be confirmed. */
const compare: { row: string; plan: string; ins: string; planOk?: boolean; insOk?: boolean }[] = [
  { row: "What it is", plan: "A membership with this practice", ins: "An insurance policy" },
  { row: "Annual cost", plan: "$300, or $275 for a second member", ins: "Varies by plan and employer" },
  { row: "Claims to file", plan: "None", ins: "Yes", planOk: true, insOk: false },
  { row: "Use at other practices", plan: "No, here only", ins: "Yes, within the network", planOk: false, insOk: true },
  {
    row: "Discount on treatment",
    plan: "10–15% off fillings, crowns, dentures and more",
    ins: "Depends on your policy",
  },
];

export default function SavingsPlanPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/about-us/dental-savings-plan",
          name: title,
          description,
          crumbs,
          faqs,
          extra: [
            {
              "@type": "Offer",
              name: "Dental Savings Plan",
              description: `${membership.includes.join(", ")}. ${membership.discount}.`,
              price: "300",
              priceCurrency: "USD",
              seller: { "@id": `${site.url}/#dentist` },
            },
          ],
        })}
      />

      <PageHero
        eyebrow="Dental savings plan"
        title={
          <>
            Dental savings plan in <span className="text-brand-500">Media, PA</span>
          </>
        }
        lead="If you have no dental insurance, the in-house membership covers a year of routine care for $300, or $275 for a second member of your household."
        primary={{ label: "Join the Plan", href: site.bookingHref }}
        aside={
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative aspect-[1.586] overflow-hidden rounded-4xl bg-linear-to-br from-ink via-brand-950 to-brand-700 p-7 text-white shadow-lift ring-1 ring-white/10 transition-transform duration-700 ease-out-expo hover:-translate-y-2 sm:p-9">
              <div
                aria-hidden="true"
                className="absolute -top-24 -right-16 size-80 rounded-full glow-blob text-glow/30"
              />
              <ToothWatermark size={260} className="absolute -right-10 -bottom-16 text-white/8" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span>
                    <span className="block text-xs font-bold tracking-[0.2em] text-glow uppercase">Member</span>
                    <span className="mt-1 block text-lg font-semibold">{site.name}</span>
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/20">
                    12 months
                  </span>
                </div>
                <div>
                  <span className="flex items-baseline gap-2">
                    <span className="text-6xl leading-none font-bold tracking-tighter sm:text-7xl">$300</span>
                    <span className="text-white/65">/ year</span>
                  </span>
                  <span className="mt-2 block text-sm text-white/70">Second member $275 · 10–15% off treatment</span>
                </div>
              </div>
            </div>
          </div>
        }
      />

      {/* ---------- What's included ---------- */}
      <section className="bg-white section-y" aria-labelledby="includes-heading">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHead
              id="includes-heading"
              eyebrow="What the plan includes"
              title={
                <>
                  One annual fee for the care most people need <span className="text-brand-500">in a year</span>
                </>
              }
            />
            <RevealGroup className="mt-8 grid grid-cols-2 gap-3" stagger={0.08}>
              {membership.prices.map((p, i) => (
                <RevealItem key={p.label}>
                  <div
                    className={
                      i === 0 ? "rounded-3xl bg-brand-500 p-6 text-white" : "rounded-3xl bg-pearl p-6 ring-1 ring-line"
                    }
                  >
                    <p className={i === 0 ? "text-sm text-white/75" : "text-sm text-muted"}>{p.label}</p>
                    <p className="mt-1 text-4xl font-bold tracking-tighter sm:text-5xl">${p.price}</p>
                    <p className={i === 0 ? "text-sm text-white/75" : "text-sm text-muted"}>per year</p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
          <Reveal>
            <div className="rounded-4xl bg-pearl p-6 ring-1 ring-line sm:p-8">
              <ul className="divide-y divide-line">
                {membership.includes.map((item) => (
                  <li key={item} className="flex items-center gap-4 py-4 first:pt-0">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                      <Check className="size-4" />
                    </span>
                    <span className="text-lg font-medium text-ink">{item}</span>
                    <span className="ml-auto text-sm font-semibold text-brand-600">Included</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-2xl bg-white p-5 text-[1.0625rem] leading-relaxed text-ink ring-1 ring-line">
                <strong className="text-brand-600">Plus 10 to 15% off</strong> additional procedures, including
                fillings, crowns, dentures and more.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Who it's for ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="who-heading">
        <div className="container-site">
          <SectionHead
            id="who-heading"
            eyebrow="Who the plan is for"
            title={
              <>
                Built for patients with <span className="text-brand-500">no dental insurance</span>
              </>
            }
            lead="A larger group than most practices admit. As an in-house plan it is only usable at this practice, which is the trade-off for there being no claims to file."
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {audiences.map(({ icon: Icon, title: t, text }) => (
              <RevealItem key={t}>
                <div className="h-full rounded-4xl bg-white p-7 ring-1 ring-line">
                  <span className="grid size-12 place-items-center rounded-2xl bg-mist text-brand-600">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-6 text-xl font-bold tracking-tight text-ink">{t}</p>
                  <p className="mt-2 leading-relaxed">{text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-6">
            <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <p className="flex items-start gap-4 text-lg leading-relaxed text-ink">
                <CircleAlert className="mt-1 size-5 shrink-0 text-brand-500" />
                If you do have dental insurance, this plan is not for you and nobody here will sell it to you. Call with
                your plan name and the team will check what it covers.
              </p>
              <Link
                href="/patient-information/insurance-payment-options"
                className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-brand-600"
              >
                Insurance & payment options <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Plan vs insurance ---------- */}
      <section className="bg-white section-y" aria-labelledby="vs-heading">
        <div className="container-site">
          <SectionHead
            id="vs-heading"
            eyebrow="Savings plan vs insurance"
            title={
              <>
                They look similar and <span className="text-brand-500">work quite differently</span>
              </>
            }
            lead="Insurance is usually better value if an employer pays for it. A membership is usually better if you would be buying individual cover yourself."
          />
          <Reveal className="mt-10">
            <div className="overflow-hidden rounded-4xl ring-1 ring-line">
              <table className="w-full text-left">
                <caption className="sr-only">Dental Savings Plan compared with dental insurance</caption>
                <thead>
                  <tr className="bg-ink text-white">
                    <th scope="col" className="w-1/4 p-4 text-sm font-semibold sm:p-6">
                      <span className="sr-only">Feature</span>
                    </th>
                    <th scope="col" className="bg-brand-600 p-4 text-sm font-bold sm:p-6 sm:text-base">
                      Dental Savings Plan
                    </th>
                    <th scope="col" className="p-4 text-sm font-semibold sm:p-6 sm:text-base">
                      Dental insurance
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((r) => (
                    <tr key={r.row} className="border-t border-line align-top">
                      <th scope="row" className="bg-pearl p-4 text-sm font-semibold text-ink sm:p-6 sm:text-base">
                        {r.row}
                      </th>
                      <td className="bg-brand-50/50 p-4 text-sm text-ink sm:p-6 sm:text-base">
                        <span className="flex gap-2">
                          {r.planOk === true && <Check className="mt-0.5 size-4 shrink-0 text-brand-600" />}
                          {r.planOk === false && <Minus className="mt-0.5 size-4 shrink-0 text-muted" />}
                          {r.plan}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-body sm:p-6 sm:text-base">
                        <span className="flex gap-2">
                          {r.insOk === true && <Check className="mt-0.5 size-4 shrink-0 text-brand-600" />}
                          {r.insOk === false && <X className="mt-0.5 size-4 shrink-0 text-muted" />}
                          {r.ins}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Not covered + how to join ---------- */}
      <section className="relative isolate overflow-hidden bg-ink section-y text-white" aria-labelledby="join-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 right-0 size-160 rounded-full glow-blob text-brand-500/25" />
        </div>
        <div className="container-site">
          <Reveal>
            <div className="rounded-4xl bg-white/5 p-7 ring-1 ring-white/10 sm:p-10">
              <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">What the plan does not cover</p>
              <p className="mt-4 max-w-4xl text-2xl leading-snug font-semibold tracking-tight text-balance text-white sm:text-3xl">
                It is a prepaid year of routine care with a discount attached. It is not insurance, it cannot be used at
                other practices, and it does not pay out.
              </p>
              <p className="mt-4 max-w-3xl leading-relaxed text-white/70">
                The preventative items above are covered in full. Fillings, crowns and dentures get the 10 to 15% member
                discount instead, and the team will tell you which other procedures it applies to.
              </p>
            </div>
          </Reveal>
          <SectionHead
            id="join-heading"
            tone="light"
            eyebrow="How to join"
            title={
              <>
                Join at an appointment <span className="text-glow">or over the phone</span>
              </>
            }
            className="mt-16"
          />
          <Reveal className="mt-10">
            <Steps
              tone="light"
              items={[
                {
                  title: "Call or ask",
                  text: `Call ${site.phone.display}, or send an appointment request and say you want the plan.`,
                },
                {
                  title: "Hear how it starts",
                  text: "The team explains how membership starts and what is included for the year.",
                },
                { title: "Pay once", text: "The fee is paid once and covers twelve months." },
                {
                  title: "Book your exam",
                  text: "For treatment beyond the plan, CareCredit spreads larger costs monthly.",
                },
              ]}
            />
          </Reveal>
          <Reveal className="mt-8 flex flex-wrap gap-x-6 gap-y-1">
            {[
              { label: "Financing with CareCredit", href: "/patient-information/care-credit" },
              { label: "Current special offers", href: "/special-offers" },
              { label: "Teeth cleaning and check-ups", href: "/preventative-care/teeth-cleaning-and-check-ups" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex min-h-11 items-center gap-2 font-semibold text-glow hover:text-white"
              >
                {l.label} <ArrowUpRight className="size-4" />
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-white section-y" aria-labelledby="plan-faq-heading">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead
            id="plan-faq-heading"
            eyebrow="Savings plan questions"
            title={
              <>
                Straight answers <span className="text-brand-500">before you join</span>
              </>
            }
          />
          <Reveal>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Join the plan and <span className="text-glow">book your exam</span>
          </>
        }
        text="$300 for the year, no claims to file, and 10 to 15% off additional procedures."
        primary={{ label: "Join the Plan", href: site.bookingHref }}
        image={T.insurance5.src}
        imageAlt={T.insurance5.alt}
      />
    </>
  );
}
