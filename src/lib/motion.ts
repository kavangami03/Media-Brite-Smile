/**
 * Shared Framer Motion (now published as `motion`) presets.
 * Curves match the GSAP "brite.*" eases so both libraries feel identical.
 */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  outQuint: [0.22, 1, 0.36, 1],
  inOut: [0.85, 0, 0.15, 1],
} as const;

/** Default viewport config for whileInView reveals */
export const inView = { once: true, amount: 0.25 } as const;
