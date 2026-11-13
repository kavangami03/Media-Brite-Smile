"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import {
  ArrowUpRight,
  Building2,
  ChevronDown,
  Cpu,
  CreditCard,
  HeartHandshake,
  MapPin,
  Phone,
  PiggyBank,
  Siren,
  Star,
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
              <Siren className="size-3.5 text-glow" /> Same-day emergency appointments
            </a>
          </div>
        </motion.div>

        {/* Main bar */}
        <div
          className={cn(
            "transition-[background-color,box-shadow,backdrop-filter] duration-500",
            scrolled || open ? "bg-white/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent",
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
                {mainNav.map((item) => (
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
                        "flex items-center gap-1 rounded-full px-4 py-2.5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-brand-50 hover:text-brand-700",
                        open === item.label && "bg-brand-50 text-brand-700",
                      )}
                      aria-expanded={isGroup(item) ? open === item.label : undefined}
                    >
                      {item.label}
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
                className="group hidden items-center gap-3 rounded-full py-1.5 pr-2 lg:flex"
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
              <Button href={site.bookingHref} className="hidden sm:inline-flex">
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
                  <div className="overflow-hidden rounded-4xl border border-line bg-white shadow-lift">
                    {open === "Services" ? (
                      <ServicesMega onNavigate={closeNow} />
                    ) : (
                      <SimpleMenu group={mainNav.find((i) => i.label === open) as NavGroup} onNavigate={closeNow} />
                    )}
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

function ServicesMega({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_22rem] gap-10 p-10">
      {serviceGroups.map((group) => (
        <div key={group.id}>
          <Link
            href={group.href}
            onClick={onNavigate}
            className="group mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-brand-600 uppercase"
          >
            {group.title}
            <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <ul className="space-y-0.5">
            {group.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  className="group flex items-center justify-between rounded-xl px-3 py-2 text-[0.9375rem] text-body transition-colors hover:bg-pearl hover:text-ink"
                >
                  {l.label}
                  <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <Link
        href="/special-offers"
        onClick={onNavigate}
        className="group relative flex flex-col justify-end overflow-hidden rounded-3xl bg-brand-950 p-7 text-white"
      >
        <Image
          src="/images/hero/girl-smiling.webp"
          alt=""
          fill
          sizes="22rem"
          className="object-cover opacity-55 transition-transform duration-1000 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/40 to-transparent" />
        <div className="relative">
          <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">New patient special</p>
          <p className="mt-2 text-5xl font-bold tracking-tight">$99</p>
          <p className="mt-2 text-sm text-white/80">Regularly $315, for uninsured patients.</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            View all offers <ArrowUpRight className="size-4" />
          </span>
        </div>
      </Link>
    </div>
  );
}

/* Icon + one-line description for every non-doctor dropdown link (published facts only). */
const linkMeta: Record<string, { icon: LucideIcon; desc: string }> = {
  "/about-us/office-tour": { icon: Building2, desc: "Step inside our new office at 8 N Pennell Rd." },
  "/about-us/patient-reviews": {
    icon: Star,
    desc: `Rated ${site.rating.score} from ${site.rating.count} Google reviews.`,
  },
  "/about-us/dental-savings-plan": { icon: PiggyBank, desc: "In-office membership for patients without insurance." },
  "/patient-information/why-choose-us": { icon: HeartHandshake, desc: "Gentle, mercury-free care for every age." },
  "/patient-information/care-and-comfort/advanced-technology": {
    icon: Cpu,
    desc: "Modern tools for precise, comfortable visits.",
  },
  "/patient-information/care-credit": { icon: CreditCard, desc: "Flexible financing to fit your budget." },
};

function MenuLabel({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-xs font-bold tracking-[0.16em] text-brand-600 uppercase">{children}</p>;
}

function QuickLink({ href, label, onNavigate }: NavLink & { onNavigate: () => void }) {
  const meta = linkMeta[href];
  const Icon = meta?.icon ?? ArrowUpRight;
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group flex items-center gap-4 rounded-2xl p-3 transition-colors hover:bg-pearl"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mist text-brand-600 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold text-ink">{label}</span>
        {meta && <span className="mt-0.5 block text-sm text-muted">{meta.desc}</span>}
      </span>
      <ArrowUpRight className="size-4 shrink-0 text-brand-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
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
}: {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  cta: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl bg-brand-950 p-7 text-white"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="22rem"
        className="object-cover opacity-70 transition-transform duration-1000 ease-out-expo group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-brand-950 via-brand-950/45 to-transparent" />
      <div className="relative">
        <p className="text-xs font-bold tracking-[0.16em] text-glow uppercase">{eyebrow}</p>
        <p className="mt-2 text-2xl leading-tight font-bold tracking-tight">{title}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">
          {cta} <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}

/** Patients: four rich tiles + a contact strip, with the feature card on the right. */
function PatientsMenu({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[1fr_22rem] gap-8 p-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <MenuLabel>Patient information</MenuLabel>
          <Link
            href={group.href}
            onClick={onNavigate}
            className="group mb-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            All patient information
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
        <ul className="grid flex-1 grid-cols-2 gap-4">
          {group.links.map((l, i) => {
            const meta = linkMeta[l.href];
            const Icon = meta?.icon ?? ArrowUpRight;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={onNavigate}
                  className="group relative flex h-full items-start gap-5 overflow-hidden rounded-3xl bg-pearl p-6 ring-1 ring-line transition-[background-color,box-shadow] duration-500 hover:bg-white hover:shadow-lift"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft transition-colors duration-500 group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-6" />
                  </span>
                  <span className="min-w-0 flex-1 pt-1">
                    <span className="block text-lg font-semibold tracking-tight text-ink">{l.label}</span>
                    {meta && <span className="mt-1 block text-sm leading-relaxed text-body">{meta.desc}</span>}
                  </span>
                  <span className="absolute top-5 right-5 text-xs font-semibold text-muted tabular-nums transition-opacity duration-300 group-hover:opacity-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight className="absolute top-5 right-5 size-4 text-brand-500 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center justify-between gap-6 rounded-3xl bg-ink px-6 py-4 text-white">
          <a href={site.phone.href} className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-brand-500 transition-colors group-hover:bg-white group-hover:text-brand-600">
              <Phone className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-xs text-white/60">Questions? Call us</span>
              <span className="block font-bold">{site.phone.display}</span>
            </span>
          </a>
          <span className="flex items-center gap-2 text-sm text-white/75">
            <MapPin className="size-4 text-glow" /> {site.address.full}
          </span>
          <span className="flex items-center gap-2 text-sm text-white/75">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <strong className="text-white">{site.rating.score}</strong> from {site.rating.count} reviews
          </span>
        </div>
      </div>
      <FeatureCard
        href={site.bookingHref}
        image="/images/office/operatory-3.jpg"
        eyebrow="New patients welcome"
        title="Gentle care for toddlers to grandparents"
        cta="Book your visit"
        onNavigate={onNavigate}
      />
    </div>
  );
}

function SimpleMenu({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const doctorLinks = doctors.filter((d) => group.links.some((l) => l.href === d.href));
  const otherLinks = group.links.filter((l) => !doctors.some((d) => d.href === l.href));
  const isAbout = doctorLinks.length > 0;
  if (!isAbout) return <PatientsMenu group={group} onNavigate={onNavigate} />;

  return (
    <div className="grid grid-cols-[1fr_1fr_22rem] gap-10 p-10">
      <div>
        <MenuLabel>Meet our dentists</MenuLabel>
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
        <MenuLabel>Get to know us</MenuLabel>
        <ul className="space-y-1">
          {otherLinks.map((l) => (
            <li key={l.href}>
              <QuickLink {...l} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
        <Link
          href={group.href}
          onClick={onNavigate}
          className="group mt-4 ml-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          About Media Brite Smile
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>

      <FeatureCard
        href="/about-us/office-tour"
        image="/images/office/office-5.jpg"
        eyebrow={`Since ${site.since}`}
        title="Caring for Media families in our new office"
        cta="Take the office tour"
        onNavigate={onNavigate}
      />
    </div>
  );
}
