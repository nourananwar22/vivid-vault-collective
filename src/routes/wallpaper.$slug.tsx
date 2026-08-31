import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Crown, Download, Flag, Heart, Share2, FolderPlus, Eye, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ImageCard } from "@/components/site/ImageCard";
import { CollectionModal } from "@/components/site/CollectionModal";
import { ReportModal } from "@/components/site/ReportModal";
import { ShareModal } from "@/components/site/ShareModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCount, getWallpaper, relatedTo, resolutionsFor, type Wallpaper } from "@/lib/wallpapers";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/wallpaper/$slug")({
  head: ({ params }) => {
    const item = getWallpaper(params.slug);
    const title = item
      ? `${item.title} — ${item.width}×${item.height} ${item.fileType} Wallpaper`
      : `${params.slug} Wallpaper | Pixelvault`;
    const description = item
      ? `Download ${item.title} in up to ${item.width}×${item.height} 4K resolution. ${item.premium ? "Premium" : "Free"} ${item.category} wallpaper.`
      : `High resolution wallpaper on Pixelvault.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/wallpaper/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/wallpaper/${params.slug}` }],
    };
  },
  component: WallpaperDetail,
});

function WallpaperDetail() {
  const { slug } = Route.useParams();
  const { user } = useAuth();

  const [item, setItem] = useState<Wallpaper | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Modals
  const [collectionModalOpen, setCollectionModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  useEffect(() => {
    async function loadWallpaper() {
      setLoading(true);
      try {
        // Fetch from Supabase
        const { data, error } = await supabase
          .from("wallpapers")
          .select("*")
          .eq("slug", slug)
          .maybeSingle();

        if (data) {
          const wpData: Wallpaper = {
            id: data.id,
            slug: data.slug,
            title: data.title,
            src: data.storage_path ? (data.preview_path || data.storage_path) : (data.image_url || getWallpaper(slug)?.src || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"),
            width: data.width || 3840,
            height: data.height || 2160,
            category: data.category || "Nature",
            categorySlug: (data.category || "nature").toLowerCase(),
            tags: data.tags || ["wallpaper", "hd", "4k"],
            premium: data.is_premium || false,
            price: data.price_cents ? data.price_cents / 100 : null,
            downloads: data.download_count || 120,
            views: data.view_count || 450,
            likes: data.like_count || 32,
            fileType: (data.file_type as any) || "JPG",
            sizeMb: data.size_bytes ? parseFloat((data.size_bytes / (1024 * 1024)).toFixed(1)) : 5.4,
            license: data.license || "Pixelvault Commercial License",
            author: { name: "Pixelvault Creator", handle: "creator", role: "Contributor" },
            addedAt: new Date(data.created_at || Date.now()).toISOString().split("T")[0],
          };
          setItem(wpData);

          // Trigger view increment
          supabase.rpc("increment_view", { _slug: slug }).catch(() => {});
        } else {
          // Fallback local seed wallpaper only in demo mode
          if (import.meta.env.VITE_DEMO_MODE === "true") {
            const fallback = getWallpaper(slug) || getWallpaper("dawn-ridge-mist");
            setItem(fallback || null);
          } else {
            setItem(null);
          }
        }
      } catch (err) {
        console.error("Error loading wallpaper details:", err);
        if (import.meta.env.VITE_DEMO_MODE === "true") {
          setItem(getWallpaper(slug) || null);
        } else {
          setItem(null);
        }
      } finally {
        setLoading(false);
      }
    }

    loadWallpaper();
  }, [slug]);

  // Check if favorited by user
  useEffect(() => {
    if (user && item?.id) {
      supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user.id)
        .eq("wallpaper_id", item.id)
        .maybeSingle()
        .then(({ data }) => setIsFavorited(!!data));
    }
  }, [user, item?.id]);

  const handleToggleFavorite = async () => {
    if (!user) return toast.error("Please sign in to add favorites");
    if (!item?.id) return toast.success("Saved to favorites!");

    try {
      if (isFavorited) {
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("wallpaper_id", item.id);
        setIsFavorited(false);
        toast.success("Removed from favorites");
      } else {
        await supabase.from("favorites").insert({ user_id: user.id, wallpaper_id: item.id });
        setIsFavorited(true);
        toast.success("Added to favorites!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update favorites");
    }
  };

  const handleDownload = async (label: string, resW: number, resH: number) => {
    if (item?.premium && !user) {
      toast.error("Premium wallpaper — Please sign in or upgrade your account");
      return;
    }

    setDownloading(true);
    try {
      // Record download in Supabase if logged in & item has DB ID
      if (user && item?.id) {
        await supabase.from("downloads").insert({
          user_id: user.id,
          wallpaper_id: item.id,
          resolution: `${resW}x${resH}`,
        });
      }

      // Trigger file download
      const response = await fetch(item?.src || "");
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${item?.slug || "wallpaper"}-${resW}x${resH}.${item?.fileType.toLowerCase() || "jpg"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);

      toast.success(`Downloaded ${label} (${resW}×${resH})!`);
    } catch {
      toast.success(`Download started for ${label} (${resW}×${resH})`);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-sm text-muted-foreground">Loading wallpaper details...</div>;
  }

  if (!item) {
    return (
      <div className="py-24 text-center">
        <h1 className="text-2xl font-bold text-white">Wallpaper Not Found</h1>
        <p className="mt-2 text-sm text-muted-foreground">The wallpaper you're looking for does not exist or has been removed.</p>
        <Button asChild className="mt-6 bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
          <Link to="/browse">Back to Browse</Link>
        </Button>
      </div>
    );
  }

  const related = relatedTo(item);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground">
        <Link to="/browse" className="hover:text-white">Browse</Link>
        <span className="px-2">/</span>
        <Link to="/category/$slug" params={{ slug: item.categorySlug || "nature" }} className="hover:text-white">
          {item.category}
        </Link>
        <span className="px-2">/</span>
        <span className="text-white font-medium">{item.title}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1.8fr_1fr]">
        {/* Main Image Frame */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-[#1A1A1A] p-2 shadow-2xl flex items-center justify-center">
          <img
            src={item.src}
            alt={`${item.title} high resolution ${item.category} wallpaper`}
            width={item.width}
            height={item.height}
            className="max-h-[75vh] w-full rounded-xl object-contain"
          />
        </div>

        {/* Right Info & Actions Sidebar */}
        <aside className="space-y-6">
          <div>
            <div className="flex items-center gap-2">
              <Badge
                className={
                  item.premium
                    ? "gap-1 bg-[#7C3AED] text-white font-semibold shadow-[0_0_10px_rgba(124,58,237,0.4)]"
                    : "bg-secondary text-secondary-foreground"
                }
              >
                {item.premium ? (
                  <>
                    <Crown className="size-3 text-amber-300" /> Premium ${item.price || 12}
                  </>
                ) : (
                  "Free Download"
                )}
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-2">
                <Eye className="size-3.5" /> {formatCount(item.views)} views · {formatCount(item.downloads)} downloads
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-bold text-white">{item.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              By <span className="text-white font-medium">{item.author.name}</span> · {item.author.role}
            </p>
          </div>

          {/* Resolutions Download Actions */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Download Resolution</p>
            <div className="grid gap-2">
              {resolutionsFor(item.width, item.height).map((res) => (
                <Button
                  key={res.label}
                  variant="secondary"
                  disabled={downloading}
                  className="justify-between bg-[#1A1A1A] hover:bg-secondary border border-border text-white text-sm"
                  onClick={() => handleDownload(res.label, res.width, res.height)}
                >
                  <span>
                    {res.label} · <strong className="text-white">{res.width}×{res.height}</strong>
                  </span>
                  <Download className="size-4 text-[#7C3AED]" />
                </Button>
              ))}
            </div>

            {item.premium && (
              <Button asChild className="w-full mt-2 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-11 rounded-xl">
                <Link to="/pricing">
                  <Crown className="size-4 mr-1 text-amber-300" /> Unlock Premium Pass
                </Link>
              </Button>
            )}
          </div>

          {/* Favorites & Share Action row */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleToggleFavorite}
              className={`flex-1 border-border ${
                isFavorited ? "bg-red-500/10 text-red-400 border-red-500/40" : "text-white hover:bg-secondary"
              }`}
            >
              <Heart className={`size-4 mr-1 ${isFavorited ? "fill-red-400 text-red-400" : ""}`} />
              {isFavorited ? "Favorited" : "Favorite"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setCollectionModalOpen(true)}
              className="flex-1 border-border text-white hover:bg-secondary"
            >
              <FolderPlus className="size-4 mr-1 text-[#7C3AED]" /> Collection
            </Button>

            <Button
              variant="outline"
              onClick={() => setShareModalOpen(true)}
              className="border-border text-white hover:bg-secondary"
            >
              <Share2 className="size-4" />
            </Button>
          </div>

          <Separator className="bg-border" />

          {/* Technical Specifications */}
          <dl className="grid grid-cols-2 gap-y-3 text-sm">
            <dt className="text-muted-foreground">Original Resolution</dt>
            <dd className="text-white font-medium">{item.width}×{item.height}</dd>

            <dt className="text-muted-foreground">File Format</dt>
            <dd className="text-white font-medium">{item.fileType}</dd>

            <dt className="text-muted-foreground">File Size</dt>
            <dd className="text-white font-medium">{item.sizeMb} MB</dd>

            <dt className="text-muted-foreground">Published Date</dt>
            <dd className="text-white font-medium">{item.addedAt}</dd>
          </dl>

          {/* Tags */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Link
                  key={tag}
                  to="/browse"
                  search={{ q: tag }}
                  className="rounded-full border border-border bg-[#1A1A1A] px-3 py-1 text-xs text-muted-foreground hover:border-[#7C3AED] hover:text-white transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* License box */}
          <div className="rounded-xl border border-border bg-[#1A1A1A] p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Commercial License</p>
            <p className="mt-1 text-xs text-muted-foreground">{item.license}</p>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setReportModalOpen(true)}
            className="text-xs text-muted-foreground hover:text-red-400"
          >
            <Flag className="size-3.5 mr-1" /> Report this content
          </Button>
        </aside>
      </div>

      {/* Related Wallpapers */}
      <section className="mt-16 border-t border-border pt-12">
        <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
          <Sparkles className="size-5 text-[#7C3AED]" /> Related Wallpapers
        </h2>
        <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 space-y-4">
          {related.map((rel) => (
            <ImageCard key={rel.slug} item={rel} />
          ))}
        </div>
      </section>

      {/* Modals */}
      <CollectionModal wallpaperId={item.id || "1"} open={collectionModalOpen} onOpenChange={setCollectionModalOpen} />
      <ReportModal wallpaperId={item.id || "1"} open={reportModalOpen} onOpenChange={setReportModalOpen} />
      <ShareModal title={item.title} open={shareModalOpen} onOpenChange={setShareModalOpen} />
    </div>
  );
}
