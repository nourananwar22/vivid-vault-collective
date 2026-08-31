import Stripe from "stripe";

// Initialize Stripe instance on server using environment variables
export const getStripeServer = () => {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY || import.meta.env.VITE_STRIPE_SECRET_KEY || "";
  if (!stripeSecretKey) {
    console.warn("[Stripe] Warning: STRIPE_SECRET_KEY environment variable is not configured.");
  }
  return new Stripe(stripeSecretKey, {
    apiVersion: "2023-10-16" as any,
  });
};

export interface CreateCheckoutSessionOptions {
  userId: string;
  userEmail: string;
  planId: "premium" | "studio";
  billingCycle: "monthly" | "annual";
  successUrl: string;
  cancelUrl: string;
}

export async function createStripeCheckoutSession(options: CreateCheckoutSessionOptions) {
  const stripe = getStripeServer();

  // Price ID lookup from environment variables
  const priceIdMonthly = process.env.STRIPE_PRICE_ID_MONTHLY || import.meta.env.VITE_STRIPE_PRICE_ID_MONTHLY || "price_monthly_sample";
  const priceIdAnnual = process.env.STRIPE_PRICE_ID_ANNUAL || import.meta.env.VITE_STRIPE_PRICE_ID_ANNUAL || "price_annual_sample";

  const priceId = options.billingCycle === "annual" ? priceIdAnnual : priceIdMonthly;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    client_reference_id: options.userId,
    customer_email: options.userEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId: options.userId,
      planId: options.planId,
      billingCycle: options.billingCycle,
    },
    success_url: `${options.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: options.cancelUrl,
  });

  return session;
}

export async function verifyStripeWebhookEvent(payload: string | Buffer, signature: string) {
  const stripe = getStripeServer();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || import.meta.env.VITE_STRIPE_WEBHOOK_SECRET || "";

  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is missing. Cannot verify webhook signature.");
  }

  return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
