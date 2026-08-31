import { useState } from "react";
import { toast } from "sonner";
import { Flag, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

interface ReportModalProps {
  wallpaperId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const REPORT_REASONS = [
  "Copyright infringement / stolen content",
  "Inappropriate or adult content",
  "Spam, misleading tags or title",
  "Low quality or corrupted image",
  "Other violation",
];

export function ReportModal({ wallpaperId, open, onOpenChange }: ReportModalProps) {
  const { user } = useAuth();
  const [reason, setReason] = useState(REPORT_REASONS[0]);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return toast.error("Please sign in to submit a report");

    setLoading(true);
    try {
      const { error } = await supabase.from("reports").insert({
        wallpaper_id: wallpaperId,
        reporter_id: user.id,
        reason,
        details: details.trim() || undefined,
        status: "open",
      });

      if (error) throw error;
      toast.success("Thank you. Report submitted for admin moderation.");
      onOpenChange(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-border bg-[#1A1A1A] p-6 text-foreground shadow-2xl sm:rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-400">
            <Flag className="size-5" />
            <DialogTitle className="text-xl font-bold text-white">Report Content</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Help us maintain quality & copyright standards on Pixelvault.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Select Reason</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {REPORT_REASONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground">Additional Details (Optional)</label>
            <textarea
              rows={3}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Provide context or links if applicable..."
              className="mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium h-10 rounded-xl"
          >
            {loading ? "Submitting..." : "Submit Moderation Report"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
