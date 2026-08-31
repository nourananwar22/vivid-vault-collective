import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Download, Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import hero from "@/assets/hero.jpg";
import { ImageCard } from "@/components/site/ImageCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories, wallpapers as seedWallpapers, formatCount } from "@/lib/wallpapers";
import { supabase } from "@/lib/supabase";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pixelvault — Free & Premium HD Wallpapers to Download" },
      {
        name: "description",
        content:
          "Browse thousands of free and premium wallpapers in 4K. Download individually or in bulk, with full licensing details on every image.",
      },
      { property: "og:title", content: "Pixelvault — Free & Premium HD Wallpapers" },
      {
        property: "og:description",
        content: "High-resolution wallpapers, free and premium, with single and bulk downloads.",
      },
      { property: "og:url", content: "/" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

export function Index() {
  const [q, setQ] = useState("");
  const [trending, setTrending] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const popularTags = ["minimal", "dark", "neon", "nature", "4k", "abstract"];

  useEffect(() => {
    async function fetchApprovedWallpapers() {
      try {
        const { data, error } = await supabase
          .from("wallpapers")
          .select("*")
          .eq("status", "approved")
          .order("created_at", { ascending: false })
          .limit(6);

        if (!error && data && data.length > 0) {
          setTrending(data);
        } else if (import.meta.env.VITE_DEMO_MODE === "true") {
          // Explicit demo mode fallback only
          setTrending(seedWallpapers.slice(0, 6));
        } else {
          setTrending([]);
        }
      } catch (err) {
        console.error("Error fetching wallpapers:", err);
        if (import.meta.env.VITE_DEMO_MODE === "true") {
          setTrending(seedWallpapers.slice(0, 6));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchApprovedWallpapers();
  }, []);



  return (
    <div>
      <section className="relative overflow-hidden">
        <img
          src={hero}
          alt="Abstract violet wave wallpaper"
          width={1920}
          height={1080}
          className="absolute inset-0 size-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 md:py-32">
          <Badge className="mb-6 gap-1 bg-secondary text-secondary-foreground">
            <Sparkles className="size-3 text-primary" /> 26,000+ curated wallpapers
          </Badge>
          <h1 className="text-balance font-display text-4xl font-bold leading-tight sm:text-6xl">
            Wallpapers worth <span className="text-gradient">keeping</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            Free and premium high-resolution images for every screen. Download one, or grab a whole
            collection in a single click.
          </p>

          <form
            className="mx-auto mt-8 flex max-w-xl gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.assign(`/browse?q=${encodeURIComponent(q)}`);
            }}
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try “dark minimal 4k”"
                aria-label="Search wallpapers"
                className="h-12 rounded-full border-border bg-card pl-11"
              />
            </div>
            <Button type="submit" className="h-12 rounded-full bg-primary px-6 hover:bg-primary-dark">
              Search
            </Button>
          </form>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {popularTags.map((tag) => (
              <Link
                key={tag}
                to="/browse"
                search={{ q: tag }}
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">Trending this week</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Most downloaded across the whole library.
            </p>
          </div>
          <Button asChild variant="ghost" className="shrink-0">
            <Link to="/browse">
              View all <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">Loading wallpapers...</div>
        ) : trending.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No approved wallpapers yet. Upload one and approve it from the admin dashboard!
          </div>
        ) : (
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {trending.map((item) => (
              <ImageCard key={item.id || item.slug} item={item} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Browse by category</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to="/browse"
              search={{ category: cat.slug }}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border"
            >
              <img
                src={cat.cover}
                alt={`${cat.name} wallpapers`}
                loading="lazy"
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="font-medium">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{formatCount(cat.count)} images</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="surface glow flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Bulk download the whole collection
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Premium members select any number of images and get a single optimized ZIP in every
              resolution — no per-file limits.
            </p>
          </div>
          <Button asChild size="lg" className="bg-primary hover:bg-primary-dark">
            <Link to="/pricing">
              <Download className="size-4" /> See plans
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}