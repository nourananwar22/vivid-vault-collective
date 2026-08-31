import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as formatCount, t as categories } from "./wallpapers-C0Fu_8CQ.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as Grid3x3, o as Sparkles } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories-BUUzew-I.js
var import_jsx_runtime = require_jsx_runtime();
function CategoriesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border pb-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-[#7C3AED]" }), " Curated Taxonomy"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mt-3 font-display text-4xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grid3x3, { className: "size-8 text-[#7C3AED]" }), " Explore Categories"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: "Discover high-resolution wallpapers tailored to your taste across 12 distinct categories."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
			children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/category/$slug",
				params: { slug: cat.slug },
				className: "group relative aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-[#1A1A1A] transition-all hover:border-[#7C3AED] hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: cat.cover,
						alt: `${cat.name} wallpaper collection`,
						loading: "lazy",
						className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-x-0 bottom-0 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-bold text-white group-hover:text-[#EDE9FE]",
							children: cat.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: [formatCount(cat.count), " wallpapers"]
						})]
					})
				]
			}, cat.slug))
		})]
	});
}
//#endregion
export { CategoriesPage as component };
