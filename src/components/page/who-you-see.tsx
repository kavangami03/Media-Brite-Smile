"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Smile, Sparkles, Stethoscope, Syringe, Activity, type LucideIcon } from "lucide-react";
import { doctors } from "@/content/site";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Visit = {
  label: string;
  icon: LucideIcon;
  who: string;
  detail: string;
  doctor?: string; // href of the dentist who leads it
  team?: string[];
};

/* From the Meet The Staff draft (13 Nov 2026), "Who You Will See at Your Appointment". */
const visits: Visit[] = [
  {
    label: "Check-up and cleaning",
    icon: Smile,
    who: "A dental hygienist and a dentist",
    detail: "Usually a dental hygienist for the cleaning, and a dentist for the examination.",
    team: ["Dental hygienist", "Dentist"],
  },
  {
    label: "Filling, crown or root canal",
    icon: Stethoscope,
    who: "A dentist and a dental assistant",
    detail:
      "A dentist carries out the treatment, supported by a dental assistant who prepares the room and keeps you comfortable.",
    team: ["Dentist", "Dental assistant"],
  },
  {
    label: "Implant consultation or placement",
    icon: Syringe,
    who: "Dr. Bhadresh Makani, DDS",
    detail: "Implant consultations and placement are with Dr. Makani, from single implants to All-on-X full arches.",
    doctor: "/about-us/meet-dr-bhadresh-makani-dds",
  },
  {
    label: "Invisalign",
    icon: Sparkles,
    who: "Dr. Zan Chaudhary, DMD",
    detail:
      "Dr. Chaudhary is Invisalign certified and leads Invisalign treatment from the first scan to the final aligner.",
    doctor: "/about-us/meet-dr-zan-chaudhary-dmd",
  },
  {
    label: "Jaw pain or TMD",
    icon: Activity,
    who: "Dr. Sanketkumar Suvagiya, DMD",
    detail:
      "Dr. Suvagiya holds a fellowship in Orofacial Pain from Rutgers University and manages TMD, jaw muscle pain and headaches.",
    doctor: "/about-us/meet-dr-sanketkumar-suvagiya-dmd",
  },
];

export function WhoYouSee() {
  const [active, setActive] = useState(0);
  const v = visits[active];
  const doc = doctors.find((d) => d.href === v.doctor);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
      <ul className="flex flex-col gap-2" role="tablist" aria-label="Appointment type">
        {visits.map(({ label, icon: Icon }, i) => {
          const on = i === active;
          return (
            <li key={label} role="presentation">
              <button
                type="button"
                role="tab"
                aria-selected={on}
                aria-controls="who-panel"
                onClick={() => setActive(i)}
                onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                className={cn(
                  "flex min-h-16 w-full cursor-pointer items-center gap-4 rounded-2xl px-4 py-3 text-left ring-1 transition-[background-color,box-shadow,color] duration-300",
                  on ? "bg-ink text-white shadow-lift ring-ink" : "bg-white text-ink ring-line hover:ring-brand-300",
                )}
              >
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-xl transition-colors",
                    on ? "bg-brand-500 text-white" : "bg-mist text-brand-600",
                  )}
                >
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1 font-semibold">{label}</span>
                <span className={cn("text-xs font-bold tabular-nums", on ? "text-glow" : "text-muted")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div
        id="who-panel"
        role="tabpanel"
        className="relative min-h-80 overflow-hidden rounded-4xl bg-linear-to-br from-brand-600 via-brand-700 to-brand-900 p-7 text-white sm:p-10"
      >
        <div aria-hidden="true" className="absolute -top-24 -right-24 size-96 rounded-full glow-blob text-glow/25" />
        <AnimatePresence mode="wait">
          <motion.div
            key={v.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: ease.out }}
            className="relative flex h-full flex-col"
          >
            <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">{v.label}</p>
            <p className="mt-3 text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl">{v.who}</p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-white/80">{v.detail}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {doc ? (
                <Link
                  href={doc.href}
                  className="group flex items-center gap-4 rounded-2xl bg-white/10 py-2 pr-5 pl-2 ring-1 ring-white/15 transition-colors hover:bg-white/15"
                >
                  <span className="relative size-16 overflow-hidden rounded-xl">
                    <Image
                      src={doc.image}
                      alt={`${doc.name}, ${doc.credential}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                      style={{ objectPosition: doc.position }}
                    />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-semibold">View {doc.short}&apos;s profile</span>
                    <span className="mt-1 block text-sm text-white/65">{doc.focus}</span>
                  </span>
                  <ArrowUpRight className="size-4 text-glow transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              ) : (
                v.team?.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15"
                  >
                    {t}
                  </span>
                ))
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
