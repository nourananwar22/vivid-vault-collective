import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { FolderHeart, Sparkles, Lock, Globe, Download } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Curated Wallpaper Collections | Pixelvault" },
      { name: "description", content: "Explore public wallpaper collections and moodboards created by the Pixelvault community." },
    ],
  }),
  component: CollectionsPage,
});

interface Collection {
  id: string;
  name: string;
  description: string | null;
  is_public: boolean;
  user_id: string;
  created_at: string;
  profiles?: { display_name: string; username: string };
  coverUrl?: string;
  itemCount?: number;
}

function CollectionsPage() {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPublicCollections() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("collections")
          .select("*, profiles:user_id(display_name, username)")
          .eq("is_public", true)
          .order("created_at", { ascending: false });

        if (!error && data) {
          setCollections(data as any[]);
        } else {
          // Fallback static collections
          setCollections([
            { id: "col-1", name: "Cyberpunk Nightscapes", description: "Neon drenched cityscape wallpapers", is_public: true, user_id: "demo", created_at: "2026-08-01", profiles: { display_name: "Kaito Mori", username: "kaitom" }, itemCount: 14 },
            { id: "col-2", name: "Moody Fog & Pine", description: "Deep dark mist landscape collection", is_public: true, user_id: "demo", created_at: "2026-08-05", profiles: { display_name: "Lina Farouk", username: "linaf" }, itemCount: 8 },
            { id: "col-3", name: "Minimal 4K Setup", description: "Clean desktop backgrounds for workspace setups", is_public: true, user_id: "demo", created_at: "2026-08-12", profiles: { display_name: "Alex Mercer", username: "alexm" }, itemCount: 21 },
          ]);
        }
      } catch (err) {
        console.error("Error fetching collections:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPublicCollections();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="border-b border-border pb-6">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]">
          <Sparkles className="size-3 text-[#7C3AED]" /> Community Curation
        </span>
        <h1 className="mt-3 font-display text-4xl font-bold text-white flex items-center gap-2">
          <FolderHeart className="size-8 text-[#7C3AED]" /> Featured Collections
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Curated moodboards and wallpaper sets created by Pixelvault artists and collectors.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-sm text-muted-foreground">Loading collections...</div>
      ) : collections.length === 0 ? (
        <div className="py-20 text-center text-sm text-muted-foreground">No public collections found yet.</div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => (
            <Link
              key={col.id}
              to="/collection/$slug"
              params={{ slug: col.id }}
              className="group overflow-hidden rounded-2xl border border-border bg-[#1A1A1A] p-5 transition-all hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Globe className="size-3 text-emerald-400" /> Public Collection
                </span>
                <span>{col.itemCount || 12} items</span>
              </div>

              <h2 className="mt-3 font-display text-xl font-bold text-white group-hover:text-[#EDE9FE]">{col.name}</h2>
              {col.description && <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{col.description}</p>}

              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                <span className="text-muted-foreground">
                  By <strong className="text-white">{col.profiles?.display_name || "Community Member"}</strong>
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#7C3AED]">
                  View Set &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
