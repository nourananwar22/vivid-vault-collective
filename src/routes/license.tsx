import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Check } from "lucide-react";

export const Route = createFileRoute("/license")({
  head: () => ({
    meta: [
      { title: "License Information — Pixelvault" },
      { name: "description", content: "Details on Pixelvault Free & Commercial Wallpaper Licenses." },
    ],
    links: [{ rel: "canonical", href: "/license" }],
  }),
  component: LicensePage,
});

function LicensePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white flex items-center gap-2">
        <ShieldCheck className="size-9 text-[#7C3AED]" /> Pixelvault Licensing
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Clear, flexible licensing for personal & commercial use.</p>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-[#1A1A1A] p-6 space-y-4">
          <h2 className="text-xl font-bold text-white">Pixelvault Free License</h2>
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex gap-2"><Check className="size-4 text-emerald-400 shrink-0" /> Allowed for personal wallpaper & desktop use</li>
            <li className="flex gap-2"><Check className="size-4 text-emerald-400 shrink-0" /> Free non-commercial digital projects</li>
            <li className="flex gap-2"><Check className="size-4 text-emerald-400 shrink-0" /> No attribution strictly required</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#7C3AED] bg-[#1A1A1A] p-6 space-y-4 shadow-[0_0_20px_rgba(124,58,237,0.2)]">
          <h2 className="text-xl font-bold text-white">Pixelvault Commercial Pass</h2>
          <ul className="space-y-3 text-xs text-muted-foreground">
            <li className="flex gap-2"><Check className="size-4 text-[#7C3AED] shrink-0" /> Unlimited commercial client work</li>
            <li className="flex gap-2"><Check className="size-4 text-[#7C3AED] shrink-0" /> Advertising, apps, websites & print media</li>
            <li className="flex gap-2"><Check className="size-4 text-[#7C3AED] shrink-0" /> Full resolution 4K & 8K original files</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
