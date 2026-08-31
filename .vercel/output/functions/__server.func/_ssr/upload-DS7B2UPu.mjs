import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as useAuth } from "./auth-Dpzah_le.mjs";
import { t as categories } from "./wallpapers-C0Fu_8CQ.mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Image$1, N as Crown, a as Upload, o as Sparkles, t as X } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-DS7B2UPu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UploadPage() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const fileInputRef = (0, import_react.useRef)(null);
	const [file, setFile] = (0, import_react.useState)(null);
	const [previewUrl, setPreviewUrl] = (0, import_react.useState)(null);
	const [metadata, setMetadata] = (0, import_react.useState)(null);
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("nature");
	const [tagsInput, setTagsInput] = (0, import_react.useState)("minimal, dark, 4k");
	const [isPremium, setIsPremium] = (0, import_react.useState)(false);
	const [priceCents, setPriceCents] = (0, import_react.useState)(900);
	const [license, setLicense] = (0, import_react.useState)("Pixelvault Free License — commercial use allowed");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const handleFileSelect = (selectedFile) => {
		if (!selectedFile.type.startsWith("image/")) {
			toast.error("Please select a valid image file (JPG, PNG, WEBP)");
			return;
		}
		setFile(selectedFile);
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreviewUrl(objectUrl);
		const img = new Image();
		img.onload = () => {
			const w = img.naturalWidth;
			const h = img.naturalHeight;
			const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
			const divisor = gcd(w, h);
			const aspect = `${w / divisor}:${h / divisor}`;
			const ext = selectedFile.name.split(".").pop()?.toUpperCase() || "JPG";
			const sizeMb = (selectedFile.size / 1048576).toFixed(2);
			setMetadata({
				width: w,
				height: h,
				aspectRatio: aspect,
				sizeBytes: selectedFile.size,
				sizeMb,
				fileType: ext
			});
		};
		img.src = objectUrl;
	};
	const handleUploadSubmit = async (e) => {
		e.preventDefault();
		if (!file || !metadata) return toast.error("Please select an image file first");
		if (!title.trim()) return toast.error("Please provide a wallpaper title");
		if (!user) return toast.error("Please sign in to submit wallpapers");
		setLoading(true);
		try {
			const fileExt = file.name.split(".").pop();
			const filePath = `wallpapers/${`${user.id}/${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`}`;
			const { error: uploadError } = await supabase.storage.from("wallpapers").upload(filePath, file);
			let publicUrl = "";
			if (!uploadError) {
				const { data: urlData } = supabase.storage.from("wallpapers").getPublicUrl(filePath);
				publicUrl = urlData.publicUrl;
			}
			const slug = (title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now().toString(36)).replace(/^-+|-+$/g, "");
			const parsedTags = tagsInput.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
			const { error: dbError } = await supabase.from("wallpapers").insert({
				author_id: user.id,
				title: title.trim(),
				slug,
				description: description.trim() || null,
				storage_path: publicUrl || filePath,
				preview_path: publicUrl || filePath,
				width: metadata.width,
				height: metadata.height,
				file_type: metadata.fileType,
				size_bytes: metadata.sizeBytes,
				category,
				tags: parsedTags,
				is_premium: isPremium,
				price_cents: isPremium ? priceCents : null,
				license,
				status: "pending"
			});
			if (dbError) throw dbError;
			toast.success("Wallpaper submitted successfully! It is now pending admin moderation.");
			navigate({ to: "/creator/dashboard" });
		} catch (err) {
			toast.error(err.message || "Failed to submit wallpaper. Try again.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-4xl px-4 py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl border border-border bg-[#1A1A1A] p-8 shadow-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full bg-[#7C3AED]/20 px-3 py-1 text-xs font-semibold text-[#EDE9FE]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-[#7C3AED]" }), " Creator Upload Studio"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 text-3xl font-bold text-white flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-7 text-[#7C3AED]" }), " Submit Your Wallpaper"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Share high-resolution 4K & 8K original wallpapers with the Pixelvault community."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleUploadSubmit,
				className: "mt-8 space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Image File"
					}), previewUrl && metadata ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 relative overflow-hidden rounded-2xl border border-border bg-[#111111] p-4 flex flex-col md:flex-row items-center gap-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: previewUrl,
							alt: "Preview",
							className: "h-44 rounded-xl object-contain border border-border"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 space-y-2 text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-white font-bold text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate max-w-xs",
									children: file?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => {
										setFile(null);
										setPreviewUrl(null);
										setMetadata(null);
									},
									className: "text-muted-foreground hover:text-red-400",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-y-2 pt-2 text-muted-foreground border-t border-border/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Dimensions: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-white",
										children: [
											metadata.width,
											"×",
											metadata.height
										]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Aspect Ratio: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: metadata.aspectRatio
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["File Size: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-white",
										children: [metadata.sizeMb, " MB"]
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["Format: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: metadata.fileType
									})] })
								]
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onClick: () => fileInputRef.current?.click(),
						onDragOver: (e) => e.preventDefault(),
						onDrop: (e) => {
							e.preventDefault();
							if (e.dataTransfer.files?.[0]) handleFileSelect(e.dataTransfer.files[0]);
						},
						className: "mt-2 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-[#111111] p-10 cursor-pointer hover:border-[#7C3AED] transition-colors",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image$1, { className: "size-12 text-[#7C3AED] mb-3" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-white",
								children: "Click or drag & drop high-resolution wallpaper file"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: "Supports JPG, PNG, WEBP up to 50MB (Recommended: 3840×2160 4K)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: fileInputRef,
								type: "file",
								accept: "image/*",
								onChange: (e) => e.target.files?.[0] && handleFileSelect(e.target.files[0]),
								className: "hidden"
							})
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							required: true,
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "e.g. Neon Rain Cyberpunk District",
							className: "mt-1 bg-[#111111] border-border text-white"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: category,
							onChange: (e) => setCategory(e.target.value),
							className: "mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary",
							children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c.slug,
								children: c.name
							}, c.slug))
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Description"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						value: description,
						onChange: (e) => setDescription(e.target.value),
						placeholder: "Describe your wallpaper creation, mood, tools used...",
						className: "mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
						children: "Tags (Comma Separated)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: tagsInput,
						onChange: (e) => setTagsInput(e.target.value),
						placeholder: "minimal, dark, 4k, neon, fog",
						className: "mt-1 bg-[#111111] border-border text-white"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-[#111111] p-5 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-white text-sm flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "size-4 text-amber-300" }), " Premium Wallpaper Access"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Restrict downloads to Premium subscribers"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: isPremium,
								onChange: (e) => setIsPremium(e.target.checked),
								className: "size-5 rounded border-border text-[#7C3AED] focus:ring-0"
							})]
						}), isPremium && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs text-muted-foreground",
							children: "Standalone Price (Cents USD)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							value: priceCents,
							onChange: (e) => setPriceCents(Number(e.target.value)),
							className: "mt-1 max-w-xs bg-[#1A1A1A] border-border text-white text-xs"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: loading || !file,
						className: "w-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-12 rounded-xl text-base shadow-[0_0_15px_rgba(124,58,237,0.4)]",
						children: loading ? "Extracting & Uploading..." : "Submit for Moderation Review"
					})
				]
			})]
		})
	});
}
//#endregion
export { UploadPage as component };
