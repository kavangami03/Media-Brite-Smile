import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHub, blogDescription, blogPageCount, blogTitle } from "@/components/blog/blog-hub";

/** Blog pages 2, 3, ... (page 1 is /blog), the same URL pattern as the old WordPress blog. */
export const instant = false;

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, blogPageCount() - 1) }, (_, i) => ({ n: String(i + 2) }));
}

const parse = (n: string) => (/^\d+$/.test(n) ? Number(n) : NaN);

export async function generateMetadata({ params }: PageProps<"/blog/page/[n]">): Promise<Metadata> {
  const page = parse((await params).n);
  if (!(page >= 2 && page <= blogPageCount())) return {};
  return {
    title: { absolute: `${blogTitle.replace(" |", `, page ${page} |`)}` },
    description: blogDescription,
    alternates: { canonical: `/blog/page/${page}` },
  };
}

export default async function BlogPaged({ params }: PageProps<"/blog/page/[n]">) {
  const page = parse((await params).n);
  if (!(page >= 2 && page <= blogPageCount())) notFound();
  return <BlogHub page={page} />;
}
