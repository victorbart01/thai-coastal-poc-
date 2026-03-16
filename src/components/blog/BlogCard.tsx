"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import { CATEGORY_COLORS, type BlogPostContent } from "@/lib/blogPosts";
import { AuthorAvatar } from "./AuthorAvatar";

interface BlogCardProps {
  post: BlogPostContent;
}

export function BlogCard({ post }: BlogCardProps) {
  const { t, locale } = useTranslation();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block overflow-hidden rounded-xl border border-white/[0.08] bg-navy-900 shadow-sm transition-all duration-200 hover:border-white/[0.16] hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        {post.image.startsWith("/") && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        <span
          className={`absolute bottom-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-semibold ${CATEGORY_COLORS[post.category]}`}
        >
          {t(`blog.categories.${post.category}`)}
        </span>
      </div>

      <div className="p-5">
        <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug text-white line-clamp-2">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
          {post.excerpt}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <AuthorAvatar name={post.author.name} avatar={post.author.avatar} size={28} />
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="font-medium text-white/70">{post.author.name}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(
                locale === "th" ? "th-TH" : "en-US",
                { year: "numeric", month: "short", day: "numeric" }
              )}
            </time>
          </div>
        </div>
      </div>
    </Link>
  );
}
