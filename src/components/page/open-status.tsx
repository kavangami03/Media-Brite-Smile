"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = { label: string; detail: string; tone: "open" | "closed" | "check"; today: string };

const toMinutes = (t: string) => {
  const m = t.match(/(\d+):(\d+)(am|pm)/)!;
  let h = Number(m[1]) % 12;
  if (m[3] === "pm") h += 12;
  return h * 60 + Number(m[2]);
};

/** Opening status in Media's time zone. Friday alternates, so it never claims "open" on a Friday. */
function getStatus(): Status {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(now);
  const day = parts.find((p) => p.type === "weekday")!.value;
  const mins =
    (Number(parts.find((p) => p.type === "hour")!.value) % 24) * 60 +
    Number(parts.find((p) => p.type === "minute")!.value);
  const h = site.hours.find((x) => x.day === day)!;

  if (h.closed) return { label: "Closed today", detail: "We open Monday at 8:00am", tone: "closed", today: day };
  if (h.note)
    return {
      label: "Alternate Friday",
      detail: `8:00am – 2:00pm on open Fridays. Call to check today.`,
      tone: "check",
      today: day,
    };
  const open = toMinutes(h.open!);
  const close = toMinutes(h.close!);
  if (mins < open) return { label: "Opens today", detail: `${h.open} – ${h.close}`, tone: "check", today: day };
  if (mins < close) return { label: "Open now", detail: `Until ${h.close} today`, tone: "open", today: day };
  return { label: "Closed for today", detail: "Send a request and we will reply", tone: "closed", today: day };
}

/* Clock as an external store: ticks every minute, renders nothing time-based on the server. */
const subscribe = (cb: () => void) => {
  const t = window.setInterval(cb, 60_000);
  return () => window.clearInterval(t);
};
const serverSnap = () => "";

export function OpenStatus({ className }: { className?: string }) {
  const snap = useSyncExternalStore(subscribe, () => JSON.stringify(getStatus()), serverSnap);
  const s: Status | null = snap ? JSON.parse(snap) : null;

  return (
    <span className={cn("flex items-center gap-3", className)} aria-live="polite">
      <span className="relative flex size-3">
        <span
          className={cn(
            "absolute inline-flex size-full rounded-full",
            s?.tone === "open" ? "bg-emerald-500" : s?.tone === "check" ? "bg-amber-400" : "bg-slate-400",
          )}
        />
      </span>
      <span className="leading-tight">
        <span className="block font-semibold text-ink">{s ? s.label : "Opening hours"}</span>
        <span className="block text-sm text-muted">{s ? s.detail : "Mon–Thu from 8:00am"}</span>
      </span>
    </span>
  );
}

/** Today's weekday in Media (client only, to avoid a server/client mismatch). */
export function useToday() {
  return useSyncExternalStore(
    subscribe,
    () => new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", weekday: "long" }).format(new Date()),
    () => null,
  );
}

export function HoursTable() {
  const today = useToday();
  return (
    <table className="w-full text-left">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {site.hours.map((h) => {
          const on = h.day === today;
          return (
            <tr key={h.day} className={cn("border-b border-line last:border-0", on && "bg-brand-50")}>
              <th scope="row" className="py-3.5 pl-4 font-semibold text-ink">
                {h.day}
                {on && (
                  <span className="ml-2 rounded-full bg-brand-500 px-2 py-0.5 text-xs font-bold text-white">Today</span>
                )}
              </th>
              <td className="py-3.5 pr-4 text-right text-body tabular-nums">
                {h.closed ? (
                  <span className="text-muted">Closed</span>
                ) : (
                  <>
                    {h.open} – {h.close}
                    {h.note && <span className="block text-xs font-semibold text-brand-600">{h.note}</span>}
                  </>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
