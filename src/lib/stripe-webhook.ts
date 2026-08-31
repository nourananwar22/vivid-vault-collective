import type Stripe from "stripe";
import { supabase } from "@/lib/supabase";

export async function handleStripeWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id || session.metadata?.userId;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const paymentId = (session.payment_intent as string) || session.id;

      if (userId) {
        // Idempotency check: check if payment already recorded
        const { data: existingPayment } = await supabase
          .from("payments")
          .select("id")
          .eq("stripe_payment_id", paymentId)
          .maybeSingle();

        if (!existingPayment && session.amount_total) {
          await supabase.from("payments").insert({
            user_id: userId,
            amount_cents: session.amount_total,
            currency: session.currency?.toUpperCase() || "USD",
            status: "succeeded",
            stripe_payment_id: paymentId,
            payment_method: "stripe",
          }).catch((err) => console.error("Payment insert error:", err));
        }

        // Upsert active subscription idempotently
        await supabase.from("subscriptions").upsert(
          {
            user_id: userId,
            status: "active",
            stripe_customer_id: customerId,
            stripe_subscription_id: subscriptionId,
            current_period_start: new Date().toISOString(),
            current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        ).catch((err) => console.error("Subscription upsert error:", err));
      }
      break;
    }

    case "invoice.paid": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;
      const paymentId = (invoice.payment_intent as string) || invoice.id;
      const customerId = invoice.customer as string;

      if (subscriptionId) {
        // Update subscription end date
        await supabase
          .from("subscriptions")
          .update({
            status: "active",
            current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscriptionId)
          .catch((err) => console.error("Invoice update error:", err));

        // Record recurring payment idempotently
        const { data: existingPayment } = await supabase
          .from("payments")
          .select("id")
          .eq("stripe_payment_id", paymentId)
          .maybeSingle();

        if (!existingPayment && invoice.amount_paid) {
          // Find user ID from subscription
          const { data: sub } = await supabase
            .from("subscriptions")
            .select("user_id")
            .eq("stripe_subscription_id", subscriptionId)
            .maybeSingle();

          if (sub?.user_id) {
            await supabase.from("payments").insert({
              user_id: sub.user_id,
              amount_cents: invoice.amount_paid,
              currency: invoice.currency?.toUpperCase() || "USD",
              status: "succeeded",
              stripe_payment_id: paymentId,
              payment_method: "stripe_recurring",
            }).catch((err) => console.error("Recurring payment record error:", err));
          }
        }
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;
      if (subscriptionId) {
        await supabase
          .from("subscriptions")
          .update({
            status: "past_due",
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", subscriptionId)
          .catch((err) => console.error("Payment failure update error:", err));
      }
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", sub.id)
        .catch((err) => console.error("Subscription cancellation error:", err));
      break;
    }

    default:
      console.log(`[Stripe Webhook] Handled event type: ${event.type}`);
  }
}
