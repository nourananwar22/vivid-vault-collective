import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/browse-DQaAu3H5.js
var $$splitComponentImporter = () => import("./browse-Di5gfY63.mjs");
var Route = createFileRoute("/browse")({
	validateSearch: (search) => {
		const qParam = search["q"];
		const categoryParam = search["category"];
		const licenseParam = search["license"];
		const sortParam = search["sort"];
		return {
			q: typeof qParam === "string" && qParam ? qParam : void 0,
			category: typeof categoryParam === "string" ? categoryParam : void 0,
			license: [
				"free",
				"premium",
				"all"
			].includes(String(licenseParam)) ? licenseParam : void 0,
			sort: [
				"trending",
				"newest",
				"downloads"
			].includes(String(sortParam)) ? sortParam : void 0
		};
	},
	head: () => ({
		meta: [
			{ title: "Browse Wallpapers — Search, Filter & Bulk Download | Pixelvault" },
			{
				name: "description",
				content: "Search the Pixelvault library by tag, category and license. Sort by trending, newest or downloads and bulk download your selection."
			},
			{
				property: "og:title",
				content: "Browse Wallpapers — Pixelvault"
			},
			{
				property: "og:description",
				content: "Search, filter and bulk download free and premium wallpapers."
			},
			{
				property: "og:url",
				content: "/browse"
			}
		],
		links: [{
			rel: "canonical",
			href: "/browse"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
