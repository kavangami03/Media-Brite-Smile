import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { formatDate, readingMinutes, type BlogPost } from "@/content/blog";
import { cn } from "@/lib/utils";

/** A blog post card: photo, category, title, excerpt, date and reading time. */
export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group grid h-full overflow-hidden rounded-4xl bg-white p-2.5 shadow-soft ring-1 ring-line transition-shadow duration-500 hover:shadow-lift",
        /* rows: photo sized by its aspect, text takes the rest, so every card in a row lines up */
        featured
          ? "grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[1.1fr_1fr] lg:grid-rows-1 lg:items-stretch"
          : "grid-cols-1 grid-rows-[auto_1fr]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl",
          featured ? "aspect-3/2 lg:aspect-auto lg:min-h-80" : "aspect-3/2",
        )}
      >
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes={featured ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink">
          {post.category}
        </span>
      </div>
      <div className={cn("flex flex-col p-4 sm:p-6", featured && "lg:justify-center lg:p-10")}>
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-4 text-brand-500" /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-4 text-brand-500" /> {readingMinutes(post)} min read
          </span>
        </p>
        <h3
          className={cn(
            "mt-3 font-bold tracking-tight text-balance text-ink transition-colors group-hover:text-brand-600",
            featured ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl",
          )}
        >
          {post.title}
        </h3>
        <p className={cn("mt-3 leading-relaxed text-pretty", featured ? "text-lg" : "line-clamp-3")}>
          {post.description}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold text-brand-600">
          Read the article
          <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </div>
    </Link>
  );
}
