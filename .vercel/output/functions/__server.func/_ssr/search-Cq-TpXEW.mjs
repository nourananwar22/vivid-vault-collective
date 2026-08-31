import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { o as wallpapers, t as categories } from "./wallpapers-C0Fu_8CQ.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { f as Search, o as Sparkles, s as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { t as ImageCard } from "./ImageCard-Gd_KgN_u.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { t as Route } from "./search-D7qOXi0p.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-Cq-TpXEW.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const searchParams = Route.useSearch();
	const navigate = useNavigate({ from: "/search" });
	const [queryInput, setQueryInput] = (0, import_react.useState)(searchParams.q || "");
	const [results, setResults] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const activeQuery = searchParams.q || "";
	const activeCategory = searchParams.category || "all";
	const activeLicense = searchParams.license || "all";
	const activeSort = searchParams.sort || "trending";
	const updateSearch = (next) => {
		navigate({ search: (prev) => {
			const updated = {
				...prev,
				...next
			};
			Object.keys(updated).forEach((k) => {
				if (updated[k] === void 0 || updated[k] === "all") delete updated[k];
			});
			return updated;
		} });
	};
	(0, import_react.useEffect)(() => {
		setQueryInput(searchParams.q || "");
	}, [searchParams.q]);
	(0, import_react.useEffect)(() => {
		async function fetchSearchResults() {
			setLoading(true);
			try {
				let dbQuery = supabase.from("wallpapers").select("*").eq("status", "approved");
				if (activeCategory !== "all") dbQuery = dbQuery.eq("category", activeCategory);
				if (activeQuery) dbQuery = dbQuery.or(`title.ilike.%${activeQuery}%,description.ilike.%${activeQuery}%,tags.cs.{${activeQuery}}`);
				if (activeLicense === "free") dbQuery = dbQuery.eq("is_premium", false);
				else if (activeLicense === "premium") dbQuery = dbQuery.eq("is_premium", true);
				if (activeSort === "newest") dbQuery = dbQuery.order("created_at", { ascending: false });
				else if (activeSort === "downloads") dbQuery = dbQuery.order("download_count", { ascending: false });
				else dbQuery = dbQuery.order("view_count", { ascending: false });
				const { data, error } = await dbQuery;
				if (!error && data && data.length > 0) setResults(data);
				else {
					let filtered = wallpapers;
					if (activeQuery) {
						const qLower = activeQuery.toLowerCase();
						filtered = filtered.filter((w) => w.title.toLowerCase().includes(qLower) || w.category.toLowerCase().includes(qLower) || w.tags.some((t) => t.toLowerCase().includes(qLower)));
					}
					if (activeCategory !== "all") filtered = filtered.filter((w) => w.categorySlug === activeCategory || w.category.toLowerCase() === activeCategory.toLowerCase());
					if (activeLicense === "free") filtered = filtered.filter((w) => !w.premium);
					if (activeLicense === "premium") filtered = filtered.filter((w) => w.premium);
					setResults(filtered);
				}
			} catch (err) {
				console.error("Search error:", err);
				setResults(wallpapers);
			} finally {
				setLoading(false);
			}
		}
		fetchSearchResults();
	}, [
		activeQuery,
		activeCategory,
		activeLicense,
		activeSort
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-7 text-[#7C3AED]" }), activeQuery ? `Results for “${activeQuery}”` : "Search Wallpapers"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						"Found ",
						results.length,
						" wallpaper",
						results.length === 1 ? "" : "s",
						" matching your criteria."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex max-w-md w-full gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						updateSearch({ q: queryInput || void 0 });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: queryInput,
							onChange: (e) => setQueryInput(e.target.value),
							placeholder: "Search by title, tag, or aesthetic...",
							className: "bg-[#1A1A1A] border-border pl-9 text-white placeholder:text-muted-foreground"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
						children: "Search"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-muted-foreground flex items-center gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-[#7C3AED]" }), " Related:"]
				}), [
					"minimal",
					"dark",
					"4k",
					"neon",
					"nature",
					"space",
					"cyberpunk",
					"abstract"
				].map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => updateSearch({ q: tag }),
					className: `rounded-full border px-3 py-1 text-xs transition-colors ${activeQuery === tag ? "border-[#7C3AED] bg-[#7C3AED]/20 text-[#EDE9FE]" : "border-border bg-card text-muted-foreground hover:border-[#7C3AED] hover:text-white"}`,
					children: tag
				}, tag))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-[#1A1A1A] p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-[#7C3AED]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: activeCategory,
							onValueChange: (v) => updateSearch({ category: v === "all" ? void 0 : v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-44 bg-[#111111] border-border text-white",
								"aria-label": "Category filter",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Category" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, {
								className: "bg-[#1A1A1A] border-border text-white",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All Categories"
								}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c.slug,
									children: c.name
								}, c.slug))]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: activeLicense,
							onValueChange: (v) => updateSearch({ license: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-36 bg-[#111111] border-border text-white",
								"aria-label": "License filter",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "License" })
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
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: activeSort,
					onValueChange: (v) => updateSearch({ sort: v }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						className: "w-40 bg-[#111111] border-border text-white",
						"aria-label": "Sort order",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Sort By" })
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
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-20 text-center text-sm text-muted-foreground",
				children: "Searching wallpaper library..."
			}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-semibold text-white",
						children: "No wallpapers found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Try adjusting your keywords or clearing selected filters."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => updateSearch({
							q: void 0,
							category: void 0,
							license: void 0
						}),
						variant: "outline",
						className: "mt-4 border-border text-white",
						children: "Clear Filters"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4",
				children: results.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, { item }, item.id || item.slug))
			})
		]
	});
}
//#endregion
export { SearchPage as component };
