"use client";

import { useTranslation } from "@/lib/i18n";
import { BLOG_CATEGORIES, type BlogCategory } from "@/lib/blogPosts";

interface CategoryFilterProps {
  selected: BlogCategory | null;
  onSelect: (category: BlogCategory | null) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onSelect(null)}
        className={`rounded-full px-5 py-2 font-[family-name:var(--font-display)] text-sm font-medium transition-all duration-200 ${
          selected === null
            ? "bg-glass-deep text-white shadow-md"
            : "border border-white/20 bg-transparent text-text-secondary hover:border-white/40 hover:text-text-primary"
        }`}
      >
        {t("blog.categories.all")}
      </button>
      {BLOG_CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full px-5 py-2 font-[family-name:var(--font-display)] text-sm font-medium transition-all duration-200 ${
            selected === cat
              ? "bg-glass-deep text-white shadow-md"
              : "border border-white/20 bg-transparent text-text-secondary hover:border-white/40 hover:text-text-primary"
          }`}
        >
          {t(`blog.categories.${cat}`)}
        </button>
      ))}
    </div>
  );
}
