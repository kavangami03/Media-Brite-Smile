import type { Metadata } from "next";
import { site } from "./site";
import { compliancePages } from "./pages/compliance";
import type { DraftItem, DraftPage } from "./pages/types";

/* --------------------------------------------------------------------------
   Website policies. Privacy Policy, HIPAA Notice, Web Accessibility and the
   Disclaimer are built word for word from the approved drafts (09 Compliance).
   Any "[CONFIRM: ...]" in a draft is shown as a pending box and keeps the page
   out of search results until the practice supplies the approved wording.
   Terms of Use is not in the sitemap; it stays until the practice decides.
-------------------------------------------------------------------------- */

export type LegalIcon =
  | "shield"
  | "file"
  | "scale"
  | "mail"
  | "heart"
  | "user"
  | "stethoscope"
  | "calendar"
  | "phone"
  | "copyright"
  | "sparkles"
  | "star"
  | "percent"
  | "accessibility"
  | "lock";

/** A paragraph, a checklist, a highlighted note, a row of links, or wording still to come from the practice. */
export type LegalBlock =
  | string
  | { list: string[] }
  | { note: string; title: string; call?: boolean }
  | { links: { text: string; href: string }[] }
  | { pending: string };

export type LegalDoc = {
  href: string;
  title: string;
  /** one line for the switcher card */
  blurb: string;
  icon: LegalIcon;
  eyebrow: string;
  /** meta description */
  description: string;
  /** title tag (absolute), when the draft gives one */
  metaTitle?: string;
  intro: string;
  /** further hero paragraphs from the draft */
  introMore?: LegalBlock[];
  updated: string;
  glance: { icon: LegalIcon; title: string; text: string }[];
  sections: { id: string; title: string; body: LegalBlock[] }[];
  /** true while any part still waits for the practice's wording */
  pending?: boolean;
};

const contact = `${site.name}, ${site.address.full}. Phone ${site.phone.display}.`;
const UPDATED = "November 12, 2026";

const PENDING = /^\[CONFIRM:?\s*/;
const isPending = (t: string) => t.includes("[CONFIRM");
/** "[CONFIRM: x]" -> x;  "Effective date: [CONFIRM: ...]" -> "Effective date" (a labelled value still to come) */
const pendingBlock = (t: string): LegalBlock => {
  const labelled = t.match(/^(.+?):?\s*\[CONFIRM/);
  if (labelled && !PENDING.test(t)) return { pending: labelled[1].replace(/:\s*$/, "") };
  return { pending: t.replace(PENDING, "").replace(/\]\s*$/, "") };
};
const toId = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Short lines with no closing punctuation that follow a line ending in ":" are list items. */
const isListLine = (t: string) => t.length < 90 && !/[.!?:]$/.test(t);

function toBlocks(items: DraftItem[]): LegalBlock[] {
  const out: LegalBlock[] = [];
  for (const it of items) {
    const last = out[out.length - 1];
    if (it.type === "link") {
      if (last && typeof last === "object" && "links" in last) last.links.push({ text: it.text, href: it.href });
      else out.push({ links: [{ text: it.text, href: it.href }] });
    } else if (it.type === "p" || it.type === "h3") {
      if (isPending(it.text)) out.push(pendingBlock(it.text));
      else if (isListLine(it.text) && last && typeof last === "object" && "list" in last) last.list.push(it.text);
      else if (isListLine(it.text) && typeof last === "string" && last.endsWith(":")) out.push({ list: [it.text] });
      else out.push(it.text);
    }
  }
  return out;
}

/** First sentence of a section, for its glance card (verbatim); skips lead-ins that end with a colon. */
const firstSentence = (t: string) => (t.match(/^.+?[.!?](?=\s|$)/)?.[0] ?? t).trim();
const glanceText = (body: LegalBlock[]) =>
  body.find((b): b is string => typeof b === "string" && !b.trim().endsWith(":"));

function fromDraft(
  page: DraftPage,
  meta: Pick<LegalDoc, "blurb" | "icon" | "eyebrow"> & { title: string; glanceIcons: LegalIcon[]; updated?: string },
): LegalDoc {
  const sections = page.sections
    .filter((s) => s.heading)
    .map((s) => ({ id: toId(s.heading!), title: s.heading!, body: toBlocks(s.items) }));
  const glance = sections
    .flatMap((s) => {
      const first = glanceText(s.body);
      return first ? [{ title: s.title, text: firstSentence(first) }] : [];
    })
    .slice(0, 4)
    .map((g, i) => ({ ...g, icon: meta.glanceIcons[i % meta.glanceIcons.length] }));
  const [intro, ...more] = page.intro;
  const pending =
    page.intro.some(isPending) || page.sections.some((s) => s.items.some((i) => "text" in i && isPending(i.text)));
  return {
    href: page.url,
    title: meta.title,
    blurb: meta.blurb,
    icon: meta.icon,
    eyebrow: meta.eyebrow,
    description: page.description,
    metaTitle: page.title,
    intro,
    introMore: more.map((t) => (isPending(t) ? pendingBlock(t) : t)),
    updated: meta.updated ?? UPDATED,
    glance,
    sections,
    pending,
  };
}

export const privacyPolicy = fromDraft(compliancePages["/patient-information/privacy"], {
  title: "Privacy Policy",
  blurb: "What this website collects and how it is protected",
  icon: "shield",
  eyebrow: "Your privacy",
  glanceIcons: ["file", "user", "lock", "sparkles"],
});

export const hipaaNotice = fromDraft(compliancePages["/hipaa-notice-of-privacy-practices"], {
  title: "Notice of Privacy Practices",
  blurb: "How your health information is used and protected",
  icon: "heart",
  eyebrow: "HIPAA notice",
  glanceIcons: ["heart", "lock", "user", "mail"],
  updated: "Effective date pending",
});

export const webAccessibility = fromDraft(compliancePages["/patient-information/web-accessibility"], {
  title: "Web Accessibility",
  blurb: "Using this website, and other ways to reach us",
  icon: "accessibility",
  eyebrow: "Accessibility",
  glanceIcons: ["accessibility", "star", "phone", "mail"],
});

export const termsOfUse: LegalDoc = {
  href: "/terms-of-use",
  title: "Terms of Use",
  blurb: "The rules for using this website",
  icon: "file",
  eyebrow: "Using this website",
  description: `The terms that apply when you use the ${site.name} website.`,
  intro: `Welcome to the ${site.name} website. By using this site you agree to the terms below. If you do not agree, please do not use the site.`,
  updated: UPDATED,
  glance: [
    {
      icon: "stethoscope",
      title: "Information, not diagnosis",
      text: "Our content educates. Your dentist diagnoses, in person.",
    },
    {
      icon: "calendar",
      title: "Requests need confirming",
      text: "A booking is set once our team contacts you to confirm it.",
    },
    {
      icon: "phone",
      title: "Emergencies: call us",
      text: `Website forms are not watched around the clock. Call ${site.phone.display}.`,
    },
    {
      icon: "copyright",
      title: "Our content is ours",
      text: "View and print for personal use; ask before you reuse it.",
    },
  ],
  sections: [
    {
      id: "information",
      title: "General information only",
      body: [
        "Content on this website is for general education about dental care and our services. It is not dental or medical advice and does not replace an exam, diagnosis or treatment plan from a licensed dentist.",
        "Every patient is different. Treatment options, timing and results vary from person to person and are discussed during your visit.",
      ],
    },
    {
      id: "relationship",
      title: "No dentist-patient relationship",
      body: [
        "Using this website, sending a form or emailing us does not create a dentist-patient relationship. That relationship begins once you are seen in our office.",
      ],
    },
    {
      id: "emergencies",
      title: "Emergencies",
      body: [
        "Do not use website forms for urgent needs.",
        {
          title: "In pain or had an accident?",
          note: `Call us at ${site.phone.display} for a dental emergency. For a life-threatening emergency, call 911 or go to the nearest emergency room.`,
          call: true,
        },
      ],
    },
    {
      id: "appointments",
      title: "Appointment requests",
      body: [
        "An appointment request sent through the website is not confirmed until a member of our team contacts you to confirm the date and time.",
      ],
    },
    {
      id: "offers",
      title: "Offers, pricing and insurance",
      body: [
        "Special offers, savings plans and financing shown on this site are subject to their own terms and eligibility, and may change or end without notice.",
        "Insurance coverage depends on your individual plan. Our team is happy to help you check your benefits.",
      ],
    },
    {
      id: "content",
      title: "Our content",
      body: [
        `Text, photos, graphics and logos on this site belong to ${site.name} or are used with permission.`,
        {
          list: [
            "You may view and print pages for personal, non-commercial use",
            "You may not copy, change or republish them without our written permission",
          ],
        },
      ],
    },
    {
      id: "links",
      title: "Links to other websites",
      body: [
        "This site links to third-party websites such as Google, Facebook, Yelp and financing providers. We do not control those sites and are not responsible for their content or privacy practices.",
      ],
    },
    {
      id: "liability",
      title: "Accuracy and liability",
      body: [
        "We work to keep this website accurate and up to date, but it is provided “as is” without warranties of any kind. To the extent allowed by law, we are not liable for any loss arising from your use of the site or reliance on its content.",
      ],
    },
    {
      id: "law",
      title: "Governing law",
      body: ["These terms are governed by the laws of the Commonwealth of Pennsylvania."],
    },
    {
      id: "changes",
      title: "Changes to these terms",
      body: [
        "We may update these terms at any time. Continued use of the site after a change means you accept the updated terms.",
      ],
    },
    {
      id: "contact",
      title: "Contact us",
      body: [`Questions about these terms? Reach us at ${contact}`],
    },
  ],
};

export const disclaimer = fromDraft(compliancePages["/disclaimer"], {
  title: "Disclaimer",
  blurb: "How to read the information on this site",
  icon: "scale",
  eyebrow: "Good to know",
  glanceIcons: ["stethoscope", "scale", "file", "sparkles"],
});

export const legalDocs = [privacyPolicy, hipaaNotice, webAccessibility, termsOfUse, disclaimer];

/** Title, description and canonical for a policy page; noindex while it still waits for the practice's wording. */
export function legalMetadata(doc: LegalDoc): Metadata {
  return {
    title: doc.metaTitle ? { absolute: doc.metaTitle } : doc.title,
    description: doc.description,
    alternates: { canonical: doc.href },
    ...(doc.pending ? { robots: { index: false, follow: true } } : {}),
  };
}
