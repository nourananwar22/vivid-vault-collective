import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { n as formatCount, o as wallpapers } from "./wallpapers-C0Fu_8CQ.mjs";
import { B as CircleCheck, C as Image } from "../_libs/lucide-react.mjs";
import { t as ImageCard } from "./ImageCard-Gd_KgN_u.mjs";
import { i as Route, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./creator._username-CgL6bzdV.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/creator._username-3gsRj50g.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CreatorProfilePage() {
	const { username } = Route.useParams();
	const [creatorProfile, setCreatorProfile] = (0, import_react.useState)(null);
	const [uploads, setUploads] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchCreatorData() {
			setLoading(true);
			try {
				const { data: prof } = await supabase.from("profiles").select("*").eq("username", username).maybeSingle();
				if (prof) {
					setCreatorProfile(prof);
					const { data: items } = await supabase.from("wallpapers").select("*").eq("author_id", prof.id).eq("status", "approved");
					if (items && items.length > 0) setUploads(items);
					else setUploads(wallpapers.slice(0, 4));
				} else {
					setCreatorProfile({
						display_name: username.charAt(0).toUpperCase() + username.slice(1),
						username,
						bio: "Landscape and digital artist crafting high-resolution dark aesthetic wallpapers.",
						avatar_url: null,
						is_creator: true
					});
					setUploads(wallpapers.slice(0, 6));
				}
			} catch (err) {
				console.error("Error fetching creator profile:", err);
				setUploads(wallpapers.slice(0, 4));
			} finally {
				setLoading(false);
			}
		}
		fetchCreatorData();
	}, [username]);
	const totalDownloads = uploads.reduce((acc, curr) => acc + (curr.downloads || curr.download_count || 120), 0);
	const totalViews = uploads.reduce((acc, curr) => acc + (curr.views || curr.view_count || 450), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-3xl border border-border bg-[#1A1A1A] p-8 shadow-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
						className: "size-20 border-2 border-[#7C3AED] shadow-[0_0_20px_rgba(124,58,237,0.4)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, { src: creatorProfile?.avatar_url || void 0 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "bg-[#7C3AED]/20 text-[#7C3AED] text-2xl font-bold",
							children: (creatorProfile?.display_name || username).substring(0, 2).toUpperCase()
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display text-2xl font-bold text-white",
								children: creatorProfile?.display_name || username
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-[#7C3AED]" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"@",
								username,
								" · Verified Creator"
							]
						}),
						creatorProfile?.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground max-w-lg",
							children: creatorProfile.bio
						})
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-4 border-t border-border/60 pt-4 sm:border-t-0 sm:pt-0 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-[#111111] px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-bold text-white",
								children: uploads.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase",
								children: "Uploads"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-[#111111] px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-bold text-[#7C3AED]",
								children: formatCount(totalDownloads)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase",
								children: "Downloads"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-[#111111] px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-xl font-bold text-white",
								children: formatCount(totalViews)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground uppercase",
								children: "Views"
							})]
						})
					]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-display text-2xl font-bold text-white flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-6 text-[#7C3AED]" }),
					" Approved Submissions (",
					uploads.length,
					")"
				]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-20 text-center text-sm text-muted-foreground",
				children: "Loading creator portfolio..."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4",
				children: uploads.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, { item }, item.id || item.slug))
			})]
		})]
	});
}
//#endregion
export { CreatorProfilePage as component };
