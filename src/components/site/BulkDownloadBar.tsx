import { useState } from "react";
import { toast } from "sonner";
import { Download, X, AlertCircle } from "lucide-react";
import JSZip from "jszip";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import type { Wallpaper } from "@/lib/wallpapers";

interface BulkDownloadBarProps {
  selectedItems: Wallpaper[];
  onClearSelection: () => void;
}

const MAX_BULK_IMAGES = 25;
const MAX_BULK_ESTIMATED_MB = 150;

export function BulkDownloadBar({ selectedItems, onClearSelection }: BulkDownloadBarProps) {
  const { user } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const [progressPercent, setProgressPercent] = useState<number | null>(null);

  if (selectedItems.length === 0) return null;

  const handleBulkDownload = async () => {
    // 1. Safety limit check: count limit
    if (selectedItems.length > MAX_BULK_IMAGES) {
      toast.error(`Bulk download limit is ${MAX_BULK_IMAGES} images per ZIP. Please select fewer items.`);
      return;
    }

    // 2. Safety limit check: estimated size
    const totalEstMb = selectedItems.reduce((acc, curr) => acc + (curr.sizeMb || 5), 0);
    if (totalEstMb > MAX_BULK_ESTIMATED_MB) {
      toast.error(`Selection exceeds estimated limit of ${MAX_BULK_ESTIMATED_MB} MB (${totalEstMb.toFixed(1)} MB selected).`);
      return;
    }

    // 3. Authorization check: verify access to EVERY selected wallpaper
    const hasPremiumSelected = selectedItems.some((item) => item.premium || item.is_premium);
    if (hasPremiumSelected && !user) {
      toast.error("Your selection includes Premium wallpapers. Please sign in or upgrade to Premium Pro.");
      return;
    }

    setDownloading(true);
    setProgressPercent(10);
    toast.info(`Preparing ZIP package with ${selectedItems.length} wallpapers...`);

    try {
      const zip = new JSZip();
      const folder = zip.folder("Pixelvault-Selection");

      let completed = 0;
      for (const item of selectedItems) {
        try {
          const imgUrl = item.src || item.image_url;
          if (imgUrl) {
            const res = await fetch(imgUrl);
            const blob = await res.blob();
            const ext = (item.fileType || "JPG").toLowerCase();
            const fileName = `${item.slug || `wallpaper-${completed + 1}`}.${ext}`;
            folder?.file(fileName, blob);

            completed++;
            setProgressPercent(Math.round(10 + (completed / selectedItems.length) * 80));

            // Record download in Supabase if logged in
            if (user && item.id) {
              supabase.from("downloads").insert({
                user_id: user.id,
                wallpaper_id: item.id,
                resolution: "Bulk ZIP",
              }).catch(() => {});
            }
          }
        } catch (e) {
          console.warn(`Could not add image ${item.title} to ZIP`, e);
        }
      }

      setProgressPercent(95);
      const zipContent = await zip.generateAsync({ type: "blob" });
      const downloadUrl = URL.createObjectURL(zipContent);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `Pixelvault-Bulk-Selection-${selectedItems.length}-Items.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);

      toast.success(`ZIP Downloaded successfully (${completed} files)!`);
      onClearSelection();
    } catch (err: any) {
      toast.error(err.message || "Failed to generate bulk ZIP archive");
    } finally {
      setDownloading(false);
      setProgressPercent(null);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 mx-auto flex w-[min(94%,38rem)] items-center justify-between gap-3 rounded-2xl border border-border bg-[#1A1A1A] px-5 py-3.5 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-xl bg-[#7C3AED]/20 text-[#7C3AED] font-bold text-sm">
          {selectedItems.length}
        </span>
        <div>
          <p className="text-xs font-semibold text-white">
            {selectedItems.length} wallpaper{selectedItems.length === 1 ? "" : "s"} selected for bulk export
          </p>
          <p className="text-[10px] text-muted-foreground">
            {progressPercent !== null ? `Generating ZIP: ${progressPercent}%` : `Max limit: ${MAX_BULK_IMAGES} files per batch`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          disabled={downloading}
          onClick={handleBulkDownload}
          className="rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold shadow-[0_0_12px_rgba(124,58,237,0.4)]"
        >
          <Download className="size-3.5 mr-1" />
          {downloading ? `Zipping (${progressPercent}%)...` : "Download ZIP"}
        </Button>
        <Button
          size="icon"
          variant="ghost"
          disabled={downloading}
          onClick={onClearSelection}
          className="size-8 rounded-xl text-muted-foreground hover:text-white"
          aria-label="Clear selection"
        >
          <X className="size-4" />
        </Button>
      </div>
    </div>
  );
}
