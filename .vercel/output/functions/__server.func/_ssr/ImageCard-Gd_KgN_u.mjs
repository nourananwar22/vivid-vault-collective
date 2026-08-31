import { i as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as formatCount } from "./wallpapers-C0Fu_8CQ.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as Download, N as Crown, W as Check, w as Heart } from "../_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ImageCard-Gd_KgN_u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
function ImageCard({ item, selected, onToggleSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group relative mb-4 break-inside-avoid overflow-hidden rounded-xl border border-border bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/wallpaper/$slug",
				params: { slug: item.slug },
				className: "image-veil relative block",
				"aria-label": item.title,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.src,
					alt: `${item.title} — ${item.tags.slice(0, 3).join(", ")} wallpaper`,
					width: item.width,
					height: item.height,
					loading: "lazy",
					className: "w-full transition-transform duration-500 group-hover:scale-[1.03]"
				})
			}),
			onToggleSelect && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "absolute left-3 top-3 flex cursor-pointer items-center gap-2 rounded-md bg-background/70 px-2 py-1 text-xs backdrop-blur",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
					checked: !!selected,
					onCheckedChange: () => onToggleSelect(item.slug),
					"aria-label": `Select ${item.title} for bulk download`
				}), "Select"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				className: item.premium ? "absolute right-3 top-3 gap-1 bg-primary text-primary-foreground" : "absolute right-3 top-3 bg-secondary text-secondary-foreground",
				children: item.premium ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-3" }),
					" $",
					item.price
				] }) : "Free"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: item.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: [
								item.width,
								"×",
								item.height,
								" · ",
								item.fileType
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-3 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-3" }),
								" ",
								formatCount(item.likes)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3" }),
								" ",
								formatCount(item.downloads)
							]
						})]
					})]
				})
			})
		]
	});
}
//#endregion
export { ImageCard as t };
