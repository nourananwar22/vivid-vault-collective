import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

import { categoriesQuery } from "@/lib/queries";

export const Route = createFileRoute("/categories")({
  loader: ({ context }) => context.queryClient.ensureQueryData(categoriesQuery()),
  head: () => ({
    meta: [
      { title: "Wallpaper Categories & Collections | Pixelvault" },
      {
        name: "description",
        content:
          "Explore Pixelvault categories: nature, urban, abstract, architecture and space wallpapers in high resolution.",
      },
      { property: "og:title", content: "Wallpaper Categories & Collections | Pixelvault" },
      {
        property: "og:description",
        content: "Curated wallpaper categories and collections in 4K and beyond.",
      },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: Categories,
});

function Categories() {
  const { data: categories } = useSuspenseQuery(categoriesQuery());

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Categories & collections</h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        Every image is tagged and curated so you can find a matching set, not just a single file.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to="/browse"
            search={{ category: cat.slug }}
            className="group relative aspect-[16/10] overflow-hidden rounded-xl border border-border"
          >
            <img
              src={cat.cover_path ?? "/images/w1.jpg"}
              alt={`${cat.name} wallpaper collection`}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <h2 className="font-display text-lg font-semibold">{cat.name}</h2>
              <p className="text-xs text-muted-foreground">
                {cat.count} image{cat.count === 1 ? "" : "s"}
                {cat.description ? ` · ${cat.description}` : ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
