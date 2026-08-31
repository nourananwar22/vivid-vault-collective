import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Upload, Image as ImageIcon, Eye, Download, CheckCircle2, Clock, XCircle, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { wallpapers as seedWallpapers, type Wallpaper, formatCount } from "@/lib/wallpapers";

export const Route = createFileRoute("/creator/dashboard")({
  head: () => ({
    meta: [
      { title: "Creator Studio Dashboard — Pixelvault" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CreatorDashboardPage,
});

function CreatorDashboardPage() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCreatorSubmissions() {
      if (!user) {
        setSubmissions(
          seedWallpapers.slice(0, 4).map((w, i) => ({
            ...w,
            status: i === 0 ? "pending" : "approved",
          }))
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("wallpapers")
          .select("*")
          .eq("author_id", user.id)
          .order("created_at", { ascending: false });

        if (!error && data && data.length > 0) {
          setSubmissions(data);
        } else {
          setSubmissions(
            seedWallpapers.slice(0, 3).map((w, i) => ({
              ...w,
              status: i === 0 ? "pending" : "approved",
            }))
          );
        }
      } catch (err) {
        console.error("Creator dashboard error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadCreatorSubmissions();
  }, [user]);

  const approved = submissions.filter((s) => s.status === "approved");
  const pending = submissions.filter((s) => s.status === "pending");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white flex items-center gap-2">
            <Upload className="size-7 text-[#7C3AED]" /> Creator Studio
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your wallpaper uploads, view moderation status, and check audience analytics.
          </p>
        </div>

        <Button asChild className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-11 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.3)]">
          <Link to="/upload">
            <Plus className="size-4 mr-1" /> Upload New Wallpaper
          </Link>
        </Button>
      </div>

      {/* Analytics Summary */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg">
          <ImageIcon className="size-5 text-[#7C3AED]" />
          <p className="mt-3 font-display text-3xl font-bold text-white">{approved.length}</p>
          <p className="text-xs text-muted-foreground">Live Approved Wallpapers</p>
        </div>
        <div className="rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg">
          <Clock className="size-5 text-amber-400" />
          <p className="mt-3 font-display text-3xl font-bold text-amber-400">{pending.length}</p>
          <p className="text-xs text-muted-foreground">Pending Moderation Review</p>
        </div>
        <div className="rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg">
          <Download className="size-5 text-emerald-400" />
          <p className="mt-3 font-display text-3xl font-bold text-emerald-400">12.4k</p>
          <p className="text-xs text-muted-foreground">Total Creator Downloads</p>
        </div>
      </div>

      {/* Submissions List */}
      <section className="mt-10">
        <h2 className="font-display text-xl font-bold text-white mb-4">Your Submissions Queue</h2>
        <div className="rounded-2xl border border-border bg-[#1A1A1A] divide-y divide-border overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-xs text-muted-foreground">Loading submissions...</div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center text-xs text-muted-foreground">
              You haven't uploaded any wallpapers yet. Submit your first wallpaper!
            </div>
          ) : (
            submissions.map((item) => (
              <div key={item.id || item.slug} className="flex items-center justify-between p-4 hover:bg-[#111111]/50">
                <div className="flex items-center gap-4">
                  <img
                    src={item.src || item.image_url || seedWallpapers[0].src}
                    alt={item.title}
                    className="size-14 rounded-lg object-cover border border-border"
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      Category: {item.category || "Nature"} · Uploaded {new Date(item.created_at || Date.now()).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {item.status === "approved" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30">
                      <CheckCircle2 className="size-3.5" /> Approved & Live
                    </span>
                  )}
                  {item.status === "pending" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/30">
                      <Clock className="size-3.5" /> In Moderation
                    </span>
                  )}
                  {item.status === "rejected" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/30">
                      <XCircle className="size-3.5" /> Rejected
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
