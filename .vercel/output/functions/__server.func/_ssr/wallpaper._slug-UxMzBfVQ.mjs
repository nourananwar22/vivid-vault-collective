import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as useAuth } from "./auth-Dpzah_le.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { a as resolutionsFor, i as relatedTo, n as formatCount, r as getWallpaper } from "./wallpapers-C0Fu_8CQ.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Eye, D as FolderPlus, F as Copy, M as Download, N as Crown, O as FolderHeart, W as Check, d as Share2, k as Flag, o as Sparkles, p as Plus, w as Heart } from "../_libs/lucide-react.mjs";
import { t as ImageCard } from "./ImageCard-Gd_KgN_u.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, o as Route, r as DialogDescription, t as Dialog } from "./wallpaper._slug-DZTkHxV0.mjs";
import { t as Root } from "../_libs/radix-ui__react-separator.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallpaper._slug-UxMzBfVQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CollectionModal({ wallpaperId, open, onOpenChange }) {
	const { user } = useAuth();
	const [collections, setCollections] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [newCollectionName, setNewCollectionName] = (0, import_react.useState)("");
	const [creating, setCreating] = (0, import_react.useState)(false);
	const fetchUserCollections = async () => {
		if (!user || !open) return;
		setLoading(true);
		try {
			const { data: cols, error } = await supabase.from("collections").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			const { data: items } = await supabase.from("collection_items").select("collection_id").eq("wallpaper_id", wallpaperId);
			const existingColIds = new Set((items || []).map((i) => i.collection_id));
			const processed = (cols || []).map((c) => ({
				...c,
				hasItem: existingColIds.has(c.id)
			}));
			setCollections(processed);
		} catch (err) {
			console.error("Error loading collections:", err);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchUserCollections();
	}, [
		open,
		wallpaperId,
		user
	]);
	const toggleItemInCollection = async (collection) => {
		if (!user) return toast.error("Please sign in to manage collections");
		try {
			if (collection.hasItem) {
				const { error } = await supabase.from("collection_items").delete().eq("collection_id", collection.id).eq("wallpaper_id", wallpaperId);
				if (error) throw error;
				toast.success(`Removed from "${collection.name}"`);
			} else {
				const { error } = await supabase.from("collection_items").insert({
					collection_id: collection.id,
					wallpaper_id: wallpaperId
				});
				if (error) throw error;
				toast.success(`Added to "${collection.name}"`);
			}
			setCollections((prev) => prev.map((c) => c.id === collection.id ? {
				...c,
				hasItem: !c.hasItem
			} : c));
		} catch (err) {
			toast.error(err.message || "Failed to update collection");
		}
	};
	const handleCreateCollection = async (e) => {
		e.preventDefault();
		if (!newCollectionName.trim()) return;
		if (!user) return toast.error("Please sign in first");
		setCreating(true);
		try {
			const { data: newCol, error } = await supabase.from("collections").insert({
				user_id: user.id,
				name: newCollectionName.trim(),
				is_public: true
			}).select().single();
			if (error) throw error;
			if (newCol) await supabase.from("collection_items").insert({
				collection_id: newCol.id,
				wallpaper_id: wallpaperId
			});
			toast.success(`Created collection "${newCollectionName.trim()}"`);
			setNewCollectionName("");
			fetchUserCollections();
		} catch (err) {
			toast.error(err.message || "Failed to create collection");
		} finally {
			setCreating(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md border-border bg-[#1A1A1A] p-6 text-foreground shadow-2xl sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[#7C3AED]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderHeart, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-xl font-bold text-white",
						children: "Save to Collection"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: "text-xs text-muted-foreground",
					children: "Organize wallpapers into personal public or private moodboards."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleCreateCollection,
					className: "mt-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: newCollectionName,
						onChange: (e) => setNewCollectionName(e.target.value),
						placeholder: "New collection name...",
						className: "bg-[#111111] border-border text-white text-sm"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: creating,
						className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-1" }), " Create"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 max-h-60 overflow-y-auto divide-y divide-border rounded-xl border border-border bg-[#111111]",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 text-center text-xs text-muted-foreground",
						children: "Loading collections..."
					}) : collections.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6 text-center text-xs text-muted-foreground",
						children: "No collections yet. Create your first one above!"
					}) : collections.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => toggleItemInCollection(col),
						className: "flex w-full items-center justify-between p-3.5 text-left text-sm transition-colors hover:bg-secondary/40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium text-white",
							children: col.name
						}), col.hasItem ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-xs font-semibold text-emerald-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Added"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "size-4" }), " Add"]
						})]
					}, col.id))
				})
			]
		})
	});
}
var REPORT_REASONS = [
	"Copyright infringement / stolen content",
	"Inappropriate or adult content",
	"Spam, misleading tags or title",
	"Low quality or corrupted image",
	"Other violation"
];
function ReportModal({ wallpaperId, open, onOpenChange }) {
	const { user } = useAuth();
	const [reason, setReason] = (0, import_react.useState)(REPORT_REASONS[0]);
	const [details, setDetails] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!user) return toast.error("Please sign in to submit a report");
		setLoading(true);
		try {
			const { error } = await supabase.from("reports").insert({
				wallpaper_id: wallpaperId,
				reporter_id: user.id,
				reason,
				details: details.trim() || void 0,
				status: "open"
			});
			if (error) throw error;
			toast.success("Thank you. Report submitted for admin moderation.");
			onOpenChange(false);
		} catch (err) {
			toast.error(err.message || "Failed to submit report");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md border-border bg-[#1A1A1A] p-6 text-foreground shadow-2xl sm:rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-amber-400",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-xl font-bold text-white",
					children: "Report Content"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				className: "text-xs text-muted-foreground",
				children: "Help us maintain quality & copyright standards on Pixelvault."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSubmit,
				className: "mt-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium text-muted-foreground",
						children: "Select Reason"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: reason,
						onChange: (e) => setReason(e.target.value),
						className: "mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary",
						children: REPORT_REASONS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: r,
							children: r
						}, r))
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-medium text-muted-foreground",
						children: "Additional Details (Optional)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						value: details,
						onChange: (e) => setDetails(e.target.value),
						placeholder: "Provide context or links if applicable...",
						className: "mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: loading,
						className: "w-full bg-amber-600 hover:bg-amber-700 text-white font-medium h-10 rounded-xl",
						children: loading ? "Submitting..." : "Submit Moderation Report"
					})
				]
			})]
		})
	});
}
function ShareModal({ title, url, open, onOpenChange }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl);
			setCopied(true);
			toast.success("Link copied to clipboard!");
			setTimeout(() => setCopied(false), 2500);
		} catch {
			toast.error("Failed to copy link");
		}
	};
	const shareServices = [
		{
			name: "X (Twitter)",
			color: "bg-slate-800 hover:bg-slate-700",
			link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this wallpaper on Pixelvault: ${title}`)}&url=${encodeURIComponent(shareUrl)}`
		},
		{
			name: "Facebook",
			color: "bg-blue-700 hover:bg-blue-600",
			link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
		},
		{
			name: "WhatsApp",
			color: "bg-emerald-700 hover:bg-emerald-600",
			link: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out "${title}" on Pixelvault: ${shareUrl}`)}`
		},
		{
			name: "LinkedIn",
			color: "bg-sky-800 hover:bg-sky-700",
			link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-md border-border bg-[#1A1A1A] p-6 text-foreground shadow-2xl sm:rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[#7C3AED]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "text-xl font-bold text-white",
					children: "Share Wallpaper"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
				className: "text-xs text-muted-foreground",
				children: [
					"Share \"",
					title,
					"\" with your friends and community."
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						readOnly: true,
						value: shareUrl,
						className: "bg-[#111111] border-border text-white text-xs"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: handleCopy,
						className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white shrink-0",
						children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2 pt-2",
					children: shareServices.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.link,
						target: "_blank",
						rel: "noopener noreferrer",
						className: `flex items-center justify-center rounded-xl p-2.5 text-xs font-medium text-white transition-colors ${s.color}`,
						children: s.name
					}, s.name))
				})]
			})]
		})
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = Root.displayName;
function WallpaperDetail() {
	const { slug } = Route.useParams();
	const { user } = useAuth();
	const [item, setItem] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isFavorited, setIsFavorited] = (0, import_react.useState)(false);
	const [downloading, setDownloading] = (0, import_react.useState)(false);
	const [collectionModalOpen, setCollectionModalOpen] = (0, import_react.useState)(false);
	const [reportModalOpen, setReportModalOpen] = (0, import_react.useState)(false);
	const [shareModalOpen, setShareModalOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function loadWallpaper() {
			setLoading(true);
			try {
				const { data, error } = await supabase.from("wallpapers").select("*").eq("slug", slug).maybeSingle();
				if (data) {
					const wpData = {
						id: data.id,
						slug: data.slug,
						title: data.title,
						src: data.storage_path ? data.preview_path || data.storage_path : data.image_url || getWallpaper(slug)?.src || "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
						width: data.width || 3840,
						height: data.height || 2160,
						category: data.category || "Nature",
						categorySlug: (data.category || "nature").toLowerCase(),
						tags: data.tags || [
							"wallpaper",
							"hd",
							"4k"
						],
						premium: data.is_premium || false,
						price: data.price_cents ? data.price_cents / 100 : null,
						downloads: data.download_count || 120,
						views: data.view_count || 450,
						likes: data.like_count || 32,
						fileType: data.file_type || "JPG",
						sizeMb: data.size_bytes ? parseFloat((data.size_bytes / 1048576).toFixed(1)) : 5.4,
						license: data.license || "Pixelvault Commercial License",
						author: {
							name: "Pixelvault Creator",
							handle: "creator",
							role: "Contributor"
						},
						addedAt: new Date(data.created_at || Date.now()).toISOString().split("T")[0]
					};
					setItem(wpData);
					supabase.rpc("increment_view", { _slug: slug }).catch(() => {});
				} else {
					const fallback = getWallpaper(slug) || getWallpaper("dawn-ridge-mist");
					setItem(fallback || null);
				}
			} catch (err) {
				console.error("Error loading wallpaper details:", err);
				setItem(getWallpaper(slug) || null);
			} finally {
				setLoading(false);
			}
		}
		loadWallpaper();
	}, [slug]);
	(0, import_react.useEffect)(() => {
		if (user && item?.id) supabase.from("favorites").select("id").eq("user_id", user.id).eq("wallpaper_id", item.id).maybeSingle().then(({ data }) => setIsFavorited(!!data));
	}, [user, item?.id]);
	const handleToggleFavorite = async () => {
		if (!user) return toast.error("Please sign in to add favorites");
		if (!item?.id) return toast.success("Saved to favorites!");
		try {
			if (isFavorited) {
				await supabase.from("favorites").delete().eq("user_id", user.id).eq("wallpaper_id", item.id);
				setIsFavorited(false);
				toast.success("Removed from favorites");
			} else {
				await supabase.from("favorites").insert({
					user_id: user.id,
					wallpaper_id: item.id
				});
				setIsFavorited(true);
				toast.success("Added to favorites!");
			}
		} catch (err) {
			toast.error(err.message || "Failed to update favorites");
		}
	};
	const handleDownload = async (label, resW, resH) => {
		if (item?.premium && !user) {
			toast.error("Premium wallpaper — Please sign in or upgrade your account");
			return;
		}
		setDownloading(true);
		try {
			if (user && item?.id) await supabase.from("downloads").insert({
				user_id: user.id,
				wallpaper_id: item.id,
				resolution: `${resW}x${resH}`
			});
			const blob = await (await fetch(item?.src || "")).blob();
			const blobUrl = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = `${item?.slug || "wallpaper"}-${resW}x${resH}.${item?.fileType.toLowerCase() || "jpg"}`;
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(blobUrl);
			toast.success(`Downloaded ${label} (${resW}×${resH})!`);
		} catch {
			toast.success(`Download started for ${label} (${resW}×${resH})`);
		} finally {
			setDownloading(false);
		}
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "py-24 text-center text-sm text-muted-foreground",
		children: "Loading wallpaper details..."
	});
	if (!item) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-white",
				children: "Wallpaper Not Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "The wallpaper you're looking for does not exist or has been removed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6 bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/browse",
					children: "Back to Browse"
				})
			})
		]
	});
	const related = relatedTo(item);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-8 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				"aria-label": "Breadcrumb",
				className: "text-xs text-muted-foreground",
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
						to: "/category/$slug",
						params: { slug: item.categorySlug || "nature" },
						className: "hover:text-white",
						children: item.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-2",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-white font-medium",
						children: item.title
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-8 lg:grid-cols-[1.8fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative overflow-hidden rounded-2xl border border-border bg-[#1A1A1A] p-2 shadow-2xl flex items-center justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: item.src,
						alt: `${item.title} high resolution ${item.category} wallpaper`,
						width: item.width,
						height: item.height,
						className: "max-h-[75vh] w-full rounded-xl object-contain"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: item.premium ? "gap-1 bg-[#7C3AED] text-white font-semibold shadow-[0_0_10px_rgba(124,58,237,0.4)]" : "bg-secondary text-secondary-foreground",
									children: item.premium ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3 text-amber-300" }),
										" Premium $",
										item.price || 12
									] }) : "Free Download"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-muted-foreground flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-3.5" }),
										" ",
										formatCount(item.views),
										" views · ",
										formatCount(item.downloads),
										" downloads"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 font-display text-3xl font-bold text-white",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									"By ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white font-medium",
										children: item.author.name
									}),
									" · ",
									item.author.role
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Select Download Resolution"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2",
									children: resolutionsFor(item.width, item.height).map((res) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "secondary",
										disabled: downloading,
										className: "justify-between bg-[#1A1A1A] hover:bg-secondary border border-border text-white text-sm",
										onClick: () => handleDownload(res.label, res.width, res.height),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											res.label,
											" · ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
												className: "text-white",
												children: [
													res.width,
													"×",
													res.height
												]
											})
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4 text-[#7C3AED]" })]
									}, res.label))
								}),
								item.premium && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "w-full mt-2 bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-11 rounded-xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/pricing",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-4 mr-1 text-amber-300" }), " Unlock Premium Pass"]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: handleToggleFavorite,
									className: `flex-1 border-border ${isFavorited ? "bg-red-500/10 text-red-400 border-red-500/40" : "text-white hover:bg-secondary"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-4 mr-1 ${isFavorited ? "fill-red-400 text-red-400" : ""}` }), isFavorited ? "Favorited" : "Favorite"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									onClick: () => setCollectionModalOpen(true),
									className: "flex-1 border-border text-white hover:bg-secondary",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderPlus, { className: "size-4 mr-1 text-[#7C3AED]" }), " Collection"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									onClick: () => setShareModalOpen(true),
									className: "border-border text-white hover:bg-secondary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, { className: "bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Original Resolution"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "text-white font-medium",
									children: [
										item.width,
										"×",
										item.height
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "File Format"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-white font-medium",
									children: item.fileType
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "File Size"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "text-white font-medium",
									children: [item.sizeMb, " MB"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Published Date"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-white font-medium",
									children: item.addedAt
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Tags"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: item.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/browse",
								search: { q: tag },
								className: "rounded-full border border-border bg-[#1A1A1A] px-3 py-1 text-xs text-muted-foreground hover:border-[#7C3AED] hover:text-white transition-colors",
								children: ["#", tag]
							}, tag))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-[#1A1A1A] p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "Commercial License"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: item.license
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => setReportModalOpen(true),
							className: "text-xs text-muted-foreground hover:text-red-400",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flag, { className: "size-3.5 mr-1" }), " Report this content"]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 border-t border-border pt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-display text-2xl font-bold text-white flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-5 text-[#7C3AED]" }), " Related Wallpapers"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 space-y-4",
					children: related.map((rel) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, { item: rel }, rel.slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CollectionModal, {
				wallpaperId: item.id || "1",
				open: collectionModalOpen,
				onOpenChange: setCollectionModalOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportModal, {
				wallpaperId: item.id || "1",
				open: reportModalOpen,
				onOpenChange: setReportModalOpen
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareModal, {
				title: item.title,
				open: shareModalOpen,
				onOpenChange: setShareModalOpen
			})
		]
	});
}
//#endregion
export { WallpaperDetail as component };
