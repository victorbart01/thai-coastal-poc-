"use client";

import { useState, useMemo } from "react";
import { useTranslation } from "@/lib/i18n";
import { getBlogPosts, getFeaturedPost, getNonFeaturedPosts, type BlogCategory } from "@/lib/blogPosts";
import { SiteNavbar } from "@/components/SiteNavbar";
import { SiteFooter } from "@/components/SiteFooter";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { FeaturedArticle } from "@/components/blog/FeaturedArticle";
import { BlogCard } from "@/components/blog/BlogCard";
import { Pagination } from "@/components/blog/Pagination";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const { t, locale } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allPosts = getBlogPosts(locale);
  const featuredPost = getFeaturedPost(locale);
  const nonFeaturedPosts = getNonFeaturedPosts(locale);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) return nonFeaturedPosts;
    return allPosts.filter((p) => p.category === selectedCategory && !p.featured);
  }, [selectedCategory, allPosts, nonFeaturedPosts]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleCategoryChange = (cat: BlogCategory | null) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const showFeatured = !selectedCategory && currentPage === 1 && featuredPost;

  return (
    <div className="h-screen overflow-y-auto bg-ocean-950">
      <SiteNavbar />

      {/* Hero */}
      <section className="pb-10 pt-20 text-center md:pb-14">
        <div className="mx-auto max-w-3xl px-6">
          <h1 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            {t("blog.journal.title")}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-text-secondary">
            {t("blog.journal.subtitle")}
          </p>
          <div className="mt-8">
            <CategoryFilter selected={selectedCategory} onSelect={handleCategoryChange} />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-6 pb-16">
        {/* Featured article */}
        {showFeatured && (
          <section className="mb-14">
            <FeaturedArticle post={featuredPost} />
          </section>
        )}

        {/* Latest articles grid */}
        <section>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-text-primary">
              {t("blog.latestArticles")}
            </h2>
            <span className="text-sm text-text-tertiary">
              {filteredPosts.length} {t("blog.articlesCount")}
            </span>
          </div>

          {paginatedPosts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/[0.08] bg-navy-900/40 p-12 text-center">
              <p className="text-text-secondary">No articles in this category yet.</p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
