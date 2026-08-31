import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Search as SearchIcon, SlidersHorizontal, Sparkles } from "lucide-react";
import { ImageCard } from "@/components/site/ImageCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, wallpapers as seedWallpapers, type Wallpaper } from "@/lib/wallpapers";
import { supabase } from "@/lib/supabase";

type SearchParams = {
  q?: string;
  category?: string;
  license?: "all" | "free" | "premium";
  sort?: "trending" | "newest" | "downloads";
};

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    license: ["free", "premium", "all"].includes(String(search["license"]))
      ? (search["license"] as SearchParams["license"])
      : undefined,
    sort: ["trending", "newest", "downloads"].includes(String(search["sort"]))
      ? (search["sort"] as SearchParams["sort"])
      : undefined,
  }),
  head: ({ search }) => {
    const query = search.q ? `“${search.q}”` : "All Wallpapers";
    const title = `Search ${query} — Free & Premium Wallpapers | Pixelvault`;
    const description = `Find high resolution HD & 4K wallpapers for ${query}. Browse by category, license, resolution and bulk download.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/search?q=${encodeURIComponent(search.q || "")}` },
      ],
      links: [{ rel: "canonical", href: `/search` }],
    };
  },
  component: SearchPage,
});

function SearchPage() {
  const searchParams = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });

  const [queryInput, setQueryInput] = useState(searchParams.q || "");
  const [results, setResults] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  const activeQuery = searchParams.q || "";
  const activeCategory = searchParams.category || "all";
  const activeLicense = searchParams.license || "all";
  const activeSort = searchParams.sort || "trending";

  const updateSearch = (next: Partial<SearchParams>) => {
    navigate({
      search: (prev: Record<string, any>) => {
        const updated = { ...prev, ...next };
        Object.keys(updated).forEach((k) => {
          if (updated[k] === undefined || updated[k] === "all") delete updated[k];
        });
        return updated;
      },
    } as any);
  };

  useEffect(() => {
    setQueryInput(searchParams.q || "");
  }, [searchParams.q]);

  useEffect(() => {
    async function fetchSearchResults() {
      setLoading(true);
      try {
        let dbQuery = supabase.from("wallpapers").select("*").eq("status", "approved");

        if (activeCategory !== "all") {
          dbQuery = dbQuery.or(`category.ilike.%${activeCategory}%,category_id.eq.${activeCategory}`);
        }

        if (activeQuery) {
          dbQuery = dbQuery.or(`title.ilike.%${activeQuery}%,description.ilike.%${activeQuery}%,tags.cs.{${activeQuery}}`);
        }

        if (activeLicense === "free") {
          dbQuery = dbQuery.eq("is_premium", false);
        } else if (activeLicense === "premium") {
          dbQuery = dbQuery.eq("is_premium", true);
        }

        if (activeSort === "newest") {
          dbQuery = dbQuery.order("created_at", { ascending: false });
        } else if (activeSort === "downloads") {
          dbQuery = dbQuery.order("download_count", { ascending: false });
        } else {
          dbQuery = dbQuery.order("view_count", { ascending: false });
        }

        const { data, error } = await dbQuery;

        if (!error && data && data.length > 0) {
          setResults(data as Wallpaper[]);
        } else if (import.meta.env.VITE_DEMO_MODE === "true") {
          // Fallback matching against seed wallpapers only in explicit demo mode
          let filtered = seedWallpapers;
          if (activeQuery) {
            const qLower = activeQuery.toLowerCase();
            filtered = filtered.filter(
              (w) =>
                w.title.toLowerCase().includes(qLower) ||
                w.category.toLowerCase().includes(qLower) ||
                w.tags.some((t) => t.toLowerCase().includes(qLower))
            );
          }
          if (activeCategory !== "all") {
            filtered = filtered.filter(
              (w) =>
                w.categorySlug.toLowerCase() === activeCategory.toLowerCase() ||
                w.category.toLowerCase() === activeCategory.toLowerCase()
            );
          }
          if (activeLicense === "free") filtered = filtered.filter((w) => !w.premium);
          if (activeLicense === "premium") filtered = filtered.filter((w) => w.premium);
          setResults(filtered);
        } else {
          setResults([]);
        }

      } catch (err) {
        console.error("Search error:", err);
        if (import.meta.env.VITE_DEMO_MODE === "true") {
          setResults(seedWallpapers);
        } else {
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [activeQuery, activeCategory, activeLicense, activeSort]);

  const relatedTags = ["minimal", "dark", "4k", "neon", "nature", "space", "cyberpunk", "abstract"];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white flex items-center gap-2">
            <SearchIcon className="size-7 text-[#7C3AED]" />
            {activeQuery ? `Results for “${activeQuery}”` : "Search Wallpapers"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Found {results.length} wallpaper{results.length === 1 ? "" : "s"} matching your criteria.
          </p>
        </div>

        {/* Quick Search Input */}
        <form
          className="flex max-w-md w-full gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            updateSearch({ q: queryInput || undefined });
          }}
        >
          <div className="relative flex-1">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Search by title, tag, or aesthetic..."
              className="bg-[#1A1A1A] border-border pl-9 text-white placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
            Search
          </Button>
        </form>
      </div>

      {/* Popular related tag pills */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Sparkles className="size-3 text-[#7C3AED]" /> Related:
        </span>
        {relatedTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => updateSearch({ q: tag })}
            className={`rounded-full border px-3 py-1 text-xs transition-colors ${
              activeQuery === tag
                ? "border-[#7C3AED] bg-[#7C3AED]/20 text-[#EDE9FE]"
                : "border-border bg-card text-muted-foreground hover:border-[#7C3AED] hover:text-white"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-[#1A1A1A] p-4">
        <div className="flex flex-wrap items-center gap-3">
          <SlidersHorizontal className="size-4 text-[#7C3AED]" />
          <Select value={activeCategory} onValueChange={(v) => updateSearch({ category: v === "all" ? undefined : v })}>
            <SelectTrigger className="w-44 bg-[#111111] border-border text-white" aria-label="Category filter">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-border text-white">
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={activeLicense} onValueChange={(v) => updateSearch({ license: v as any })}>
            <SelectTrigger className="w-36 bg-[#111111] border-border text-white" aria-label="License filter">
              <SelectValue placeholder="License" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1A1A] border-border text-white">
              <SelectItem value="all">All Licenses</SelectItem>
              <SelectItem value="free">Free Only</SelectItem>
              <SelectItem value="premium">Premium Only</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Select value={activeSort} onValueChange={(v) => updateSearch({ sort: v as any })}>
          <SelectTrigger className="w-40 bg-[#111111] border-border text-white" aria-label="Sort order">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent className="bg-[#1A1A1A] border-border text-white">
            <SelectItem value="trending">Trending</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="downloads">Most Downloaded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results grid */}
      {loading ? (
        <div className="py-20 text-center text-sm text-muted-foreground">Searching wallpaper library...</div>
      ) : results.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-semibold text-white">No wallpapers found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try adjusting your keywords or clearing selected filters.</p>
          <Button
            onClick={() => updateSearch({ q: undefined, category: undefined, license: undefined })}
            variant="outline"
            className="mt-4 border-border text-white"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
          {results.map((item) => (
            <ImageCard key={item.id || item.slug} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
