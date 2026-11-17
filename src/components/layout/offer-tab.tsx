import Link from "next/link";
import { Gift } from "lucide-react";

/**
 * Special Offers tab, fixed to the middle of the right edge on desktop widths; opens the offers page.
 * Slimmer up to 1679px, where the side gutter is 40px, so it does not cover content.
 * A light sweep runs down the tab and the $99 badge bobs gently (motion-safe only).
 */
export function OfferTab() {
  return (
    <Link
      href="/special-offers"
      aria-label="Special offers: new patient special $99"
      className="group fixed top-1/2 right-0 z-40 hidden translate-x-1 -translate-y-1/2 flex-col items-center gap-3 overflow-hidden rounded-l-2xl bg-linear-to-b from-brand-500 to-brand-800 px-2.5 pt-3 pb-4 text-white shadow-glow transition-transform duration-500 ease-out-expo hover:translate-x-0 max-[1680px]:gap-2.5 max-[1680px]:px-1.5 max-[1680px]:pt-2 max-[1680px]:pb-3 lg:flex"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-transparent via-white/30 to-transparent motion-safe:animate-offer-shine"
      />
      <span
        aria-hidden="true"
        className="relative grid size-11 place-items-center rounded-full bg-white text-[0.8125rem] font-extrabold text-brand-700 shadow-soft motion-safe:animate-offer-bob max-[1680px]:size-9 max-[1680px]:text-xs"
      >
        $99
      </span>
      <span
        aria-hidden="true"
        className="relative rotate-180 text-sm font-bold tracking-[0.12em] whitespace-nowrap uppercase [writing-mode:vertical-rl] max-[1680px]:text-xs"
      >
        Special Offers
      </span>
      <Gift
        aria-hidden="true"
        className="relative size-4 text-glow transition-transform duration-500 group-hover:scale-125"
      />
    </Link>
  );
}
