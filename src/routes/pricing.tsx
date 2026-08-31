import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Sparkles, Crown, Zap, HelpCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Premium Wallpaper Membership | Pixelvault" },
      {
        name: "description",
        content:
          "Free explorer plan or premium membership for unlimited 4K and bulk ZIP downloads with commercial license.",
      },
      { property: "og:title", content: "Pricing — Pixelvault Membership" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      id: "free",
      name: "Free Explorer",
      price: "$0",
      cadence: "forever",
      description: "Essential access to high quality free wallpapers",
      features: [
        "15,000+ free wallpapers",
        "HD & Full HD resolution downloads",
        "10 downloads per day limit",
        "Favorites & 1 custom collection",
        "Standard personal license",
      ],
      cta: "Current Plan",
      to: "/register",
      highlighted: false,
    },
    {
      id: "premium",
      name: "Premium Pro",
      price: annual ? "$9" : "$12",
      cadence: annual ? "per month, billed annually" : "per month",
      description: "Unlimited 4K/8K downloads & one-click bulk ZIP export",
      features: [
        "Unlimited downloads across 26,000+ wallpapers",
        "Original 4K, 8K & Ultrawide resolutions",
        "One-click Bulk ZIP downloads",
        "Unlimited personal & public collections",
        "Commercial & monetization license included",
        "Ad-free experience",
        "Priority creator & support access",
      ],
      cta: "Go Premium Pro",
      to: "/checkout",
      search: { plan: "premium" },
      highlighted: true,
    },
    {
      id: "studio",
      name: "Studio Unlimited",
      price: annual ? "$22" : "$29",
      cadence: annual ? "per month, billed annually" : "per month",
      description: "Built for agencies, design teams & commercial studios",
      features: [
        "Everything in Premium Pro",
        "5 team member seats",
        "Extended commercial reseller rights",
        "API access & batch automated export",
        "Custom wallpaper requests from top creators",
        "Dedicated account manager",
      ],
      cta: "Get Studio Pass",
      to: "/checkout",
      search: { plan: "studio" },
      highlighted: false,
    },
  ];

  const faqs = [
    {
      q: "Can I use downloaded wallpapers commercially?",
      a: "Yes! All wallpapers downloaded on Premium Pro and Studio plans include a full commercial license, allowing use in client projects, ads, and digital media without attribution.",
    },
    {
      q: "How does the Bulk ZIP download work?",
      a: "As a Premium member, you can select any number of wallpapers across search results or open any collection and hit 'Download Collection ZIP'. Our system packages high-res files into a single ZIP archive instantly.",
    },
    {
      q: "Can I cancel my membership anytime?",
      a: "Absolutely. You can manage or cancel your subscription anytime directly from your user dashboard with one click.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      {/* Header section */}
      <div className="text-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3.5 py-1 text-xs font-semibold text-[#EDE9FE]">
          <Sparkles className="size-3.5 text-[#7C3AED]" /> Flexible Memberships
        </span>
        <h1 className="mt-4 font-display text-4xl font-bold text-white sm:text-5xl">
          Wallpapers without <span className="text-gradient">limits</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          Start free, or upgrade to unlock unlimited 4K downloads, bulk ZIP exports, and commercial licensing rights.
        </p>

        {/* Annual Billing Toggle */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <span className={`text-xs ${!annual ? "text-white font-semibold" : "text-muted-foreground"}`}>Monthly Billing</span>
          <button
            type="button"
            onClick={() => setAnnual(!annual)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              annual ? "bg-[#7C3AED]" : "bg-border"
            }`}
          >
            <span className={`inline-block size-4 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : "translate-x-1"}`} />
          </button>
          <span className={`text-xs ${annual ? "text-white font-semibold" : "text-muted-foreground"}`}>
            Annual Billing <span className="rounded bg-[#7C3AED]/20 px-1.5 py-0.5 text-[10px] text-[#EDE9FE] font-bold">SAVE 25%</span>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={
              plan.highlighted
                ? "relative rounded-3xl border-2 border-[#7C3AED] bg-[#1A1A1A] p-8 shadow-[0_0_30px_rgba(124,58,237,0.3)] flex flex-col justify-between"
                : "relative rounded-3xl border border-border bg-[#1A1A1A] p-8 shadow-xl flex flex-col justify-between"
            }
          >
            {plan.highlighted && (
              <Badge className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white font-semibold shadow-md px-3 py-0.5">
                <Crown className="size-3 mr-1 text-amber-300" /> Most Popular
              </Badge>
            )}

            <div>
              <h2 className="font-display text-xl font-bold text-white">{plan.name}</h2>
              <p className="mt-1 text-xs text-muted-foreground">{plan.description}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-xs text-muted-foreground">{plan.cadence}</span>
              </div>

              <ul className="mt-8 space-y-3.5 text-xs">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2.5 items-start">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#7C3AED]" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Button
              asChild
              className={
                plan.highlighted
                  ? "mt-8 w-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-semibold h-11 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                  : "mt-8 w-full border border-border bg-[#111111] hover:bg-secondary text-white font-medium h-11 rounded-xl"
              }
            >
              <Link to={plan.to as any} search={plan.search as any}>
                {plan.cta}
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-20 border-t border-border pt-16">
        <h2 className="text-center font-display text-2xl font-bold text-white flex items-center justify-center gap-2">
          <HelpCircle className="size-6 text-[#7C3AED]" /> Frequently Asked Questions
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-2xl border border-border bg-[#1A1A1A] p-6">
              <h3 className="font-bold text-white text-sm">{faq.q}</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
