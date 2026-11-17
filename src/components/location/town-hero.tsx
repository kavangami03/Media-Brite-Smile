import { Clock, MapPin, Navigation, Phone, Star } from "lucide-react";
import { site, type Location } from "@/content/site";
import type { Town } from "@/content/towns";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { BrandTooth } from "@/components/ui/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";

/** Highlights the town name inside the draft's H1 ("Your Dentist Near Aston, PA"). */
function Headline({ h1, name }: { h1: string; name: string }) {
  const i = h1.indexOf(name);
  if (i < 0) return <>{h1}</>;
  return (
    <>
      {h1.slice(0, i)}
      <span className="text-brand-500">{name}</span>
      {h1.slice(i + name.length)}
    </>
  );
}

/** Town hero: the draft's H1 and intro on the left, the live Google route to the office on the right. */
export function TownHero({ location, town }: { location: Location; town: Town }) {
  const { drive } = town;
  return (
    <section
      className="relative overflow-hidden bg-pearl pt-32 pb-14 lg:pt-40 lg:pb-20"
      aria-labelledby="location-title"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 size-160 rounded-full glow-blob text-brand-200/45" />
        <div className="absolute right-0 bottom-0 size-140 rounded-full glow-blob text-glow/20" />
      </div>

      <div className="relative container-site grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-6">
          <Eyebrow>
            Serving {town.name}, PA · {town.zip}
          </Eyebrow>
          <SplitReveal as="h1" id="location-title" immediate className="mt-6 text-display-lg font-bold text-balance">
            <Headline h1={town.h1} name={town.name} />
          </SplitReveal>

          <Reveal delay={0.15}>
            {town.intro.map((p) => (
              <p key={p.slice(0, 24)} className="mt-6 max-w-xl text-lg leading-relaxed text-pretty">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={site.bookingHref} size="lg">
                Request an Appointment
              </Button>
              <Button href={site.phone.href} variant="outline" size="lg" icon={<Phone className="size-4" />}>
                Call {site.phone.display}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:gap-8">
              <a href={site.gbp} target="_blank" rel="noopener" className="flex shrink-0 items-center gap-3">
                <span className="text-4xl leading-none font-bold tracking-tighter text-ink">{site.rating.score}</span>
                <span className="leading-tight">
                  <span className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="mt-1 block text-xs text-muted">{site.rating.count} Google reviews</span>
                </span>
              </a>
              <ul className="flex flex-wrap gap-2">
                {["Three dentists under one roof", "$99 new patient exam if uninsured"].map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="min-w-0 lg:col-span-6">
          <div className="relative overflow-hidden rounded-4xl bg-mist shadow-lift ring-1 ring-line sm:rounded-5xl">
            <iframe
              title={`Driving route from ${town.name}, PA to ${site.name}`}
              src={location.routeEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-80 w-full sm:h-104 lg:h-120"
            />
            <div className="border-t border-line bg-white p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
                <div className="flex items-stretch gap-4">
                  <div className="flex flex-col items-center py-1" aria-hidden="true">
                    <span className="size-3 rounded-full border-2 border-brand-500 bg-white" />
                    <span className="my-1 w-px flex-1 border-l-2 border-dashed border-brand-200" />
                    <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-white">
                      <MapPin className="size-3.5" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 space-y-4">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">From</p>
                      <p className="font-semibold text-ink">{town.name}, PA</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <BrandTooth size={18} className="mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold tracking-[0.14em] text-muted uppercase">To</p>
                        <p className="font-semibold text-ink">{site.name}</p>
                        <p className="text-sm text-body">{site.address.full}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  href={location.directions}
                  target="_blank"
                  rel="noopener"
                  variant="dark"
                  className="w-full sm:w-auto"
                  icon={<Navigation className="size-4" />}
                >
                  Get directions
                </Button>
              </div>
              <p className="mt-4 flex gap-2 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                <Clock className="size-3.5 shrink-0 text-brand-500" />
                <span>
                  {drive.time ? (
                    <>
                      Usual route: {drive.route}, {drive.time} and {drive.miles} (measured 12 Nov 2026).{" "}
                    </>
                  ) : (
                    <>{drive.route}. </>
                  )}
                  The map shows today&apos;s live traffic time.
                </span>
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
