import { createServerFn } from "@tanstack/react-start";

export type LibraryCategory = {
  slug: string;
  name: string;
  description: string | null;
  cover_path: string | null;
  count: number;
};

export type LibraryImage = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  preview_path: string | null;
  width: number;
  height: number;
  file_type: string;
  size_bytes: number;
  tags: string[];
  is_premium: boolean;
  price_cents: number | null;
  license: string;
  view_count: number;
  download_count: number;
  like_count: number;
  created_at: string;
  category: { slug: string; name: string } | null;
};

export type ListInput = {
  q?: string;
  category?: string;
  license?: "all" | "free" | "premium";
  sort?: "trending" | "newest" | "downloads";
  limit?: number;
};

export const listWallpapers = createServerFn({ method: "GET" })
  .inputValidator((input: ListInput | undefined) => input ?? {})
  .handler(async ({ data }): Promise<LibraryImage[]> => {
    const { serverPublicClient, publicSelect } = await import("./library.server");
    const supabase = serverPublicClient();

    let query = supabase.from("wallpapers").select(publicSelect).eq("status", "approved");

    if (data.category) {
      const { data: cat } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", data.category)
        .maybeSingle();
      if (!cat) return [];
      query = query.eq("category_id", cat.id);
    }
    if (data.license === "free") query = query.eq("is_premium", false);
    if (data.license === "premium") query = query.eq("is_premium", true);
    if (data.q) {
      const term = data.q.trim();
      query = query.or(`title.ilike.%${term}%,tags.cs.{${term.toLowerCase()}}`);
    }

    if (data.sort === "newest") query = query.order("created_at", { ascending: false });
    else if (data.sort === "downloads") query = query.order("download_count", { ascending: false });
    else query = query.order("view_count", { ascending: false });

    const { data: rows, error } = await query.limit(data.limit ?? 60);
    if (error) throw new Error(error.message);
    return (rows ?? []) as unknown as LibraryImage[];
  });

export const getWallpaper = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) => input)
  .handler(async ({ data }): Promise<{ item: LibraryImage; related: LibraryImage[] } | null> => {
    const { serverPublicClient, publicSelect } = await import("./library.server");
    const supabase = serverPublicClient();

    const { data: item } = await supabase
      .from("wallpapers")
      .select(publicSelect)
      .eq("slug", data.slug)
      .eq("status", "approved")
      .maybeSingle();

    if (!item) return null;

    const typed = item as unknown as LibraryImage;
    const { data: related } = await supabase
      .from("wallpapers")
      .select(publicSelect)
      .eq("status", "approved")
      .neq("slug", data.slug)
      .order("view_count", { ascending: false })
      .limit(3);

    return { item: typed, related: (related ?? []) as unknown as LibraryImage[] };
  });

export const listCategories = createServerFn({ method: "GET" }).handler(
  async (): Promise<LibraryCategory[]> => {
    const { serverPublicClient } = await import("./library.server");
    const supabase = serverPublicClient();

    const { data: cats, error } = await supabase
      .from("categories")
      .select("slug, name, description, cover_path, wallpapers(count)")
      .order("name");
    if (error) throw new Error(error.message);

    return (cats ?? []).map((c) => {
      const rel = (c as unknown as { wallpapers: { count: number }[] }).wallpapers;
      return {
        slug: c.slug,
        name: c.name,
        description: c.description,
        cover_path: c.cover_path,
        count: rel?.[0]?.count ?? 0,
      };
    });
  },
);
