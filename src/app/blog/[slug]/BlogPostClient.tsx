"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { getBlogPost } from "@/lib/blogPosts";

export default function BlogPostClient() {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useTranslation();
  const post = getBlogPost(slug, locale);

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-950">
        <p className="text-text-secondary">Article not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ocean-950">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-black/[0.06] bg-ocean-950/80 px-4 py-3 backdrop-blur-md">
        <Link
          href="/blog"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("blog.backToBlog")}
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <article>
          {/* Hero image */}
          {post.image.startsWith("/") && (
            <div className="relative mb-6 aspect-[2/1] w-full overflow-hidden rounded-xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 672px) 100vw, 672px"
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 text-xs text-text-tertiary">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                locale === "th" ? "th-TH" : "en-US",
                { year: "numeric", month: "long", day: "numeric" }
              )}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime} {t("blog.minRead")}
            </span>
          </div>

          <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight text-text-primary">
            {post.title}
          </h1>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-text-body">
            {post.content.map((block, i) => {
              // Image block: ![alt](src)
              const imgMatch = block.match(/^!\[(.+?)\]\((.+?)\)$/);
              if (imgMatch) {
                return (
                  <div key={i} className="relative my-6 aspect-[16/10] w-full overflow-hidden rounded-lg">
                    <Image
                      src={imgMatch[2]}
                      alt={imgMatch[1]}
                      fill
                      className="object-cover"
                      sizes="(max-width: 672px) 100vw, 672px"
                    />
                  </div>
                );
              }
              if (block.startsWith("## ")) {
                return (
                  <h2
                    key={i}
                    className="mt-8 font-[family-name:var(--font-display)] text-lg font-semibold text-text-primary"
                  >
                    {block.replace("## ", "")}
                  </h2>
                );
              }
              return <p key={i} dangerouslySetInnerHTML={{ __html: formatText(block) }} />;
            })}
          </div>
        </article>

        <div className="mt-12 border-t border-black/[0.06] pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.12] bg-white/60 px-4 py-2 text-xs font-semibold text-text-secondary shadow-sm transition-all duration-200 hover:border-black/[0.18] hover:bg-white/80 hover:text-text-primary"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("blog.backToBlog")}
          </Link>
        </div>
      </main>
    </div>
  );
}

function formatText(text: string): string {
  // Bold
  let result = text.replace(
    /\*\*(.+?)\*\*/g,
    '<strong class="font-semibold text-text-primary">$1</strong>'
  );
  // Links: [text](url)
  result = result.replace(
    /\[(.+?)\]\((.+?)\)/g,
    '<a href="$2" class="text-glass-600 underline hover:text-glass-700" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return result;
}
