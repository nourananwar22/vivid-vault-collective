import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as useAuth } from "./auth-Dpzah_le.mjs";
import { t as categories } from "./wallpapers-C0Fu_8CQ.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as Download, m as Palette, s as SlidersHorizontal, t as X } from "../_libs/lucide-react.mjs";
import { t as ImageCard } from "./ImageCard-Gd_KgN_u.mjs";
import { t as Route } from "./browse-DQaAu3H5.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-Dg1urBTx.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/browse-Di5gfY63.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
var MAX_BULK_IMAGES = 25;
var MAX_BULK_ESTIMATED_MB = 150;
function BulkDownloadBar({ selectedItems, onClearSelection }) {
	const { user } = useAuth();
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const [progressPercent, setProgressPercent] = (0, import_react.useState)(null);
	if (selectedItems.length === 0) return null;
	const handleBulkDownload = async () => {
		if (selectedItems.length > MAX_BULK_IMAGES) {
			toast.error(`Bulk download limit is ${MAX_BULK_IMAGES} images per ZIP. Please select fewer items.`);
			return;
		}
		const totalEstMb = selectedItems.reduce((acc, curr) => acc + (curr.sizeMb || 5), 0);
		if (totalEstMb > MAX_BULK_ESTIMATED_MB) {
			toast.error(`Selection exceeds estimated limit of ${MAX_BULK_ESTIMATED_MB} MB (${totalEstMb.toFixed(1)} MB selected).`);
			return;
		}
		if (selectedItems.some((item) => item.premium || item.is_premium) && !user) {
			toast.error("Your selection includes Premium wallpapers. Please sign in or upgrade to Premium Pro.");
			return;
		}
		setDownloading(true);
		setProgressPercent(10);
		toast.info(`Preparing ZIP package with ${selectedItems.length} wallpapers...`);
		try {
			const zip = new import_lib.default();
			const folder = zip.folder("Pixelvault-Selection");
			let completed = 0;
			for (const item of selectedItems) try {
				const imgUrl = item.src || item.image_url;
				if (imgUrl) {
					const blob = await (await fetch(imgUrl)).blob();
					const ext = (item.fileType || "JPG").toLowerCase();
					const fileName = `${item.slug || `wallpaper-${completed + 1}`}.${ext}`;
					folder?.file(fileName, blob);
					completed++;
					setProgressPercent(Math.round(10 + completed / selectedItems.length * 80));
					if (user && item.id) supabase.from("downloads").insert({
						user_id: user.id,
						wallpaper_id: item.id,
						resolution: "Bulk ZIP"
					}).catch(() => {});
				}
			} catch (e) {
				console.warn(`Could not add image ${item.title} to ZIP`, e);
			}
			setProgressPercent(95);
			const zipContent = await zip.generateAsync({ type: "blob" });
			const downloadUrl = URL.createObjectURL(zipContent);
			const link = document.createElement("a");
			link.href = downloadUrl;
			link.download = `Pixelvault-Bulk-Selection-${selectedItems.length}-Items.zip`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(downloadUrl);
			toast.success(`ZIP Downloaded successfully (${completed} files)!`);
			onClearSelection();
		} catch (err) {
			toast.error(err.message || "Failed to generate bulk ZIP archive");
		} finally {
			setDownloading(false);
			setProgressPercent(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-x-0 bottom-6 z-50 mx-auto flex w-[min(94%,38rem)] items-center justify-between gap-3 rounded-2xl border border-border bg-[#1A1A1A] px-5 py-3.5 shadow-2xl backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid size-8 place-items-center rounded-xl bg-[#7C3AED]/20 text-[#7C3AED] font-bold text-sm",
				children: selectedItems.length
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs font-semibold text-white",
				children: [
					selectedItems.length,
					" wallpaper",
					selectedItems.length === 1 ? "" : "s",
					" selected for bulk export"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-muted-foreground",
				children: progressPercent !== null ? `Generating ZIP: ${progressPercent}%` : `Max limit: ${MAX_BULK_IMAGES} files per batch`
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				size: "sm",
				disabled: downloading,
				onClick: handleBulkDownload,
				className: "rounded-xl bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold shadow-[0_0_12px_rgba(124,58,237,0.4)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 mr-1" }), downloading ? `Zipping (${progressPercent}%)...` : "Download ZIP"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "icon",
				variant: "ghost",
				disabled: downloading,
				onClick: onClearSelection,
				className: "size-8 rounded-xl text-muted-foreground hover:text-white",
				"aria-label": "Clear selection",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		})]
	});
}
function Browse() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: "/browse" });
	const [selected, setSelected] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)(search.q ?? "");
	const [results, setResults] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const license = search.license ?? "all";
	const sort = search.sort ?? "trending";
	const setSearch = (next) => navigate({ search: (prev) => {
		const updated = {
			...prev,
			...next
		};
		Object.keys(updated).forEach((key) => {
			if (updated[key] === void 0) delete updated[key];
		});
		return updated;
	} });
	(0, import_react.useEffect)(() => {
		async function fetchBrowseData() {
			setLoading(true);
			try {
				let dbQuery = supabase.from("wallpapers").select("*").eq("status", "approved");
				if (search.category && search.category !== "all") dbQuery = dbQuery.eq("category", search.category);
				if (search.q) dbQuery = dbQuery.ilike("title", `%${search.q}%`);
				if (license === "free") dbQuery = dbQuery.eq("is_premium", false);
				else if (license === "premium") dbQuery = dbQuery.eq("is_premium", true);
				if (sort === "newest") dbQuery = dbQuery.order("created_at", { ascending: false });
				else if (sort === "downloads") dbQuery = dbQuery.order("downloads_count", { ascending: false });
				else dbQuery = dbQuery.order("views_count", { ascending: false });
				const { data, error } = await dbQuery;
				if (error) throw error;
				setResults(data || []);
			} catch (err) {
				console.error("Error fetching wallpapers:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchBrowseData();
	}, [
		search.q,
		search.category,
		license,
		sort
	]);
	const toggle = (id) => setSelected((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold",
				children: search.category ? `${categories.find((c) => c.slug === search.category)?.name ?? "Category"} wallpapers` : "Browse wallpapers"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: [
					results.length,
					" result",
					results.length === 1 ? "" : "s",
					search.q ? ` for “${search.q}”` : ""
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-1 gap-2",
					onSubmit: (e) => {
						e.preventDefault();
						setSearch({ q: query || void 0 });
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search by tag or title...",
						"aria-label": "Search wallpapers",
						className: "bg-background border-border"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }), " Apply"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden lg:flex items-center gap-1.5 border-r border-border pr-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "size-4 text-muted-foreground mr-1" }), [
								"#7C3AED",
								"#111111",
								"#FFFFFF",
								"#3B82F6",
								"#10B981",
								"#EF4444"
							].map((color) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "size-5 rounded-full border border-border transition-transform hover:scale-125",
								style: { backgroundColor: color },
								title: `Filter color: ${color}`,
								onClick: () => setSearch({ q: color })
							}, color))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: search.category ?? "all",
							onValueChange: (v) => setSearch({ category: v === "all" ? void 0 : v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-40 bg-background",
								"aria-label": "Category",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Category" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: "all",
								children: "All categories"
							}), categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: c.slug,
								children: c.name
							}, c.slug))] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: license,
							onValueChange: (v) => setSearch({ license: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-36 bg-background",
								"aria-label": "License",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "all",
									children: "All licenses"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "free",
									children: "Free only"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: "premium",
									children: "Premium only"
								})
							] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: sort,
							onValueChange: (v) => setSearch({ sort: v }),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
								className: "w-36 bg-background",
								"aria-label": "Sort by",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
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
									children: "Most downloaded"
								})
							] })]
						})
					]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 text-center text-sm text-muted-foreground",
				children: "Loading wallpapers..."
			}) : results.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-16 text-center text-sm text-muted-foreground",
				children: "No images match those filters yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4",
				children: results.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, {
					item,
					selected: selected.includes(item.id || item.slug),
					onToggleSelect: () => toggle(item.id || item.slug)
				}, item.id || item.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BulkDownloadBar, {
				selectedItems: results.filter((item) => selected.includes(item.id || item.slug)),
				onClearSelection: () => setSelected([])
			})
		]
	});
}
//#endregion
export { Browse as component };
