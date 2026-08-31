import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as formatCount, o as wallpapers, t as categories } from "./wallpapers-C0Fu_8CQ.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Sparkles, s as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { t as ImageCard } from "./ImageCard-Gd_KgN_u.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Route } from "./category._slug-GK-1UH05.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-DcSAuPZz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route.useParams();
	const categoryInfo = categories.find((c) => c.slug === slug) || {
		slug,
		name: slug.charAt(0).toUpperCase() + slug.slice(1),
		description: `Explore high-resolution wallpapers in the ${slug} collection.`,
		cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
		count: 1200
	};
	const [wallpapers$1, setWallpapers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [license, setLicense] = (0, import_react.useState)("all");
	const [sort, setSort] = (0, import_react.useState)("trending");
	(0, import_react.useEffect)(() => {
		async function fetchCategoryItems() {
			setLoading(true);
			try {
				let dbQuery = supabase.from("wallpapers").select("*").eq("status", "approved").or(`category.ilike.%${slug}%,category_id.eq.${slug}`);
				if (license === "free") dbQuery = dbQuery.eq("is_premium", false);
				if (license === "premium") dbQuery = dbQuery.eq("is_premium", true);
				if (sort === "newest") dbQuery = dbQuery.order("created_at", { ascending: false });
				else if (sort === "downloads") dbQuery = dbQuery.order("download_count", { ascending: false });
				else dbQuery = dbQuery.order("view_count", { ascending: false });
				const { data, error } = await dbQuery;
				if (!error && data && data.length > 0) setWallpapers(data);
				else {
					let filtered = wallpapers.filter((w) => w.categorySlug.toLowerCase() === slug.toLowerCase() || w.category.toLowerCase() === slug.toLowerCase());
					if (filtered.length === 0) filtered = wallpapers;
					if (license === "free") filtered = filtered.filter((w) => !w.premium);
					if (license === "premium") filtered = filtered.filter((w) => w.premium);
					setWallpapers(filtered);
				}
			} catch (err) {
				console.error("Error fetching category:", err);
				setWallpapers(wallpapers.filter((w) => w.categorySlug === slug || w.category.toLowerCase() === slug));
			} finally {
				setLoading(false);
			}
		}
		fetchCategoryItems();
	}, [
		slug,
		license,
		sort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden bg-card border-b border-border py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: categoryInfo.cover,
				alt: categoryInfo.name,
				className: "absolute inset-0 size-full object-cover opacity-25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto max-w-7xl px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					"aria-label": "Breadcrumb",
					className: "mb-4 text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/browse",
							className: "hover:text-white",
							children: "Browse"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categories",
							className: "hover:text-white",
							children: "Categories"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "px-2",
							children: "/"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white font-medium",
							children: categoryInfo.name
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-[#7C3AED]" }),
								" ",
								formatCount(categoryInfo.count),
								" Wallpapers"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-3 font-display text-4xl font-bold text-white",
							children: [categoryInfo.name, " Wallpapers"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-2xl text-pretty text-sm text-muted-foreground",
							children: categoryInfo.description
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-4 md:mt-0 bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/browse",
							search: { category: categoryInfo.slug },
							children: ["Browse All in ", categoryInfo.name]
						})
					})]
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-[#1A1A1A] p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-[#7C3AED]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: license,
					onValueChange: (v) => setLicense(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-36 bg-[#111111] border-border text-white",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
						className: "bg-[#1A1A1A] border-border text-white",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All Licenses"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "free",
								children: "Free Only"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "premium",
								children: "Premium Only"
							})
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
				value: sort,
				onValueChange: (v) => setSort(v),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "w-40 bg-[#111111] border-border text-white",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
					className: "bg-[#1A1A1A] border-border text-white",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "trending",
							children: "Trending"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "newest",
							children: "Newest"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: "downloads",
							children: "Most Downloaded"
						})
					]
				})]
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "py-20 text-center text-sm text-muted-foreground",
			children: [
				"Loading ",
				categoryInfo.name,
				" wallpapers..."
			]
		}) : wallpapers$1.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-20 text-center text-sm text-muted-foreground",
			children: "No wallpapers found in this category yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4",
			children: wallpapers$1.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, { item }, item.id || item.slug))
		})]
	})] });
}
//#endregion
export { CategoryPage as component };
