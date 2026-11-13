import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Dumbbell,
  GraduationCap,
  Heart,
  MapPin,
  Plane,
  Sparkles,
  Trophy,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import { doctors } from "@/content/site";
import { OFF_DUTY, type Doctor, type DoctorProfile } from "@/content/doctors";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ToothWatermark } from "@/components/ui/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

const iconFor = (s: string): LucideIcon => {
  const t = s.toLowerCase();
  if (/travel/.test(t)) return Plane;
  if (/read|novel/.test(t)) return BookOpen;
  if (/dallas|florida/.test(t)) return MapPin;
  if (/parent|family/.test(t)) return Heart;
  if (/pickleball/.test(t)) return Trophy;
  if (/working out|active/.test(t)) return Dumbbell;
  if (/cuisine|food/.test(t)) return UtensilsCrossed;
  if (/education/.test(t)) return GraduationCap;
  return Sparkles;
};

/** Life outside the office (brand card with an editorial list), then the rest of the team. */
export function DoctorPersonal({ doctor, profile }: { doctor: Doctor; profile: DoctorProfile }) {
  const others = doctors.filter((d) => d.href !== doctor.href);
  const offDuty = profile.story.find((c) => c.title === OFF_DUTY)?.text;

  return (
    <section className="bg-white section-y" aria-labelledby="personal-heading">
      <div className="container-site">
        {/* ---------- off duty ---------- */}
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-5xl bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 p-7 text-white sm:p-12 lg:p-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-32 -left-24 size-120 rounded-full bg-glow/25 blur-[120px]" />
              <ToothWatermark size={520} className="absolute -right-24 -bottom-32 text-white/6" />
            </div>

            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <Eyebrow tone="light">Outside the office</Eyebrow>
                <SplitReveal as="h2" id="personal-heading" className="mt-6 text-display-md font-bold text-white">
                  Getting to know <span className="text-glow">{doctor.short}</span>
                </SplitReveal>
                {offDuty && <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80">{offDuty}</p>}
                <div className="mt-8 flex items-center gap-3">
                  <span className="relative size-12 overflow-hidden rounded-full ring-2 ring-white/40">
                    <Image
                      src={doctor.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                      style={{ objectPosition: doctor.position }}
                    />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold text-white">
                      {doctor.name}, {doctor.credential}
                    </span>
                    <span className="block text-sm text-white/60">Media Brite Smile</span>
                  </span>
                </div>
              </div>

              <ol className="border-t border-white/15">
                {profile.personal.map((p, i) => {
                  const Icon = iconFor(p);
                  return (
                    <li key={p} className="flex items-center gap-4 border-b border-white/15 py-4 sm:gap-5 sm:py-5">
                      <span className="w-7 shrink-0 text-sm font-semibold text-white/45 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1 text-lg leading-snug font-semibold tracking-tight text-white sm:text-2xl">
                        {p}
                      </span>
                      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-glow ring-1 ring-white/15">
                        <Icon className="size-5" />
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </Reveal>

        {/* ---------- the rest of the team ---------- */}
        <div className="mt-14 flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Meet the rest of the team</h3>
          <Link
            href="/about-us"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            About our practice <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <RevealGroup className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2" stagger={0.1}>
          {others.map((d) => (
            <RevealItem key={d.href}>
              <Link
                href={d.href}
                className="group grid h-full grid-cols-[7.5rem_1fr] overflow-hidden rounded-4xl bg-pearl ring-1 ring-line transition-shadow duration-500 hover:shadow-lift sm:grid-cols-[11rem_1fr]"
              >
                <span className="relative min-h-40 overflow-hidden bg-mist sm:min-h-48">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(min-width:640px) 176px, 120px"
                    className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                    style={{ objectPosition: d.position }}
                  />
                </span>
                <span className="flex flex-col justify-center gap-1 p-5 sm:p-7">
                  <span className="text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">{d.credential}</span>
                  <span className="text-lg leading-snug font-bold tracking-tight text-ink sm:text-xl">{d.name}</span>
                  <span className="text-sm text-body">{d.focus}</span>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    View profile
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
