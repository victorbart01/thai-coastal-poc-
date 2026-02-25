import type { Metadata } from "next";
import { getBlogPost, getAllSlugs } from "@/lib/blogPosts";
import BlogPostClient from "./BlogPostClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug, "en");
  if (!post) {
    return { title: "Article Not Found — Sea Glass Map" };
  }

  return {
    title: `${post.title} — Sea Glass Map Blog`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.date,
      images: post.image.startsWith("/")
        ? [{ url: post.image, width: 1200, height: 600, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
    },
  };
}

export default function BlogPostPage() {
  return <BlogPostClient />;
}
