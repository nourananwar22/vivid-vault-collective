import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Download, FolderHeart, Heart, Sparkles, User as UserIcon, RefreshCw, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { ImageCard } from "@/components/site/ImageCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCount, wallpapers as seedWallpapers, type Wallpaper } from "@/lib/wallpapers";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Dashboard — Pixelvault" },
      { name: "description", content: "Manage your downloaded wallpapers, favorited items, personal collections, and subscription membership." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/dashboard" }],
  }),
  component: DashboardPage,
});

export function DashboardPage() {
  const { user, profile, refreshProfile } = useAuth();

  const [favorites, setFavorites] = useState<Wallpaper[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [downloads, setDownloads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [displayName, setDisplayName] = useState(profile?.display_name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
      setBio(profile.bio || "");
    }
  }, [profile]);

  useEffect(() => {
    async function loadDashboardData() {
      if (!user) {
        setFavorites(seedWallpapers.slice(0, 3));
        setCollections([
          { id: "col-1", name: "Desktop 4K 2026", is_public: true, itemCount: 8 },
          { id: "col-2", name: "Dark Minimal Setup", is_public: false, itemCount: 14 },
        ]);
        setDownloads(
          seedWallpapers.slice(2, 6).map((item, idx) => ({
            id: `dl-${idx}`,
            resolution: "3840x2160",
            created_at: new Date(Date.now() - idx * 86400000).toISOString(),
            wallpapers: item,
          }))
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Fetch favorites
        const { data: favs } = await supabase
          .from("favorites")
          .select("wallpapers(*)")
          .eq("user_id", user.id);

        if (favs && favs.length > 0) {
          setFavorites(favs.map((f: any) => f.wallpapers) as Wallpaper[]);
        } else {
          setFavorites(seedWallpapers.slice(0, 3));
        }

        // Fetch collections
        const { data: cols } = await supabase
          .from("collections")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (cols && cols.length > 0) {
          setCollections(cols);
        } else {
          setCollections([
            { id: "my-first-collection", name: "My Favorites & Ideas", is_public: true },
          ]);
        }

        // Fetch download history
        const { data: dls } = await supabase
          .from("downloads")
          .select("*, wallpapers(*)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(20);

        if (dls && dls.length > 0) {
          setDownloads(dls);
        } else {
          setDownloads(
            seedWallpapers.slice(0, 3).map((item, idx) => ({
              id: `dl-${idx}`,
              resolution: "3840x2160",
              created_at: new Date(Date.now() - idx * 86400000).toISOString(),
              wallpapers: item,
            }))
          );
        }
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please sign in first");

    setSavingProfile(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: displayName,
          bio: bio,
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully!");
      refreshProfile();
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

  const stats = [
    { label: "Downloads this month", value: downloads.length.toString(), icon: Download },
    { label: "Saved Favorites", value: favorites.length.toString(), icon: Heart },
    { label: "Curated Collections", value: collections.length.toString(), icon: FolderHeart },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">
            Welcome back, {profile?.display_name || user?.email?.split("@")[0] || "Collector"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {user ? user.email : "Demo mode · Sign in to sync across devices"}
          </p>
        </div>
        <Badge className="gap-1 bg-[#7C3AED] text-white font-semibold shadow-[0_0_12px_rgba(124,58,237,0.4)]">
          <Sparkles className="size-3.5 text-amber-300" /> Free Plan · 10 Downloads / Day
        </Badge>
      </div>

      {/* Stats Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg">
            <s.icon className="size-5 text-[#7C3AED]" />
            <p className="mt-3 font-display text-3xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="favorites" className="mt-10">
        <TabsList className="bg-[#1A1A1A] border border-border">
          <TabsTrigger value="favorites" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Favorites ({favorites.length})
          </TabsTrigger>
          <TabsTrigger value="collections" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Collections ({collections.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Download History
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Account Settings
          </TabsTrigger>
        </TabsList>

        {/* FAVORITES TAB */}
        <TabsContent value="favorites" className="mt-6">
          {loading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">Loading favorites...</div>
          ) : favorites.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No favorites saved yet. Click the heart icon on any wallpaper!
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4">
              {favorites.map((item) => (
                <ImageCard key={item.id || item.slug} item={item} />
              ))}
            </div>
          )}
        </TabsContent>

        {/* COLLECTIONS TAB */}
        <TabsContent value="collections" className="mt-6 grid gap-4 sm:grid-cols-3">
          {collections.map((col) => (
            <div key={col.id} className="rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-[#7C3AED]">Collection</span>
                  <span>{col.is_public ? "Public" : "Private"}</span>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold text-white">{col.name}</h3>
              </div>
              <Button asChild variant="outline" className="mt-6 w-full border-border text-white hover:bg-secondary">
                <Link to="/collection/$slug" params={{ slug: col.id }}>
                  Open Collection <ExternalLink className="size-3.5 ml-2" />
                </Link>
              </Button>
            </div>
          ))}
        </TabsContent>

        {/* DOWNLOAD HISTORY TAB */}
        <TabsContent value="history" className="mt-6">
          <div className="rounded-2xl border border-border bg-[#1A1A1A] divide-y divide-border overflow-hidden">
            {downloads.map((item) => {
              const wp = item.wallpapers || seedWallpapers[0];
              return (
                <div key={item.id} className="flex items-center gap-4 p-4 hover:bg-[#111111]/50 transition-colors">
                  <img
                    src={wp.src || wp.image_url || seedWallpapers[0].src}
                    alt={wp.title}
                    className="size-14 rounded-lg object-cover border border-border"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">{wp.title}</p>
                    <p className="text-xs text-muted-foreground">
                      Resolution: {item.resolution || "3840x2160"} · Date: {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Button asChild size="sm" className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
                    <Link to="/wallpaper/$slug" params={{ slug: wp.slug }}>
                      <Download className="size-3.5 mr-1" /> Re-Download
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* ACCOUNT SETTINGS TAB */}
        <TabsContent value="account" className="mt-6 max-w-xl">
          <div className="rounded-2xl border border-border bg-[#1A1A1A] p-6 shadow-xl space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <UserIcon className="size-5 text-[#7C3AED]" /> Profile & Preferences
            </h2>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground">Display Name</label>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="bg-[#111111] border-border text-white mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground">Bio / Tagline</label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell the community about yourself..."
                  className="mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <Button type="submit" disabled={savingProfile} className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
                {savingProfile ? "Saving..." : "Save Profile Changes"}
              </Button>
            </form>

            <div className="border-t border-border pt-6 space-y-3">
              <h3 className="text-sm font-bold text-white">Subscription & Limits</h3>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Current Plan</span>
                <span className="text-white font-medium">Free Tier</span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Download Limit</span>
                <span className="text-white font-medium">10 / day</span>
              </div>

              <Button asChild className="w-full mt-2 bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
                <Link to="/pricing">
                  <Sparkles className="size-4 mr-2" /> Upgrade to Premium Pro
                </Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
