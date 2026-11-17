import {
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  GraduationCap,
  HeartHandshake,
  Medal,
  ScanLine,
  Sparkles,
  Target,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Doctor, DoctorProfile } from "@/content/doctors";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";

/** An icon per credential label; anything unlisted gets a check badge. */
const iconFor: Record<string, LucideIcon> = {
  qualification: GraduationCap,
  "dental school": Building2,
  undergraduate: BookOpen,
  "earlier training": BookOpen,
  certification: BadgeCheck,
  membership: Users,
  fellowship: Award,
  honour: Medal,
  experience: Sparkles,
  "advanced training": Award,
  technology: ScanLine,
  comfort: HeartHandshake,
  focus: Target,
};

/** "At a glance" credentials, moved out of the hero so the hero stays short. */
export function DoctorFacts({ doctor, profile }: { doctor: Doctor; profile: DoctorProfile }) {
  return (
    <section className="bg-pearl pb-[clamp(3rem,2rem+3vw,5rem)]" aria-labelledby="doctor-facts-heading">
      <div className="container-site">
        <div className="rounded-5xl bg-white p-6 shadow-soft ring-1 ring-line sm:p-10 lg:p-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>At a glance</Eyebrow>
              <h2 id="doctor-facts-heading" className="mt-5 text-display-md font-bold">
                {doctor.short}&apos;s <span className="text-brand-500">credentials</span>
              </h2>
            </div>
            <Reveal y={12}>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700 ring-1 ring-brand-100">
                <BadgeCheck className="size-4" /> {doctor.credential} · {doctor.focus}
              </span>
            </Reveal>
          </div>

          <RevealGroup
            stagger={0.06}
            className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3"
          >
            {profile.facts.map((f) => {
              const Icon = iconFor[f.label.toLowerCase()] ?? BadgeCheck;
              return (
                <RevealItem key={f.label} className="h-full">
                  <div className="group flex h-full items-start gap-4 bg-white p-5 transition-colors duration-300 hover:bg-pearl sm:p-6">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                      <Icon className="size-5" />
                    </span>
                    <dl className="min-w-0">
                      <dt className="text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">{f.label}</dt>
                      <dd className="mt-1.5 leading-snug font-semibold text-ink">{f.value}</dd>
                    </dl>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
