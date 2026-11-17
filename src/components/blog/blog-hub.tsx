import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, PenLine, Phone } from "lucide-react";
import { site } from "@/content/site";
import { topicImages as T, type TopicImage } from "@/content/topic-images";
import { latestPosts } from "@/content/blog";
import { PageHero } from "@/components/page/page-hero";
import { SectionHead } from "@/components/page/section-head";
import { CtaBand } from "@/components/page/cta-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd, pageSchema } from "@/lib/schema";
import { cn } from "@/lib/utils";

/**
 * Blog hub (sitemap section 08), from the approved Blog Hub draft, shared by /blog and /blog/page/<n>.
 * Ten posts per page, newest first; page 1 features the newest. Each category also points to the
 * pages that already answer those questions. With no posts, an honest empty state shows instead.
 */
export const PER_PAGE = 10;
export const blogTitle = "Dental Blog | Media Brite Smile, Media PA";
export const blogDescription =
  "Plain-English answers to the questions patients ask most, from the dental team at Media Brite Smile in Media, PA.";
export const blogPageCount = () => Math.max(1, Math.ceil(latestPosts().length / PER_PAGE));
export const blogPageHref = (n: number) => (n <= 1 ? "/blog#posts" : `/blog/page/${n}#posts`);

type Category = {
  id: string;
  title: string;
  text: string;
  image: TopicImage;
  /** a different photo for the hero tile, so no photo repeats on the page */
  tile: TopicImage;
  /** pages on the site that already answer these questions */
  pages: { label: string; href: string }[];
};

const categories: Category[] = [
  {
    id: "costs",
    title: "Treatment Costs and Insurance",
    text: "What treatment really costs, what a quoted price includes, and how to pay for care with or without insurance.",
    image: T.cardPayment,
    tile: T.piggyBank,
    pages: [
      { label: "Insurance and payment options", href: "/patient-information/insurance-payment-options" },
      { label: "Dental Savings Plan", href: "/about-us/dental-savings-plan" },
      { label: "CareCredit financing", href: "/patient-information/care-credit" },
      { label: "Current special offers", href: "/special-offers" },
    ],
  },
  {
    id: "care",
    title: "Looking After Your Teeth",
    text: "Brushing, flossing, gum health and the everyday habits that decide how your next check-up goes.",
    image: T.brushingWoman,
    tile: T.brushingMan,
    pages: [
      { label: "Oral hygiene", href: "/preventative-care/oral-hygiene" },
      { label: "Teeth cleaning and check-ups", href: "/preventative-care/teeth-cleaning-and-check-ups" },
      { label: "Gum disease treatment", href: "/preventative-care/gum-disease-treatment" },
      { label: "Home care instructions", href: "/patient-information/care-and-comfort/home-instructions" },
    ],
  },
  {
    id: "children",
    title: "Children's Dental Care",
    text: "First visits, baby teeth, sealants, fluoride and helping nervous children.",
    image: T.childCheckup,
    tile: T.childMirror,
    pages: [
      { label: "Children's dentistry", href: "/preventative-care/child-dentistry" },
      { label: "Dental sealants", href: "/restorative-dentistry/dental-sealants" },
      { label: "Fluoride treatment", href: "/preventative-care/fluoride" },
      { label: "Family dentistry", href: "/preventative-care/family-dentistry" },
    ],
  },
  {
    id: "emergencies",
    title: "Dental Emergencies",
    text: "What to do when a tooth breaks, gets knocked out or starts to hurt, and when to call.",
    image: T.toothache,
    tile: T.coldCompress,
    pages: [
      { label: "Emergency dentistry", href: "/preventative-care/emergency-dentistry" },
      { label: "Root canal treatment", href: "/restorative-dentistry/root-canal" },
      { label: "Tooth extractions", href: "/restorative-dentistry/tooth-extractions" },
      { label: "Dental crowns", href: "/restorative-dentistry/dental-crowns" },
    ],
  },
];

const moreHelp = [
  { label: "Patient education library", href: "/patient-information/patient-education", image: T.teethModelDemo },
  { label: "Preventative care", href: "/preventative-care", image: T.checkupLight },
  { label: "Every service we offer", href: "/patient-information/services", image: T.dentalTeamCleaning },
];

function Pagination({ page, pages }: { page: number; pages: number }) {
  const item =
    "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors";
  return (
    <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link
          href={blogPageHref(page - 1)}
          className={cn(item, "bg-pearl text-ink ring-1 ring-line hover:bg-ink hover:text-white")}
        >
          <ArrowLeft className="size-4" /> Previous
        </Link>
      ) : null}
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <Link
          key={n}
          href={blogPageHref(n)}
          aria-current={n === page ? "page" : undefined}
          className={cn(
            item,
            "tabular-nums",
            n === page
              ? "bg-brand-500 text-white shadow-glow"
              : "bg-pearl text-ink ring-1 ring-line hover:bg-ink hover:text-white",
          )}
        >
          {n}
        </Link>
      ))}
      {page < pages ? (
        <Link
          href={blogPageHref(page + 1)}
          className={cn(item, "bg-pearl text-ink ring-1 ring-line hover:bg-ink hover:text-white")}
        >
          Next <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </nav>
  );
}

export function BlogHub({ page = 1 }: { page?: number }) {
  const all = latestPosts();
  const pages = blogPageCount();
  const shown = all.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const featured = page === 1 ? shown[0] : undefined;
  const grid = page === 1 ? shown.slice(1) : shown;
  const title = blogTitle;
  const description = blogDescription;
  return (
    <>
      <JsonLd
        data={pageSchema({
          path: page === 1 ? "/blog" : `/blog/page/${page}`,
          name: title,
          description,
          type: "CollectionPage",
          crumbs: [{ label: "Home", href: "/" }, { label: page === 1 ? "Blog" : `Blog, page ${page}` }],
        })}
      />

      <PageHero
        eyebrow="Dental blog"
        title={
          <>
            Dental Advice and <span className="text-brand-500">Updates</span>
          </>
        }
        lead="This dental blog from Media Brite Smile in Media, PA answers the questions patients actually ask in the chair and on the phone, in plain English and without a sales pitch. Each article links to the treatment page it relates to, so you can see what the practice offers and what it costs."
        primary={{ label: "Request an Appointment", href: site.bookingHref }}
        aside={
          <RevealGroup stagger={0.08} className="grid grid-cols-2 gap-3">
            {categories.map((c, i) => (
              <RevealItem key={c.id}>
                <a
                  href={`#${c.id}`}
                  className="group relative isolate flex h-full min-h-44 flex-col justify-end overflow-hidden rounded-3xl p-4 text-white sm:min-h-56 sm:p-5"
                >
                  <Image
                    src={c.tile.src}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 22vw, 50vw"
                    className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                    priority={i === 0}
                  />
                  <span className="absolute inset-0 -z-10 bg-linear-to-t from-ink/90 via-ink/35 to-transparent" />
                  <span className="text-xs font-bold tracking-[0.14em] text-glow uppercase">Topic {i + 1}</span>
                  <span className="mt-1 text-base leading-tight font-bold tracking-tight sm:text-xl">{c.title}</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        }
      />

      {/* ---------- Latest posts, newest first ---------- */}
      <section id="posts" className="scroll-mt-28 bg-white section-y" aria-labelledby="latest-heading">
        <div className="container-site">
          <SectionHead
            id="latest-heading"
            eyebrow="From the blog"
            title={
              <>
                {page === 1 ? "Latest" : `Page ${page} of`} <span className="text-brand-500">posts</span>
              </>
            }
          />
          {shown.length > 0 ? (
            <>
              {featured && (
                <Reveal className="mt-10">
                  <PostCard post={featured} featured />
                </Reveal>
              )}
              {grid.length > 0 && (
                /* 6-column grid: cards take 2 columns; a lone last card goes full width, two leftovers split the row */
                <RevealGroup
                  stagger={0.08}
                  className={`${featured ? "mt-5" : "mt-10"} grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-6`}
                >
                  {grid.map((p, i, rest) => {
                    const left = rest.length % 3;
                    const tail = i >= rest.length - left;
                    const span = !tail ? "lg:col-span-2" : left === 1 ? "sm:col-span-2 lg:col-span-6" : "lg:col-span-3";
                    return (
                      <RevealItem key={p.slug} className={`h-full ${span}`}>
                        <PostCard post={p} featured={tail && left === 1} />
                      </RevealItem>
                    );
                  })}
                </RevealGroup>
              )}
              {pages > 1 && <Pagination page={page} pages={pages} />}
            </>
          ) : (
            <Reveal className="mt-10">
              <div className="relative isolate grid grid-cols-1 items-center gap-8 overflow-hidden rounded-4xl bg-pearl p-6 ring-1 ring-line sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-10">
                <span
                  aria-hidden="true"
                  className="absolute -top-24 -right-16 -z-10 size-96 rounded-full glow-blob text-glow/25"
                />
                <span className="grid size-20 place-items-center rounded-3xl bg-white text-brand-600 shadow-soft ring-1 ring-line">
                  <PenLine className="size-8" />
                </span>
                <div>
                  <p className="text-2xl font-bold tracking-tight text-ink">No articles published yet</p>
                  <p className="mt-2 max-w-2xl text-lg leading-relaxed">
                    The first articles will appear here, newest first. Until then, the four topics below link to the
                    pages that already answer those questions.
                  </p>
                </div>
                <a
                  href="#topics"
                  className="group inline-flex min-h-12 items-center gap-2 justify-self-start rounded-full bg-ink px-6 font-semibold text-white transition-colors hover:bg-brand-600 lg:justify-self-end"
                >
                  Browse the topics
                  <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ---------- Categories ---------- */}
      <section id="topics" className="scroll-mt-28 bg-pearl section-y" aria-labelledby="topics-heading">
        <div className="container-site">
          <SectionHead
            id="topics-heading"
            eyebrow="Topics"
            title={
              <>
                Four things patients <span className="text-brand-500">ask most</span>
              </>
            }
          />
          <RevealGroup stagger={0.08} className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {categories.map((c, i) => (
              <RevealItem key={c.id} className="h-full">
                <article
                  id={c.id}
                  aria-labelledby={`${c.id}-title`}
                  className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-4xl bg-white p-2.5 shadow-soft ring-1 ring-line transition-shadow duration-500 hover:shadow-lift"
                >
                  <div className="relative aspect-video overflow-hidden rounded-3xl">
                    <Image
                      src={c.image.src}
                      alt={c.image.alt}
                      fill
                      sizes="(min-width:768px) 45vw, 100vw"
                      className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h2 id={`${c.id}-title`} className="text-2xl font-bold tracking-tight text-ink">
                      {c.title}
                    </h2>
                    <p className="mt-2 text-[1.0625rem] leading-relaxed">{c.text}</p>
                    <p className="mt-6 flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                      <BookOpen className="size-4" /> Answered on our site today
                    </p>
                    <ul className="mt-3 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
                      {c.pages.map((p) => (
                        <li key={p.href}>
                          <Link
                            href={p.href}
                            className="group/l flex min-h-11 items-center justify-between gap-3 border-b border-line py-2 font-medium text-ink transition-colors hover:text-brand-600"
                          >
                            {p.label}
                            <ArrowUpRight className="size-4 shrink-0 text-brand-500 transition-transform duration-500 group-hover/l:rotate-45" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ---------- More help ---------- */}
      <section className="bg-white section-y" aria-labelledby="more-heading">
        <div className="container-site">
          <SectionHead
            id="more-heading"
            eyebrow="More help"
            title={
              <>
                More <span className="text-brand-500">help</span>
              </>
            }
            aside={
              <a
                href={site.phone.href}
                className="inline-flex min-h-12 items-center gap-3 rounded-full bg-pearl px-5 font-semibold text-ink ring-1 ring-line transition-colors hover:bg-brand-500 hover:text-white"
              >
                <Phone className="size-4" /> {site.phone.display}
              </a>
            }
          />
          <RevealGroup stagger={0.08} className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {moreHelp.map((m) => (
              <RevealItem key={m.href}>
                <Link
                  href={m.href}
                  className="group relative isolate flex aspect-4/3 flex-col justify-end overflow-hidden rounded-4xl p-6 text-white"
                >
                  <Image
                    src={m.image.src}
                    alt={m.image.alt}
                    fill
                    sizes="(min-width:640px) 32vw, 100vw"
                    className="-z-10 object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 -z-10 bg-linear-to-t from-ink/85 via-ink/25 to-transparent" />
                  <span className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/90 text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white">
                    <ArrowUpRight className="size-5" />
                  </span>
                  <span className="text-2xl font-bold tracking-tight">{m.label}</span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Have a Question We Have <span className="text-glow">Not Answered?</span>
          </>
        }
        text="Call and ask, and it may become the next article."
      />
    </>
  );
}
