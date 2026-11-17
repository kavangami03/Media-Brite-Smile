import { mainNav, serviceGroups } from "@/content/site";
import type { DraftItem } from "@/content/pages/types";

/* ---------------------------------------------------------------------------
   Turns a draft section's flat items into presentational blocks:
   - "Label. text" / "Label: text" lines  -> feature rows
   - short lines with no full stop         -> checklist items
   - consecutive links                     -> a link row
   - tables, classified by shape           -> hours | names | facts | compare
--------------------------------------------------------------------------- */

export type Feature = { label: string; text: string };
export type Block =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "features"; rows: Feature[] }
  | { kind: "list"; items: { text: string; href?: string }[] }
  | { kind: "links"; links: { text: string; href: string }[] }
  | { kind: "hours" }
  | { kind: "names"; names: string[] }
  | { kind: "facts"; rows: [string, string][] }
  | { kind: "compare"; head: string[]; rows: string[][] }
  | { kind: "form" };

const FEATURE = /^([A-Z][^.:]{2,48}?)([.:])\s+(.+)$/;
const NOT_LABEL = /^(Dr|Mr|Mrs|Ms|St|N|S|No|Yes)$/;

function asFeature(t: string): Feature | null {
  const m = t.match(FEATURE);
  if (!m || m[1].split(" ").length > 7 || NOT_LABEL.test(m[1])) return null;
  return { label: m[1], text: m[3] };
}

/** A checklist line: short, no closing full stop, not a question. */
const isListLine = (t: string) => t.split(" ").length <= 16 && !/[.?!:]$/.test(t);

function tableBlock(rows: string[][]): Block {
  const head = rows[0];
  const body = rows.slice(1).filter((r) => r.some((c) => c.trim()));
  if (head.length >= 2 && /^day$/i.test(head[0]) && /hours/i.test(head[1])) return { kind: "hours" };
  if (head.length === 1 && head[0] === "") {
    if (body.every((r) => r.length === 2)) return { kind: "facts", rows: body.map((r) => [r[0], r[1]]) };
    return {
      kind: "names",
      names: body
        .flat()
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b)),
    };
  }
  return { kind: "compare", head, rows: body };
}

export function toBlocks(items: DraftItem[]): Block[] {
  const out: Block[] = [];
  for (const it of items) {
    const last = out[out.length - 1];
    switch (it.type) {
      case "link":
        if (last?.kind === "links") last.links.push({ text: it.text, href: it.href });
        else out.push({ kind: "links", links: [{ text: it.text, href: it.href }] });
        break;
      case "table":
        out.push(tableBlock(it.rows));
        break;
      case "h3":
        out.push({ kind: "h3", text: it.text });
        break;
      case "form":
        out.push({ kind: "form" });
        break;
      case "p": {
        const f = asFeature(it.text);
        if (f) {
          if (last?.kind === "features") last.rows.push(f);
          else out.push({ kind: "features", rows: [f] });
        } else if (isListLine(it.text)) {
          if (last?.kind === "list") last.items.push({ text: it.text });
          else out.push({ kind: "list", items: [{ text: it.text }] });
        } else {
          out.push({ kind: "p", text: it.text });
        }
      }
    }
  }
  // A bulleted list in the draft can mix linked and plain items. When link rows sit next to
  // checklist items, fold them into one list whose linked items stay clickable.
  const merged: Block[] = [];
  for (let i = 0; i < out.length; i++) {
    const b = out[i];
    const prev = merged[merged.length - 1];
    const next = out[i + 1];
    if (b.kind === "links" && (prev?.kind === "list" || next?.kind === "list")) {
      const linked = b.links.map((l) => ({ text: l.text, href: l.href }));
      if (prev?.kind === "list") prev.items.push(...linked);
      else merged.push({ kind: "list", items: linked });
      continue;
    }
    if (b.kind === "list" && prev?.kind === "list") {
      prev.items.push(...b.items);
      continue;
    }
    merged.push(b);
  }
  // singletons read better as plain paragraphs
  return merged.map((b) => {
    if (b.kind === "features" && b.rows.length === 1)
      /* "Label: lowercase text" was split at a colon, "Label. Sentence" at a full stop: rejoin with the same mark */
      return {
        kind: "p",
        text: `${b.rows[0].label}${/^[a-z]/.test(b.rows[0].text) ? ":" : "."} ${b.rows[0].text}`,
      };
    if (b.kind === "list" && b.items.length === 1 && !b.items[0].href) return { kind: "p", text: b.items[0].text };
    return b;
  });
}

/* ---------- page names in table cells -> sitemap URLs ---------- */
const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
const known = new Map<string, string>();
for (const g of serviceGroups) {
  known.set(norm(g.title), g.href);
  for (const s of g.sections) for (const l of s.links) known.set(norm(l.label), l.href);
}
for (const item of mainNav) if ("links" in item) for (const l of item.links) known.set(norm(l.label), l.href);
const aliases: Record<string, string> = {
  "cleaning and check ups": "/preventative-care/teeth-cleaning-and-check-ups",
  "gum disease treatment": "/preventative-care/gum-disease-treatment",
  "root canal": "/restorative-dentistry/root-canal",
};
export const hrefFor = (label: string) => known.get(norm(label)) ?? aliases[norm(label)];
