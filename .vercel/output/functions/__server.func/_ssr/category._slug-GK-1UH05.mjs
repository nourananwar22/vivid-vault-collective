import { t as categories } from "./wallpapers-C0Fu_8CQ.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/category._slug-GK-1UH05.js
var $$splitComponentImporter = () => import("./category._slug-DcSAuPZz.mjs");
var Route = createFileRoute("/category/$slug")({
	head: ({ params }) => {
		const cat = categories.find((c) => c.slug === params.slug);
		const title = `${cat?.name || params.slug} Wallpapers — HD & 4K Downloads | Pixelvault`;
		const description = cat?.description || `Explore top quality ${params.slug} wallpapers for mobile and desktop screens. Single and bulk downloads.`;
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
					content: `/category/${params.slug}`
				}
			],
			links: [{
				rel: "canonical",
				href: `/category/${params.slug}`
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
