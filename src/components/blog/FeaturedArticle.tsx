"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { CATEGORY_COLORS, type BlogPostContent } from "@/lib/blogPosts";
import { AuthorAvatar } from "./AuthorAvatar";

interface FeaturedArticleProps {
  post: BlogPostContent;
}

export function FeaturedArticle({ post }: FeaturedArticleProps) {
  const { t, locale } = useTranslation();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-2xl border border-white/[0.08] bg-navy-900 shadow-sm transition-all duration-200 hover:border-white/[0.16] hover:shadow-lg"
    >
      <div className="grid md:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-auto md:min-h-[340px]">
          {post.image.startsWith("/") && (
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          )}
        </div>

        <div className="flex flex-col justify-center p-8 md:p-10">
          <span
            className={`w-fit rounded-md px-3 py-1 text-xs font-semibold ${CATEGORY_COLORS[post.category]}`}
          >
            {t(`blog.categories.${post.category}`)}
          </span>

          <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-white sm:text-2xl">
            {post.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/60">
            {post.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <AuthorAvatar name={post.author.name} avatar={post.author.avatar} size={32} />
            <div className="flex flex-col text-xs">
              <span className="font-medium text-white/90">{post.author.name}</span>
              <time dateTime={post.date} className="text-white/40">
                {new Date(post.date).toLocaleDateString(
                  locale === "th" ? "th-TH" : "en-US",
                  { year: "numeric", month: "long", day: "numeric" }
                )}
              </time>
            </div>
          </div>

          <span className="mt-6 inline-flex items-center gap-1.5 font-[family-name:var(--font-display)] text-sm font-semibold text-glass-deep transition-colors group-hover:text-glass-muted">
            {t("blog.readMore")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}
