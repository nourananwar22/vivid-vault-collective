import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as useAuth } from "./auth-Dpzah_le.mjs";
import { o as wallpapers } from "./wallpapers-C0Fu_8CQ.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as CircleCheck, C as Image, I as Clock, M as Download, R as CircleX, a as Upload, p as Plus } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/creator.dashboard-D2JIsbbv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreatorDashboardPage() {
	const { user } = useAuth();
	const [submissions, setSubmissions] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function loadCreatorSubmissions() {
			if (!user) {
				setSubmissions(wallpapers.slice(0, 4).map((w, i) => ({
					...w,
					status: i === 0 ? "pending" : "approved"
				})));
				setLoading(false);
				return;
			}
			setLoading(true);
			try {
				const { data, error } = await supabase.from("wallpapers").select("*").eq("author_id", user.id).order("created_at", { ascending: false });
				if (!error && data && data.length > 0) setSubmissions(data);
				else setSubmissions(wallpapers.slice(0, 3).map((w, i) => ({
					...w,
					status: i === 0 ? "pending" : "approved"
				})));
			} catch (err) {
				console.error("Creator dashboard error:", err);
			} finally {
				setLoading(false);
			}
		}
		loadCreatorSubmissions();
	}, [user]);
	const approved = submissions.filter((s) => s.status === "approved");
	const pending = submissions.filter((s) => s.status === "pending");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-7 text-[#7C3AED]" }), " Creator Studio"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Manage your wallpaper uploads, view moderation status, and check audience analytics."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-11 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.3)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/upload",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-1" }), " Upload New Wallpaper"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-5 text-[#7C3AED]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-3xl font-bold text-white",
								children: approved.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Live Approved Wallpapers"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5 text-amber-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-3xl font-bold text-amber-400",
								children: pending.length
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Pending Moderation Review"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-5 text-emerald-400" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-3xl font-bold text-emerald-400",
								children: "12.4k"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Total Creator Downloads"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-bold text-white mb-4",
					children: "Your Submissions Queue"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-border bg-[#1A1A1A] divide-y divide-border overflow-hidden",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-12 text-center text-xs text-muted-foreground",
						children: "Loading submissions..."
					}) : submissions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-12 text-center text-xs text-muted-foreground",
						children: "You haven't uploaded any wallpapers yet. Submit your first wallpaper!"
					}) : submissions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between p-4 hover:bg-[#111111]/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.src || item.image_url || wallpapers[0].src,
								alt: item.title,
								className: "size-14 rounded-lg object-cover border border-border"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-white text-sm",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"Category: ",
									item.category || "Nature",
									" · Uploaded ",
									new Date(item.created_at || Date.now()).toLocaleDateString()
								]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [
								item.status === "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5" }), " Approved & Live"]
								}),
								item.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400 border border-amber-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3.5" }), " In Moderation"]
								}),
								item.status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1 rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400 border border-red-500/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3.5" }), " Rejected"]
								})
							]
						})]
					}, item.id || item.slug))
				})]
			})
		]
	});
}
//#endregion
export { CreatorDashboardPage as component };
