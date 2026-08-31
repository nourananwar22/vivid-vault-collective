import { supabase } from "@/lib/supabase";
import { categories as seedCategories, wallpapers as seedWallpapers } from "@/lib/wallpapers";

export async function ensureDatabaseSeeded() {
  try {
    // 1. Check existing wallpapers count
    const { count, error: countError } = await supabase
      .from("wallpapers")
      .select("*", { count: "exact", head: true });

    if (!countError && count !== null && count > 0) {
      console.log(`[Database Seed] Database already contains ${count} wallpapers.`);
      return;
    }

    console.log("[Database Seed] Seeding categories and wallpapers into connected Supabase database...");

    // 2. Insert categories
    const categoryMap: Record<string, string> = {};
    for (const cat of seedCategories) {
      const { data, error } = await supabase
        .from("categories")
        .upsert(
          {
            slug: cat.slug,
            name: cat.name,
            description: cat.description,
            cover_path: cat.cover,
          },
          { onConflict: "slug" }
        )
        .select("id, slug")
        .single();

      if (!error && data) {
        categoryMap[data.slug] = data.id;
      }
    }

    // 3. Insert approved wallpapers
    for (const wp of seedWallpapers) {
      const categoryId = categoryMap[wp.categorySlug] || null;

      await supabase.from("wallpapers").upsert(
        {
          slug: wp.slug,
          title: wp.title,
          description: `${wp.title} wallpaper in high resolution 4K.`,
          storage_path: wp.src,
          preview_path: wp.src,
          width: wp.width,
          height: wp.height,
          file_type: wp.fileType,
          size_bytes: Math.round(wp.sizeMb * 1024 * 1024),
          category_id: categoryId,
          tags: wp.tags,
          is_premium: wp.premium,
          price_cents: wp.price ? wp.price * 100 : null,
          license: wp.license,
          status: "approved",
          view_count: wp.views,
          download_count: wp.downloads,
          like_count: wp.likes,
        },
        { onConflict: "slug" }
      ).catch((e) => console.warn("Seed wallpaper insert warning:", e));
    }

    console.log("[Database Seed] Seed completed successfully!");
  } catch (err) {
    console.error("[Database Seed Error]:", err);
  }
}
