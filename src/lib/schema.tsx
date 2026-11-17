import { site } from "@/content/site";
import type { Crumb } from "@/components/page/page-hero";
import type { QA } from "@/components/page/faq-accordion";

/** JSON-LD helpers. Every page references the one Dentist node on the home page by @id. */
export const dentistRef = { "@id": `${site.url}/#dentist` };

export function pageSchema({
  path,
  name,
  description,
  crumbs,
  faqs,
  type = "WebPage",
  extra = [],
}: {
  path: string;
  name: string;
  description: string;
  crumbs: Crumb[];
  faqs?: QA[];
  type?: string;
  extra?: object[];
}) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": type,
        "@id": `${url}#webpage`,
        url,
        name,
        description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${site.url}/#website` },
        about: dentistRef,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: crumbs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: `${site.url}${c.href ?? path}`,
        })),
      },
      ...(faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
      ...extra,
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
