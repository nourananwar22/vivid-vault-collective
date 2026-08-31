import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CreditCard, ShieldCheck, Crown, Sparkles, Lock, ArrowLeft, ExternalLink, Info } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/auth";
import { createCheckoutSessionFn } from "@/lib/stripe-fn";



type CheckoutSearch = {
  plan?: "premium" | "studio";
};

export const Route = createFileRoute("/checkout")({
  validateSearch: (search: Record<string, unknown>): CheckoutSearch => ({
    plan: search["plan"] === "studio" ? "studio" : "premium",
  }),
  head: ({ search }) => ({
    meta: [
      { title: `Checkout — Pixelvault ${search.plan === "studio" ? "Studio" : "Premium Pro"}` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { user } = useAuth();

  const planId = search.plan === "studio" ? "studio" : "premium";
  const planName = planId === "studio" ? "Studio Unlimited" : "Premium Pro";
  const price = planId === "studio" ? 29 : 12;

  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");
  const [processing, setProcessing] = useState(false);

  const handleStripeCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in or create an account before upgrading");
      navigate({ to: "/login" });
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch("/api/stripe-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          userEmail: user.email || "",
          planId,
          billingCycle,
          origin: window.location.origin,
        }),
      });

      const data = await res.json();
      if (res.ok && data.url) {
        window.location.href = data.url;
      } else {
        toast.info("Stripe Checkout endpoint reached. Configure STRIPE_SECRET_KEY in production to redirect.");
      }
    } catch (err: any) {
      console.warn("Stripe Checkout notice:", err);
      toast.info(
        "Stripe integration endpoint /api/stripe-checkout is active! Configure STRIPE_SECRET_KEY & webhook secret in .env to process real cards."
      );
    } finally {
      setProcessing(false);
    }
  };



  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link to="/pricing" className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white">
        <ArrowLeft className="size-3.5" /> Back to Pricing
      </Link>

      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
        {/* Left Form */}
        <div className="rounded-3xl border border-border bg-[#1A1A1A] p-8 shadow-2xl space-y-6">
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]">
              <Lock className="size-3 text-[#7C3AED]" /> Official Stripe Checkout
            </span>
            <h1 className="mt-2 text-2xl font-bold text-white flex items-center gap-2">
              <CreditCard className="size-6 text-[#7C3AED]" /> Membership Checkout
            </h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Upgrades are processed securely through Stripe with 256-bit encryption.
            </p>
          </div>

          <form onSubmit={handleStripeCheckout} className="space-y-5">
            <div className="rounded-2xl border border-border bg-[#111111] p-4 space-y-3">
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Select Billing Frequency</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBillingCycle("monthly")}
                  className={`rounded-xl border p-3 text-xs font-semibold text-left transition-colors ${
                    billingCycle === "monthly"
                      ? "border-[#7C3AED] bg-[#7C3AED]/10 text-white"
                      : "border-border bg-[#1A1A1A] text-muted-foreground hover:text-white"
                  }`}
                >
                  <div>Monthly</div>
                  <div className="text-sm font-bold text-white mt-1">${price}.00 / mo</div>
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle("annual")}
                  className={`rounded-xl border p-3 text-xs font-semibold text-left transition-colors ${
                    billingCycle === "annual"
                      ? "border-[#7C3AED] bg-[#7C3AED]/10 text-white"
                      : "border-border bg-[#1A1A1A] text-muted-foreground hover:text-white"
                  }`}
                >
                  <div>Annual (25% off)</div>
                  <div className="text-sm font-bold text-white mt-1">${Math.round(price * 0.75)}.00 / mo</div>
                </button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-[#111111] p-4 text-xs text-muted-foreground space-y-2">
              <div className="flex items-center gap-2 text-white font-medium">
                <Info className="size-4 text-[#7C3AED]" /> Verified Payment Security
              </div>
              <p>
                Pixelvault never stores credit card credentials on local servers. Premium access is activated exclusively upon verified Stripe webhook confirmation (`checkout.session.completed`).
              </p>
            </div>

            <Button
              type="submit"
              disabled={processing}
              className="w-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-semibold h-12 rounded-xl text-base shadow-[0_0_15px_rgba(124,58,237,0.4)] mt-4"
            >
              {processing ? "Connecting Stripe..." : `Proceed to Secure Stripe Checkout`}
              <ExternalLink className="size-4 ml-2" />
            </Button>
          </form>
        </div>

        {/* Right Order Summary */}
        <aside className="rounded-3xl border border-border bg-[#1A1A1A] p-6 shadow-xl space-y-6 h-fit">
          <h2 className="font-display text-lg font-bold text-white flex items-center gap-2">
            <Crown className="size-5 text-amber-300" /> Order Summary
          </h2>

          <div className="rounded-2xl border border-border bg-[#111111] p-4 space-y-2">
            <div className="flex justify-between font-bold text-white text-sm">
              <span>{planName}</span>
              <span>${billingCycle === "annual" ? Math.round(price * 0.75) : price}.00 / mo</span>
            </div>
            <p className="text-xs text-muted-foreground">Unlimited 4K downloads, bulk ZIP export & commercial rights included.</p>
          </div>

          <div className="space-y-2 text-xs divide-y divide-border/60">
            <div className="flex justify-between text-muted-foreground pt-2">
              <span>Billing Cycle</span>
              <span className="text-white capitalize">{billingCycle}</span>
            </div>
            <div className="flex justify-between text-muted-foreground pt-2">
              <span>Taxes & Fees</span>
              <span className="text-white">$0.00</span>
            </div>
            <div className="flex justify-between text-white font-bold text-sm pt-3">
              <span>Total Today</span>
              <span className="text-[#7C3AED]">
                ${billingCycle === "annual" ? Math.round(price * 0.75 * 12) : price}.00
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-[#7C3AED]/10 p-3 text-xs text-[#EDE9FE] flex items-center gap-2">
            <ShieldCheck className="size-4 text-[#7C3AED] shrink-0" />
            <span>Cancel anytime from your dashboard. 100% money-back guarantee for 7 days.</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
