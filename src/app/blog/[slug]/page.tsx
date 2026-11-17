import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Building2, CalendarDays, Check, Clock, ListOrdered, Phone } from "lucide-react";
import { site } from "@/content/site";
import { blogPosts, formatDate, getPost, readingMinutes, relatedPosts, type BlogBlock } from "@/content/blog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ToothWatermark } from "@/components/ui/icons";
import { SplitReveal } from "@/components/motion/split-reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { CtaBand } from "@/components/page/cta-band";
import { PostCard } from "@/components/blog/post-card";
import { JsonLd, pageSchema } from "@/lib/schema";

/**
 * One blog post, carried over from the practice's existing website.
 * Same container as every other page: a two-column hero, the article as a document card
 * (8 of 12 columns) and a sticky side panel (contents, booking, related treatments).
 */
export const instant = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const title = `${post.title} | ${site.name}`;
  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      images: [{ url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt }],
    },
  };
}

const toId = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** "Specialized training: Not all dentists..." -> the label in bold, the rest as normal text */
function Labelled({ text }: { text: string }) {
  const m = text.match(/^([A-Z][^:.?!]{2,48}):\s+(.+)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      <strong className="font-bold text-ink">{m[1]}:</strong> <span className="font-normal text-body">{m[2]}</span>
    </>
  );
}

function Block({ block, n }: { block: BlogBlock; n?: number }) {
  switch (block.type) {
    case "h2":
    case "h3":
      return (
        <h2
          id={toId(block.text)}
          className="mt-12 flex scroll-mt-32 items-start gap-4 text-2xl font-bold tracking-tight text-balance text-ink first:mt-0 sm:text-3xl"
        >
          <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-2xl bg-mist text-sm font-bold text-brand-600 tabular-nums">
            {String(n ?? 1).padStart(2, "0")}
          </span>
          <span className="pt-1">{block.text}</span>
        </h2>
      );
    case "list":
      if (block.items.length > 3)
        return (
          <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 rounded-3xl bg-pearl p-5 ring-1 ring-line sm:grid-cols-2 sm:p-6">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[1.0625rem] leading-snug font-medium text-ink">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span>
                  <Labelled text={item} />
                </span>
              </li>
            ))}
          </ul>
        );
      return (
        <ul className="mt-6 grid grid-cols-1 gap-3 xl:grid-cols-3">
          {block.items.map((item, i) => (
            <li
              key={item}
              className="flex flex-col gap-4 rounded-3xl bg-pearl p-5 ring-1 ring-line transition-shadow duration-500 hover:shadow-soft"
            >
              <span className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-linear-to-br from-brand-400 to-brand-600 text-white shadow-glow">
                  <Check className="size-4" strokeWidth={3} />
                </span>
                <span className="text-3xl leading-none font-bold tracking-tighter text-brand-500/15 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="text-lg leading-snug font-semibold text-ink">
                <Labelled text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    default: {
      return (
        <p className="mt-5 text-lg leading-relaxed text-pretty">
          <Labelled text={block.text} />
          {block.call && (
            <>
              {" "}
              <a href={site.phone.href} className="font-bold whitespace-nowrap text-brand-600 hover:underline">
                Call today {site.phone.display}
              </a>
            </>
          )}
        </p>
      );
    }
  }
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = relatedPosts(post);
  const path = `/blog/${post.slug}`;
  const headings = post.body.filter(
    (b): b is Extract<BlogBlock, { type: "h2" | "h3" }> => b.type === "h2" || b.type === "h3",
  );
  const headingNumber = new Map<BlogBlock, number>(headings.map((hd, i) => [hd, i + 1]));

  /* The hero already shows the description, which is the opening of the first paragraph.
     Don't print it twice: drop that paragraph, or keep only the sentences after it. */
  const [first, ...rest] = post.body;
  let body = post.body;
  if (first?.type === "p" && !first.call) {
    if (first.text === post.description) body = rest;
    else if (post.description.endsWith(".") && first.text.startsWith(post.description)) {
      const remainder = first.text.slice(post.description.length).trim();
      body = remainder ? [{ ...first, text: remainder }, ...rest] : rest;
    }
  }

  return (
    <>
      <JsonLd
        data={pageSchema({
          path,
          name: post.title,
          description: post.description,
          crumbs: [{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }],
          extra: [
            {
              "@type": "BlogPosting",
              "@id": `${site.url}${path}#article`,
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              image: `${site.url}${post.image.src}`,
              articleSection: post.category,
              mainEntityOfPage: `${site.url}${path}`,
              author: { "@type": "Organization", name: site.name, url: site.url },
              publisher: { "@type": "Dentist", "@id": `${site.url}/#dentist`, name: site.name },
            },
          ],
        })}
      />

      {/* ---------- hero: copy left, photo right (same container as every page) ---------- */}
      <section
        className="relative isolate overflow-hidden bg-pearl pt-30 pb-12 lg:pt-36 lg:pb-16"
        aria-labelledby="post-title"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-48 -right-40 size-160 rounded-full glow-blob text-glow/25" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0_158_203/0.12)_1px,transparent_0)] mask-[radial-gradient(ellipse_at_20%_30%,#000_10%,transparent_60%)] bg-size-[28px_28px]" />
          <ToothWatermark size={520} className="absolute -bottom-56 -left-40 text-brand-500/5" />
        </div>
        <div className="container-site grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          <div className="min-w-0">
            <Reveal y={16}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/blog"
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink ring-1 ring-line transition-colors hover:text-brand-600"
                >
                  <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" /> All
                  posts
                </Link>
                <Eyebrow>{post.category}</Eyebrow>
              </div>
            </Reveal>
            <SplitReveal as="h1" id="post-title" immediate className="mt-6 text-display-lg font-bold text-balance">
              {post.title}
            </SplitReveal>
            <Reveal delay={0.2} y={20}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty sm:text-xl">{post.description}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {[
                  { Icon: CalendarDays, text: formatDate(post.date) },
                  { Icon: Clock, text: `${readingMinutes(post)} min read` },
                  { Icon: Building2, text: site.name },
                ].map(({ Icon, text }) => (
                  <li
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink ring-1 ring-line"
                  >
                    <Icon className="size-4 text-brand-500" /> {text}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="relative min-w-0 pb-6 sm:pb-8">
            <ImageReveal immediate delay={0.2} className="aspect-4/3 rounded-4xl shadow-lift sm:rounded-5xl">
              <Image
                data-reveal-media
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
            </ImageReveal>
            <Reveal delay={0.45} y={20} className="absolute -bottom-2 left-4 sm:left-8">
              <a
                href={site.phone.href}
                className="group flex items-center gap-3 rounded-3xl bg-white p-3 pr-5 shadow-lift ring-1 ring-line"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-500 text-white">
                  <Phone className="size-5" />
                </span>
                <span className="leading-tight">
                  <span className="block text-xs text-muted">Questions? Call us</span>
                  <span className="block font-bold text-ink group-hover:text-brand-600">{site.phone.display}</span>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- article card (8 cols) + sticky side panel (4 cols) ---------- */}
      <section className="bg-pearl pb-16 sm:pb-20" aria-label="Article">
        <div className="container-site grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal y={24} className="min-w-0 lg:col-span-8">
            <article className="rounded-4xl bg-white p-6 shadow-soft ring-1 ring-line sm:rounded-5xl sm:p-10 xl:p-14">
              {body.map((b, i) => (
                <Block key={i} block={b} n={headingNumber.get(b)} />
              ))}
              <footer className="mt-12 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  Posted by <span className="font-semibold text-ink">{site.name}</span> on {formatDate(post.date)} in{" "}
                  <span className="font-semibold text-ink">{post.category}</span>
                </p>
                <Link
                  href="/blog"
                  className="group inline-flex min-h-11 items-center gap-2 font-semibold text-brand-600 hover:text-brand-700"
                >
                  <ArrowLeft className="size-4 transition-transform duration-500 group-hover:-translate-x-1" /> Back to
                  all posts
                </Link>
              </footer>
            </article>
          </Reveal>

          <aside className="min-w-0 space-y-4 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            {headings.length > 1 && (
              <Reveal y={24}>
                <nav aria-label="In this article" className="rounded-4xl bg-white p-6 ring-1 ring-line sm:p-7">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">
                    <ListOrdered className="size-4" /> In this article
                  </p>
                  <ol className="mt-3">
                    {headings.map((hd, i) => (
                      <li key={hd.text}>
                        <a
                          href={`#${toId(hd.text)}`}
                          className="group flex min-h-11 items-center gap-3 border-b border-line py-2 font-medium text-ink transition-colors last:border-0 hover:text-brand-600"
                        >
                          <span className="w-6 shrink-0 text-xs font-bold text-brand-500/70 tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          {hd.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            )}
            <Reveal y={24} delay={0.06}>
              <div className="relative isolate overflow-hidden rounded-4xl bg-linear-to-br from-brand-500 via-brand-600 to-brand-800 p-6 text-white sm:p-7">
                <ToothWatermark size={200} className="absolute -right-10 -bottom-16 -z-10 text-white/10" />
                <p className="text-xs font-bold tracking-[0.14em] text-brand-100 uppercase">Talk to the team</p>
                <p className="mt-3 text-2xl font-bold tracking-tight">Questions about this article?</p>
                <p className="mt-2 text-white/80">
                  Call the practice or request an appointment, and the team will answer them.
                </p>
                <Button href={site.bookingHref} variant="white" className="mt-6">
                  Request an Appointment
                </Button>
              </div>
            </Reveal>
            <Reveal y={24} delay={0.12}>
              <div className="rounded-4xl bg-white p-6 ring-1 ring-line sm:p-7">
                <p className="text-xs font-bold tracking-[0.14em] text-brand-600 uppercase">Related treatments</p>
                <ul className="mt-3">
                  {post.related.map((r) => (
                    <li key={r.href}>
                      <Link
                        href={r.href}
                        className="group flex min-h-11 items-center justify-between gap-3 border-b border-line py-2 font-medium text-ink transition-colors last:border-0 hover:text-brand-600"
                      >
                        {r.label}
                        <ArrowUpRight className="size-4 shrink-0 text-brand-500 transition-transform duration-500 group-hover:rotate-45" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ---------- more posts ---------- */}
      {more.length > 0 && (
        <section className="bg-white section-y" aria-labelledby="more-posts">
          <div className="container-site">
            <Eyebrow>Keep reading</Eyebrow>
            <h2 id="more-posts" className="mt-6 text-display-md font-bold">
              More from the <span className="text-brand-500">blog</span>
            </h2>
            <RevealGroup stagger={0.08} className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {more.map((p, i) => (
                /* two columns between 640 and 1023: show two cards so the third is not left alone on a row */
                <RevealItem key={p.slug} className={cn("h-full", i === 2 && "sm:max-lg:hidden")}>
                  <PostCard post={p} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>
      )}

      <CtaBand
        id="post-cta"
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
