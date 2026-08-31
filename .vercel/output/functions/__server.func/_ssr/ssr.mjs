import { n as __exportAll } from "../_runtime.mjs";
import { t as Stripe } from "../_libs/stripe.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/index.js
var ssr_exports = /* @__PURE__ */ __exportAll({
	default: () => server_default,
	n: () => renderErrorPage,
	t: () => supabase
});
var lastCapturedError;
var TTL_MS = 5e3;
function record(error) {
	lastCapturedError = {
		error,
		at: Date.now()
	};
}
var CAUSE_DEPTH_LIMIT = 5;
var DESCRIPTION_LENGTH_LIMIT = 8e3;
function describeError(error) {
	const parts = [];
	let current = error;
	for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
		if (!(current instanceof Error)) {
			parts.push(typeof current === "string" ? current : safeStringify(current));
			break;
		}
		const label = depth === 0 ? "" : "caused by: ";
		const status = describeStatus(current);
		parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
		current = current.cause;
	}
	return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}
function describeStatus(error) {
	const { status, statusCode } = error;
	const value = status ?? statusCode;
	return typeof value === "number" ? ` (status ${value})` : "";
}
function safeStringify(value) {
	try {
		return JSON.stringify(value) ?? String(value);
	} catch {
		return String(value);
	}
}
function isErrorLike(value) {
	return value instanceof Error;
}
var originalConsoleError = console.error.bind(console);
console.error = (...args) => {
	originalConsoleError(...args.map((arg) => {
		if (!isErrorLike(arg)) return arg;
		record(arg);
		return describeError(arg);
	}));
};
if (typeof globalThis.addEventListener === "function") {
	globalThis.addEventListener("error", (event) => record(event.error ?? event));
	globalThis.addEventListener("unhandledrejection", (event) => record(event.reason));
}
function consumeLastCapturedError() {
	if (!lastCapturedError) return void 0;
	if (Date.now() - lastCapturedError.at > TTL_MS) {
		lastCapturedError = void 0;
		return;
	}
	const { error } = lastCapturedError;
	lastCapturedError = void 0;
	return error;
}
function renderErrorPage() {
	return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
var getStripeServer = () => {
	const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
	if (!stripeSecretKey) console.warn("[Stripe] Warning: STRIPE_SECRET_KEY environment variable is not configured.");
	return new Stripe(stripeSecretKey, { apiVersion: "2023-10-16" });
};
async function createStripeCheckoutSession(options) {
	const stripe = getStripeServer();
	const priceIdMonthly = process.env.STRIPE_PRICE_ID_MONTHLY || "price_monthly_sample";
	const priceIdAnnual = process.env.STRIPE_PRICE_ID_ANNUAL || "price_annual_sample";
	const priceId = options.billingCycle === "annual" ? priceIdAnnual : priceIdMonthly;
	return await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		mode: "subscription",
		client_reference_id: options.userId,
		customer_email: options.userEmail,
		line_items: [{
			price: priceId,
			quantity: 1
		}],
		metadata: {
			userId: options.userId,
			planId: options.planId,
			billingCycle: options.billingCycle
		},
		success_url: `${options.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: options.cancelUrl
	});
}
async function verifyStripeWebhookEvent(payload, signature) {
	const stripe = getStripeServer();
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";
	if (!webhookSecret) throw new Error("STRIPE_WEBHOOK_SECRET is missing. Cannot verify webhook signature.");
	return stripe.webhooks.constructEvent(payload, signature, webhookSecret);
}
function brokeredPreviewStorage() {
	if (typeof window === "undefined") return void 0;
	const host = location.hostname;
	const projectId = [
		"lovableproject.com",
		"lovableproject-dev.com",
		"lovable.app",
		"gpt-eng.com",
		"gptengineer.run"
	].some((z) => host === z || host.endsWith("." + z)) ? host.match(/* @__PURE__ */ new RegExp("^(?:id-preview(?:-[a-z0-9]+)?|project)--([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(?:-dev)?(?=\\.|$)", "i"))?.[1] ?? host.match(/* @__PURE__ */ new RegExp("^([0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})(?=[.-])", "i"))?.[1] : void 0;
	const framed = window.parent && window.parent !== window;
	if (!projectId || !framed) return localStorage;
	const dev = host.endsWith(".lovableproject-dev.com") || host.endsWith(".gpt-eng.com");
	const EDITOR = dev ? /^https:\/\/([a-z0-9-]+\.)*(lovable\.dev|gptengineer\.app)$|^http:\/\/localhost:3000$/ : /^https:\/\/([a-z0-9-]+\.)*(lovable\.dev|gptengineer\.app)$/;
	const ancestor = location.ancestorOrigins && location.ancestorOrigins[0] || (document.referrer ? new URL(document.referrer).origin : "");
	const editorOrigins = ancestor && EDITOR.test(ancestor) ? [ancestor] : dev ? ["https://lovable.dev", "http://localhost:3000"] : ["https://lovable.dev"];
	const RESULT = "lovable-preview-auth:result";
	const TIMEOUT = 2e3;
	const newId = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
	const request = (type, key, value) => new Promise((resolve) => {
		const requestId = newId();
		let done = false;
		let timer;
		const finish = (r) => {
			if (done) return;
			done = true;
			clearTimeout(timer);
			window.removeEventListener("message", onMessage);
			resolve(r);
		};
		const onMessage = (e) => {
			if (editorOrigins.indexOf(e.origin) < 0) return;
			const d = e.data;
			if (d && d.type === RESULT && d.requestId === requestId) finish(d);
		};
		window.addEventListener("message", onMessage);
		const msg = {
			type,
			requestId,
			projectId,
			key
		};
		if (value !== void 0) msg["value"] = value;
		for (const origin of editorOrigins) window.parent.postMessage(msg, origin);
		timer = setTimeout(() => finish(null), TIMEOUT);
	});
	let firstGet = true;
	const RETRY_DELAY = 250;
	return {
		getItem: async (key) => {
			let res = await request("lovable-preview-auth:get", key);
			if (!res && firstGet) {
				await new Promise((r) => setTimeout(r, RETRY_DELAY));
				res = await request("lovable-preview-auth:get", key);
			}
			firstGet = false;
			if (res && res.ok && typeof res.value === "string") {
				if (res.value === "") {
					localStorage.removeItem(key);
					return null;
				}
				return res.value;
			}
			return localStorage.getItem(key);
		},
		setItem: (key, value) => {
			localStorage.setItem(key, value);
			return request("lovable-preview-auth:set", key, value).then(() => void 0);
		},
		removeItem: (key) => {
			localStorage.removeItem(key);
			return request("lovable-preview-auth:remove", key).then(() => void 0);
		}
	};
}
function isNewSupabaseApiKey(value) {
	return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}
function createSupabaseFetch(supabaseKey) {
	return (input, init) => {
		const headers = new Headers(typeof Request !== "undefined" && input instanceof Request ? input.headers : void 0);
		if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
		if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) headers.delete("Authorization");
		headers.set("apikey", supabaseKey);
		return fetch(input, {
			...init,
			headers
		});
	};
}
function createSupabaseClient() {
	const SUPABASE_URL = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "chhqgplhfjvuvvocoxdu",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_swFLj7BISUUV44bk1OL_aA_gaznowpF",
		"VITE_SUPABASE_URL": "https://c--90fe8973-0ce8-45e5-a6c2-c5122ef4c8ca-prod.lovable.cloud"
	}["VITE_SUPABASE_URL"] || process.env["SUPABASE_URL"];
	const SUPABASE_PUBLISHABLE_KEY = {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_SUPABASE_PROJECT_ID": "chhqgplhfjvuvvocoxdu",
		"VITE_SUPABASE_PUBLISHABLE_KEY": "sb_publishable_swFLj7BISUUV44bk1OL_aA_gaznowpF",
		"VITE_SUPABASE_URL": "https://c--90fe8973-0ce8-45e5-a6c2-c5122ef4c8ca-prod.lovable.cloud"
	}["VITE_SUPABASE_PUBLISHABLE_KEY"] || process.env["SUPABASE_PUBLISHABLE_KEY"];
	if (!SUPABASE_URL || !SUPABASE_PUBLISHABLE_KEY) {
		const message = `Missing Supabase environment variable(s): ${[...!SUPABASE_URL ? ["SUPABASE_URL"] : [], ...!SUPABASE_PUBLISHABLE_KEY ? ["SUPABASE_PUBLISHABLE_KEY"] : []].join(", ")}. Connect Supabase in Lovable Cloud.`;
		console.error(`[Supabase] ${message}`);
		throw new Error(message);
	}
	return createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
		global: { fetch: createSupabaseFetch(SUPABASE_PUBLISHABLE_KEY) },
		auth: {
			storage: brokeredPreviewStorage(),
			persistSession: true,
			autoRefreshToken: true
		}
	});
}
var _supabase;
var supabase = new Proxy({}, { get(_, prop, receiver) {
	if (!_supabase) _supabase = createSupabaseClient();
	return Reflect.get(_supabase, prop, receiver);
} });
async function handleStripeWebhookEvent(event) {
	switch (event.type) {
		case "checkout.session.completed": {
			const session = event.data.object;
			const userId = session.client_reference_id || session.metadata?.userId;
			const customerId = session.customer;
			const subscriptionId = session.subscription;
			const paymentId = session.payment_intent || session.id;
			if (userId) {
				const { data: existingPayment } = await supabase.from("payments").select("id").eq("stripe_payment_id", paymentId).maybeSingle();
				if (!existingPayment && session.amount_total) await supabase.from("payments").insert({
					user_id: userId,
					amount_cents: session.amount_total,
					currency: session.currency?.toUpperCase() || "USD",
					status: "succeeded",
					stripe_payment_id: paymentId,
					payment_method: "stripe"
				}).catch((err) => console.error("Payment insert error:", err));
				await supabase.from("subscriptions").upsert({
					user_id: userId,
					status: "active",
					stripe_customer_id: customerId,
					stripe_subscription_id: subscriptionId,
					current_period_start: (/* @__PURE__ */ new Date()).toISOString(),
					current_period_end: new Date(Date.now() + 2592e6).toISOString(),
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}, { onConflict: "user_id" }).catch((err) => console.error("Subscription upsert error:", err));
			}
			break;
		}
		case "invoice.paid": {
			const invoice = event.data.object;
			const subscriptionId = invoice.subscription;
			const paymentId = invoice.payment_intent || invoice.id;
			invoice.customer;
			if (subscriptionId) {
				await supabase.from("subscriptions").update({
					status: "active",
					current_period_end: new Date(Date.now() + 2592e6).toISOString(),
					updated_at: (/* @__PURE__ */ new Date()).toISOString()
				}).eq("stripe_subscription_id", subscriptionId).catch((err) => console.error("Invoice update error:", err));
				const { data: existingPayment } = await supabase.from("payments").select("id").eq("stripe_payment_id", paymentId).maybeSingle();
				if (!existingPayment && invoice.amount_paid) {
					const { data: sub } = await supabase.from("subscriptions").select("user_id").eq("stripe_subscription_id", subscriptionId).maybeSingle();
					if (sub?.user_id) await supabase.from("payments").insert({
						user_id: sub.user_id,
						amount_cents: invoice.amount_paid,
						currency: invoice.currency?.toUpperCase() || "USD",
						status: "succeeded",
						stripe_payment_id: paymentId,
						payment_method: "stripe_recurring"
					}).catch((err) => console.error("Recurring payment record error:", err));
				}
			}
			break;
		}
		case "invoice.payment_failed": {
			const subscriptionId = event.data.object.subscription;
			if (subscriptionId) await supabase.from("subscriptions").update({
				status: "past_due",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("stripe_subscription_id", subscriptionId).catch((err) => console.error("Payment failure update error:", err));
			break;
		}
		case "customer.subscription.deleted": {
			const sub = event.data.object;
			await supabase.from("subscriptions").update({
				status: "canceled",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("stripe_subscription_id", sub.id).catch((err) => console.error("Subscription cancellation error:", err));
			break;
		}
		default: console.log(`[Stripe Webhook] Handled event type: ${event.type}`);
	}
}
var serverEntryPromise;
async function getServerEntry() {
	if (!serverEntryPromise) serverEntryPromise = import("./server-Bq-RTVzE.mjs").then((m) => m.default ?? m);
	return serverEntryPromise;
}
async function normalizeCatastrophicSsrResponse(response) {
	if (response.status < 500) return response;
	if (!(response.headers.get("content-type") ?? "").includes("application/json")) return response;
	const body = await response.clone().text();
	if (!isH3SwallowedErrorBody(body)) return response;
	console.error(consumeLastCapturedError() ?? /* @__PURE__ */ new Error(`h3 swallowed SSR error: ${body}`));
	return new Response(renderErrorPage(), {
		status: 500,
		headers: { "content-type": "text/html; charset=utf-8" }
	});
}
function isH3SwallowedErrorBody(body) {
	try {
		const payload = JSON.parse(body);
		return payload.unhandled === true && payload.message === "HTTPError";
	} catch {
		return false;
	}
}
var server_default = { async fetch(request, env, ctx) {
	const url = new URL(request.url);
	if (url.pathname === "/api/stripe-webhook" && request.method === "POST") {
		const signature = request.headers.get("stripe-signature");
		if (!signature) return new Response(JSON.stringify({ error: "Missing stripe-signature header." }), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		try {
			await handleStripeWebhookEvent(await verifyStripeWebhookEvent(await request.text(), signature));
			return new Response(JSON.stringify({ received: true }), {
				status: 200,
				headers: { "content-type": "application/json" }
			});
		} catch (err) {
			console.error("[Stripe Webhook Error]:", err.message);
			return new Response(JSON.stringify({ error: `Webhook Verification Failed: ${err.message}` }), {
				status: 400,
				headers: { "content-type": "application/json" }
			});
		}
	}
	if (url.pathname === "/api/stripe-checkout" && request.method === "POST") try {
		const { userId, userEmail, planId, billingCycle, origin } = await request.json() || {};
		if (!userId || !userEmail) return new Response(JSON.stringify({ error: "Missing required user session fields." }), {
			status: 400,
			headers: { "content-type": "application/json" }
		});
		const baseUrl = origin || url.origin || "https://pixelvault.app";
		const session = await createStripeCheckoutSession({
			userId,
			userEmail,
			planId: planId === "studio" ? "studio" : "premium",
			billingCycle: billingCycle === "annual" ? "annual" : "monthly",
			successUrl: `${baseUrl}/dashboard`,
			cancelUrl: `${baseUrl}/pricing`
		});
		return new Response(JSON.stringify({
			url: session.url,
			sessionId: session.id
		}), {
			status: 200,
			headers: { "content-type": "application/json" }
		});
	} catch (err) {
		console.error("[Stripe Checkout API Error]:", err.message);
		return new Response(JSON.stringify({ error: err.message || "Failed to create checkout session." }), {
			status: 500,
			headers: { "content-type": "application/json" }
		});
	}
	try {
		return await normalizeCatastrophicSsrResponse(await (await getServerEntry()).fetch(request, env, ctx));
	} catch (error) {
		console.error(error);
		return new Response(renderErrorPage(), {
			status: 500,
			headers: { "content-type": "text/html; charset=utf-8" }
		});
	}
} };
//#endregion
export { ssr_exports as n, supabase as r, renderErrorPage as t };
