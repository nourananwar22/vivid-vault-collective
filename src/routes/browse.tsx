import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Download, SlidersHorizontal, X, Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { ImageCard } from "@/components/site/ImageCard";
import { BulkDownloadBar } from "@/components/site/BulkDownloadBar";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories, wallpapers as seedWallpapers } from "@/lib/wallpapers";
import { supabase } from "@/lib/supabase";


type BrowseSearch = {
  q?: string | undefined;
  category?: string | undefined;
  license?: "all" | "free" | "premium" | undefined;
  sort?: "trending" | "newest" | "downloads" | undefined;
};

export const Route = createFileRoute("/browse")({
  validateSearch: (search: Record<string, unknown>): BrowseSearch => {
    const qParam = search["q"];
    const categoryParam = search["category"];
    const licenseParam = search["license"];
    const sortParam = search["sort"];

    return {
      q: typeof qParam === "string" && qParam ? qParam : undefined,
      category: typeof categoryParam === "string" ? categoryParam : undefined,
      license: ["free", "premium", "all"].includes(String(licenseParam))
        ? (licenseParam as BrowseSearch["license"])
        : undefined,
      sort: ["trending", "newest", "downloads"].includes(String(sortParam))
        ? (sortParam as BrowseSearch["sort"])
        : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Browse Wallpapers — Search, Filter & Bulk Download | Pixelvault" },
      {
        name: "description",
        content:
          "Search the Pixelvault library by tag, category and license. Sort by trending, newest or downloads and bulk download your selection.",
      },
      { property: "og:title", content: "Browse Wallpapers — Pixelvault" },
      {
        property: "og:description",
        content: "Search, filter and bulk download free and premium wallpapers.",
      },
      { property: "og:url", content: "/browse" },
    ],
    links: [{ rel: "canonical", href: "/browse" }],
  }),
  component: Browse,
});

function Browse() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/browse" });
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState(search.q ?? "");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const license = search.license ?? "all";
  const sort = search.sort ?? "trending";

  const setSearch = (next: Partial<BrowseSearch>) =>
    navigate({
      search: (prev: Record<string, any>) => {
        const updated = { ...prev, ...next };
        // تنظيف القيم undefined لمنع التعارض مع TypeScript
        Object.keys(updated).forEach((key) => {
          if (updated[key as keyof BrowseSearch] === undefined) {
            delete updated[key as keyof BrowseSearch];
          }
        });
        return updated;
      },
    } as any);

  useEffect(() => {
    async function fetchBrowseData() {
      setLoading(true);
      try {
        let dbQuery = supabase
          .from("wallpapers")
          .select("*")
          .eq("status", "approved");

        if (search.category && search.category !== "all") {
          dbQuery = dbQuery.eq("category", search.category);
        }

        if (search.q) {
          dbQuery = dbQuery.ilike("title", `%${search.q}%`);
        }

        if (license === "free") {
          dbQuery = dbQuery.eq("is_premium", false);
        } else if (license === "premium") {
          dbQuery = dbQuery.eq("is_premium", true);
        }

        if (sort === "newest") {
          dbQuery = dbQuery.order("created_at", { ascending: false });
        } else if (sort === "downloads") {
          dbQuery = dbQuery.order("downloads_count", { ascending: false });
        } else {
          dbQuery = dbQuery.order("views_count", { ascending: false });
        }

        const { data, error } = await dbQuery;

        if (!error && data && data.length > 0) {
          setResults(data);
        } else if (import.meta.env.VITE_DEMO_MODE === "true") {
          // Fallback to seed wallpapers filtered by category, search query, license ONLY in demo mode
          let filtered = seedWallpapers;
          if (search.category && search.category !== "all") {
            filtered = filtered.filter(
              (w) =>
                w.categorySlug.toLowerCase() === search.category?.toLowerCase() ||
                w.category.toLowerCase() === search.category?.toLowerCase()
            );
          }
          if (search.q) {
            const queryLower = search.q.toLowerCase();
            filtered = filtered.filter(
              (w) =>
                w.title.toLowerCase().includes(queryLower) ||
                w.tags.some((t) => t.toLowerCase().includes(queryLower))
            );
          }
          if (license === "free") filtered = filtered.filter((w) => !w.premium);
          if (license === "premium") filtered = filtered.filter((w) => w.premium);
          setResults(filtered);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Error fetching wallpapers:", err);
        if (import.meta.env.VITE_DEMO_MODE === "true") {
          setResults(seedWallpapers);
        } else {
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchBrowseData();
  }, [search.q, search.category, license, sort]);


  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">
        {search.category
          ? `${categories.find((c) => c.slug === search.category)?.name ?? "Category"} wallpapers`
          : "Browse wallpapers"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {results.length} result{results.length === 1 ? "" : "s"}
        {search.q ? ` for “${search.q}”` : ""}
      </p>

      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center">
        <form
          className="flex flex-1 gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch({ q: query || undefined });
          }}
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by tag or title..."
            aria-label="Search wallpapers"
            className="bg-background border-border"
          />
          <Button type="submit" className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
            <SlidersHorizontal className="size-4" /> Apply
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {/* Color Palette Filter */}
          <div className="hidden lg:flex items-center gap-1.5 border-r border-border pr-3">
            <Palette className="size-4 text-muted-foreground mr-1" />
            {["#7C3AED", "#111111", "#FFFFFF", "#3B82F6", "#10B981", "#EF4444"].map((color) => (
              <button
                key={color}
                type="button"
                className="size-5 rounded-full border border-border transition-transform hover:scale-125"
                style={{ backgroundColor: color }}
                title={`Filter color: ${color}`}
                onClick={() => setSearch({ q: color })}
              />
            ))}
          </div>

          <Select
            value={search.category ?? "all"}
            onValueChange={(v) => setSearch({ category: v === "all" ? undefined : v })}
          >
            <SelectTrigger className="w-40 bg-background" aria-label="Category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={license} onValueChange={(v) => setSearch({ license: v as never })}>
            <SelectTrigger className="w-36 bg-background" aria-label="License">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All licenses</SelectItem>
              <SelectItem value="free">Free only</SelectItem>
              <SelectItem value="premium">Premium only</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sort} onValueChange={(v) => setSearch({ sort: v as never })}>
            <SelectTrigger className="w-36 bg-background" aria-label="Sort by">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="downloads">Most downloaded</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          Loading wallpapers...
        </p>
      ) : results.length === 0 ? (
        <p className="mt-16 text-center text-sm text-muted-foreground">
          No images match those filters yet.
        </p>
      ) : (
        <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
          {results.map((item) => (
            <ImageCard
              key={item.id || item.slug}
              item={item}
              selected={selected.includes(item.id || item.slug)}
              onToggleSelect={() => toggle(item.id || item.slug)}
            />
          ))}
        </div>
      )}

      <BulkDownloadBar
        selectedItems={results.filter((item) => selected.includes(item.id || item.slug))}
        onClearSelection={() => setSelected([])}
      />
    </div>
  );
}