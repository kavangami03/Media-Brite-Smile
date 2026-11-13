import Image from "next/image";
import { cn } from "@/lib/utils";

/** Round white badge: brand tooth in the middle, text slowly circling it. */
export function Seal({
  text,
  id,
  className,
  fit = false,
}: {
  text: string;
  id: string;
  className?: string;
  /** stretch or squeeze the letter spacing so the text closes the circle exactly */
  fit?: boolean;
}) {
  return (
    <div
      className={cn("relative grid size-28 place-items-center rounded-full bg-white shadow-lift sm:size-32", className)}
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 size-full animate-badge-spin motion-reduce:animate-none"
        aria-hidden="true"
      >
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-ink text-[9.5px] font-bold tracking-[0.2em] uppercase">
          <textPath href={`#${id}`} {...(fit && { textLength: 287, lengthAdjust: "spacing" })}>
            {text}
          </textPath>
        </text>
      </svg>
      <Image src="/images/brand/tooth.svg" alt="" width={44} height={41} unoptimized className="w-10 sm:w-11" />
    </div>
  );
}
