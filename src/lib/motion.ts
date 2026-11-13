import type { Transition, Variants } from "motion/react";

/**
 * Shared Framer Motion (now published as `motion`) presets.
 * Curves match the GSAP "brite.*" eases so both libraries feel identical.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  outQuint: [0.22, 1, 0.36, 1],
  inOut: [0.85, 0, 0.15, 1],
} as const;

export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 0.8 },
  snappy: { type: "spring", stiffness: 300, damping: 26 },
  magnetic: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
} satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: ease.out } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: ease.out } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: 1, ease: ease.out } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
});

/** Default viewport config for whileInView reveals */
export const inView = { once: true, amount: 0.25 } as const;
