import type { Metadata } from "next";
import { latestPosts } from "@/content/blog";
import { BlogHub, blogDescription, blogTitle } from "@/components/blog/blog-hub";

export const metadata: Metadata = {
  title: { absolute: blogTitle },
  description: blogDescription,
  alternates: { canonical: "/blog" },
  ...(latestPosts().length === 0 ? { robots: { index: false, follow: true } } : {}),
};

export default function BlogPage() {
  return <BlogHub page={1} />;
}
