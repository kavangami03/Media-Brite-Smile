/** A page built from an approved content draft (see scripts that generate the sibling files). */
export type DraftItem =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "link"; text: string; href: string }
  | { type: "table"; rows: string[][] }
  | { type: "form" };

export type DraftSection = {
  /** null for structural blocks such as [AT A GLANCE] or [FORM] */
  heading: string | null;
  kind: string | null;
  items: DraftItem[];
};

export type DraftPage = {
  url: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  sections: DraftSection[];
  faqHeading: string | null;
  faqs: { q: string; a: string }[];
  cta: { title: string | null; text: string };
};
