import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Sparkles, Check, Crown, Info, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/wallpapers";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/upload")({
  head: () => ({
    meta: [
      { title: "Submit Wallpaper — Creator Studio | Pixelvault" },
      { name: "description", content: "Upload high-resolution original wallpapers to share on Pixelvault." },
    ],
  }),
  component: UploadPage,
});

interface ExtractedMetadata {
  width: number;
  height: number;
  aspectRatio: string;
  sizeBytes: number;
  sizeMb: string;
  fileType: string;
}

function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<ExtractedMetadata | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("nature");
  const [tagsInput, setTagsInput] = useState("minimal, dark, 4k");
  const [isPremium, setIsPremium] = useState(false);
  const [priceCents, setPriceCents] = useState(900);
  const [license, setLicense] = useState("Pixelvault Free License — commercial use allowed");
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("Please select a valid image file (JPG, PNG, WEBP)");
      return;
    }

    setFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    // Extract image metadata using HTML Image API
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      // Calculate simplified aspect ratio
      const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
      const divisor = gcd(w, h);
      const aspect = `${w / divisor}:${h / divisor}`;

      const ext = selectedFile.name.split(".").pop()?.toUpperCase() || "JPG";
      const sizeMb = (selectedFile.size / (1024 * 1024)).toFixed(2);

      setMetadata({
        width: w,
        height: h,
        aspectRatio: aspect,
        sizeBytes: selectedFile.size,
        sizeMb,
        fileType: ext,
      });
    };
    img.src = objectUrl;
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !metadata) return toast.error("Please select an image file first");
    if (!title.trim()) return toast.error("Please provide a wallpaper title");
    if (!user) return toast.error("Please sign in to submit wallpapers");

    setLoading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
      const filePath = `wallpapers/${fileName}`;

      // Upload file to Supabase Storage
      const { error: uploadError } = await supabase.storage.from("wallpapers").upload(filePath, file);

      let publicUrl = "";
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from("wallpapers").getPublicUrl(filePath);
        publicUrl = urlData.publicUrl;
      }

      const slug = (title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36)).replace(/^-+|-+$/g, "");
      const parsedTags = tagsInput.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);

      const { error: dbError } = await supabase.from("wallpapers").insert({
        author_id: user.id,
        title: title.trim(),
        slug,
        description: description.trim() || null,
        storage_path: publicUrl || filePath,
        preview_path: publicUrl || filePath,
        width: metadata.width,
        height: metadata.height,
        file_type: metadata.fileType,
        size_bytes: metadata.sizeBytes,
        category,
        tags: parsedTags,
        is_premium: isPremium,
        price_cents: isPremium ? priceCents : null,
        license,
        status: "pending",
      });

      if (dbError) throw dbError;

      toast.success("Wallpaper submitted successfully! It is now pending admin moderation.");
      navigate({ to: "/creator/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Failed to submit wallpaper. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-3xl border border-border bg-[#1A1A1A] p-8 shadow-2xl">
        <div className="border-b border-border pb-6">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]">
            <Sparkles className="size-3 text-[#7C3AED]" /> Creator Upload Studio
          </span>
          <h1 className="mt-2 text-3xl font-bold text-white flex items-center gap-2">
            <Upload className="size-7 text-[#7C3AED]" /> Submit Your Wallpaper
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Share high-resolution 4K & 8K original wallpapers with the Pixelvault community.
          </p>
        </div>

        <form onSubmit={handleUploadSubmit} className="mt-8 space-y-6">
          {/* File Upload Zone */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Image File</label>

            {previewUrl && metadata ? (
              <div className="mt-2 relative overflow-hidden rounded-2xl border border-border bg-[#111111] p-4 flex flex-col md:flex-row items-center gap-6">
                <img src={previewUrl} alt="Preview" className="h-44 rounded-xl object-contain border border-border" />
                <div className="flex-1 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-white font-bold text-sm">
                    <span className="truncate max-w-xs">{file?.name}</span>
                    <button
                      type="button"
                      onClick={() => { setFile(null); setPreviewUrl(null); setMetadata(null); }}
                      className="text-muted-foreground hover:text-red-400"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 pt-2 text-muted-foreground border-t border-border/50">
                    <div>Dimensions: <strong className="text-white">{metadata.width}×{metadata.height}</strong></div>
                    <div>Aspect Ratio: <strong className="text-white">{metadata.aspectRatio}</strong></div>
                    <div>File Size: <strong className="text-white">{metadata.sizeMb} MB</strong></div>
                    <div>Format: <strong className="text-white">{metadata.fileType}</strong></div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
                }}
                className="mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-[#111111] p-10 cursor-pointer hover:border-[#7C3AED] transition-colors"
              >
                <ImageIcon className="size-12 text-[#7C3AED] mb-3" />
                <p className="text-sm font-semibold text-white">Click or drag & drop high-resolution wallpaper file</p>
                <p className="mt-1 text-xs text-muted-foreground">Supports JPG, PNG, WEBP up to 50MB (Recommended: 3840×2160 4K)</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Form details */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Title</label>
              <Input
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Neon Rain Cyberpunk District"
                className="mt-1 bg-[#111111] border-border text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your wallpaper creation, mood, tools used..."
              className="mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tags (Comma Separated)</label>
            <Input
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="minimal, dark, 4k, neon, fog"
              className="mt-1 bg-[#111111] border-border text-white"
            />
          </div>

          {/* Premium & License Toggle */}
          <div className="rounded-2xl border border-border bg-[#111111] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-white text-sm flex items-center gap-1.5">
                  <Crown className="size-4 text-amber-300" /> Premium Wallpaper Access
                </span>
                <p className="text-xs text-muted-foreground">Restrict downloads to Premium subscribers</p>
              </div>
              <input
                type="checkbox"
                checked={isPremium}
                onChange={(e) => setIsPremium(e.target.checked)}
                className="size-5 rounded border-border text-[#7C3AED] focus:ring-0"
              />
            </div>

            {isPremium && (
              <div>
                <label className="text-xs text-muted-foreground">Standalone Price (Cents USD)</label>
                <Input
                  type="number"
                  value={priceCents}
                  onChange={(e) => setPriceCents(Number(e.target.value))}
                  className="mt-1 max-w-xs bg-[#1A1A1A] border-border text-white text-xs"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || !file}
            className="w-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-12 rounded-xl text-base shadow-[0_0_15px_rgba(124,58,237,0.4)]"
          >
            {loading ? "Extracting & Uploading..." : "Submit for Moderation Review"}
          </Button>
        </form>
      </div>
    </div>
  );
}