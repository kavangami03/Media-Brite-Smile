/* --------------------------------------------------------------------------
   Blog posts carried over from the practice's existing website
   (mediabritesmile.com/blog). Text is kept word for word; each post keeps its
   original slug so links to /blog/<slug> keep working. Images come from the
   old site and are recorded in docs/image-licenses.md (licence to confirm).
-------------------------------------------------------------------------- */

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string; /** ends with "Call today (610) 566-2711" as a phone link */ call?: boolean }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  /** meta description and card excerpt */
  description: string;
  /** ISO date the post was published on the old site */
  date: string;
  category: string;
  image: { src: string; alt: string; width: number; height: number };
  /** treatment pages the post relates to */
  related: { label: string; href: string }[];
  body: BlogBlock[];
};

import { importedPosts } from "./blog-imported";

const welcomePost: BlogPost[] = [
  {
    slug: "welcome-to-your-dentist-in-media",
    title: "Welcome to Your Dentist in Media",
    description:
      "At Media Brite Smile, we understand the importance of having a dental practice that provides you with exceptional care. Our staff is committed to serving each and every patient with attentive care and quality dental work.",
    date: "2025-12-08",
    category: "Media, PA Dental Care",
    image: {
      src: "/images/blog/welcome-to-your-dentist-in-media.jpg",
      alt: "A modern dental treatment room with a patient chair and an X-ray on the monitor",
      width: 800,
      height: 533,
    },
    related: [
      { label: "General dentistry", href: "/preventative-care/general-dentistry" },
      { label: "Family dentistry", href: "/preventative-care/family-dentistry" },
      { label: "Teeth cleaning and check-ups", href: "/preventative-care/teeth-cleaning-and-check-ups" },
      { label: "Meet the team", href: "/about-us/meet-the-staff" },
    ],
    body: [
      { type: "h2", text: "Dentist in Media" },
      {
        type: "p",
        text: "At Media Brite Smile, we understand the importance of having a dental practice that provides you with exceptional care. Our staff is committed to serving each and every patient with attentive care and quality dental work.",
      },
      {
        type: "p",
        text: "Our practice provides general dentistry services including the prevention, diagnosis, and treatment of a wide variety of conditions and diseases that affect your teeth, gums, and oral health.",
      },
      { type: "h3", text: "Our Practice’s Mission:" },
      {
        type: "p",
        text: "To fulfill our mission of providing quality dental care to you and your family, we are committed to:",
      },
      {
        type: "list",
        items: [
          "Staying up to date with latest techniques and equipment.",
          "Ensuring a comfortable, relaxing environment.",
          "Exceeding your expectations with our professionalism.",
        ],
      },
      { type: "h3", text: "We Are Committed to Your Oral Health" },
      {
        type: "p",
        text: "At Media Brite Smile, we are committed to ensuring your oral health is in excellent condition. We make this possible by attending to all dental issues, existing and potential, during your visit.",
        call: true,
      },
    ],
  },
];

/** Every post: the first one saved on its own, then the rest imported from Downloads/AllBlogs. */
export const blogPosts: BlogPost[] = [...welcomePost, ...importedPosts];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

/** Broad topic, used to mix the listing and to pick related posts. */
export const postTopic = (post: BlogPost) =>
  /implant/i.test(post.title)
    ? "implants"
    : /invisalign|aligner|crowded|crooked/i.test(post.title)
      ? "aligners"
      : "general";

/**
 * Newest first. Many old posts share a publish date, so within one date the
 * topics take turns (implants, aligners, ...) instead of nine aligner posts in a row.
 */
export const latestPosts = () => {
  const byDate = new Map<string, BlogPost[]>();
  for (const p of blogPosts) byDate.set(p.date, [...(byDate.get(p.date) ?? []), p]);
  return [...byDate.keys()]
    .sort((a, b) => b.localeCompare(a))
    .flatMap((date) => {
      const queues = new Map<string, BlogPost[]>();
      for (const p of byDate.get(date)!) queues.set(postTopic(p), [...(queues.get(postTopic(p)) ?? []), p]);
      const mixed: BlogPost[] = [];
      while ([...queues.values()].some((q) => q.length))
        for (const q of queues.values()) if (q.length) mixed.push(q.shift()!);
      return mixed;
    });
};

/** Up to `n` other posts, same topic first. */
export const relatedPosts = (post: BlogPost, n = 3) => {
  const others = latestPosts().filter((p) => p.slug !== post.slug);
  const topic = postTopic(post);
  return [...others.filter((p) => postTopic(p) === topic), ...others.filter((p) => postTopic(p) !== topic)].slice(0, n);
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

export const readingMinutes = (post: BlogPost) => {
  const words = post.body
    .map((b) => ("items" in b ? b.items.join(" ") : b.text))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};
