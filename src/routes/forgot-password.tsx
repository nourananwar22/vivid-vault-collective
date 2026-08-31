import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { KeyRound, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Reset Password — Pixelvault" }],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address");

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setSent(true);
      toast.success("Password reset instructions sent to your email!");
    } catch (err: any) {
      toast.error(err.message || "Failed to request password reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-[#1A1A1A] p-8 shadow-2xl">
        <Link to="/login" className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white">
          <ArrowLeft className="size-3.5" /> Back to Sign In
        </Link>

        <div className="text-center">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED]">
            <KeyRound className="size-6" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Reset your password</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Enter your email and we'll send you instructions to reset your password.
          </p>
        </div>

        {sent ? (
          <div className="mt-6 rounded-xl border border-[#7C3AED]/30 bg-[#7C3AED]/10 p-4 text-center text-sm text-[#EDE9FE]">
            Check your inbox! We sent a password reset link to <strong className="text-white">{email}</strong>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Email address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-[#111111] border-border pl-10 text-white placeholder:text-muted-foreground"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-11 rounded-xl"
            >
              {loading ? "Sending link..." : "Send Reset Link"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
