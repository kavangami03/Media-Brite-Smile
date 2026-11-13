"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowUp } from "lucide-react";
import { ease } from "@/lib/motion";

/** Floating back-to-top button, pinned bottom right. */
export function BackToTop() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 300));

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.45, ease: ease.out }}
          className="group fixed right-4 bottom-21 z-40 grid size-13 place-items-center rounded-full bg-brand-500 text-white shadow-lift transition-colors duration-300 hover:bg-brand-700 sm:right-6 lg:bottom-6"
        >
          <ArrowUp className="size-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
