import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { n as useAuth } from "./auth-Dpzah_le.mjs";
import { o as wallpapers } from "./wallpapers-C0Fu_8CQ.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Globe, M as Download, O as FolderHeart, y as Lock } from "../_libs/lucide-react.mjs";
import { t as ImageCard } from "./ImageCard-Gd_KgN_u.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as require_lib } from "../_libs/jszip+[...].mjs";
import { t as Route } from "./collection._slug-FTKEz6tx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collection._slug-BO5uQo_G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function CollectionDetailPage() {
	const { slug } = Route.useParams();
	const { user } = useAuth();
	const [collection, setCollection] = (0, import_react.useState)(null);
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [downloadingZip, setDownloadingZip] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function fetchCollectionDetails() {
			setLoading(true);
			try {
				const { data: colData } = await supabase.from("collections").select("*, profiles:user_id(display_name)").eq("id", slug).maybeSingle();
				if (colData) {
					setCollection(colData);
					const { data: itemData } = await supabase.from("collection_items").select("wallpapers(*)").eq("collection_id", slug);
					if (itemData && itemData.length > 0) setItems(itemData.map((i) => i.wallpapers));
					else setItems(wallpapers.slice(0, 4));
				} else {
					setCollection({
						id: slug,
						name: "Curated Wallpaper Collection",
						description: "High quality wallpaper set for desktop and mobile displays.",
						is_public: true,
						user_id: user?.id || "demo"
					});
					setItems(wallpapers.slice(0, 6));
				}
			} catch (err) {
				console.error("Error loading collection details:", err);
				setItems(wallpapers.slice(0, 4));
			} finally {
				setLoading(false);
			}
		}
		fetchCollectionDetails();
	}, [slug, user?.id]);
	const handleBulkZipDownload = async () => {
		if (items.length === 0) return toast.error("No wallpapers to download");
		setDownloadingZip(true);
		toast.info(`Preparing ZIP archive with ${items.length} wallpapers...`);
		try {
			const zip = new import_lib.default();
			const folder = zip.folder(collection?.name || "Pixelvault-Collection");
			let count = 0;
			for (const item of items) try {
				const imgUrl = item.src || item.image_url;
				if (imgUrl) {
					const blob = await (await fetch(imgUrl)).blob();
					const fileName = `${item.slug || `wallpaper-${count + 1}`}.jpg`;
					folder?.file(fileName, blob);
					count++;
				}
			} catch (e) {
				console.warn(`Failed to add ${item.title} to ZIP`, e);
			}
			const zipContent = await zip.generateAsync({ type: "blob" });
			const downloadUrl = URL.createObjectURL(zipContent);
			const link = document.createElement("a");
			link.href = downloadUrl;
			link.download = `${(collection?.name || "Collection").replace(/\s+/g, "-")}-Pixelvault.zip`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(downloadUrl);
			toast.success(`ZIP Downloaded successfully with ${count} wallpapers!`);
			if (user) {
				for (const item of items) if (item.id) supabase.from("downloads").insert({
					user_id: user.id,
					wallpaper_id: item.id,
					resolution: "Bulk ZIP"
				}).catch(() => {});
			}
		} catch (err) {
			toast.error(err.message || "Failed to generate ZIP archive");
		} finally {
			setDownloadingZip(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-20 text-center text-sm text-muted-foreground",
		children: "Loading collection..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Breadcrumb",
				className: "mb-4 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/collections",
						className: "hover:text-white",
						children: "Collections"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white font-medium",
						children: collection?.name || "Collection"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderHeart, { className: "size-3.5 text-[#7C3AED]" }),
								" ",
								items.length,
								" Wallpapers"
							]
						}), collection?.is_public ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-xs text-emerald-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-3" }), " Public"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-xs text-amber-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3" }), " Private"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-4xl font-bold text-white",
						children: collection?.name
					}),
					collection?.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: collection.description
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: handleBulkZipDownload,
					disabled: downloadingZip,
					className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-11 rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.3)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 mr-2" }), downloadingZip ? "Generating ZIP..." : "Download Collection ZIP"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, { item }, item.id || item.slug))
			})
		]
	});
}
//#endregion
export { CollectionDetailPage as component };
