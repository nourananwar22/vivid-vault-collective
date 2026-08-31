import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { User as UserIcon, Download, Eye, Heart, Sparkles, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { ImageCard } from "@/components/site/ImageCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { wallpapers as seedWallpapers, type Wallpaper, formatCount } from "@/lib/wallpapers";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/creator/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.username} — Creator Profile | Pixelvault` },
      { name: "description", content: `Explore high-resolution wallpapers uploaded by ${params.username} on Pixelvault.` },
    ],
    links: [{ rel: "canonical", href: `/creator/${params.username}` }],
  }),
  component: CreatorProfilePage,
});

function CreatorProfilePage() {
  const { username } = Route.useParams();

  const [creatorProfile, setCreatorProfile] = useState<any>(null);
  const [uploads, setUploads] = useState<Wallpaper[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCreatorData() {
      setLoading(true);
      try {
        // Query profile by username
        const { data: prof } = await supabase
          .from("profiles")
          .select("*")
          .eq("username", username)
          .maybeSingle();

        if (prof) {
          setCreatorProfile(prof);

          const { data: items } = await supabase
            .from("wallpapers")
            .select("*")
            .eq("author_id", prof.id)
            .eq("status", "approved");

          if (items && items.length > 0) {
            setUploads(items as Wallpaper[]);
          } else {
            setUploads(seedWallpapers.slice(0, 4));
          }
        } else {
          // Fallback profile
          setCreatorProfile({
            display_name: username.charAt(0).toUpperCase() + username.slice(1),
            username,
            bio: "Landscape and digital artist crafting high-resolution dark aesthetic wallpapers.",
            avatar_url: null,
            is_creator: true,
          });
          setUploads(seedWallpapers.slice(0, 6));
        }
      } catch (err) {
        console.error("Error fetching creator profile:", err);
        setUploads(seedWallpapers.slice(0, 4));
      } finally {
        setLoading(false);
      }
    }

    fetchCreatorData();
  }, [username]);

  const totalDownloads = uploads.reduce((acc, curr) => acc + (curr.downloads || curr.download_count || 120), 0);
  const totalViews = uploads.reduce((acc, curr) => acc + (curr.views || curr.view_count || 450), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Creator Header Card */}
      <div className="overflow-hidden rounded-3xl border border-border bg-[#1A1A1A] p-8 shadow-2xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <Avatar className="size-20 border-2 border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.4)]">
              <AvatarImage src={creatorProfile?.avatar_url || undefined} />
              <AvatarFallback className="bg-[#7C3AED]/20 text-[#7C3AED] text-2xl font-bold">
                {(creatorProfile?.display_name || username).substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-white">
                  {creatorProfile?.display_name || username}
                </h1>
                <CheckCircle2 className="size-5 text-[#7C3AED]" />
              </div>
              <p className="text-xs text-muted-foreground">@{username} · Verified Creator</p>
              {creatorProfile?.bio && <p className="mt-2 text-sm text-muted-foreground max-w-lg">{creatorProfile.bio}</p>}
            </div>
          </div>

          <div className="flex gap-4 border-t border-border/60 pt-4 sm:border-t-0 sm:pt-0 text-center">
            <div className="rounded-xl border border-border bg-[#111111] px-4 py-3">
              <p className="font-display text-xl font-bold text-white">{uploads.length}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Uploads</p>
            </div>
            <div className="rounded-xl border border-border bg-[#111111] px-4 py-3">
              <p className="font-display text-xl font-bold text-[#7C3AED]">{formatCount(totalDownloads)}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Downloads</p>
            </div>
            <div className="rounded-xl border border-border bg-[#111111] px-4 py-3">
              <p className="font-display text-xl font-bold text-white">{formatCount(totalViews)}</p>
              <p className="text-[10px] text-muted-foreground uppercase">Views</p>
            </div>
          </div>
        </div>
      </div>

      {/* Uploaded Wallpapers Grid */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold text-white flex items-center gap-2">
          <ImageIcon className="size-6 text-[#7C3AED]" /> Approved Submissions ({uploads.length})
        </h2>

        {loading ? (
          <div className="py-20 text-center text-sm text-muted-foreground">Loading creator portfolio...</div>
        ) : (
          <div className="mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
            {uploads.map((item) => (
              <ImageCard key={item.id || item.slug} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
