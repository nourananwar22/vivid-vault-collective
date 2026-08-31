import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as useAuth } from "./auth-Dpzah_le.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Globe, O as FolderHeart, o as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collections-Dd5Y266e.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CollectionsPage() {
	const { user } = useAuth();
	const [collections, setCollections] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchPublicCollections() {
			setLoading(true);
			try {
				const { data, error } = await supabase.from("collections").select("*, profiles:user_id(display_name, username)").eq("is_public", true).order("created_at", { ascending: false });
				if (!error && data) setCollections(data);
				else setCollections([
					{
						id: "col-1",
						name: "Cyberpunk Nightscapes",
						description: "Neon drenched cityscape wallpapers",
						is_public: true,
						user_id: "demo",
						created_at: "2026-08-01",
						profiles: {
							display_name: "Kaito Mori",
							username: "kaitom"
						},
						itemCount: 14
					},
					{
						id: "col-2",
						name: "Moody Fog & Pine",
						description: "Deep dark mist landscape collection",
						is_public: true,
						user_id: "demo",
						created_at: "2026-08-05",
						profiles: {
							display_name: "Lina Farouk",
							username: "linaf"
						},
						itemCount: 8
					},
					{
						id: "col-3",
						name: "Minimal 4K Setup",
						description: "Clean desktop backgrounds for workspace setups",
						is_public: true,
						user_id: "demo",
						created_at: "2026-08-12",
						profiles: {
							display_name: "Alex Mercer",
							username: "alexm"
						},
						itemCount: 21
					}
				]);
			} catch (err) {
				console.error("Error fetching collections:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchPublicCollections();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-[#7C3AED]" }), " Community Curation"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 font-display text-4xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderHeart, { className: "size-8 text-[#7C3AED]" }), " Featured Collections"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: "Curated moodboards and wallpaper sets created by Pixelvault artists and collectors."
				})
			]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-20 text-center text-sm text-muted-foreground",
			children: "Loading collections..."
		}) : collections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-20 text-center text-sm text-muted-foreground",
			children: "No public collections found yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
			children: collections.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/collection/$slug",
				params: { slug: col.id },
				className: "group overflow-hidden rounded-2xl border border-border bg-[#1A1A1A] p-5 transition-all hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3 text-emerald-400" }), " Public Collection"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [col.itemCount || 12, " items"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 font-display text-xl font-bold text-white group-hover:text-[#EDE9FE]",
						children: col.name
					}),
					col.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground line-clamp-2",
						children: col.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: ["By ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-white",
								children: col.profiles?.display_name || "Community Member"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex items-center gap-1 font-semibold text-[#7C3AED]",
							children: "View Set →"
						})]
					})
				]
			}, col.id))
		})]
	});
}
//#endregion
export { CollectionsPage as component };
