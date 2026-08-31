import { createFileRoute } from "@tanstack/react-router";
import { Flag } from "lucide-react";

export const Route = createFileRoute("/copyright")({
  head: () => ({
    meta: [
      { title: "Copyright & DMCA Policy — Pixelvault" },
      { name: "description", content: "Copyright protection and DMCA takedown notice guidelines for Pixelvault." },
    ],
    links: [{ rel: "canonical", href: "/copyright" }],
  }),
  component: CopyrightPage,
});

function CopyrightPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white flex items-center gap-2">
        <Flag className="size-8 text-amber-400" /> DMCA & Copyright Policy
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">Protecting creators' intellectual property rights on Pixelvault.</p>

      <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white">Copyright Protection</h2>
          <p className="mt-2">
            Pixelvault respects intellectual property rights. If you believe content hosted on Pixelvault infringes your copyright, you may submit a takedown request through our report workflow or by contacting support@pixelvault.com.
          </p>
        </section>
      </div>
    </div>
  );
}
