import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Doctor, DoctorProfile } from "@/content/doctors";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

/** Clinical focus as a large index list (dark), with supporting groups alongside. */
export function DoctorFocus({ doctor, profile }: { doctor: Doctor; profile: DoctorProfile }) {
  return (
    <section className="relative overflow-hidden bg-ink section-y text-white" aria-labelledby="focus-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 size-160 rounded-full bg-brand-500/15 blur-[160px]"
      />
      <div className="relative container-site grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Eyebrow tone="light">Clinical focus</Eyebrow>
            <SplitReveal as="h2" id="focus-heading" className="mt-6 text-display-md font-bold text-white">
              Where {doctor.short} <span className="text-gradient-brand">focuses</span>
            </SplitReveal>

            <RevealGroup className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1" stagger={0.08}>
              {profile.extras.map((x) => (
                <RevealItem key={x.title}>
                  <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur">
                    <h3 className="text-xs font-bold tracking-[0.16em] text-glow uppercase">{x.title}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {x.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] text-white/85">
                          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-glow">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        <Reveal className="lg:col-span-7">
          <ul className="border-t border-white/10">
            {profile.focus.map((f, i) => (
              <li key={f.label} className="border-b border-white/10">
                <Link
                  href={f.href ?? "/services"}
                  className="group relative flex items-center gap-5 overflow-hidden py-6 sm:gap-8 sm:py-7"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-0 origin-left scale-x-0 bg-linear-to-r from-brand-500/20 to-transparent transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                  />
                  <span className="relative w-8 shrink-0 text-sm font-semibold text-white/40 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative min-w-0 flex-1 text-[clamp(1.35rem,1rem+1.4vw,2.25rem)] leading-tight font-semibold tracking-tight text-white transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                    {f.label}
                  </span>
                  <span className="relative grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-brand-500 group-hover:bg-brand-500">
                    <ArrowUpRight className="size-5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
