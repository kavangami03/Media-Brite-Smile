import type { CSSProperties, SVGProps } from "react";
import { cn } from "@/lib/utils";
import { TOOTH_CURLS, TOOTH_OUTLINE, TOOTH_RATIO, TOOTH_SMILE, TOOTH_VIEWBOX } from "./tooth-paths";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/**
 * The practice's real tooth mark, drawn from the vector logo (always crisp).
 * `color` = grey outline + cerulean smile (light backgrounds)
 * `light` = white outline + aqua smile (dark / brand backgrounds)
 */
export function BrandTooth({
  size = 24,
  variant = "color",
  className,
}: {
  size?: number;
  variant?: "color" | "light";
  className?: string;
}) {
  const outline = variant === "light" ? "#ffffff" : "#6D6E70";
  const smile = variant === "light" ? "var(--color-glow)" : "#009FCC";
  return (
    <svg
      viewBox={TOOTH_VIEWBOX}
      width={size * TOOTH_RATIO}
      height={size}
      aria-hidden="true"
      className={cn("inline-block shrink-0", className)}
    >
      <path d={TOOTH_SMILE} fillRule="evenodd" fill={smile} />
      <path d={TOOTH_CURLS} fillRule="evenodd" fill={smile} />
      <path d={TOOTH_OUTLINE} fill={outline} />
    </svg>
  );
}

/** Large decorative silhouette of the real tooth mark in a single colour (set with text-*). */
export function ToothWatermark({ size, className, style }: { size: number; className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox={TOOTH_VIEWBOX}
      width={size * TOOTH_RATIO}
      height={size}
      aria-hidden="true"
      className={cn("pointer-events-none block", className)}
      style={style}
      fill="currentColor"
    >
      <path d={TOOTH_SMILE} fillRule="evenodd" />
      <path d={TOOTH_CURLS} fillRule="evenodd" />
      <path d={TOOTH_OUTLINE} />
    </svg>
  );
}

export function FacebookIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H8v3h2.5V21h3Z" />
    </svg>
  );
}

/** Google "G". `mono` renders it in a single colour (currentColor), e.g. white on brand backgrounds. */
export function GoogleIcon({ size = 18, mono = false, ...props }: IconProps & { mono?: boolean }) {
  const c = (brand: string) => (mono ? "currentColor" : brand);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill={c("#4285F4")} d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" />
      <path fill={c("#34A853")} d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
      <path fill={c("#FBBC05")} d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14Z" />
      <path fill={c("#EA4335")} d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6Z" />
    </svg>
  );
}

export function YelpIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.3 2.3c-.6-.3-4.4.8-5.1 1.3-.4.3-.5.8-.4 1.1l3.5 6.3c.6 1.1 2.2.7 2.2-.5V3.2c0-.4-.1-.7-.2-.9Zm-1.6 12.2-5.3 1.3c-.5.1-.8.6-.7 1.1.1 1.2 1.1 3.6 2 4.3.4.3.9.2 1.2-.1l3.6-4.6c.7-.9-.1-2.2-1.2-1.9l.4-.1Zm.4-2.4c.4-.5.2-1.2-.4-1.5L5.2 8.5c-.5-.2-1 0-1.2.4-.6 1.1-.9 3.6-.6 4.6.2.5.7.7 1.1.6l5.9-1.4c.3-.1.5-.3.7-.6Zm2.7 3.3c-.7-.9-2.1-.4-2.1.7l.2 5.8c0 .5.4.9.9.9 1.2 0 3.6-1 4.3-1.8.3-.4.3-.9 0-1.2l-3.3-4.4Zm6.6-2.2-5.5-1.8c-1.1-.4-2 .9-1.4 1.9l3.1 4.9c.3.4.8.5 1.2.3 1-.6 2.6-2.7 2.9-3.8.1-.6-.1-1.1-.3-1.5Zm-.5-4.6c-.4-1-2.2-3.1-3.2-3.5-.4-.2-.9 0-1.2.4l-3.2 4.8c-.6 1 .3 2.2 1.4 1.9l5.5-1.7c.6-.2.8-.7.7-1.9Z" />
    </svg>
  );
}
