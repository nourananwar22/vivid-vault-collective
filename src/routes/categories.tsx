import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Grid } from "lucide-react";
import { categories, formatCount } from "@/lib/wallpapers";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Wallpaper Categories & Collections | Pixelvault" },
      {
        name: "description",
        content:
          "Explore Pixelvault categories: Nature, Urban, Abstract, Architecture, Space, Anime, Cars, Gaming and minimal wallpapers in 4K resolution.",
      },
      { property: "og:title", content: "Wallpaper Categories | Pixelvault" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="border-b border-border pb-6">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]">
          <Sparkles className="size-3 text-[#7C3AED]" /> Curated Taxonomy
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-white flex items-center gap-2">
          <Grid className="size-8 text-[#7C3AED]" /> Explore Categories
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Discover high-resolution wallpapers tailored to your taste across 12 distinct categories.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to="/category/$slug"
            params={{ slug: cat.slug }}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-[#1A1A1A] transition-all hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
          >
            <img
              src={cat.cover}
              alt={`${cat.name} wallpaper collection`}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h2 className="font-display text-xl font-bold text-white group-hover:text-[#EDE9FE]">{cat.name}</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{formatCount(cat.count)} wallpapers</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
