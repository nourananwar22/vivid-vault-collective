import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/collection._slug-FTKEz6tx.js
var $$splitComponentImporter = () => import("./collection._slug-BO5uQo_G.mjs");
var Route = createFileRoute("/collection/$slug")({
	head: ({ params }) => ({ meta: [{ title: `Collection ${params.slug} — Pixelvault` }, {
		name: "description",
		content: "View high-resolution wallpaper collection on Pixelvault. Download single images or bulk export as ZIP."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
