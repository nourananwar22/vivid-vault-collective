import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BYHxbwUn.js
var $$splitComponentImporter = () => import("./checkout-BFfwQleo.mjs");
var Route = createFileRoute("/checkout")({
	validateSearch: (search) => ({ plan: search["plan"] === "studio" ? "studio" : "premium" }),
	head: ({ search }) => ({ meta: [{ title: `Checkout — Pixelvault ${search.plan === "studio" ? "Studio" : "Premium Pro"}` }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
