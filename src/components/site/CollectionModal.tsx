import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FolderPlus, Plus, FolderHeart, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

interface CollectionModalProps {
  wallpaperId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Collection {
  id: string;
  name: string;
  is_public: boolean;
  item_count?: number;
  hasItem?: boolean;
}

export function CollectionModal({ wallpaperId, open, onOpenChange }: CollectionModalProps) {
  const { user } = useAuth();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchUserCollections = async () => {
    if (!user || !open) return;
    setLoading(true);
    try {
      // Get user's collections
      const { data: cols, error } = await supabase
        .from("collections")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Check which collections already contain wallpaperId
      const { data: items } = await supabase
        .from("collection_items")
        .select("collection_id")
        .eq("wallpaper_id", wallpaperId);

      const existingColIds = new Set((items || []).map((i: any) => i.collection_id));

      const processed = (cols || []).map((c: any) => ({
        ...c,
        hasItem: existingColIds.has(c.id),
      }));

      setCollections(processed);
    } catch (err: any) {
      console.error("Error loading collections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserCollections();
  }, [open, wallpaperId, user]);

  const toggleItemInCollection = async (collection: Collection) => {
    if (!user) return toast.error("Please sign in to manage collections");

    try {
      if (collection.hasItem) {
        // Remove
        const { error } = await supabase
          .from("collection_items")
          .delete()
          .eq("collection_id", collection.id)
          .eq("wallpaper_id", wallpaperId);

        if (error) throw error;
        toast.success(`Removed from "${collection.name}"`);
      } else {
        // Add
        const { error } = await supabase.from("collection_items").insert({
          collection_id: collection.id,
          wallpaper_id: wallpaperId,
        });

        if (error) throw error;
        toast.success(`Added to "${collection.name}"`);
      }

      setCollections((prev) =>
        prev.map((c) => (c.id === collection.id ? { ...c, hasItem: !c.hasItem } : c))
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update collection");
    }
  };

  const handleCreateCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    if (!user) return toast.error("Please sign in first");

    setCreating(true);
    try {
      const { data: newCol, error } = await supabase
        .from("collections")
        .insert({
          user_id: user.id,
          name: newCollectionName.trim(),
          is_public: true,
        })
        .select()
        .single();

      if (error) throw error;

      // Add image to new collection automatically
      if (newCol) {
        await supabase.from("collection_items").insert({
          collection_id: newCol.id,
          wallpaper_id: wallpaperId,
        });
      }

      toast.success(`Created collection "${newCollectionName.trim()}"`);
      setNewCollectionName("");
      fetchUserCollections();
    } catch (err: any) {
      toast.error(err.message || "Failed to create collection");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-[#1A1A1A] p-6 text-foreground shadow-2xl sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-[#7C3AED]">
            <FolderHeart className="size-5" />
            <DialogTitle className="text-xl font-bold text-white">Save to Collection</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Organize wallpapers into personal public or private moodboards.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateCollection} className="mt-4 flex gap-2">
          <Input
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="New collection name..."
            className="bg-[#111111] border-border text-white text-sm"
          />
          <Button type="submit" disabled={creating} className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white shrink-0">
            <Plus className="size-4 mr-1" /> Create
          </Button>
        </form>

        <div className="mt-4 max-h-60 overflow-y-auto divide-y divide-border rounded-xl border border-border bg-[#111111]">
          {loading ? (
            <div className="p-6 text-center text-xs text-muted-foreground">Loading collections...</div>
          ) : collections.length === 0 ? (
            <div className="p-6 text-center text-xs text-muted-foreground">
              No collections yet. Create your first one above!
            </div>
          ) : (
            collections.map((col) => (
              <button
                key={col.id}
                type="button"
                onClick={() => toggleItemInCollection(col)}
                className="flex w-full items-center justify-between p-3.5 text-left text-sm transition-colors hover:bg-secondary/40"
              >
                <span className="font-medium text-white">{col.name}</span>
                {col.hasItem ? (
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    <Check className="size-4" /> Added
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground hover:text-white">
                    <FolderPlus className="size-4" /> Add
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
