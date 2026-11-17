import type { Metadata } from "next";
import { topicImages as T } from "@/content/topic-images";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarClock,
  ClipboardList,
  Footprints,
  Globe,
  MapPin,
  Navigation,
  Phone,
  Receipt,
  Siren,
  UserPlus,
} from "lucide-react";
import { site } from "@/content/site";
import { PageHero, type Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { FaqAccordion, type QA } from "@/components/page/faq-accordion";
import { LinkTile } from "@/components/page/bits";
import { HoursTable, OpenStatus } from "@/components/page/open-status";
import { AppointmentForm } from "@/components/page/appointment-form";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd, pageSchema } from "@/lib/schema";

const title = "Dental Office in Media, PA | Media Brite Smile";
const description = `Media Brite Smile, ${site.address.full}. Call ${site.phone.display} for appointments, directions and opening hours in Delaware County.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/contact-us" },
};

const crumbs: Crumb[] = [{ label: "Home", href: "/" }, { label: "Contact Us" }];

const faqs: QA[] = [
  {
    q: "What is the phone number for Media Brite Smile?",
    a: `The practice number is ${site.phone.display}. Calls are answered during opening hours: 8am to 3pm Monday, 8am to 5pm Tuesday to Thursday, and 8am to 2pm on alternate Fridays. Outside those hours, send an appointment request through the website and we will reply.`,
  },
  {
    q: "Where is Media Brite Smile located?",
    a: `Media Brite Smile is at ${site.address.full}, in Delaware County. Pennell Road runs south from Media toward Aston. Patients travel in from Swarthmore, Wallingford, Springfield, Brookhaven, Rose Valley and the surrounding boroughs.`,
  },
  {
    q: "Are you open on Fridays?",
    a: `Friday opening runs on alternate weeks, 8am to 2pm. Because it alternates, call ${site.phone.display} to check the date you want before travelling. Monday to Thursday the practice is open every week from 8am.`,
  },
  {
    q: "Can I text the practice?",
    a: "Please call rather than text. The number listed is a voice line, and an appointment request through the website is the best option outside opening hours. You will get a reply with the closest available times.",
  },
];

const ways = [
  {
    icon: Phone,
    title: "By phone",
    text: "Call during opening hours. This is the fastest route if you are in pain or need a specific day.",
    action: { label: site.phone.display, href: site.phone.href },
  },
  {
    icon: Globe,
    title: "Online",
    text: "Send an appointment request at any hour and we will reply with the closest available times across the three dentists.",
    action: { label: "Request a time", href: "#appointment-form" },
  },
  {
    icon: Footprints,
    title: "In person",
    text: "Come in during opening hours if you would rather talk to someone at the desk before booking.",
    action: { label: "Get directions", href: site.address.directions, external: true },
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={pageSchema({ path: "/contact-us", name: title, description, crumbs, faqs, type: "ContactPage" })} />

      <PageHero
        eyebrow="Contact us"
        title={
          <>
            Contact our dental office in <span className="text-brand-500">Media, PA</span>
          </>
        }
        lead={`Our dental office in Media, PA is at ${site.address.street}. Call ${site.phone.display}, or send an appointment request and we will come back to you with a time.`}
        actions={false}
      >
        {/* one column across the full container: the form first, contact details under it */}
        <div
          id="request"
          className="mt-10 scroll-mt-28 rounded-4xl bg-white p-6 shadow-lift ring-1 ring-line sm:rounded-5xl sm:p-10 lg:p-12"
        >
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-2">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Request an appointment</h2>
            <p className="text-lg text-body">Tell us what is going on and we will call you back with a time.</p>
          </div>
          <div className="mt-8">
            <AppointmentForm />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
          <a
            href={site.phone.href}
            className="group col-span-full flex items-center gap-4 overflow-hidden rounded-3xl bg-linear-to-br from-brand-500 to-brand-800 p-5 text-white shadow-lift sm:p-6 lg:col-span-1"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 transition-transform duration-500 group-hover:-rotate-6">
              <Phone className="size-6" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm text-white/75">Call the practice</span>
              <span className="block text-2xl font-bold tracking-tight sm:text-3xl">{site.phone.display}</span>
            </span>
          </a>
          <a
            href={site.address.directions}
            target="_blank"
            rel="noopener"
            className="group flex items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-line transition-shadow duration-500 hover:shadow-lift sm:p-6"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <MapPin className="size-5" />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-ink">{site.address.street}</span>
              <span className="block text-sm text-muted">
                {site.address.city}, {site.address.region} {site.address.zip}
              </span>
              <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                Directions <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </span>
          </a>
          <a
            href="#hours"
            className="flex items-center gap-4 rounded-3xl bg-white p-5 ring-1 ring-line transition-shadow duration-500 hover:shadow-lift sm:p-6"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <CalendarClock className="size-5" />
            </span>
            <span className="min-w-0">
              <OpenStatus />
              <span className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                All opening hours
              </span>
            </span>
          </a>
        </div>
      </PageHero>

      {/* ---------- Map + hours ---------- */}
      <section id="hours" className="scroll-mt-28 bg-white section-y" aria-labelledby="where-heading">
        <div className="container-site">
          <SectionHead
            id="where-heading"
            eyebrow="Where to find us"
            title={
              <>
                {site.address.street}, <span className="text-brand-500">Media</span>
              </>
            }
            lead="Pennell Road runs south from Media toward Aston, so most patients approach from Baltimore Pike or Providence Road. The practice sits in Delaware County, a short drive from Swarthmore, Wallingford, Springfield and Brookhaven."
          />
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <Reveal>
              <div className="relative h-full min-h-[26rem] overflow-hidden rounded-4xl border border-line bg-mist sm:rounded-5xl">
                <iframe
                  title={`Map to ${site.name}`}
                  src={site.address.mapEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 size-full"
                />
                <div className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-3xl bg-white/95 p-4 shadow-lift sm:inset-x-5 sm:bottom-5 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <p className="leading-tight">
                    <span className="block font-bold text-ink">{site.name}</span>
                    <span className="block text-sm text-body">{site.address.full}</span>
                  </p>
                  <Button
                    href={site.address.directions}
                    target="_blank"
                    rel="noopener"
                    variant="dark"
                    icon={<Navigation className="size-4" />}
                  >
                    Get directions
                  </Button>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-4xl bg-pearl p-5 ring-1 ring-line sm:rounded-5xl sm:p-7">
                <div className="flex items-center justify-between gap-4 px-1 pb-4">
                  <h3 className="text-xl font-bold tracking-tight">Opening hours</h3>
                  <OpenStatus className="text-right" />
                </div>
                <div className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
                  <HoursTable />
                </div>
                <p className="mt-4 px-1 text-sm leading-relaxed text-body">
                  Friday opening runs on alternate weeks. Call before travelling on a Friday if you have not already
                  confirmed the date.
                </p>
                <Link
                  href="/areas-we-serve"
                  className="mt-3 inline-flex min-h-11 items-center gap-2 px-1 font-semibold text-brand-600 hover:text-brand-700"
                >
                  See every town we serve <ArrowUpRight className="size-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- Ways to reach us + form ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="reach-heading">
        <div className="container-site">
          <SectionHead
            id="reach-heading"
            eyebrow="How to reach us"
            title={
              <>
                Three ways to <span className="text-brand-500">get in touch</span>
              </>
            }
          />
          <RevealGroup className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3" stagger={0.08}>
            {ways.map(({ icon: Icon, title: t, text, action }) => (
              <RevealItem key={t}>
                <div className="flex h-full flex-col rounded-4xl bg-white p-7 ring-1 ring-line">
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-500 text-white">
                    <Icon className="size-5" />
                  </span>
                  <p className="mt-6 text-xl font-bold tracking-tight text-ink">{t}</p>
                  <p className="mt-2 leading-relaxed">{text}</p>
                  <a
                    href={action.href}
                    {...(action.external ? { target: "_blank", rel: "noopener" } : {})}
                    className="mt-auto inline-flex min-h-11 items-center gap-2 pt-5 font-semibold text-brand-600 hover:text-brand-700"
                  >
                    {action.label} <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <div className="mt-6">
            <Reveal delay={0.1}>
              <div className="grid grid-cols-1 gap-6 rounded-4xl bg-ink p-7 text-white sm:rounded-5xl sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
                <div>
                  <span className="grid size-14 place-items-center rounded-2xl bg-rose-500 text-white">
                    <Siren className="size-6" />
                  </span>
                  <h3 className="mt-7 text-2xl font-bold tracking-tight text-white">If this is a dental emergency</h3>
                  <p className="mt-3 leading-relaxed text-white/75">
                    Call {site.phone.display} rather than using the form, and say what has happened. You will be told
                    how soon you need to be seen.
                  </p>
                  <p className="mt-4 rounded-2xl bg-white/5 p-4 text-[0.9375rem] leading-relaxed text-white/80 ring-1 ring-white/10">
                    Severe facial swelling, trouble breathing or trouble swallowing? Go to an emergency room or call
                    911. That is beyond what a dental office can treat.
                  </p>
                </div>
                <div className="flex flex-col gap-2 lg:min-w-72">
                  <a
                    href={site.phone.href}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 font-semibold text-ink hover:bg-glow"
                  >
                    <Phone className="size-4" /> Call {site.phone.display}
                  </a>
                  <Link
                    href="/preventative-care/emergency-dentistry"
                    className="inline-flex min-h-11 items-center justify-center gap-2 font-semibold text-glow hover:text-white"
                  >
                    What counts as a dental emergency <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- New patients ---------- */}
      <section className="bg-white section-y" aria-labelledby="new-heading">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead
            id="new-heading"
            eyebrow="New to the practice?"
            title={
              <>
                First visits take <span className="text-brand-500">a little longer</span>
              </>
            }
            lead="The examination is more thorough and there are forms to complete. You can fill those in before you arrive and save yourself the wait."
          />
          <RevealGroup className="grid grid-cols-1 gap-3" stagger={0.08}>
            <RevealItem>
              <LinkTile
                href="/patient-information/new-patients"
                icon={<UserPlus className="size-5" />}
                title="What happens at your first visit"
                text="An examination and a conversation, with the options and costs explained."
              />
            </RevealItem>
            <RevealItem>
              <LinkTile
                href="/patient-information/patient-registration"
                icon={<ClipboardList className="size-5" />}
                title="Patient registration forms"
                text="Complete them before you arrive."
              />
            </RevealItem>
            <RevealItem>
              <LinkTile
                href="/patient-information/insurance-payment-options"
                icon={<Receipt className="size-5" />}
                title="Insurance and payment options"
                text="More than 40 dental plans billed directly, plus CareCredit and the savings plan."
              />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-pearl section-y" aria-labelledby="contact-faq-heading">
        <div className="container-site grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHead
            id="contact-faq-heading"
            eyebrow="Contact questions"
            title={
              <>
                Quick <span className="text-brand-500">answers</span>
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
            Book a time that <span className="text-glow">works for you</span>
          </>
        }
        text="Three dentists, appointments from 8am, and a reply with real times rather than a callback promise."
        image={T.kids7.src}
        imageAlt={T.kids7.alt}
      />
    </>
  );
}
