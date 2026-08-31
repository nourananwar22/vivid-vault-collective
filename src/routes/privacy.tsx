import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Pixelvault" },
      { name: "description", content: "Privacy policy and data protection guidelines for Pixelvault users." },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white">Privacy Policy</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: August 31, 2026</p>

      <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white">1. Information Collection</h2>
          <p className="mt-2">
            Pixelvault collects essential account information (email, username, avatar) and anonymous telemetry to deliver wallpaper downloading and collection services.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">2. Data Security & Storage</h2>
          <p className="mt-2">
            Your data is stored securely using Supabase authentication with Row-Level Security (RLS) and 256-bit encryption.
          </p>
        </section>
      </div>
    </div>
  );
}
