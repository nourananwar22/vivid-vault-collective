import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import { ImageCard } from "@/components/site/ImageCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, wallpapers as seedWallpapers, type Wallpaper, formatCount } from "@/lib/wallpapers";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/category/$slug")({
  head: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    const title = `${cat?.name || params.slug} Wallpapers — HD & 4K Downloads | Pixelvault`;
    const description = cat?.description || `Explore top quality ${params.slug} wallpapers for mobile and desktop screens. Single and bulk downloads.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/category/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/category/${params.slug}` }],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const categoryInfo = categories.find((c) => c.slug === slug) || {
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Explore high-resolution wallpapers in the ${slug} collection.`,
    cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    count: 1200,
  };

  const [wallpapers, setWallpapers] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [license, setLicense] = useState<"all" | "free" | "premium">("all");
  const [sort, setSort] = useState<"trending" | "newest" | "downloads">("trending");

  useEffect(() => {
    async function fetchCategoryItems() {
      setLoading(true);
      try {
        let dbQuery = supabase
          .from("wallpapers")
          .select("*")
          .eq("status", "approved")
          .or(`category.ilike.%${slug}%,category_id.eq.${slug}`);

        if (license === "free") dbQuery = dbQuery.eq("is_premium", false);
        if (license === "premium") dbQuery = dbQuery.eq("is_premium", true);

        if (sort === "newest") dbQuery = dbQuery.order("created_at", { ascending: false });
        else if (sort === "downloads") dbQuery = dbQuery.order("download_count", { ascending: false });
        else dbQuery = dbQuery.order("view_count", { ascending: false });

        const { data, error } = await dbQuery;

        if (!error && data && data.length > 0) {
          setWallpapers(data as Wallpaper[]);
        } else if (import.meta.env.VITE_DEMO_MODE === "true") {
          // Fallback items matching category only in explicit demo mode
          let filtered = seedWallpapers.filter(
            (w) => w.categorySlug.toLowerCase() === slug.toLowerCase() || w.category.toLowerCase() === slug.toLowerCase()
          );
          if (filtered.length === 0) filtered = seedWallpapers;
          if (license === "free") filtered = filtered.filter((w) => !w.premium);
          if (license === "premium") filtered = filtered.filter((w) => w.premium);
          setWallpapers(filtered);
        } else {
          setWallpapers([]);
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        if (import.meta.env.VITE_DEMO_MODE === "true") {
          setWallpapers(seedWallpapers.filter((w) => w.categorySlug === slug || w.category.toLowerCase() === slug));
        } else {
          setWallpapers([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCategoryItems();
  }, [slug, license, sort]);

  return (
    <div>
      {/* Category Banner Hero */}
      <section className="relative overflow-hidden bg-card border-b border-border py-16">
        <img
          src={categoryInfo.cover}
          alt={categoryInfo.name}
          className="absolute inset-0 size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
            <Link to="/browse" className="hover:text-white">Browse</Link>
            <span className="px-2">/</span>
            <Link to="/categories" className="hover:text-white">Categories</Link>
            <span className="px-2">/</span>
            <span className="text-white font-medium">{categoryInfo.name}</span>
          </nav>

          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]">
                <Sparkles className="size-3 text-[#7C3AED]" /> {formatCount(categoryInfo.count)} Wallpapers
              </span>
              <h1 className="mt-3 font-display text-4xl font-bold text-white">{categoryInfo.name} Wallpapers</h1>
              <p className="mt-2 max-w-2xl text-pretty text-sm text-muted-foreground">
                {categoryInfo.description}
              </p>
            </div>

            <Button asChild className="mt-4 md:mt-0 bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
              <Link to="/browse" search={{ category: categoryInfo.slug }}>
                Browse All in {categoryInfo.name}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Filter and Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-[#1A1A1A] p-4">
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="size-4 text-[#7C3AED]" />
            <Select value={license} onValueChange={(v) => setLicense(v as any)}>
              <SelectTrigger className="w-36 bg-[#111111] border-border text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-border text-white">
                <SelectItem value="all">All Licenses</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
                <SelectItem value="premium">Premium Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={(v) => setSort(v as any)}>
            <SelectTrigger className="w-40 bg-[#111111] border-border text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-border text-white">
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="downloads">Most Downloaded</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="py-20 text-center text-sm text-muted-foreground">Loading {categoryInfo.name} wallpapers...</div>
        ) : wallpapers.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted-foreground">
            No wallpapers found in this category yet.
          </div>
        ) : (
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
            {wallpapers.map((item) => (
              <ImageCard key={item.id || item.slug} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
