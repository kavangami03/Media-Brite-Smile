import Link from "next/link";
import { ArrowUpRight, MapPin, Navigation, Phone } from "lucide-react";
import { locations, site, type Location } from "@/content/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SplitReveal } from "@/components/motion/split-reveal";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";

/** Grid of the other service-area pages; the home office card is highlighted. */
export function NearbyAreas({ current }: { current: Location }) {
  const others = locations.filter((l) => l.slug !== current.slug);

  return (
    <section className="bg-pearl section-y" aria-labelledby="nearby-heading">
      <div className="container-site">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Areas we serve</Eyebrow>
            <SplitReveal as="h2" id="nearby-heading" className="mt-6 text-display-md font-bold">
              Also serving nearby communities
            </SplitReveal>
          </div>
          <Link
            href="/locations"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            All locations <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <RevealGroup className="mt-10 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {others.map((l, i, all) => (
            <RevealItem key={l.slug}>
              <Link
                href={`/locations/${l.slug}`}
                className={
                  l.isHome
                    ? "group relative flex h-full min-h-36 flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-brand-500 p-5 text-white shadow-glow sm:p-6"
                    : "group relative flex h-full min-h-36 flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-white p-5 ring-1 ring-line transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-6"
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className={
                      l.isHome
                        ? "inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white"
                        : "text-sm font-semibold text-muted tabular-nums"
                    }
                  >
                    {l.isHome ? (
                      <>
                        <MapPin className="size-3.5" /> Our office
                      </>
                    ) : (
                      String(all[0].isHome ? i : i + 1).padStart(2, "0")
                    )}
                  </span>
                  <span
                    className={
                      l.isHome
                        ? "grid size-10 place-items-center rounded-full bg-white text-brand-600 transition-transform duration-500 group-hover:rotate-45"
                        : "grid size-10 place-items-center rounded-full bg-mist text-brand-600 transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white"
                    }
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <div>
                  <p
                    className={
                      l.isHome
                        ? "text-2xl font-bold tracking-tight text-white"
                        : "text-2xl font-bold tracking-tight text-ink"
                    }
                  >
                    {l.name}
                  </p>
                  <p className={l.isHome ? "mt-1 text-sm text-brand-50" : "mt-1 text-sm text-muted"}>
                    {l.isHome ? site.address.street : "Pennsylvania"}
                  </p>
                </div>
              </Link>
            </RevealItem>
          ))}

          {/* Fills the 8th slot so the grid always closes cleanly */}
          <RevealItem>
            <div className="flex h-full min-h-36 flex-col justify-between gap-5 rounded-3xl bg-ink p-5 text-white sm:p-6">
              <div>
                <p className="text-lg font-bold tracking-tight text-white">Coming from somewhere else?</p>
                <p className="mt-1 text-sm text-white/65">We welcome patients from all over the area.</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
                <a href={site.phone.href} className="inline-flex items-center gap-2 text-glow hover:text-white">
                  <Phone className="size-4" /> {site.phone.display}
                </a>
                <a
                  href={site.address.directions}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-white/85 hover:text-white"
                >
                  <Navigation className="size-4" /> Directions
                </a>
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
