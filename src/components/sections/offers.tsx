import Link from "next/link";
import { ArrowUpRight, Check, CreditCard, FileCheck2, ShieldCheck } from "lucide-react";
import { membership, offers } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function Offers() {
  return (
    <section className="section-y relative overflow-hidden bg-brand-950 text-white" aria-labelledby="offers-heading">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-60 -left-40 size-[45rem] rounded-full bg-brand-500/25 blur-[160px]" />
        <div className="absolute top-0 right-0 size-[30rem] rounded-full bg-glow/10 blur-[140px]" />
      </div>

      <div className="container-site relative">
        <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-2">
          <div>
            <Eyebrow tone="light">Special Offers</Eyebrow>
            <SplitReveal as="h2" id="offers-heading" className="mt-6 text-display-lg font-bold text-white">
              Smart ways to <span className="accent-serif text-brand-300">save</span> on your smile
            </SplitReveal>
          </div>
          <Reveal className="lg:justify-self-end">
            <p className="max-w-md text-lg leading-relaxed text-white/65">
              Quality care should be accessible to everyone. Ask us to confirm the details of any offer when you book.
            </p>
          </Reveal>
        </div>

        {/* Ticket offers */}
        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4" stagger={0.1}>
          {offers.map((o) => {
            const featured = o.tone === "brand";
            return (
              <RevealItem key={o.title}>
                <Link
                  href="/special-offers"
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-4xl transition-transform duration-700 ease-out-expo hover:-translate-y-2",
                    featured ? "bg-linear-to-br from-brand-400 to-brand-600 text-white" : "bg-white text-ink",
                  )}
                >
                  {/* light sweep */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-out-expo group-hover:translate-x-[300%]"
                  />
                  <div className="p-7 pb-6">
                    <p className={cn("text-xs font-bold tracking-[0.18em] uppercase", featured ? "text-brand-50" : "text-brand-600")}>
                      {featured ? "New patients" : "Limited offer"}
                    </p>
                    <p className="mt-4 flex items-baseline gap-2">
                      <span className="text-6xl font-bold tracking-[-0.05em]">{o.value}</span>
                      <span className={cn("text-sm font-bold uppercase", featured ? "text-brand-50" : "text-brand-500")}>
                        {o.unit}
                      </span>
                    </p>
                    <h3 className={cn("mt-2 text-xl font-semibold tracking-tight", featured ? "text-white" : "text-ink")}>
                      {o.title}
                    </h3>
                  </div>

                  {/* perforation */}
                  <div className="relative h-6">
                    <span className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full bg-brand-950" />
                    <span className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full bg-brand-950" />
                    <span
                      className={cn(
                        "absolute inset-x-6 top-1/2 border-t-2 border-dashed",
                        featured ? "border-white/35" : "border-line",
                      )}
                    />
                  </div>

                  <div className="flex flex-1 flex-col justify-between gap-6 p-7 pt-5">
                    <p className={cn("text-sm leading-relaxed", featured ? "text-brand-50/90" : "text-body")}>{o.detail}</p>
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      Claim this offer
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Membership: solid light card so it stands off the dark section */}
        <Reveal className="mt-8">
          <div className="grid grid-cols-1 overflow-hidden rounded-5xl text-ink shadow-[0_30px_80px_-20px_rgb(0_0_0/0.5)] lg:grid-cols-12">
            <div className="bg-white p-7 md:p-9 lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-xs font-bold tracking-[0.16em] text-brand-700 uppercase">
                <ShieldCheck className="size-3.5" /> No insurance? No problem.
              </p>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-ink md:text-3xl">In-Office Membership Plan</h3>
              <p className="mt-3 max-w-xl text-[0.9375rem] text-body">
                An excellent solution for preventive and diagnostic care, plus {membership.discount.toLowerCase()}.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-x-5 gap-y-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {membership.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative flex flex-col justify-center gap-6 overflow-hidden bg-linear-to-br from-brand-500 to-brand-800 p-7 text-white md:p-9 lg:col-span-5">
              <div aria-hidden="true" className="absolute -top-24 -right-24 size-72 rounded-full border-[40px] border-white/10" />
              <div className="relative">
                <p className="text-sm font-semibold text-brand-50/90">Membership pricing</p>
                <div className="mt-3 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
                  {membership.prices.map((p, i) => (
                    <div
                      key={p.label}
                      className={cn(
                        "flex items-center justify-between gap-4 rounded-2xl px-5 py-4 min-[420px]:block",
                        i === 0 ? "bg-white text-ink shadow-lift" : "bg-white/15 text-white ring-1 ring-white/30",
                      )}
                    >
                      <p className={cn("text-xs font-bold tracking-[0.16em] uppercase", i === 0 ? "text-brand-600" : "text-brand-50")}>
                        {p.label}
                      </p>
                      <p className="text-4xl font-bold tracking-[-0.05em] min-[420px]:mt-1.5">${p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex flex-wrap gap-3">
                <Button href="/about-us/dental-savings-plan" variant="white">
                  Join the plan
                </Button>
                <Button href="/patient-information/care-credit" variant="outline-light">
                  CareCredit financing
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        <RevealGroup className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
          {[
            {
              icon: ShieldCheck,
              title: "Insurance welcome",
              text: "We accept numerous dental insurance plans and are happy to help you navigate your benefits.",
              cta: "Insurance & payment",
              href: "/patient-information",
            },
            {
              icon: CreditCard,
              title: "Flexible financing",
              text: "CareCredit and in-office payment options make quality care fit your budget.",
              cta: "Explore CareCredit",
              href: "/patient-information/care-credit",
            },
            {
              icon: FileCheck2,
              title: "Honest pricing",
              text: "Transparent pricing before any treatment, so you can decide with complete confidence.",
              cta: "Why choose us",
              href: "/patient-information/why-choose-us",
            },
          ].map(({ icon: Icon, title, text, cta, href }, i) => (
            <RevealItem key={title} className="h-full">
              <SpotlightCard href={href}>
                <div className="flex h-full gap-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-glow transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="size-5" />
                  </span>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-xl font-semibold tracking-tight text-ink">{title}</h3>
                      <span className="text-2xl leading-none font-bold tracking-tighter text-brand-100 tabular-nums transition-colors duration-500 group-hover:text-brand-200">
                        0{i + 1}
                      </span>
                    </div>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-body">{text}</p>
                    <span className="mt-auto flex items-center gap-2 pt-4 text-sm font-semibold text-brand-600 transition-colors group-hover:text-brand-700">
                      {cta}
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </SpotlightCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
