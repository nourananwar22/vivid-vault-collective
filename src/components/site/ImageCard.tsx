import { Link } from "@tanstack/react-router";
import { Crown, Download, Heart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatCount, type Wallpaper } from "@/lib/wallpapers";

type Props = {
  item: Wallpaper;
  selected?: boolean;
  onToggleSelect?: (slug: string) => void;
};

export function ImageCard({ item, selected, onToggleSelect }: Props) {
  return (
    <article className="group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card">
      <Link
        to="/wallpaper/$slug"
        params={{ slug: item.slug }}
        className="image-veil relative block"
        aria-label={item.title}
      >
        <img
          src={item.src}
          alt={`${item.title} — ${item.tags.slice(0, 3).join(", ")} wallpaper`}
          width={item.width}
          height={item.height}
          loading="lazy"
          className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>

      {onToggleSelect && (
        <label className="absolute left-3 top-3 flex cursor-pointer items-center gap-2 rounded-md bg-background/70 px-2 py-1 text-xs backdrop-blur">
          <Checkbox
            checked={!!selected}
            onCheckedChange={() => onToggleSelect(item.slug)}
            aria-label={`Select ${item.title} for bulk download`}
          />
          Select
        </label>
      )}

      <Badge
        className={
          item.premium
            ? "absolute right-3 top-3 gap-1 bg-primary text-primary-foreground"
            : "absolute right-3 top-3 bg-secondary text-secondary-foreground"
        }
      >
        {item.premium ? (
          <>
            <Crown className="size-3" /> ${item.price}
          </>
        ) : (
          "Free"
        )}
      </Badge>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{item.title}</p>
            <p className="truncate text-xs text-muted-foreground">
              {item.width}×{item.height} · {item.fileType}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="size-3" /> {formatCount(item.likes)}
            </span>
            <span className="flex items-center gap-1">
              <Download className="size-3" /> {formatCount(item.downloads)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
