import { toast } from "sonner";
import { Copy, Share2, Check } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ShareModalProps {
  title: string;
  url?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareModal({ title, url, open, onOpenChange }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const shareServices = [
    {
      name: "X (Twitter)",
      color: "bg-slate-800 hover:bg-slate-700",
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this wallpaper on Pixelvault: ${title}`)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Facebook",
      color: "bg-blue-700 hover:bg-blue-600",
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "WhatsApp",
      color: "bg-emerald-700 hover:bg-emerald-600",
      link: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out "${title}" on Pixelvault: ${shareUrl}`)}`,
    },
    {
      name: "LinkedIn",
      color: "bg-sky-800 hover:bg-sky-700",
      link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-[#1A1A1A] p-6 text-foreground shadow-2xl sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-[#7C3AED]">
            <Share2 className="size-5" />
            <DialogTitle className="text-xl font-bold text-white">Share Wallpaper</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Share "{title}" with your friends and community.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <Input readOnly value={shareUrl} className="bg-[#111111] border-border text-white text-xs" />
            <Button onClick={handleCopy} className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white shrink-0">
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {shareServices.map((s) => (
              <a
                key={s.name}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center rounded-xl p-2.5 text-xs font-medium text-white transition-colors ${s.color}`}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
