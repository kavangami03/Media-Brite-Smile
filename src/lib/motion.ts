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
// "some" + a bottom margin: tall blocks (e.g. the sitemap list on phones) still reveal; short ones wait until 10% in.
export const inView = { once: true, amount: "some", margin: "0px 0px -10% 0px" } as const;
