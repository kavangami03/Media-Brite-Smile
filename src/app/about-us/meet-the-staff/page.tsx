import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ClipboardList, Headset, ShieldCheck, Sparkles, Users } from "lucide-react";
import { doctors, site } from "@/content/site";
import { PageHero, type Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { WhoYouSee } from "@/components/page/who-you-see";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd, pageSchema } from "@/lib/schema";

const title = "Meet Our Dental Team | Media Brite Smile, Media PA";
const description =
  "The dentists, hygienists, assistants and front-desk team at Media Brite Smile in Media, PA - the people you will actually see at your appointment.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about-us/meet-the-staff" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Meet the Staff" },
];

/* Focus lines from the Meet The Staff draft. */
const focus: Record<string, string[]> = {
  "/about-us/meet-dr-zan-chaudhary-dmd": ["General & cosmetic dentistry", "Invisalign certified"],
  "/about-us/meet-dr-sanketkumar-suvagiya-dmd": ["General dentistry", "Orofacial Pain fellowship, Rutgers"],
  "/about-us/meet-dr-bhadresh-makani-dds": ["Implant-focused", "Single implants to All-on-X"],
};

const roles = [
  {
    icon: Sparkles,
    title: "Dental hygienists",
    text: "If you come in for regular cleanings, the hygienist is often the person you spend most time with.",
    tasks: ["Cleanings", "Periodontal maintenance", "Showing you how to look after teeth and gums at home"],
  },
  {
    icon: ShieldCheck,
    title: "Dental assistants",
    text: "Assistants work alongside the dentists during treatment and make sure you are comfortable.",
    tasks: ["Preparing the treatment room", "Taking X-rays and scans", "Supporting the dentist chairside"],
  },
  {
    icon: Headset,
    title: "The front desk",
    text: "The first voice on the phone and the people who sort out the practical side of your visit.",
    tasks: ["Booking appointments", "Checking your insurance", "Explaining costs and payment options"],
  },
];

export default function MeetTheStaffPage() {
  return (
    <>
      <JsonLd data={pageSchema({ path: "/about-us/meet-the-staff", name: title, description, crumbs })} />

      <PageHero
        eyebrow="Our team"
        title={
          <>
            Meet the dental team at <span className="text-brand-500">Media Brite Smile</span>
          </>
        }
        lead="Three dentists, dental hygienists, dental assistants and the front-desk team. Between them, they look after your visit from the first phone call to the follow-up after treatment."
        aside={
          <div className="grid grid-cols-3 items-end gap-3 sm:gap-4">
            {doctors.map((d, i) => (
              <ImageReveal
                key={d.href}
                immediate
                delay={0.2 + i * 0.12}
                className={
                  i === 1
                    ? "aspect-3/5 rounded-t-full rounded-b-3xl shadow-lift"
                    : "aspect-3/4 rounded-t-full rounded-b-3xl shadow-soft"
                }
              >
                <Image
                  data-reveal-media
                  src={d.image}
                  alt={`${d.name}, ${d.credential}`}
                  fill
                  priority
                  sizes="(min-width:1024px) 14vw, 30vw"
                  className="object-cover"
                  style={{ objectPosition: d.position }}
                />
              </ImageReveal>
            ))}
            <div className="col-span-3 flex flex-wrap justify-center gap-2 pt-2">
              {["3 dentists", "Hygienists", "Assistants", "Front desk"].map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink shadow-soft ring-1 ring-line"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        }
      />

      {/* ---------- Dentists ---------- */}
      <section className="bg-white section-y" aria-labelledby="dentists-heading">
        <div className="container-site">
          <SectionHead
            id="dentists-heading"
            eyebrow="The clinical team"
            title={
              <>
                Three dentists, each with their <span className="text-brand-500">own focus</span>
              </>
            }
            lead="So the harder work stays in the practice instead of being referred out."
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
            {doctors.map((d) => (
              <RevealItem key={d.href}>
                <Link
                  href={d.href}
                  className="group flex h-full flex-col overflow-hidden rounded-4xl bg-pearl ring-1 ring-line transition-shadow duration-500 hover:shadow-lift"
                >
                  <span className="relative block aspect-4/3 overflow-hidden bg-mist">
                    <Image
                      src={d.image}
                      alt={`${d.name}, ${d.credential}`}
                      fill
                      sizes="(min-width:768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-105"
                      style={{ objectPosition: d.position }}
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-6 sm:p-7">
                    <span className="text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">{d.credential}</span>
                    <span className="mt-1 text-2xl font-bold tracking-tight text-ink">{d.name}</span>
                    <span className="mt-4 flex flex-wrap gap-2">
                      {focus[d.href]?.map((f) => (
                        <span key={f} className="rounded-full bg-white px-3 py-1 text-sm text-body ring-1 ring-line">
                          {f}
                        </span>
                      ))}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-brand-600">
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

      {/* ---------- Roles ---------- */}
      <section className="relative isolate overflow-hidden bg-ink section-y text-white" aria-labelledby="roles-heading">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -bottom-40 -left-32 size-140 rounded-full glow-blob text-brand-500/25" />
        </div>
        <div className="container-site">
          <SectionHead
            id="roles-heading"
            tone="light"
            eyebrow="The rest of the team"
            title={
              <>
                The people you meet <span className="text-glow">before and after</span> the chair
              </>
            }
          />
          <RevealGroup className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3" stagger={0.1}>
            {roles.map(({ icon: Icon, title: t, text, tasks }) => (
              <RevealItem key={t}>
                <div className="flex h-full flex-col rounded-4xl bg-white/5 p-7 ring-1 ring-white/10 sm:p-8">
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand-500 text-white">
                    <Icon className="size-6" />
                  </span>
                  <p className="mt-7 text-2xl font-bold tracking-tight text-white">{t}</p>
                  <p className="mt-3 leading-relaxed text-white/70">{text}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6">
                    {tasks.map((task) => (
                      <li key={task} className="flex gap-3 text-[0.9375rem] text-white/85">
                        <ClipboardList className="mt-0.5 size-4 shrink-0 text-glow" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
          <Reveal className="mt-6">
            <p className="rounded-3xl bg-white/5 px-6 py-5 text-white/75 ring-1 ring-white/10">
              Not sure what your plan covers? We cannot confirm it from a website. Send the front desk your plan name
              and they will check it for you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Who you will see ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="who-see-heading">
        <div className="container-site">
          <SectionHead
            id="who-see-heading"
            eyebrow="Your appointment"
            title={
              <>
                Who will you <span className="text-brand-500">see?</span>
              </>
            }
            lead="Pick the kind of visit you are booking."
          />
          <Reveal className="mt-10">
            <WhoYouSee />
          </Reveal>
          <Reveal className="mt-6">
            <div className="flex flex-col gap-5 rounded-3xl bg-white p-6 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <p className="flex items-start gap-4">
                <Users className="mt-0.5 size-6 shrink-0 text-brand-500" />
                <span className="text-lg leading-relaxed text-ink">
                  Would you like to see the same dentist or hygienist each time? Say so when you book and the team will
                  arrange it where they can.
                </span>
              </p>
              <div className="flex shrink-0 flex-wrap gap-2">
                <Link
                  href="/about-us"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-ink ring-1 ring-line hover:ring-brand-400"
                >
                  About the practice
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Contact &amp; directions <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Book with <span className="text-glow">the team</span>
          </>
        }
        text={`Tell us who you would like to see, and we will do our best to arrange it. ${site.name}, ${site.address.city}.`}
        image="/images/office/operatory-3.jpg"
        imageAlt={`Treatment room at ${site.name}, Media PA`}
      />
    </>
  );
}
