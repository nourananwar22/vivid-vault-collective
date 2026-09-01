import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export function useFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const favorites = useQuery({
    queryKey: ["favorites", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("favorites").select("wallpaper_id");
      if (error) throw error;
      return data.map((row) => row.wallpaper_id);
    },
  });

  const toggle = async (wallpaperId: string) => {
    if (!user) {
      toast.error("Sign in to save favorites");
      return;
    }
    const isFav = favorites.data?.includes(wallpaperId);
    if (isFav) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("wallpaper_id", wallpaperId)
        .eq("user_id", user.id);
      if (error) return toast.error(error.message);
      toast.success("Removed from favorites");
    } else {
      const { error } = await supabase
        .from("favorites")
        .insert({ wallpaper_id: wallpaperId, user_id: user.id });
      if (error) return toast.error(error.message);
      toast.success("Saved to favorites");
    }
    await queryClient.invalidateQueries({ queryKey: ["favorites"] });
  };

  return { ids: favorites.data ?? [], toggle, signedIn: !!user };
}

export async function recordDownload(
  userId: string | undefined,
  wallpaperId: string,
  resolution: string,
) {
  if (!userId) return;
  await supabase.from("downloads").insert({
    user_id: userId,
    wallpaper_id: wallpaperId,
    resolution,
  });
}

export async function reportContent(
  userId: string | undefined,
  wallpaperId: string,
  reason: string,
) {
  if (!userId) {
    toast.error("Sign in to report content");
    return;
  }
  const { error } = await supabase
    .from("reports")
    .insert({ wallpaper_id: wallpaperId, reporter_id: userId, reason });
  if (error) return toast.error(error.message);
  toast.success("Report submitted for moderation");
}
