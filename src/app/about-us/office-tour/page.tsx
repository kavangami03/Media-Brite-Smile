import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  CalendarClock,
  HeartHandshake,
  MapPin,
  Microscope,
  Phone,
  PlayCircle,
  ScanLine,
  ShieldCheck,
  UserPlus,
  Zap,
  Box,
} from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
import type { Crumb } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { LinkTile } from "@/components/page/bits";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd, pageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

const title = "Dental Office Tour | Media Brite Smile, Media PA";
const description = `See inside the Media Brite Smile dental office at ${site.address.full} before your first visit: the waiting area, treatment rooms and equipment.`;

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/about-us/office-tour" },
};

const crumbs: Crumb[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Office Tour" },
];

const alt = (room: string) => `${room} at ${site.name}, Media PA`;

const photos = [
  { src: "/images/office/office-41.jpg", room: "The building on N Pennell Rd" },
  { src: "/images/office/office-5.jpg", room: "Reception desk" },
  { src: "/images/office/waiting-room.webp", room: "Waiting area" },
  { src: "/images/office/waiting-room-2.webp", room: "Front desk" },
  { src: "/images/office/operatory-1.webp", room: "Treatment room" },
  { src: "/images/office/operatory-3.jpg", room: "Treatment room" },
  { src: "/images/office/cbct-scanner.webp", room: "X-ray and 3D imaging room" },
  { src: "/images/office/in-house-lab.webp", room: "Clinical supply room" },
];

function Stop({
  n,
  id,
  eyebrow,
  title: t,
  children,
  media,
  flip = false,
  tone = "white",
}: {
  n: string;
  id: string;
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  media: ReactNode;
  flip?: boolean;
  tone?: "white" | "pearl";
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 section-y", tone === "pearl" ? "bg-pearl" : "bg-white")}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className={cn("min-w-0", flip && "lg:order-2")}>
          <Reveal>
            <span className="text-7xl leading-none font-bold tracking-tighter text-brand-500/15 tabular-nums sm:text-8xl">
              {n}
            </span>
          </Reveal>
          <SectionHead id={`${id}-heading`} eyebrow={eyebrow} title={t} className="mt-2" />
          <Reveal y={20}>
            <div className="mt-6 space-y-4 text-lg leading-relaxed">{children}</div>
          </Reveal>
        </div>
        <div className="min-w-0">{media}</div>
      </div>
    </section>
  );
}

function Photo({
  src,
  room,
  className,
  priority,
}: {
  src: string;
  room: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <figure className={cn("relative overflow-hidden rounded-3xl sm:rounded-4xl", className)}>
      <ImageReveal className="absolute inset-0">
        <Image
          data-reveal-media
          src={src}
          alt={alt(room)}
          fill
          priority={priority}
          sizes="(min-width:1024px) 45vw, 100vw"
          className="object-cover"
        />
      </ImageReveal>
      <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink">
        {room}
      </figcaption>
    </figure>
  );
}

const stops = [
  { id: "arrival", label: "Arriving" },
  { id: "waiting", label: "Waiting area" },
  { id: "treatment", label: "Treatment rooms" },
  { id: "equipment", label: "Equipment" },
  { id: "access", label: "Parking & access" },
];

export default function OfficeTourPage() {
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: "/about-us/office-tour",
          name: title,
          description,
          crumbs,
          extra: [
            {
              "@type": "ImageGallery",
              name: `${site.name} office tour`,
              image: photos.map((p) => ({
                "@type": "ImageObject",
                contentUrl: `${site.url}${p.src}`,
                caption: alt(p.room),
              })),
            },
          ],
        })}
      />

      {/* ---------- Hero: light intro, then a cinema-width reception photo with the tour stops ---------- */}
      <section
        className="relative isolate overflow-hidden bg-pearl pt-30 pb-12 lg:pt-36 lg:pb-16"
        aria-labelledby="page-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-48 -right-40 size-160 rounded-full glow-blob text-glow/25" />
        </div>
        <div className="container-site">
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Eyebrow>Office tour</Eyebrow>
              <SplitReveal as="h1" id="page-title" immediate className="mt-6 text-display-lg font-bold text-balance">
                Take a look around our <span className="text-brand-500">Media office</span>
              </SplitReveal>
            </div>
            <Reveal delay={0.25} y={24}>
              <p className="text-lg leading-relaxed text-pretty sm:text-xl">
                If you are nervous about a first visit, it helps to see the place before you arrive. This is {site.name}{" "}
                at {site.address.full}, from the waiting area to the treatment rooms.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button href={site.bookingHref} size="lg">
                  Request an Appointment
                </Button>
                <Button href="#tour-video" variant="outline" size="lg" icon={<PlayCircle className="size-4" />}>
                  Watch the video tour
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-4xl shadow-lift sm:rounded-5xl lg:mt-14">
            <ImageReveal immediate delay={0.3} className="aspect-4/5 sm:aspect-video lg:aspect-21/9">
              <Image
                data-reveal-media
                src="/images/office/office-5.jpg"
                alt={alt("Reception and waiting area")}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </ImageReveal>
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/85 via-ink/10 to-transparent" />
            <nav aria-label="Tour stops" className="absolute inset-x-0 bottom-0 p-3 sm:p-5">
              <ol className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                {stops.map((s, i) => (
                  <li key={s.id} className={i === 4 ? "col-span-2 sm:col-span-1" : undefined}>
                    <a
                      href={`#${s.id}`}
                      className="group flex min-h-12 items-center gap-3 rounded-2xl bg-white/12 px-4 py-2.5 text-white ring-1 ring-white/20 transition-colors hover:bg-white hover:text-ink"
                    >
                      <span className="text-xs font-bold text-glow tabular-nums group-hover:text-brand-600">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-semibold">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </section>

      <Stop
        n="01"
        id="arrival"
        eyebrow="Arriving"
        title={
          <>
            {site.address.street}, <span className="text-brand-500">Media</span>
          </>
        }
        media={<Photo src="/images/office/office-41.jpg" room="The building on N Pennell Rd" className="aspect-4/3" />}
      >
        <p>
          The practice is on Pennell Road, which runs south from Media toward Aston. Most patients come in from
          Baltimore Pike or Providence Road.
        </p>
        <p className="flex items-center gap-3 font-semibold text-ink">
          <MapPin className="size-5 shrink-0 text-brand-500" /> {site.address.full}
        </p>
      </Stop>

      <Stop
        n="02"
        id="waiting"
        eyebrow="The waiting area"
        tone="pearl"
        flip
        title={
          <>
            Checked in by people who <span className="text-brand-500">explain the cost</span>
          </>
        }
        media={
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <Photo src="/images/office/office-5.jpg" room="Reception desk" className="col-span-2 aspect-16/9" />
            <Photo src="/images/office/waiting-room.webp" room="Waiting area" className="aspect-square" />
            <Photo src="/images/office/waiting-room-2.webp" room="Front desk" className="aspect-square" />
          </div>
        }
      >
        <p>
          When you arrive, the front-desk team checks you in, confirms your details and insurance, and answers any
          questions about cost before you go through.
        </p>
      </Stop>

      <Stop
        n="03"
        id="treatment"
        eyebrow="Treatment rooms"
        title={
          <>
            Where you see your <span className="text-brand-500">X-rays on screen</span>
          </>
        }
        media={
          <div className="grid grid-cols-5 gap-3 sm:gap-4">
            <Photo src="/images/office/operatory-1.webp" room="Treatment room" className="col-span-3 aspect-3/4" />
            <Photo src="/images/office/operatory-3.jpg" room="Treatment room" className="col-span-2 mt-10 aspect-3/4" />
          </div>
        }
      >
        <p>
          This is where your check-up and treatment happen, and where the dentist can show you your X-rays and scans on
          screen. Surfaces are disinfected and fresh materials are set out between every patient.
        </p>
        <Link
          href="/patient-information/care-and-comfort/infection-control"
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
        >
          <ShieldCheck className="size-5" /> How we keep treatment rooms safe <ArrowUpRight className="size-4" />
        </Link>
      </Stop>

      {/* ---------- Equipment (dark) ---------- */}
      <section
        id="equipment"
        className="relative isolate scroll-mt-28 overflow-hidden bg-ink section-y text-white"
        aria-labelledby="equipment-heading"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -right-20 size-160 rounded-full glow-blob text-brand-500/25" />
        </div>
        <div className="container-site">
          <div className="flex items-end gap-6">
            <span className="text-7xl leading-none font-bold tracking-tighter text-white/10 tabular-nums sm:text-8xl">
              04
            </span>
          </div>
          <SectionHead
            id="equipment-heading"
            tone="light"
            eyebrow="Our equipment"
            title={
              <>
                The kit behind a <span className="text-glow">precise</span> result
              </>
            }
            className="mt-2"
          />
          <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <Photo src="/images/office/cbct-scanner.webp" room="X-ray and 3D imaging room" className="aspect-4/5" />
              <Photo src="/images/office/in-house-lab.webp" room="Clinical supply room" className="aspect-4/5" />
            </div>
            <RevealGroup className="grid grid-cols-1 gap-3" stagger={0.08}>
              {[
                { icon: Microscope, t: "High-powered microscopes", d: "For fillings, crowns and veneers" },
                { icon: ScanLine, t: "Intraoral scanner", d: "Digital impressions instead of putty" },
                { icon: Zap, t: "Digital X-rays", d: "Images on screen in seconds" },
                { icon: Box, t: "CBCT 3D imaging", d: "For implant planning" },
              ].map(({ icon: Icon, t, d }) => (
                <RevealItem key={t}>
                  <div className="flex items-center gap-4 rounded-3xl bg-white/5 p-5 ring-1 ring-white/10">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-500 text-white">
                      <Icon className="size-5" />
                    </span>
                    <span>
                      <span className="block text-lg font-semibold text-white">{t}</span>
                      <span className="block text-white/65">{d}</span>
                    </span>
                  </div>
                </RevealItem>
              ))}
              <RevealItem>
                <Link
                  href="/patient-information/care-and-comfort/advanced-technology"
                  className="inline-flex min-h-11 items-center gap-2 px-1 font-semibold text-glow hover:text-white"
                >
                  The technology we use <ArrowUpRight className="size-4" />
                </Link>
              </RevealItem>
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ---------- Parking & access ---------- */}
      <section id="access" className="scroll-mt-28 bg-white section-y" aria-labelledby="access-heading">
        <div className="container-site grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr]">
          <div>
            <span className="text-7xl leading-none font-bold tracking-tighter text-brand-500/15 tabular-nums sm:text-8xl">
              05
            </span>
            <SectionHead
              id="access-heading"
              eyebrow="Parking and access"
              title={
                <>
                  Tell us what you need <span className="text-brand-500">when you book</span>
                </>
              }
              lead="Ask about parking or step-free access when you book if either affects your visit, and the team will tell you what to expect."
              className="mt-2"
            />
            <Reveal className="mt-8">
              <div className="flex flex-wrap gap-3">
                <Button href={site.address.directions} target="_blank" rel="noopener" variant="dark">
                  Get directions
                </Button>
                <Button href={site.phone.href} variant="outline" icon={<Phone className="size-4" />}>
                  {site.phone.display}
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal>
            <div className="relative h-full min-h-80 overflow-hidden rounded-4xl border border-line bg-mist">
              <iframe
                title={`Map to ${site.name}`}
                src={site.address.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Video ---------- */}
      <section id="tour-video" className="scroll-mt-28 bg-pearl section-y" aria-labelledby="video-heading">
        <div className="container-site">
          <SectionHead
            id="video-heading"
            eyebrow="Video tour"
            align="center"
            title={
              <>
                Walk through the <span className="text-brand-500">practice</span>
              </>
            }
          />
          <Reveal className="mx-auto mt-10 max-w-5xl">
            <div className="overflow-hidden rounded-4xl bg-ink shadow-lift ring-1 ring-line sm:rounded-5xl">
              <video
                src="/videos/office-tour.mp4"
                poster="/images/office/office-5.jpg"
                controls
                preload="none"
                playsInline
                className="aspect-video w-full"
              >
                A video tour of {site.name}.
              </video>
            </div>
          </Reveal>
          <RevealGroup className="mt-10 grid grid-cols-1 gap-3 lg:grid-cols-3" stagger={0.08}>
            <RevealItem>
              <LinkTile
                href="/contact-us"
                icon={<CalendarClock className="size-5" />}
                title="Directions & hours"
                text="Map, opening hours and how to reach us."
              />
            </RevealItem>
            <RevealItem>
              <LinkTile
                href="/patient-information/care-and-comfort"
                icon={<HeartHandshake className="size-5" />}
                title="Care & comfort"
                text="How visits are paced for nervous patients."
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

      <CtaBand
        title={
          <>
            See it <span className="text-glow">in person</span>
          </>
        }
        text="Book a first visit, and tell us if you would like a look around before treatment starts."
        image="/images/office/waiting-room.webp"
        imageAlt={alt("Waiting area")}
      />
    </>
  );
}
