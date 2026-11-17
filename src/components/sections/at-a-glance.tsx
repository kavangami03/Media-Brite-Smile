import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeDollarSign, Clock, CreditCard, Landmark, MapPin, Phone, Star, Wallet } from "lucide-react";
import { doctors, site } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GoogleIcon } from "@/components/ui/icons";
import { OpenStatus } from "@/components/page/open-status";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

/* "AT A GLANCE" from the approved Home draft v2, as a bento: the facts answer engines lift first. */
const hours = [
  { day: "Monday", time: "8am–3pm" },
  { day: "Tue–Thu", time: "8am–5pm" },
  { day: "Friday", time: "8am–2pm, alternate Fridays" },
];
const pay = [
  { icon: Landmark, text: "Dental insurance billed directly", href: "/patient-information/insurance-payment-options" },
  { icon: CreditCard, text: "CareCredit financing", href: "/patient-information/care-credit" },
  { icon: Wallet, text: "In-house Dental Savings Plan", href: "/about-us/dental-savings-plan" },
];

export function AtAGlance() {
  return (
    <section className="bg-white pt-14 sm:pt-20" aria-labelledby="glance-heading">
      <div className="container-site">
        <RevealGroup stagger={0.06} className="at-a-glance grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
          {/* Practice: name, address, county, phone */}
          <RevealItem className="md:col-span-2 lg:col-span-5 lg:row-span-2">
            <div className="relative isolate flex h-full min-h-96 flex-col justify-between overflow-hidden rounded-4xl p-6 text-white sm:p-8">
              <Image
                src="/images/office/office-41.jpg"
                alt={`The ${site.name} building at ${site.address.full}`}
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="-z-10 object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink/95 via-ink/55 to-ink/20" />
              <Eyebrow tone="light">At a glance</Eyebrow>
              <div>
                <h2 id="glance-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {site.name}
                </h2>
                <a
                  href={site.address.directions}
                  target="_blank"
                  rel="noopener"
                  className="mt-3 flex items-start gap-2 text-lg text-white/85 hover:text-white"
                >
                  <MapPin className="mt-1 size-5 shrink-0 text-glow" /> {site.address.full}
                </a>
                <p className="mt-1.5 pl-7 text-white/65">Delaware County, Pennsylvania</p>
                <a
                  href={site.phone.href}
                  className="group mt-6 inline-flex min-h-12 items-center gap-3 rounded-full bg-white py-1.5 pr-5 pl-1.5 font-semibold text-ink transition-colors hover:bg-glow"
                >
                  <span className="grid size-9 place-items-center rounded-full bg-brand-500 text-white">
                    <Phone className="size-4" />
                  </span>
                  {site.phone.display}
                </a>
              </div>
            </div>
          </RevealItem>

          {/* Google rating */}
          <RevealItem className="lg:col-span-3">
            <Link
              href="/about-us/patient-reviews"
              className="group flex h-full flex-col justify-between gap-6 rounded-4xl bg-pearl p-6 ring-1 ring-line transition-shadow duration-500 hover:shadow-lift"
            >
              <span className="flex items-center justify-between">
                <GoogleIcon size={24} />
                <ArrowUpRight className="size-5 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
              </span>
              <span>
                <span className="flex items-end gap-3">
                  <span className="text-6xl leading-none font-bold tracking-tighter text-ink">{site.rating.score}</span>
                  <span className="mb-1.5 flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </span>
                </span>
                <span className="mt-2 block font-semibold text-ink">
                  {site.rating.score} stars from {site.rating.count} reviews
                </span>
                <span className="text-sm text-muted">Google rating</span>
              </span>
            </Link>
          </RevealItem>

          {/* Dentists */}
          <RevealItem className="lg:col-span-4">
            <Link
              href="/about-us/meet-the-staff"
              className="group flex h-full flex-col justify-between gap-6 rounded-4xl bg-linear-to-br from-brand-500 to-brand-700 p-6 text-white transition-shadow duration-500 hover:shadow-glow"
            >
              <span className="flex items-center justify-between">
                <span className="flex -space-x-3">
                  {doctors.map((d) => (
                    <span key={d.name} className="relative size-14 overflow-hidden rounded-full ring-4 ring-brand-600">
                      <Image
                        src={d.image}
                        alt={`${d.name}, ${d.credential}`}
                        fill
                        sizes="56px"
                        className="object-cover"
                        style={{ objectPosition: d.position }}
                      />
                    </span>
                  ))}
                </span>
                <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
              </span>
              <span>
                <span className="text-xs font-bold tracking-[0.14em] text-brand-100 uppercase">3 dentists</span>
                <span className="mt-2 block space-y-0.5 font-semibold">
                  {doctors.map((d) => (
                    <span key={d.name} className="block">
                      {d.name} {d.credential}
                    </span>
                  ))}
                </span>
              </span>
            </Link>
          </RevealItem>

          {/* Hours */}
          <RevealItem className="lg:col-span-4">
            <div className="flex h-full flex-col justify-between gap-5 rounded-4xl bg-white p-6 ring-1 ring-line">
              <span className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                  <Clock className="size-4" /> Hours
                </span>
                <OpenStatus className="text-sm" />
              </span>
              <dl className="divide-y divide-line">
                {hours.map((h) => (
                  <div key={h.day} className="flex items-baseline justify-between gap-4 py-2">
                    <dt className="font-semibold text-ink">{h.day}</dt>
                    <dd className="text-right text-body">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </RevealItem>

          {/* New patients */}
          <RevealItem className="lg:col-span-3">
            <Link
              href="/special-offers"
              className="group flex h-full flex-col justify-between gap-6 rounded-4xl bg-mist p-6 ring-1 ring-brand-100 transition-shadow duration-500 hover:shadow-lift"
            >
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                  <BadgeDollarSign className="size-4" /> New patients
                </span>
                <ArrowUpRight className="size-5 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
              </span>
              <span>
                <span className="text-6xl leading-none font-bold tracking-tighter text-ink">$99</span>
                <span className="mt-2 block font-semibold text-ink">Welcome. New Patient Special</span>
                <span className="text-sm text-body">Regular $315, for uninsured patients</span>
              </span>
            </Link>
          </RevealItem>

          {/* Ways to pay */}
          <RevealItem className="md:col-span-2 lg:col-span-12">
            <div className="flex flex-col gap-4 rounded-4xl bg-ink p-5 text-white sm:p-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-xs font-bold tracking-[0.14em] text-brand-300 uppercase">Ways to pay</p>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 lg:flex-1 lg:pl-8">
                {pay.map(({ icon: Icon, text, href }) => (
                  <li key={text}>
                    <Link
                      href={href}
                      className="group flex min-h-12 items-center gap-3 rounded-2xl bg-white/6 px-4 py-2.5 ring-1 ring-white/10 transition-colors hover:bg-white hover:text-ink"
                    >
                      <Icon className="size-5 shrink-0 text-glow transition-colors group-hover:text-brand-600" />
                      <span className="font-semibold">{text}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
