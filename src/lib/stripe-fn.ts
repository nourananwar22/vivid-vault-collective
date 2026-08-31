import { createServerFn } from "@tanstack/react-start";
import { createStripeCheckoutSession, verifyStripeWebhookEvent } from "@/lib/stripe";
import { handleStripeWebhookEvent } from "@/lib/stripe-webhook";

export const createCheckoutSessionFn = createServerFn()
  .validator((data: { userId: string; userEmail: string; planId: "premium" | "studio"; billingCycle: "monthly" | "annual"; origin?: string }) => data)
  .handler(async ({ data }) => {
    const session = await createStripeCheckoutSession({
      userId: data.userId,
      userEmail: data.userEmail,
      planId: data.planId,
      billingCycle: data.billingCycle,
      successUrl: `${data.origin || "https://pixelvault.app"}/dashboard`,
      cancelUrl: `${data.origin || "https://pixelvault.app"}/pricing`,
    });

    return { url: session.url, sessionId: session.id };
  });

export const processStripeWebhookFn = createServerFn()
  .validator((data: { rawBody: string; signature: string }) => data)
  .handler(async ({ data }) => {
    const event = await verifyStripeWebhookEvent(data.rawBody, data.signature);
    await handleStripeWebhookEvent(event);
    return { received: true };
  });
