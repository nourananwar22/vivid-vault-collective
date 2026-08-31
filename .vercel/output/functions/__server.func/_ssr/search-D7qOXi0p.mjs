import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-D7qOXi0p.js
var $$splitComponentImporter = () => import("./search-Cq-TpXEW.mjs");
var Route = createFileRoute("/search")({
	validateSearch: (search) => ({
		q: typeof search["q"] === "string" ? search["q"] : void 0,
		category: typeof search["category"] === "string" ? search["category"] : void 0,
		license: [
			"free",
			"premium",
			"all"
		].includes(String(search["license"])) ? search["license"] : void 0,
		sort: [
			"trending",
			"newest",
			"downloads"
		].includes(String(search["sort"])) ? search["sort"] : void 0
	}),
	head: ({ search }) => {
		const query = search.q ? `“${search.q}”` : "All Wallpapers";
		const title = `Search ${query} — Free & Premium Wallpapers | Pixelvault`;
		const description = `Find high resolution HD & 4K wallpapers for ${query}. Browse by category, license, resolution and bulk download.`;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: description
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: description
				},
				{
					property: "og:url",
					content: `/search?q=${encodeURIComponent(search.q || "")}`
				}
			],
			links: [{
				rel: "canonical",
				href: `/search`
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
