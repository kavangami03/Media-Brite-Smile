"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, MapPin, Phone, Plus } from "lucide-react";
import { mainNav, serviceGroups, site, type NavGroup, type NavLink } from "@/content/site";
import { Button } from "@/components/ui/button";
import { FacebookIcon, GoogleIcon, YelpIcon } from "@/components/ui/icons";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PANELS = 5;
const isGroup = (item: NavLink | NavGroup): item is NavGroup => "links" in item;

type Entry =
  | { kind: "link"; label: string; href: string }
  | { kind: "services" }
  | { kind: "group"; label: string; links: readonly NavLink[] };

/** Menu order: About, Services (accordion), Patients (accordion), Special Offers, Locations, Contact */
const entries: Entry[] = [
  ...mainNav.map<Entry>((item) => {
    if (item.label === "Services") return { kind: "services" };
    if (isGroup(item) && item.links.length) return { kind: "group", label: item.label, links: item.links };
    return { kind: "link", label: item.label, href: item.href };
  }),
];
entries.splice(entries.length - 1, 0, { kind: "link", label: "Locations", href: "/locations" });

/**
 * Full-screen GSAP menu:
 * staggered cerulean panels drop in, numbered links rise line by line, contact
 * details fade up last. Closing plays the same timeline in reverse, faster.
 */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useGSAP(
    () => {
      const el = root.current!;
      gsap.set(el, { autoAlpha: 0 });

      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "brite.out" },
          onReverseComplete: () => {
            gsap.set(el, { autoAlpha: 0 });
          },
        })
        .set(el, { autoAlpha: 1 })
        .fromTo(
          "[data-mm-panel]",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.6, stagger: 0.06, ease: "brite.inOut", transformOrigin: "50% 0%" },
        )
        .fromTo("[data-mm-top]", { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.25")
        .fromTo("[data-mm-item]", { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.06 }, "-=0.35")
        .fromTo("[data-mm-num]", { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.06 }, "<0.1")
        .fromTo("[data-mm-foot]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.55");
    },
    { scope: root },
  );

  // Drive the timeline from the `open` prop
  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (open) {
      t.timeScale(1).play();
    } else if (t.progress() > 0) {
      t.timeScale(1.7).reverse();
    }
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const toggle = (key: string) => setExpanded((cur) => (cur === key ? null : key));

  return (
    <div
      ref={root}
      className="invisible fixed inset-0 z-70 overflow-hidden text-white xl:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
    >
      {/* Staggered panels */}
      <div aria-hidden="true" className="absolute inset-0 flex">
        {Array.from({ length: PANELS }).map((_, i) => (
          <span
            key={i}
            data-mm-panel
            className="h-full flex-1 bg-linear-to-b from-brand-700 via-brand-900 to-ink"
            style={{ marginLeft: i ? -1 : 0 }}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 size-140 rounded-full bg-glow/15 blur-[120px]"
      />

      {/* Content */}
      <div className="relative flex h-full flex-col">
        <div data-mm-top className="container-site flex h-20 shrink-0 items-center justify-between">
          <Link href="/" onClick={onClose} aria-label={`${site.name} home`}>
            <Image
              src="/images/brand/logo.svg"
              alt={site.name}
              width={892}
              height={302}
              unoptimized
              className="h-11 w-auto brightness-0 invert sm:h-12"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="group relative grid size-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition-colors hover:bg-white hover:text-ink"
            aria-label="Close menu"
          >
            <span className="absolute h-0.5 w-5 rotate-45 rounded-full bg-current" />
            <span className="absolute h-0.5 w-5 -rotate-45 rounded-full bg-current" />
          </button>
        </div>

        <nav
          aria-label="Mobile"
          className="scrollbar-on-dark container-site flex-1 overflow-y-auto pb-8"
          data-lenis-prevent
        >
          <ul className="border-t border-white/15">
            {entries.map((entry, i) => {
              const num = String(i + 1).padStart(2, "0");
              const key = entry.kind === "services" ? "Services" : entry.label;
              const isOpen = expanded === key;
              const rowCls =
                "flex w-full items-center gap-4 py-4 text-left text-[clamp(1.625rem,1.1rem+4vw,2.5rem)] leading-tight font-bold tracking-tight";

              return (
                <li key={key} className="border-b border-white/15">
                  <div className="overflow-hidden">
                    <div data-mm-item>
                      {entry.kind === "link" ? (
                        <Link href={entry.href} onClick={onClose} className={cn(rowCls, "group")}>
                          <span data-mm-num className="w-7 shrink-0 text-xs font-semibold text-glow tabular-nums">
                            {num}
                          </span>
                          <span className="min-w-0 flex-1 transition-transform duration-500 ease-out-expo group-hover:translate-x-2">
                            {entry.label}
                          </span>
                          <ArrowUpRight className="size-5 shrink-0 text-white/50 transition-transform duration-500 group-hover:rotate-45 group-hover:text-glow" />
                        </Link>
                      ) : (
                        <button type="button" onClick={() => toggle(key)} aria-expanded={isOpen} className={rowCls}>
                          <span data-mm-num className="w-7 shrink-0 text-xs font-semibold text-glow tabular-nums">
                            {num}
                          </span>
                          <span className="min-w-0 flex-1">{key}</span>
                          <span
                            className={cn(
                              // border (not ring): a ring draws outside the box and the row's overflow-hidden crops it
                              "grid size-9 shrink-0 place-items-center rounded-full border border-white/25 transition-all duration-500",
                              isOpen && "rotate-45 border-white bg-white text-ink",
                            )}
                          >
                            <Plus className="size-4" />
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Accordion body */}
                  {entry.kind !== "link" && (
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-500 ease-out-expo",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        {entry.kind === "services" ? (
                          <div className="grid grid-cols-1 gap-6 pb-6 pl-11 sm:grid-cols-3">
                            {serviceGroups.map((g) => (
                              <div key={g.id}>
                                <Link
                                  href={g.href}
                                  onClick={onClose}
                                  className="text-xs font-bold tracking-[0.16em] text-glow uppercase"
                                >
                                  {g.title}
                                </Link>
                                <ul className="mt-3 space-y-2">
                                  {g.links.slice(0, 6).map((l) => (
                                    <li key={l.href}>
                                      <Link
                                        href={l.href}
                                        onClick={onClose}
                                        className="text-[0.9375rem] text-white/75 hover:text-white"
                                      >
                                        {l.label}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="space-y-2.5 pb-6 pl-11">
                            {entry.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={onClose}
                                  className="text-base text-white/75 hover:text-white"
                                >
                                  {l.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Footer of the menu */}
          <div className="mt-8 space-y-5">
            <div data-mm-foot className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Button href={site.bookingHref} variant="white" size="lg" onClick={onClose} className="w-full">
                Book Appointment
              </Button>
              <Button
                href={site.phone.href}
                variant="outline-light"
                size="lg"
                className="w-full"
                icon={<Phone className="size-4" />}
              >
                {site.phone.display}
              </Button>
            </div>
            <a
              data-mm-foot
              href={site.address.directions}
              target="_blank"
              rel="noopener"
              className="flex items-start gap-2.5 text-sm text-white/70 hover:text-white"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-glow" /> {site.address.full}
            </a>
            <div data-mm-foot className="flex gap-2">
              {[
                { label: "Google", href: site.social.google, icon: <GoogleIcon size={18} mono /> },
                { label: "Facebook", href: site.social.facebook, icon: <FacebookIcon size={18} /> },
                { label: "Yelp", href: site.social.yelp, icon: <YelpIcon size={18} /> },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener"
                  aria-label={`${site.name} on ${label}`}
                  className="grid size-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition-colors hover:bg-white hover:text-ink"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
