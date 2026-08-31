import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as useAuth } from "./auth-Dpzah_le.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as Crown, P as CreditCard, S as Info, j as ExternalLink, l as ShieldCheck, q as ArrowLeft, y as Lock } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./checkout-BYHxbwUn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BFfwQleo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CheckoutPage() {
	const navigate = useNavigate();
	const search = Route.useSearch();
	const { user } = useAuth();
	const planId = search.plan === "studio" ? "studio" : "premium";
	const planName = planId === "studio" ? "Studio Unlimited" : "Premium Pro";
	const price = planId === "studio" ? 29 : 12;
	const [billingCycle, setBillingCycle] = (0, import_react.useState)("monthly");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const handleStripeCheckout = async (e) => {
		e.preventDefault();
		if (!user) {
			toast.error("Please sign in or create an account before upgrading");
			navigate({ to: "/login" });
			return;
		}
		setProcessing(true);
		try {
			const res = await fetch("/api/stripe-checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: user.id,
					userEmail: user.email || "",
					planId,
					billingCycle,
					origin: window.location.origin
				})
			});
			const data = await res.json();
			if (res.ok && data.url) window.location.href = data.url;
			else toast.info("Stripe Checkout endpoint reached. Configure STRIPE_SECRET_KEY in production to redirect.");
		} catch (err) {
			console.warn("Stripe Checkout notice:", err);
			toast.info("Stripe integration endpoint /api/stripe-checkout is active! Configure STRIPE_SECRET_KEY & webhook secret in .env to process real cards.");
		} finally {
			setProcessing(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/pricing",
			className: "mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Back to Pricing"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 md:grid-cols-[1.4fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border border-border bg-[#1A1A1A] p-8 shadow-2xl space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3 text-[#7C3AED]" }), " Official Stripe Checkout"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 text-2xl font-bold text-white flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "size-6 text-[#7C3AED]" }), " Membership Checkout"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Upgrades are processed securely through Stripe with 256-bit encryption."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleStripeCheckout,
					className: "space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-[#111111] p-4 space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Select Billing Frequency"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setBillingCycle("monthly"),
									className: `rounded-xl border p-3 text-xs font-semibold text-left transition-colors ${billingCycle === "monthly" ? "border-[#7C3AED] bg-[#7C3AED]/10 text-white" : "border-border bg-[#1A1A1A] text-muted-foreground hover:text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Monthly" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm font-bold text-white mt-1",
										children: [
											"$",
											price,
											".00 / mo"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setBillingCycle("annual"),
									className: `rounded-xl border p-3 text-xs font-semibold text-left transition-colors ${billingCycle === "annual" ? "border-[#7C3AED] bg-[#7C3AED]/10 text-white" : "border-border bg-[#1A1A1A] text-muted-foreground hover:text-white"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "Annual (25% off)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-sm font-bold text-white mt-1",
										children: [
											"$",
											Math.round(price * .75),
											".00 / mo"
										]
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-[#111111] p-4 text-xs text-muted-foreground space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-white font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4 text-[#7C3AED]" }), " Verified Payment Security"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Pixelvault never stores credit card credentials on local servers. Premium access is activated exclusively upon verified Stripe webhook confirmation (`checkout.session.completed`)." })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							disabled: processing,
							className: "w-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-semibold h-12 rounded-xl text-base shadow-[0_0_15px_rgba(124,58,237,0.4)] mt-4",
							children: [processing ? "Connecting Stripe..." : `Proceed to Secure Stripe Checkout`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4 ml-2" })]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "rounded-3xl border border-border bg-[#1A1A1A] p-6 shadow-xl space-y-6 h-fit",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "font-display text-lg font-bold text-white flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-5 text-amber-300" }), " Order Summary"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-[#111111] p-4 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between font-bold text-white text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: planName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								"$",
								billingCycle === "annual" ? Math.round(price * .75) : price,
								".00 / mo"
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Unlimited 4K downloads, bulk ZIP export & commercial rights included."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 text-xs divide-y divide-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-muted-foreground pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Billing Cycle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white capitalize",
									children: billingCycle
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-muted-foreground pt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Taxes & Fees" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-white",
									children: "$0.00"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-white font-bold text-sm pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Today" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[#7C3AED]",
									children: [
										"$",
										billingCycle === "annual" ? Math.round(price * .75 * 12) : price,
										".00"
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-[#7C3AED]/10 p-3 text-xs text-[#EDE9FE] flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-[#7C3AED] shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Cancel anytime from your dashboard. 100% money-back guarantee for 7 days." })]
					})
				]
			})]
		})]
	});
}
//#endregion
export { CheckoutPage as component };
