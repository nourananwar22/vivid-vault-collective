import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { verifyStripeWebhookEvent, createStripeCheckoutSession } from "./lib/stripe";
import { handleStripeWebhookEvent } from "./lib/stripe-webhook";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    // =========================================================================
    // EXPLICIT PUBLIC HTTP POST ENDPOINT: /api/stripe-webhook
    // Receives raw unparsed body directly from Stripe for cryptographic verification
    // =========================================================================
    if (url.pathname === "/api/stripe-webhook" && request.method === "POST") {
      const signature = request.headers.get("stripe-signature");

      if (!signature) {
        return new Response(JSON.stringify({ error: "Missing stripe-signature header." }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }

      try {
        // 1. Get raw unparsed text body for cryptographic signature matching
        const rawBody = await request.text();

        // 2. Verify signature against STRIPE_WEBHOOK_SECRET
        const event = await verifyStripeWebhookEvent(rawBody, signature);

        // 3. Process event with database idempotency protection
        await handleStripeWebhookEvent(event);

        // 4. Return 200 OK to Stripe
        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      } catch (err: any) {
        console.error("[Stripe Webhook Error]:", err.message);
        return new Response(JSON.stringify({ error: `Webhook Verification Failed: ${err.message}` }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
    }

    // =========================================================================
    // EXPLICIT PUBLIC HTTP POST ENDPOINT: /api/stripe-checkout
    // Creates Stripe Checkout Sessions for membership upgrades
    // =========================================================================
    if (url.pathname === "/api/stripe-checkout" && request.method === "POST") {
      try {
        const body = (await request.json()) as any;
        const { userId, userEmail, planId, billingCycle, origin } = body || {};

        if (!userId || !userEmail) {
          return new Response(JSON.stringify({ error: "Missing required user session fields." }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const baseUrl = origin || url.origin || "https://pixelvault.app";

        const session = await createStripeCheckoutSession({
          userId,
          userEmail,
          planId: planId === "studio" ? "studio" : "premium",
          billingCycle: billingCycle === "annual" ? "annual" : "monthly",
          successUrl: `${baseUrl}/dashboard`,
          cancelUrl: `${baseUrl}/pricing`,
        });

        return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      } catch (err: any) {
        console.error("[Stripe Checkout API Error]:", err.message);
        return new Response(JSON.stringify({ error: err.message || "Failed to create checkout session." }), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }
    }

    // Standard TanStack Start SSR handler
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
