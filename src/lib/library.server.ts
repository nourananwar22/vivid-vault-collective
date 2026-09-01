import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

export const publicSelect =
  "id, slug, title, description, preview_path, width, height, file_type, size_bytes, tags, is_premium, price_cents, license, view_count, download_count, like_count, created_at, category:categories(slug, name)";

export function serverPublicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}
