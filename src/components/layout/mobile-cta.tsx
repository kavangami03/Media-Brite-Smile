"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { CalendarCheck, Phone } from "lucide-react";
import { site } from "@/content/site";
import { ease } from "@/lib/motion";

/** Sticky Call / Book bar on small screens once the hero is passed. */
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
          className="fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full bg-ink/90 p-1.5 shadow-lift backdrop-blur-lg lg:hidden"
        >
          <a
            href={site.phone.href}
            className="flex h-12 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white"
          >
            <Phone className="size-4 text-brand-300" /> Call Now
          </a>
          <Link
            href={site.bookingHref}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 text-sm font-semibold text-white"
          >
            <CalendarCheck className="size-4" /> Book Visit
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
