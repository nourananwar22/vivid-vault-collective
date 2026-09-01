import { queryOptions } from "@tanstack/react-query";

import {
  getWallpaper,
  listCategories,
  listWallpapers,
  type ListInput,
} from "@/lib/library.functions";

export const wallpapersQuery = (input: ListInput = {}) =>
  queryOptions({
    queryKey: ["wallpapers", input],
    queryFn: () => listWallpapers({ data: input }),
  });

export const categoriesQuery = () =>
  queryOptions({
    queryKey: ["categories"],
    queryFn: () => listCategories(),
  });

export const wallpaperQuery = (slug: string) =>
  queryOptions({
    queryKey: ["wallpaper", slug],
    queryFn: () => getWallpaper({ data: { slug } }),
  });
