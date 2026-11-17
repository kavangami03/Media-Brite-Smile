"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  ChevronDown,
  Clock,
  CreditCard,
  HeartHandshake,
  MapPin,
  Phone,
  Siren,
  Sparkles,
  Star,
  UserPlus,
  Users,
  type LucideIcon,
} from "lucide-react";
import { doctors, mainNav, serviceGroups, site, type NavGroup, type NavLink } from "@/content/site";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./mobile-menu";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

const isGroup = (item: NavLink | NavGroup): item is NavGroup => "links" in item;

/**
 * Reads the pathname inside its own Suspense boundary so the header itself never
 * blocks prerendering (Cache Components), and calls `onChange` after navigation.
 */
function RouteChange({ onChange }: { onChange: () => void }) {
  const pathname = usePathname();
  const last = useRef(pathname);
  useEffect(() => {
    if (pathname === last.current) return;
    last.current = pathname;
    onChange();
  }, [pathname, onChange]);
  return null;
}

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const lenis = useLenis();
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  const openedAtY = useRef(0);

  /* ---------- Dropdown hover-intent ---------- */
  const cancelClose = useCallback(() => window.clearTimeout(closeTimer.current), []);
  const closeNow = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpen(null);
  }, []);
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(null), 120);
  }, []);
  const openMenu = useCallback(
    (label: string) => {
      cancelClose();
      openedAtY.current = window.scrollY;
      setOpen(label);
    },
    [cancelClose],
  );

  // Close menus on route change (the listener lives in its own Suspense boundary, see RouteChange)
  const onRouteChange = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setOpen(null);
    setMobile(false);
  }, []);

  // Close on Escape and on any click outside the header
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeNow();
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) closeNow();
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open, closeNow]);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 600 && y > prev && !open);
    // Scrolling away closes an open dropdown
    if (open && Math.abs(y - openedAtY.current) > 60) closeNow();
  });

  // Lock page scroll only while the mobile menu is open.
  useEffect(() => {
    if (!lenis || !mobile) return;
    lenis.stop();
    return () => lenis.start();
  }, [mobile, lenis]);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.6, ease: ease.out }}
        ref={headerRef}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Announcement bar */}
        <motion.div
          animate={{ height: scrolled ? 0 : "auto", opacity: scrolled ? 0 : 1 }}
          transition={{ duration: 0.5, ease: ease.out }}
          className="overflow-hidden bg-brand-950 text-[0.8125rem] text-brand-100"
        >
          <div className="container-site flex h-10 items-center justify-between gap-6">
            <p className="flex items-center gap-2">
              <MapPin className="size-3.5 text-glow" />
              <span>
                We&apos;ve moved! Visit us at <strong className="font-semibold text-white">{site.address.full}</strong>
              </span>
            </p>
            <p className="hidden items-center gap-2 md:flex">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-glow opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-glow" />
              </span>
              Use your insurance benefits before your coverage expires!
            </p>
            <a
              href={site.phone.href}
              className="hidden min-h-6 items-center gap-2 py-0.5 font-medium text-white lg:flex"
            >
              <Siren className="size-3.5 text-glow" /> Dental emergency? Call {site.phone.display}
            </a>
          </div>
        </motion.div>

        {/* Main bar */}
        <div
          className={cn(
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            scrolled || open ? "bg-white/95 shadow-[0_1px_0_var(--color-line)]" : "bg-transparent",
          )}
        >
          <div className="container-site flex h-20 items-center justify-between gap-6">
            <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
              <Image
                data-header-logo
                src="/images/brand/logo.svg"
                alt={`${site.name}, ${site.tagline}`}
                width={892}
                height={302}
                preload
                loading="eager"
                unoptimized
                className="h-12 w-auto sm:h-14 lg:h-16"
              />
            </Link>

            <nav aria-label="Primary" className="hidden xl:block">
              <ul className="flex items-center gap-1">
                {mainNav
                  .filter((item) => item.href !== "/special-offers") /* offers have their own tab on the right edge */
                  .map((item) => (
                    <li
                      key={item.label}
                      onPointerEnter={(e) => {
                        if (e.pointerType !== "mouse") return;
                        if (isGroup(item)) openMenu(item.label);
                        else closeNow();
                      }}
                      onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
                    >
                      <Link
                        href={item.href}
                        onClick={closeNow}
                        onFocus={() => (isGroup(item) ? openMenu(item.label) : closeNow())}
                        className={cn(
                          "flex items-center gap-1 rounded-full px-3 py-2.5 text-[0.9375rem] font-medium whitespace-nowrap text-ink transition-colors hover:bg-brand-50 hover:text-brand-700 2xl:px-4",
                          open === item.label && "bg-brand-50 text-brand-700",
                        )}
                        aria-expanded={isGroup(item) ? open === item.label : undefined}
                      >
                        {(isGroup(item) && item.short) || item.label}
                        {isGroup(item) && (
                          <ChevronDown
                            className={cn(
                              "size-4 transition-transform duration-300",
                              open === item.label && "rotate-180",
                            )}
                          />
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href={site.phone.href}
                className="group hidden items-center gap-3 rounded-full py-1.5 pr-2 lg:flex xl:hidden 2xl:flex"
                aria-label={`Call ${site.phone.display}`}
              >
                <span className="relative grid size-11 place-items-center rounded-full bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <Phone className="size-[1.125rem]" />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs font-semibold tracking-[0.14em] text-muted uppercase">Call us</span>
                  <span className="block font-bold text-ink">{site.phone.display}</span>
                </span>
              </a>
              <Button href={site.bookingHref} className="hidden whitespace-nowrap sm:inline-flex">
                Book Appointment
              </Button>
              <button
                type="button"
                onClick={() => setMobile(true)}
                className="group grid size-12 place-items-center rounded-full bg-ink text-white xl:hidden"
                aria-label="Open menu"
              >
                <span className="flex w-5 flex-col items-end gap-1.5" aria-hidden="true">
                  <span className="h-0.5 w-5 rounded-full bg-current transition-all duration-500 group-hover:w-3" />
                  <span className="h-0.5 w-3 rounded-full bg-current transition-all duration-500 group-hover:w-5" />
                </span>
              </button>
            </div>
          </div>

          {/* Desktop dropdowns */}
          <AnimatePresence>
            {open && (
              <motion.div
                key={open}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: ease.out }}
                className="pointer-events-none absolute inset-x-0 top-full hidden xl:block"
              >
                {/* pt-3 (not mt-3) so the gap under the nav is part of the hover area */}
                <div
                  className="pointer-events-auto container-site pt-3"
                  onPointerEnter={cancelClose}
                  onPointerLeave={scheduleClose}
                >
                  <div
                    className="max-h-[calc(100svh-8rem)] overflow-y-auto overscroll-contain rounded-4xl border border-line bg-white shadow-lift"
                    data-lenis-prevent
                  >
                    <DropdownPanel label={open} onNavigate={closeNow} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
      <Suspense fallback={null}>
        <RouteChange onChange={onRouteChange} />
      </Suspense>
    </>
  );
}

/** Picks the right dropdown for the open top-level item. */
function DropdownPanel({ label, onNavigate }: { label: string; onNavigate: () => void }) {
  const category = serviceGroups.find((g) => g.title === label);
  if (category) return <CategoryMenu group={category} onNavigate={onNavigate} />;
  const group = mainNav.find((i) => i.label === label) as NavGroup;
  if (label === "About") return <AboutMenu group={group} onNavigate={onNavigate} />;
  if (label === "Patients") return <PatientsMenu group={group} onNavigate={onNavigate} />;
  return <AreasMenu group={group} onNavigate={onNavigate} />;
}

function MenuLabel({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">{children}</p>;
}

function AllLink({ href, children, onNavigate }: { href: string; children: ReactNode; onNavigate: () => void }) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
    >
      {children}
      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

function FeatureCard({
  href,
  image,
  eyebrow,
  title,
  cta,
  onNavigate,
  className,
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: ReactNode;
  cta: string;
  onNavigate: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl bg-brand-950 p-7 text-white",
        className,
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="20rem"
        className="object-cover opacity-70 transition-transform duration-1000 ease-out-expo group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/45 to-transparent" />
      <div className="relative">
        <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">{eyebrow}</p>
        <div className="mt-2 text-2xl leading-tight font-bold tracking-tight">{title}</div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
          {cta} <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}

/* ---------------------------------------------------------------------------
   Treatment categories: the category's sitemap sub-sections fill the panel,
   with the new patient offer beside them (the old Services panel, one category each).
--------------------------------------------------------------------------- */
/** A different photo behind the $99 offer card in each category menu. */
const offerImages: Record<string, string> = {
  general: "/images/hero/young-patient-smile.jpg",
  cosmetic: "/images/topics/smile-9.jpg",
  restorative: "/images/topics/happy-patient-5.jpg",
};

/** Photo for each treatment card in a short category (licence rows in docs/image-licenses.md). */
const cardImages: Record<string, string> = {
  "/cosmetic-dentistry/teeth-whitening": "/images/services/whitening-result.jpg",
  "/cosmetic-dentistry/invisalign": "/images/topics/aligner-smile.jpg",
  "/cosmetic-dentistry/porcelain-veneers": "/images/topics/cosmetic-tools-5.jpg",
  "/cosmetic-dentistry/dental-bonding": "/images/topics/cosmetic-tools-4.jpg",
  "/cosmetic-dentistry/inlays-onlays": "/images/topics/crown-2.jpg",
};

function CategoryMenu({ group: g, onNavigate }: { group: (typeof serviceGroups)[number]; onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-1 gap-10 p-10 2xl:grid-cols-[1fr_19rem]">
      <div className="min-w-0">
        <div className="mb-6 flex items-end justify-between gap-6 border-b border-line pb-5">
          <div className="min-w-0">
            <MenuLabel>{g.total} treatments</MenuLabel>
            <p className="-mt-2 text-2xl font-bold tracking-tight text-ink">{g.title}</p>
            <p className="mt-1 text-sm text-body">{g.blurb}</p>
          </div>
          <span className="shrink-0">
            <AllLink href={g.href} onNavigate={onNavigate}>
              Overview
            </AllLink>
          </span>
        </div>
        {g.total <= 6 ? (
          /* a short list (Cosmetic): one photo card per treatment */
          <ul className="grid grid-cols-5 gap-3">
            {g.sections.flatMap((sec) =>
              sec.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onNavigate}
                    className="group relative block aspect-4/5 overflow-hidden rounded-3xl bg-brand-950"
                  >
                    <Image
                      src={cardImages[l.href] ?? g.image}
                      alt=""
                      fill
                      sizes="14rem"
                      className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/45 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-white px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-brand-700 shadow-soft">
                      {sec.title}
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                      <span className="flex items-end justify-between gap-2 text-lg leading-tight font-bold">
                        {l.label}
                        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-white group-hover:text-brand-700">
                          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                        </span>
                      </span>
                    </span>
                  </Link>
                </li>
              )),
            )}
          </ul>
        ) : (
          <div className="columns-3 gap-x-10">
            {g.sections.map((sec) => (
              <div key={sec.title} className="mb-6 break-inside-avoid">
                <p className="mb-2.5 flex items-center gap-2.5 text-sm font-extrabold tracking-[0.08em] text-brand-600 uppercase">
                  <span aria-hidden="true" className="h-0.5 w-4 shrink-0 rounded-full bg-brand-500" />
                  {sec.title}
                </p>
                <ul>
                  {sec.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={onNavigate}
                        className="group -mx-2.5 flex items-center justify-between gap-3 rounded-lg px-2.5 py-1.5 text-[0.9375rem] text-body transition-colors hover:bg-pearl hover:text-ink"
                      >
                        {l.label}
                        <ArrowUpRight className="size-3.5 shrink-0 text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>

      <FeatureCard
        href="/special-offers"
        image={offerImages[g.id] ?? "/images/hero/woman-smiling.jpg"}
        eyebrow="New patient special"
        title={
          <>
            <span className="block text-5xl">$99</span>
            <span className="mt-2 block text-sm font-normal text-white/80">
              Regularly $315, for uninsured patients.
            </span>
          </>
        }
        cta="View all offers"
        onNavigate={onNavigate}
        className="hidden 2xl:flex"
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   About: the three dentists, then the team and proof pages.
--------------------------------------------------------------------------- */
const aboutMeta: Record<string, { icon: LucideIcon; desc: string }> = {
  "/about-us/meet-the-staff": { icon: Users, desc: "The people you meet at the front desk and in the chair." },
  "/about-us/office-tour": { icon: Building2, desc: `Step inside our office at ${site.address.street}.` },
  "/about-us/patient-reviews": {
    icon: Star,
    desc: `Rated ${site.rating.score} from ${site.rating.count} Google reviews.`,
  },
  "/about-us/smile-gallery": { icon: Sparkles, desc: "Before-and-after results from real treatment." },
};

function AboutMenu({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const [dentists, team] = group.sections ?? [];
  const doctorLinks = doctors.filter((d) => dentists?.links.some((l) => l.href === d.href));

  return (
    <div className="grid grid-cols-[1fr_1fr_20rem] gap-10 p-10">
      <div>
        <MenuLabel>{dentists?.title}</MenuLabel>
        <ul className="space-y-1">
          {doctorLinks.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                onClick={onNavigate}
                className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-pearl"
              >
                <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl bg-mist ring-1 ring-line">
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                    style={{ objectPosition: d.position }}
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">
                    {d.name}, {d.credential}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{d.focus}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-brand-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <MenuLabel>{team?.title}</MenuLabel>
        <ul className="space-y-1">
          {team?.links.map((l) => {
            const meta = aboutMeta[l.href];
            const Icon = meta?.icon ?? ArrowUpRight;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-pearl"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink">{l.label}</span>
                    {meta && <span className="mt-0.5 block text-sm text-muted">{meta.desc}</span>}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-brand-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 ml-3">
          <AllLink href={group.href} onNavigate={onNavigate}>
            About Media Brite Smile
          </AllLink>
        </div>
      </div>

      <FeatureCard
        href="/about-us/office-tour"
        image="/images/office/office-5.jpg"
        eyebrow="Office tour"
        title="Three dentists under one roof in Media"
        cta="Take the office tour"
        onNavigate={onNavigate}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Patients: four labelled columns (new patients, paying, comfort, resources).
--------------------------------------------------------------------------- */
const patientIcons: Record<string, LucideIcon> = {
  "New patients": UserPlus,
  "Paying for care": CreditCard,
  "Comfort & safety": HeartHandshake,
  Resources: BookOpen,
};

/* ---------------------------------------------------------------------------
   Patients: a compact band of four link columns with icon headings.
--------------------------------------------------------------------------- */
function PatientsMenu({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  return (
    <div className="px-8 py-6">
      <div className="flex items-center justify-between gap-4">
        <MenuLabel>Patient information</MenuLabel>
        <span className="mb-4">
          <AllLink href={group.href} onNavigate={onNavigate}>
            All patient information
          </AllLink>
        </span>
      </div>
      <div className="grid grid-cols-4 divide-x divide-line">
        {group.sections?.map((sec) => {
          const Icon = patientIcons[sec.title] ?? ArrowUpRight;
          return (
            <div key={sec.title} className="min-w-0 px-6 first:pl-0 last:pr-0">
              <p className="flex items-center gap-2.5 font-semibold text-ink">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="size-4" />
                </span>
                {sec.title}
              </p>
              <ul className="mt-3 space-y-0.5">
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onNavigate}
                      className="group -mx-2 flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[0.9375rem] text-body transition-colors hover:bg-pearl hover:text-brand-700"
                    >
                      {l.label}
                      <ArrowUpRight className="size-3.5 shrink-0 text-brand-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Areas We Serve: towns grouped by area, each with its measured drive time.
--------------------------------------------------------------------------- */
function AreasMenu({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_20rem] gap-10 p-10">
      <div className="flex min-w-0 flex-col">
        <div className="flex items-center justify-between">
          <MenuLabel>Delaware County towns we serve</MenuLabel>
          <span className="mb-4">
            <AllLink href={group.href} onNavigate={onNavigate}>
              All areas &amp; routes
            </AllLink>
          </span>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {group.sections?.map((sec) => (
            <div key={sec.title}>
              <p className="mb-2 text-xs font-bold tracking-[0.14em] text-muted uppercase">{sec.title}</p>
              <ul>
                {sec.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={onNavigate}
                      className="group -mx-2.5 flex items-center justify-between gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-pearl"
                    >
                      <span className="flex items-center gap-2.5 font-medium text-ink">
                        <MapPin className="size-4 shrink-0 text-brand-500" />
                        {l.label}
                      </span>
                      {l.note && (
                        <span className="shrink-0 rounded-full bg-mist px-2.5 py-0.5 text-xs font-semibold text-brand-700 tabular-nums transition-colors group-hover:bg-brand-500 group-hover:text-white">
                          {l.note}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-auto flex items-center gap-2 border-t border-line pt-4 text-sm text-muted">
          <Clock className="size-4 text-brand-500" />
          Drive times measured in Google Maps from {site.address.full}. Times vary with traffic.
        </p>
      </div>
      <FeatureCard
        href={group.href}
        image="/images/office/office-41.jpg"
        eyebrow="Delaware County"
        title="Every town here is within a 12-minute drive"
        cta="See all areas"
        onNavigate={onNavigate}
      />
    </div>
  );
}
