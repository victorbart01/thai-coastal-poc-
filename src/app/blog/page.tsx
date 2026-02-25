"use client";

import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { getBlogPosts } from "@/lib/blogPosts";

export default function BlogPage() {
  const { t, locale } = useTranslation();
  const posts = getBlogPosts(locale);

  return (
    <div className="min-h-screen bg-ocean-950">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-black/[0.06] bg-ocean-950/80 px-4 py-3 backdrop-blur-md">
        <Link
          href="/"
          className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-black/[0.06] hover:text-text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("profile.backToMap")}
        </Link>
        <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold text-text-primary">
          {t("blog.title")}
        </h2>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <h1 className="font-[family-name:var(--font-display)] text-2xl font-bold text-text-primary">
          {t("blog.title")}
        </h1>
        <p className="mt-2 text-sm text-text-secondary">
          {t("blog.subtitle")}
        </p>

        <div className="mt-8 space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-xl border border-black/[0.08] bg-white/60 p-5 shadow-sm transition-all duration-200 hover:border-black/[0.14] hover:bg-white/80 hover:shadow-md"
            >
              <div className="flex gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-glass-50/50 text-2xl">
                  {post.image}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="font-[family-name:var(--font-display)] text-sm font-semibold leading-snug text-text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-text-body">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-text-tertiary">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
