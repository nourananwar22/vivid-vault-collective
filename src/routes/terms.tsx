import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Pixelvault" },
      { name: "description", content: "Terms of service and usage conditions for the Pixelvault platform." },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-4xl font-bold text-white">Terms of Service</h1>
      <p className="mt-2 text-xs text-muted-foreground">Last updated: August 31, 2026</p>

      <div className="mt-8 space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using Pixelvault, you agree to be bound by these Terms of Service and all applicable laws and regulations.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">2. User Accounts & Responsibilities</h2>
          <p className="mt-2">
            You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white">3. Content Submissions & Moderation</h2>
          <p className="mt-2">
            Creators retain ownership of original uploaded works. Submitting content grants Pixelvault a worldwide, non-exclusive license to host and distribute the media. All submissions undergo admin moderation before public listing.
          </p>
        </section>
      </div>
    </div>
  );
}
