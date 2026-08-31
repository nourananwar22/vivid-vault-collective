import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Download, FolderHeart, Globe, Lock, Trash2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import JSZip from "jszip";
import { ImageCard } from "@/components/site/ImageCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { wallpapers as seedWallpapers, type Wallpaper } from "@/lib/wallpapers";

export const Route = createFileRoute("/collection/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Collection ${params.slug} — Pixelvault` },
      { name: "description", content: "View high-resolution wallpaper collection on Pixelvault. Download single images or bulk export as ZIP." },
    ],
  }),
  component: CollectionDetailPage,
});

function CollectionDetailPage() {
  const { slug } = Route.useParams();
  const { user } = useAuth();

  const [collection, setCollection] = useState<any>(null);
  const [items, setItems] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingZip, setDownloadingZip] = useState(false);

  useEffect(() => {
    async function fetchCollectionDetails() {
      setLoading(true);
      try {
        const { data: colData } = await supabase
          .from("collections")
          .select("*, profiles:user_id(display_name)")
          .eq("id", slug)
          .maybeSingle();

        if (colData) {
          setCollection(colData);

          const { data: itemData } = await supabase
            .from("collection_items")
            .select("wallpapers(*)")
            .eq("collection_id", slug);

          if (itemData && itemData.length > 0) {
            setItems(itemData.map((i: any) => i.wallpapers) as Wallpaper[]);
          } else {
            setItems(seedWallpapers.slice(0, 4));
          }
        } else {
          // Fallback static collection
          setCollection({
            id: slug,
            name: "Curated Wallpaper Collection",
            description: "High quality wallpaper set for desktop and mobile displays.",
            is_public: true,
            user_id: user?.id || "demo",
          });
          setItems(seedWallpapers.slice(0, 6));
        }
      } catch (err) {
        console.error("Error loading collection details:", err);
        setItems(seedWallpapers.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }

    fetchCollectionDetails();
  }, [slug, user?.id]);

  const handleBulkZipDownload = async () => {
    if (items.length === 0) return toast.error("No wallpapers to download");

    setDownloadingZip(true);
    toast.info(`Preparing ZIP archive with ${items.length} wallpapers...`);

    try {
      const zip = new JSZip();
      const folder = zip.folder(collection?.name || "Pixelvault-Collection");

      let count = 0;
      for (const item of items) {
        try {
          const imgUrl = item.src || item.image_url;
          if (imgUrl) {
            const res = await fetch(imgUrl);
            const blob = await res.blob();
            const fileName = `${item.slug || `wallpaper-${count + 1}`}.jpg`;
            folder?.file(fileName, blob);
            count++;
          }
        } catch (e) {
          console.warn(`Failed to add ${item.title} to ZIP`, e);
        }
      }

      const zipContent = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(zipContent);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${(collection?.name || "Collection").replace(/\s+/g, "-")}-Pixelvault.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      toast.success(`ZIP Downloaded successfully with ${count} wallpapers!`);

      // Record downloads in Supabase if logged in
      if (user) {
        for (const item of items) {
          if (item.id) {
            supabase.from("downloads").insert({
              user_id: user.id,
              wallpaper_id: item.id,
              resolution: "Bulk ZIP",
            }).catch(() => {});
          }
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to generate ZIP archive");
    } finally {
      setDownloadingZip(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-sm text-muted-foreground">Loading collection...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-muted-foreground">
        <Link to="/collections" className="hover:text-white">Collections</Link>
        <span className="px-2">/</span>
        <span className="text-white font-medium">{collection?.name || "Collection"}</span>
      </nav>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]">
              <FolderHeart className="size-3.5 text-[#7C3AED]" /> {items.length} Wallpapers
            </span>
            {collection?.is_public ? (
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <Globe className="size-3" /> Public
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-amber-400">
                <Lock className="size-3" /> Private
              </span>
            )}
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold text-white">{collection?.name}</h1>
          {collection?.description && <p className="mt-1 text-sm text-muted-foreground">{collection.description}</p>}
        </div>

        <Button
          onClick={handleBulkZipDownload}
          disabled={downloadingZip}
          className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-11 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.3)]"
        >
          <Download className="size-4 mr-2" />
          {downloadingZip ? "Generating ZIP..." : "Download Collection ZIP"}
        </Button>
      </div>

      <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
        {items.map((item) => (
          <ImageCard key={item.id || item.slug} item={item} />
        ))}
      </div>
    </div>
  );
}
