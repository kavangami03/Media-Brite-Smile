import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "outline-light" | "white" | "ghost";
type Size = "md" | "lg";

/* ---------------------------------------------------------------------------
   One clear pill with the icon in a small circle at its right end.
   Hover: that circle grows from behind the icon until it floods the whole
   button with the contrasting colour; the label rolls and the icon turns.
--------------------------------------------------------------------------- */

const base: Record<Variant, string> = {
  primary: "bg-brand-500 text-white shadow-glow",
  dark: "bg-ink text-white",
  outline: "bg-white/70 text-ink ring-1 ring-ink/15 backdrop-blur",
  "outline-light": "bg-white/5 text-white ring-1 ring-white/30 backdrop-blur",
  white: "bg-white text-ink shadow-soft",
  ghost: "text-ink",
};

/* the circle colour (which floods the button on hover), icon colour on it, and label colour once flooded */
const flood: Record<Variant, { circle: string; icon: string; text: string }> = {
  primary: { circle: "bg-ink", icon: "text-white", text: "hover:text-white" },
  dark: { circle: "bg-brand-500", icon: "text-white", text: "hover:text-white" },
  outline: { circle: "bg-ink", icon: "text-white", text: "hover:text-white" },
  "outline-light": { circle: "bg-white", icon: "text-ink", text: "hover:text-ink" },
  white: { circle: "bg-brand-500", icon: "text-white", text: "hover:text-white" },
  ghost: { circle: "bg-brand-50", icon: "text-brand-600", text: "hover:text-brand-600" },
};

const sizes: Record<Size, { h: string; pl: string; circle: string; text: string; iconSize: string }> = {
  md: { h: "min-h-12 py-1.5", pl: "pl-6 pr-1.5", circle: "size-9", text: "text-[0.9375rem]", iconSize: "size-4" },
  lg: { h: "min-h-14 py-2", pl: "pl-6 pr-2 sm:pl-7", circle: "size-10", text: "text-base", iconSize: "size-5" },
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode | false;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "className" | "children">;

export function Button({ variant = "primary", size = "md", icon, children, className, ...props }: ButtonProps) {
  const showIcon = icon !== false;
  const s = sizes[size];
  const f = flood[variant];
  const isGhost = variant === "ghost";

  return (
    <Link
      className={cn(
        "group/btn relative isolate inline-flex items-center justify-between gap-3 overflow-hidden rounded-full max-w-full font-semibold tracking-[-0.01em] transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4",
        isGhost ? "h-auto" : s.h,
        isGhost ? "" : showIcon ? s.pl : "px-7",
        s.text,
        base[variant],
        f.text,
        className,
      )}
      {...props}
    >
      {/* rolling label */}
      <span className="relative block min-w-0 overflow-hidden py-0.5 text-left leading-tight">
        <span className="block transition-transform duration-500 ease-out-expo group-hover/btn:-translate-y-[110%]">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 block translate-y-[110%] py-0.5 transition-transform duration-500 ease-out-expo group-hover/btn:translate-y-0"
        >
          {children}
        </span>
      </span>

      {showIcon && (
        <span className={cn("relative grid shrink-0 place-items-center", s.circle)}>
          {/* the circle that floods the button on hover */}
          {!isGhost && (
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 -z-10 rounded-full transition-transform duration-600 ease-out-expo group-hover/btn:scale-[36]",
                f.circle,
              )}
            />
          )}
          {isGhost && <span aria-hidden="true" className={cn("absolute inset-0 -z-10 rounded-full", f.circle)} />}
          <span
            className={cn(
              "relative grid place-items-center transition-transform duration-500 ease-out-expo group-hover/btn:rotate-45",
              f.icon,
            )}
          >
            {icon ?? <ArrowUpRight className={s.iconSize} />}
          </span>
        </span>
      )}
    </Link>
  );
}
