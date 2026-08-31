import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { N as Crown, W as Check, o as Sparkles, z as CircleQuestionMark } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-CnJycQ9p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PricingPage() {
	const [annual, setAnnual] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3.5 py-1 text-xs font-semibold text-[#EDE9FE]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-[#7C3AED]" }), " Flexible Memberships"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-4 font-display text-4xl font-bold text-white sm:text-5xl",
						children: ["Wallpapers without ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-gradient",
							children: "limits"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base",
						children: "Start free, or upgrade to unlock unlimited 4K downloads, bulk ZIP exports, and commercial licensing rights."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex items-center justify-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-xs ${!annual ? "text-white font-semibold" : "text-muted-foreground"}`,
								children: "Monthly Billing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAnnual(!annual),
								className: `relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${annual ? "bg-[#7C3AED]" : "bg-border"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `inline-block size-4 rounded-full bg-white transition-transform ${annual ? "translate-x-6" : "translate-x-1"}` })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `text-xs ${annual ? "text-white font-semibold" : "text-muted-foreground"}`,
								children: ["Annual Billing ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-[#7C3AED]/20 px-1.5 py-0.5 text-[10px] text-[#EDE9FE] font-bold",
									children: "SAVE 25%"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: [
					{
						id: "free",
						name: "Free Explorer",
						price: "$0",
						cadence: "forever",
						description: "Essential access to high quality free wallpapers",
						features: [
							"15,000+ free wallpapers",
							"HD & Full HD resolution downloads",
							"10 downloads per day limit",
							"Favorites & 1 custom collection",
							"Standard personal license"
						],
						cta: "Current Plan",
						to: "/register",
						highlighted: false
					},
					{
						id: "premium",
						name: "Premium Pro",
						price: annual ? "$9" : "$12",
						cadence: annual ? "per month, billed annually" : "per month",
						description: "Unlimited 4K/8K downloads & one-click bulk ZIP export",
						features: [
							"Unlimited downloads across 26,000+ wallpapers",
							"Original 4K, 8K & Ultrawide resolutions",
							"One-click Bulk ZIP downloads",
							"Unlimited personal & public collections",
							"Commercial & monetization license included",
							"Ad-free experience",
							"Priority creator & support access"
						],
						cta: "Go Premium Pro",
						to: "/checkout",
						search: { plan: "premium" },
						highlighted: true
					},
					{
						id: "studio",
						name: "Studio Unlimited",
						price: annual ? "$22" : "$29",
						cadence: annual ? "per month, billed annually" : "per month",
						description: "Built for agencies, design teams & commercial studios",
						features: [
							"Everything in Premium Pro",
							"5 team member seats",
							"Extended commercial reseller rights",
							"API access & batch automated export",
							"Custom wallpaper requests from top creators",
							"Dedicated account manager"
						],
						cta: "Get Studio Pass",
						to: "/checkout",
						search: { plan: "studio" },
						highlighted: false
					}
				].map((plan) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: plan.highlighted ? "relative rounded-3xl border-2 border-[#7C3AED] bg-[#1A1A1A] p-8 shadow-[0_0_30px_rgba(124,58,237,0.3)] flex flex-col justify-between" : "relative rounded-3xl border border-border bg-[#1A1A1A] p-8 shadow-xl flex flex-col justify-between",
					children: [
						plan.highlighted && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white font-semibold shadow-md px-3 py-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3 mr-1 text-amber-300" }), " Most Popular"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-bold text-white",
								children: plan.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: plan.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-baseline gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-4xl font-extrabold text-white",
									children: plan.price
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: plan.cadence
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-8 space-y-3.5 text-xs",
								children: plan.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-2.5 items-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 size-4 shrink-0 text-[#7C3AED]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: f
									})]
								}, f))
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: plan.highlighted ? "mt-8 w-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-semibold h-11 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.4)]" : "mt-8 w-full border border-border bg-[#111111] hover:bg-secondary text-white font-medium h-11 rounded-xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: plan.to,
								search: plan.search,
								children: plan.cta
							})
						})
					]
				}, plan.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-20 border-t border-border pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-center font-display text-2xl font-bold text-white flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-6 text-[#7C3AED]" }), " Frequently Asked Questions"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-6 md:grid-cols-3",
					children: [
						{
							q: "Can I use downloaded wallpapers commercially?",
							a: "Yes! All wallpapers downloaded on Premium Pro and Studio plans include a full commercial license, allowing use in client projects, ads, and digital media without attribution."
						},
						{
							q: "How does the Bulk ZIP download work?",
							a: "As a Premium member, you can select any number of wallpapers across search results or open any collection and hit 'Download Collection ZIP'. Our system packages high-res files into a single ZIP archive instantly."
						},
						{
							q: "Can I cancel my membership anytime?",
							a: "Absolutely. You can manage or cancel your subscription anytime directly from your user dashboard with one click."
						}
					].map((faq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-[#1A1A1A] p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-white text-sm",
							children: faq.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted-foreground leading-relaxed",
							children: faq.a
						})]
					}, faq.q))
				})]
			})
		]
	});
}
//#endregion
export { PricingPage as component };
