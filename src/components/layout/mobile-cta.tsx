"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";

/**
 * Sticky Call / Offers / Book bar on small screens once the hero is passed.
 * Labels shorten on narrow phones so all three fit down to 320px.
 */
export function MobileCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 700));

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.5, ease: ease.out }}
          className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-3 gap-1.5 rounded-full bg-ink/95 p-1.5 shadow-lift lg:hidden"
        >
          <a
            href={site.phone.href}
            className="flex h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-white/10 px-2 text-sm font-semibold text-white ring-1 ring-white/20 transition-colors ring-inset"
          >
            <Phone className="size-4 shrink-0 text-brand-300" />
            <span>
              Call<span className="max-[481px]:hidden"> Now</span>
            </span>
          </a>
          <Link
            href="/special-offers"
            aria-label="Special offers: new patient special $99"
            className="flex h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-white px-2 text-sm font-semibold text-ink transition-colors"
          >
            <span className="shrink-0 text-lg leading-none font-extrabold text-brand-600">$99</span>
            <span className="max-[390px]:hidden">Offers</span>
          </Link>
          <Link
            href={site.bookingHref}
            className="flex h-12 min-w-0 items-center justify-center gap-2 rounded-full bg-brand-500 px-2 text-sm font-semibold text-white transition-colors"
          >
            <CalendarCheck className="size-4 shrink-0" />
            <span>
              Book<span className="max-[481px]:hidden"> Visit</span>
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
