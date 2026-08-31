import { i as __toESM } from "../_runtime.mjs";
import { r as supabase } from "./ssr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { f as require_jsx_runtime } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as Button } from "./button-Bq5vK6RO.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { n as useAuth, t as AuthProvider } from "./auth-Dpzah_le.mjs";
import { t as Badge } from "./badge-D1Dupn2y.mjs";
import { n as formatCount, o as wallpapers, t as categories } from "./wallpapers-C0Fu_8CQ.mjs";
import { _ as useRouter, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Image, G as ChartColumn, H as ChevronRight, K as ArrowRight, L as Circle, M as Download, O as FolderHeart, W as Check, _ as LogOut, a as Upload, b as LayoutDashboard, c as Shield, f as Search, g as Mail, h as Menu, i as UserPlus, j as ExternalLink, n as Users, o as Sparkles, p as Plus, r as User, t as X, u as ShieldAlert, v as LogIn, w as Heart, y as Lock } from "../_libs/lucide-react.mjs";
import { t as ImageCard } from "./ImageCard-Gd_KgN_u.mjs";
import { t as Route$16 } from "./browse-DQaAu3H5.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$17 } from "./category._slug-GK-1UH05.mjs";
import { t as Route$18 } from "./checkout-BYHxbwUn.mjs";
import { t as Route$19 } from "./collection._slug-FTKEz6tx.mjs";
import { i as Route$20, n as AvatarFallback, r as AvatarImage, t as Avatar } from "./creator._username-CgL6bzdV.mjs";
import { a as DialogTitle$1, i as DialogHeader, n as DialogContent$1, o as Route$21, r as DialogDescription$1, t as Dialog$1 } from "./wallpaper._slug-DZTkHxV0.mjs";
import { t as Route$22 } from "./search-D7qOXi0p.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as Trigger$1, n as List, r as Root2$1, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-DEU1iawJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C8MBBARX.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function AuthModal({ open, onOpenChange, defaultMode = "login" }) {
	const [mode, setMode] = (0, import_react.useState)(defaultMode);
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const { signInWithEmail, signUpWithEmail } = useAuth();
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please provide email and password");
			return;
		}
		setLoading(true);
		try {
			if (mode === "login") {
				const { error } = await signInWithEmail(email, password);
				if (error) throw error;
				toast.success("Signed in successfully!");
				onOpenChange(false);
			} else {
				const { error } = await signUpWithEmail(email, password, displayName);
				if (error) throw error;
				toast.success("Account created successfully!");
				onOpenChange(false);
			}
		} catch (err) {
			toast.error(err.message || "Authentication failed. Please check your credentials.");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog$1, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
			className: "max-w-md border-border bg-[#1A1A1A] p-6 text-foreground shadow-2xl sm:rounded-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED]",
							children: mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "size-6" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
							className: "font-display text-2xl font-bold text-white",
							children: mode === "login" ? "Welcome back to Pixelvault" : "Create your Pixelvault account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
							className: "text-sm text-muted-foreground",
							children: mode === "login" ? "Sign in to access your downloads, favorites, and collections." : "Join thousands of creators & wallpaper lovers."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: handleSubmit,
					className: "mt-4 space-y-4",
					children: [
						mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Display Name"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "text",
									placeholder: "e.g. Alex Vance",
									value: displayName,
									onChange: (e) => setDisplayName(e.target.value),
									className: "bg-[#111111] border-border pl-10 text-white placeholder:text-muted-foreground"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Email Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									required: true,
									placeholder: "name@example.com",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									className: "bg-[#111111] border-border pl-10 text-white placeholder:text-muted-foreground"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium text-muted-foreground",
								children: "Password"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									required: true,
									placeholder: "••••••••",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									className: "bg-[#111111] border-border pl-10 text-white placeholder:text-muted-foreground"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: loading,
							className: "w-full bg-[#7C3AED] hover:bg-[#5B21B6] text-white font-medium h-11 rounded-xl transition-colors",
							children: loading ? "Processing..." : mode === "login" ? "Sign In" : "Create Free Account"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 border-t border-border pt-4 text-center text-xs text-muted-foreground",
					children: mode === "login" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Don't have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("register"),
							className: "font-semibold text-[#7C3AED] hover:underline",
							children: "Sign up free"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Already have an account?",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMode("login"),
							className: "font-semibold text-[#7C3AED] hover:underline",
							children: "Sign in"
						})
					] })
				})
			]
		})
	});
}
var nav = [
	{
		to: "/browse",
		label: "Browse"
	},
	{
		to: "/categories",
		label: "Categories"
	},
	{
		to: "/pricing",
		label: "Pricing"
	},
	{
		to: "/dashboard",
		label: "Dashboard"
	}
];
function Header() {
	const navigate = useNavigate();
	const { user, profile, isStaff, isCreator, signOut } = useAuth();
	const [q, setQ] = (0, import_react.useState)("");
	const [openMobile, setOpenMobile] = (0, import_react.useState)(false);
	const [authModalOpen, setAuthModalOpen] = (0, import_react.useState)(false);
	const [authMode, setAuthMode] = (0, import_react.useState)("login");
	const submit = (e) => {
		e.preventDefault();
		navigate({
			to: "/browse",
			search: { q: q || void 0 }
		});
		setOpenMobile(false);
	};
	const handleOpenAuth = (mode) => {
		setAuthMode(mode);
		setAuthModalOpen(true);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex shrink-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.5)]",
						children: "P"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold tracking-tight text-white",
						children: "Pixelvault"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: submit,
					className: "relative hidden flex-1 md:block max-w-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search wallpapers, tags, categories…",
						"aria-label": "Search wallpapers",
						className: "h-10 rounded-full border-border bg-card pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "hidden items-center gap-1 lg:flex ml-2",
					children: [nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.to,
						className: "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
						activeProps: { className: "text-foreground font-medium" },
						children: item.label
					}, item.to)), isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin",
						className: "flex items-center gap-1 rounded-md px-3 py-2 text-sm text-[#7C3AED] hover:text-[#EDE9FE]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" }), " Admin"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto hidden items-center gap-3 md:flex",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "hover:bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/upload",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), " Upload"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							className: "rounded-full bg-primary hover:bg-primary-dark font-medium shadow-[0_0_12px_rgba(124,58,237,0.3)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pricing",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " Go Premium"]
							})
						}),
						user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								className: "relative size-9 rounded-full p-0 border border-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
									className: "size-9",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
										src: profile?.avatar_url || void 0,
										alt: profile?.display_name || "User"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
										className: "bg-primary/20 text-[#7C3AED] text-xs font-bold",
										children: (profile?.display_name || user.email || "U").substring(0, 2).toUpperCase()
									})]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							className: "w-56 bg-[#1A1A1A] border-border text-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
									className: "font-normal",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium leading-none text-white",
											children: profile?.display_name || "User"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs leading-none text-muted-foreground",
											children: user.email
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, { className: "bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									className: "cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/dashboard",
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4 text-primary" }), " Dashboard"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									className: "cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/upload",
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4 text-muted-foreground" }), " Creator Studio"]
									})
								}),
								isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
									asChild: true,
									className: "cursor-pointer text-[#7C3AED]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/admin",
										className: "flex items-center gap-2 font-medium",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-4" }), " Admin Panel"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, { className: "bg-border" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => signOut(),
									className: "cursor-pointer text-red-400 focus:text-red-400",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4 mr-2" }), " Sign out"]
								})
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => handleOpenAuth("login"),
								children: "Sign In"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "outline",
								className: "border-[#7C3AED]/40 text-[#EDE9FE] hover:bg-[#7C3AED]/20",
								onClick: () => handleOpenAuth("register"),
								children: "Register"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					open: openMobile,
					onOpenChange: setOpenMobile,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "ml-auto md:hidden",
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "right",
						className: "w-72 bg-[#1A1A1A] border-border text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
								onSubmit: submit,
								className: "mt-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search wallpapers…",
									"aria-label": "Search wallpapers",
									className: "bg-background border-border"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "mt-6 grid gap-1",
								children: [
									nav.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: item.to,
										onClick: () => setOpenMobile(false),
										className: "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
										children: item.label
									}, item.to)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/upload",
										onClick: () => setOpenMobile(false),
										className: "rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground",
										children: "Upload Wallpaper"
									}),
									isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/admin",
										onClick: () => setOpenMobile(false),
										className: "rounded-md px-3 py-2 text-sm font-medium text-[#7C3AED] hover:bg-secondary",
										children: "Admin Panel"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 border-t border-border pt-4",
								children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3 px-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
											className: "size-8",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
												className: "bg-primary/20 text-[#7C3AED] text-xs font-bold",
												children: (profile?.display_name || user.email || "U").substring(0, 2).toUpperCase()
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-xs font-medium text-white",
												children: profile?.display_name || "User"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-[10px] text-muted-foreground",
												children: user.email
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline",
										className: "w-full justify-start text-xs border-border",
										onClick: () => {
											signOut();
											setOpenMobile(false);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-3.5 mr-2" }), " Sign Out"]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										className: "w-full bg-[#7C3AED] hover:bg-[#5B21B6]",
										onClick: () => {
											setOpenMobile(false);
											handleOpenAuth("login");
										},
										children: "Sign In"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										className: "w-full border-border",
										onClick: () => {
											setOpenMobile(false);
											handleOpenAuth("register");
										},
										children: "Create Account"
									})]
								})
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
			open: authModalOpen,
			onOpenChange: setAuthModalOpen,
			defaultMode: authMode
		})]
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-24 border-t border-border bg-[#0D0D0D]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-8 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground",
								children: "P"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg font-semibold tracking-tight text-white",
								children: "Pixelvault"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-sm text-sm text-muted-foreground",
							children: "Free and premium high-resolution wallpapers in every display ratio. Download single images or bulk export full collections."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-wider text-white",
						children: "Explore"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/browse",
								className: "hover:text-white transition-colors",
								children: "Browse Library"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/categories",
								className: "hover:text-white transition-colors",
								children: "Categories"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/collections",
								className: "hover:text-white transition-colors",
								children: "Featured Collections"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pricing",
								className: "hover:text-white transition-colors",
								children: "Pricing & Plans"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-wider text-white",
						children: "Creators"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/upload",
								className: "hover:text-white transition-colors",
								children: "Submit Wallpapers"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/creator/dashboard",
								className: "hover:text-white transition-colors",
								children: "Creator Studio"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pricing",
								className: "hover:text-white transition-colors",
								children: "Creator Monetization"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xs font-semibold uppercase tracking-wider text-white",
						children: "Legal & Support"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/license",
								className: "hover:text-white transition-colors",
								children: "Licensing Terms"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/terms",
								className: "hover:text-white transition-colors",
								children: "Terms of Service"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "hover:text-white transition-colors",
								children: "Privacy Policy"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/copyright",
								className: "hover:text-white transition-colors",
								children: "DMCA & Copyright"
							}) })
						]
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 border-t border-border/60 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-muted-foreground gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Pixelvault Inc. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px]",
					children: "Dark Mode First · 4K & 8K Ultra High Resolution"
				})]
			})]
		})
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-dark",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$15 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Pixelvault — Free & Premium Wallpapers" },
			{
				name: "description",
				content: "Download high-resolution free and premium wallpapers, single or in bulk, across nature, urban, abstract and space collections."
			},
			{
				property: "og:site_name",
				content: "Pixelvault"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Manrope:wght@400;500;600&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		],
		scripts: [{
			type: "application/ld+json",
			children: JSON.stringify({
				"@context": "https://schema.org",
				"@type": "WebSite",
				name: "Pixelvault",
				description: "Free and premium high-resolution wallpapers and stock images."
			})
		}]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$15.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, { position: "top-center" })] })
	});
}
var hero_default = "/assets/hero-DMaLfZX9.jpg";
var Route$14 = createFileRoute("/")({
	head: () => ({
		meta: [
			{ title: "Pixelvault — Free & Premium HD Wallpapers to Download" },
			{
				name: "description",
				content: "Browse thousands of free and premium wallpapers in 4K. Download individually or in bulk, with full licensing details on every image."
			},
			{
				property: "og:title",
				content: "Pixelvault — Free & Premium HD Wallpapers"
			},
			{
				property: "og:description",
				content: "High-resolution wallpapers, free and premium, with single and bulk downloads."
			},
			{
				property: "og:url",
				content: "/"
			},
			{
				property: "og:type",
				content: "website"
			}
		],
		links: [{
			rel: "canonical",
			href: "/"
		}]
	}),
	component: Index
});
function Index() {
	const [q, setQ] = (0, import_react.useState)("");
	const [trending, setTrending] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const popularTags = [
		"minimal",
		"dark",
		"neon",
		"nature",
		"4k",
		"abstract"
	];
	(0, import_react.useEffect)(() => {
		async function fetchApprovedWallpapers() {
			try {
				const { data, error } = await supabase.from("wallpapers").select("*").eq("status", "approved").order("created_at", { ascending: false }).limit(6);
				if (error) throw error;
				setTrending(data || []);
			} catch (err) {
				console.error("Error fetching wallpapers:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchApprovedWallpapers();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_default,
					alt: "Abstract violet wave wallpaper",
					width: 1920,
					height: 1080,
					className: "absolute inset-0 size-full object-cover opacity-45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 md:py-32",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "mb-6 gap-1 bg-secondary text-secondary-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3 text-primary" }), " 26,000+ curated wallpapers"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "text-balance font-display text-4xl font-bold leading-tight sm:text-6xl",
							children: ["Wallpapers worth ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-gradient",
								children: "keeping"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg",
							children: "Free and premium high-resolution images for every screen. Download one, or grab a whole collection in a single click."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mx-auto mt-8 flex max-w-xl gap-2",
							onSubmit: (e) => {
								e.preventDefault();
								window.location.assign(`/browse?q=${encodeURIComponent(q)}`);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Try “dark minimal 4k”",
									"aria-label": "Search wallpapers",
									className: "h-12 rounded-full border-border bg-card pl-11"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "h-12 rounded-full bg-primary px-6 hover:bg-primary-dark",
								children: "Search"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex flex-wrap justify-center gap-2",
							children: popularTags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/browse",
								search: { q: tag },
								className: "rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground",
								children: tag
							}, tag))
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 py-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold sm:text-3xl",
					children: "Trending this week"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Most downloaded across the whole library."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					className: "shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/browse",
						children: ["View all ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-12 text-center text-sm text-muted-foreground",
				children: "Loading wallpapers..."
			}) : trending.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-12 text-center text-sm text-muted-foreground",
				children: "No approved wallpapers yet. Upload one and approve it from the admin dashboard!"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3",
				children: trending.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, { item }, item.id || item.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-7xl px-4 pb-16 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl font-semibold sm:text-3xl",
				children: "Browse by category"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5",
				children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/browse",
					search: { category: cat.slug },
					className: "group relative aspect-[4/5] overflow-hidden rounded-xl border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cat.cover,
							alt: `${cat.name} wallpapers`,
							loading: "lazy",
							className: "size-full object-cover transition-transform duration-500 group-hover:scale-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute inset-x-0 bottom-0 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: cat.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [formatCount(cat.count), " images"]
							})]
						})
					]
				}, cat.slug))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-7xl px-4 pb-8 sm:px-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface glow flex flex-col items-start gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold sm:text-3xl",
						children: "Bulk download the whole collection"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Premium members select any number of images and get a single optimized ZIP in every resolution — no per-file limits."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "bg-primary hover:bg-primary-dark",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/pricing",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " See plans"]
					})
				})]
			})
		})
	] });
}
var Tabs = Root2$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Route$13 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin Portal — Pixelvault" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: AdminPage
});
function AdminPage() {
	const { isStaff, loading: authLoading } = useAuth();
	const [pendingWallpapers, setPendingWallpapers] = (0, import_react.useState)([]);
	const [loadingPending, setLoadingPending] = (0, import_react.useState)(true);
	const [usersList, setUsersList] = (0, import_react.useState)([]);
	const [userSearch, setUserSearch] = (0, import_react.useState)("");
	const [loadingUsers, setLoadingUsers] = (0, import_react.useState)(false);
	const [reportsList, setReportsList] = (0, import_react.useState)([]);
	const [loadingReports, setLoadingReports] = (0, import_react.useState)(false);
	const [categoryList, setCategoryList] = (0, import_react.useState)(categories);
	const [newCatName, setNewCatName] = (0, import_react.useState)("");
	const [newCatSlug, setNewCatSlug] = (0, import_react.useState)("");
	const fetchPendingWallpapers = async () => {
		setLoadingPending(true);
		try {
			const { data, error } = await supabase.from("wallpapers").select("*").eq("status", "pending").order("created_at", { ascending: false });
			if (!error && data) setPendingWallpapers(data);
			else setPendingWallpapers([{
				id: "p1",
				title: "Cyber Neon Alley 8K",
				category: "Urban",
				image_url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				status: "pending",
				width: 3840,
				height: 2160
			}, {
				id: "p2",
				title: "Prismatic Wave Abstract",
				category: "Abstract",
				image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				status: "pending",
				width: 2560,
				height: 1440
			}]);
		} catch (err) {
			console.error("Fetch pending error:", err);
		} finally {
			setLoadingPending(false);
		}
	};
	const fetchUsers = async () => {
		setLoadingUsers(true);
		try {
			const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
			if (data && data.length > 0) setUsersList(data);
			else setUsersList([
				{
					id: "u1",
					username: "alexm",
					display_name: "Alex Mercer",
					is_creator: true,
					created_at: "2026-08-01"
				},
				{
					id: "u2",
					username: "linaf",
					display_name: "Lina Farouk",
					is_creator: true,
					created_at: "2026-08-05"
				},
				{
					id: "u3",
					username: "kaitom",
					display_name: "Kaito Mori",
					is_creator: true,
					created_at: "2026-08-10"
				}
			]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingUsers(false);
		}
	};
	const fetchReports = async () => {
		setLoadingReports(true);
		try {
			const { data } = await supabase.from("reports").select("*, wallpapers(title, slug)").order("created_at", { ascending: false });
			if (data && data.length > 0) setReportsList(data);
			else setReportsList([{
				id: "r1",
				reason: "Copyright dispute",
				details: "Author claims original photography rights.",
				status: "open",
				created_at: (/* @__PURE__ */ new Date()).toISOString(),
				wallpapers: { title: "Dawn Ridge Mist" }
			}]);
		} catch (err) {
			console.error(err);
		} finally {
			setLoadingReports(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchPendingWallpapers();
		fetchUsers();
		fetchReports();
	}, []);
	const handleModerationAction = async (id, newStatus) => {
		try {
			const { error } = await supabase.from("wallpapers").update({ status: newStatus }).eq("id", id);
			if (error) throw error;
			toast.success(`Wallpaper ${newStatus} successfully!`);
			setPendingWallpapers((prev) => prev.filter((item) => item.id !== id));
		} catch (err) {
			toast.error(err.message || "Action failed");
		}
	};
	const handleUpdateReportStatus = async (reportId, status) => {
		try {
			await supabase.from("reports").update({ status }).eq("id", reportId);
			toast.success(`Report status updated to ${status}`);
			setReportsList((prev) => prev.map((r) => r.id === reportId ? {
				...r,
				status
			} : r));
		} catch (err) {
			toast.error(err.message || "Failed to update report");
		}
	};
	const handleAddCategory = (e) => {
		e.preventDefault();
		if (!newCatName) return;
		const slug = newCatSlug || newCatName.toLowerCase().replace(/\s+/g, "-");
		setCategoryList((prev) => [...prev, {
			slug,
			name: newCatName,
			count: 0,
			cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
			description: `Wallpapers in the ${newCatName} collection.`
		}]);
		toast.success(`Category "${newCatName}" added!`);
		setNewCatName("");
		setNewCatSlug("");
	};
	const filteredUsers = usersList.filter((u) => u.display_name?.toLowerCase().includes(userSearch.toLowerCase()) || u.username?.toLowerCase().includes(userSearch.toLowerCase()));
	if (!authLoading && !isStaff) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-red-500/10 text-red-400",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-8" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-white",
				children: "Access Denied"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "You do not have staff or administrator privileges to view the moderation queue or manage platform users."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6 bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: "Back to Home"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "text-3xl font-bold text-white flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-8 text-[#7C3AED]" }), " Admin Command Center"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage user submissions, content moderation, reports, user roles, and platform health."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "rounded-full bg-[#7C3AED]/20 px-4 py-1.5 text-xs font-semibold text-[#EDE9FE] border border-[#7C3AED]/40",
				children: [pendingWallpapers.length, " Pending Review"]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "moderation",
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "bg-[#1A1A1A] border border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "moderation",
							className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
							children: [
								"Moderation Queue (",
								pendingWallpapers.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "users",
							className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
							children: [
								"Users & Roles (",
								usersList.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "reports",
							className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
							children: [
								"Reports (",
								reportsList.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "categories",
							className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
							children: [
								"Categories (",
								categoryList.length,
								")"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "analytics",
							className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
							children: "Analytics Overview"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "moderation",
					className: "mt-6",
					children: loadingPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-20 text-center text-muted-foreground",
						children: "Loading queue..."
					}) : pendingWallpapers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-20 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "mx-auto size-12 text-muted-foreground/40" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-white font-medium",
								children: "No pending wallpapers to review!"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "All uploaded content has been moderated."
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: pendingWallpapers.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-2xl border border-border bg-[#1A1A1A] shadow-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative aspect-video w-full overflow-hidden bg-[#111111]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image_url || item.src || wallpapers[0].src,
									alt: item.title,
									className: "h-full w-full object-cover"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-white truncate",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center justify-between text-xs text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded bg-muted px-2 py-0.5 uppercase text-white font-mono",
											children: item.category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											item.width || 3840,
											"×",
											item.height || 2160
										] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											onClick: () => handleModerationAction(item.id, "approved"),
											className: "flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Approve Live"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											onClick: () => handleModerationAction(item.id, "rejected"),
											variant: "destructive",
											className: "flex-1 text-xs gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Reject"]
										})]
									})
								]
							})]
						}, item.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "users",
					className: "mt-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex max-w-md gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: userSearch,
							onChange: (e) => setUserSearch(e.target.value),
							placeholder: "Search users by name or handle...",
							className: "bg-[#1A1A1A] border-border text-white text-xs"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border bg-[#1A1A1A] divide-y divide-border overflow-hidden",
						children: filteredUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between p-4 hover:bg-[#111111]/50",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-white text-sm",
								children: u.display_name || u.username
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"@",
									u.username || "user",
									" · Joined ",
									new Date(u.created_at || Date.now()).toLocaleDateString()
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded bg-[#7C3AED]/20 px-2.5 py-1 text-xs font-semibold text-[#EDE9FE]",
									children: u.is_creator ? "Creator" : "Standard User"
								})
							})]
						}, u.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "reports",
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-border bg-[#1A1A1A] divide-y divide-border overflow-hidden",
						children: reportsList.map((rep) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "inline-block rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300 uppercase",
									children: rep.status
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-white text-sm mt-1",
									children: rep.reason
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: ["Target wallpaper: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white",
										children: rep.wallpapers?.title || "Wallpaper"
									})]
								}),
								rep.details && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: rep.details
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => handleUpdateReportStatus(rep.id, "resolved"),
									className: "bg-emerald-600 hover:bg-emerald-700 text-white text-xs",
									children: "Resolve"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => handleUpdateReportStatus(rep.id, "dismissed"),
									className: "border-border text-white text-xs",
									children: "Dismiss"
								})]
							})]
						}, rep.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "categories",
					className: "mt-6 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: handleAddCategory,
						className: "flex max-w-lg gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: newCatName,
							onChange: (e) => setNewCatName(e.target.value),
							placeholder: "New category name...",
							className: "bg-[#1A1A1A] border-border text-white text-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 mr-1" }), " Add Category"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: categoryList.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-[#1A1A1A] p-4 flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: c.cover,
								alt: c.name,
								className: "size-12 rounded-lg object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-white text-sm",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [formatCount(c.count), " wallpapers"]
							})] })]
						}, c.slug))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "analytics",
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-[#1A1A1A] p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-5 text-[#7C3AED]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-2xl font-bold text-white",
										children: "4,820"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Total Users"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-[#1A1A1A] p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-5 text-[#7C3AED]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-2xl font-bold text-white",
										children: "26,410"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Active Wallpapers"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-[#1A1A1A] p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5 text-emerald-400" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-2xl font-bold text-emerald-400",
										children: "142.8k"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Monthly Downloads"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl border border-border bg-[#1A1A1A] p-5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { className: "size-5 text-amber-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-2xl font-bold text-amber-300",
										children: "$18,400"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Monthly Recurring Revenue"
									})
								]
							})
						]
					})
				})
			]
		})]
	});
}
var $$splitComponentImporter$11 = () => import("./categories-BUUzew-I.mjs");
var Route$12 = createFileRoute("/categories")({
	head: () => ({
		meta: [
			{ title: "Wallpaper Categories & Collections | Pixelvault" },
			{
				name: "description",
				content: "Explore Pixelvault categories: Nature, Urban, Abstract, Architecture, Space, Anime, Cars, Gaming and minimal wallpapers in 4K resolution."
			},
			{
				property: "og:title",
				content: "Wallpaper Categories | Pixelvault"
			},
			{
				property: "og:url",
				content: "/categories"
			}
		],
		links: [{
			rel: "canonical",
			href: "/categories"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./collections-Dd5Y266e.mjs");
var Route$11 = createFileRoute("/collections")({
	head: () => ({ meta: [{ title: "Curated Wallpaper Collections | Pixelvault" }, {
		name: "description",
		content: "Explore public wallpaper collections and moodboards created by the Pixelvault community."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./copyright-CyVZaJUI.mjs");
var Route$10 = createFileRoute("/copyright")({
	head: () => ({
		meta: [{ title: "Copyright & DMCA Policy — Pixelvault" }, {
			name: "description",
			content: "Copyright protection and DMCA takedown notice guidelines for Pixelvault."
		}],
		links: [{
			rel: "canonical",
			href: "/copyright"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var Route$9 = createFileRoute("/dashboard")({
	head: () => ({
		meta: [
			{ title: "Your Dashboard — Pixelvault" },
			{
				name: "description",
				content: "Manage your downloaded wallpapers, favorited items, personal collections, and subscription membership."
			},
			{
				name: "robots",
				content: "noindex"
			}
		],
		links: [{
			rel: "canonical",
			href: "/dashboard"
		}]
	}),
	component: DashboardPage
});
function DashboardPage() {
	const { user, profile, refreshProfile } = useAuth();
	const [favorites, setFavorites] = (0, import_react.useState)([]);
	const [collections, setCollections] = (0, import_react.useState)([]);
	const [downloads, setDownloads] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [displayName, setDisplayName] = (0, import_react.useState)(profile?.display_name || "");
	const [bio, setBio] = (0, import_react.useState)(profile?.bio || "");
	const [savingProfile, setSavingProfile] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (profile) {
			setDisplayName(profile.display_name || "");
			setBio(profile.bio || "");
		}
	}, [profile]);
	(0, import_react.useEffect)(() => {
		async function loadDashboardData() {
			if (!user) {
				setFavorites(wallpapers.slice(0, 3));
				setCollections([{
					id: "col-1",
					name: "Desktop 4K 2026",
					is_public: true,
					itemCount: 8
				}, {
					id: "col-2",
					name: "Dark Minimal Setup",
					is_public: false,
					itemCount: 14
				}]);
				setDownloads(wallpapers.slice(2, 6).map((item, idx) => ({
					id: `dl-${idx}`,
					resolution: "3840x2160",
					created_at: (/* @__PURE__ */ new Date(Date.now() - idx * 864e5)).toISOString(),
					wallpapers: item
				})));
				setLoading(false);
				return;
			}
			setLoading(true);
			try {
				const { data: favs } = await supabase.from("favorites").select("wallpapers(*)").eq("user_id", user.id);
				if (favs && favs.length > 0) setFavorites(favs.map((f) => f.wallpapers));
				else setFavorites(wallpapers.slice(0, 3));
				const { data: cols } = await supabase.from("collections").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
				if (cols && cols.length > 0) setCollections(cols);
				else setCollections([{
					id: "my-first-collection",
					name: "My Favorites & Ideas",
					is_public: true
				}]);
				const { data: dls } = await supabase.from("downloads").select("*, wallpapers(*)").eq("user_id", user.id).order("created_at", { ascending: false }).limit(20);
				if (dls && dls.length > 0) setDownloads(dls);
				else setDownloads(wallpapers.slice(0, 3).map((item, idx) => ({
					id: `dl-${idx}`,
					resolution: "3840x2160",
					created_at: (/* @__PURE__ */ new Date(Date.now() - idx * 864e5)).toISOString(),
					wallpapers: item
				})));
			} catch (err) {
				console.error("Dashboard error:", err);
			} finally {
				setLoading(false);
			}
		}
		loadDashboardData();
	}, [user]);
	const handleUpdateProfile = async (e) => {
		e.preventDefault();
		if (!user) return toast.error("Please sign in first");
		setSavingProfile(true);
		try {
			const { error } = await supabase.from("profiles").update({
				display_name: displayName,
				bio
			}).eq("id", user.id);
			if (error) throw error;
			toast.success("Profile updated successfully!");
			refreshProfile();
		} catch (err) {
			toast.error(err.message || "Failed to update profile");
		} finally {
			setSavingProfile(false);
		}
	};
	const stats = [
		{
			label: "Downloads this month",
			value: downloads.length.toString(),
			icon: Download
		},
		{
			label: "Saved Favorites",
			value: favorites.length.toString(),
			icon: Heart
		},
		{
			label: "Curated Collections",
			value: collections.length.toString(),
			icon: FolderHeart
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-12 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "font-display text-3xl font-bold text-white",
					children: ["Welcome back, ", profile?.display_name || user?.email?.split("@")[0] || "Collector"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: user ? user.email : "Demo mode · Sign in to sync across devices"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "gap-1 bg-[#7C3AED] text-white font-semibold shadow-[0_0_12px_rgba(124,58,237,0.4)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-amber-300" }), " Free Plan · 10 Downloads / Day"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 grid gap-4 sm:grid-cols-3",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "size-5 text-[#7C3AED]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-3xl font-bold text-white",
							children: s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "favorites",
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
						className: "bg-[#1A1A1A] border border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "favorites",
								className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
								children: [
									"Favorites (",
									favorites.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
								value: "collections",
								className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
								children: [
									"Collections (",
									collections.length,
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "history",
								className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
								children: "Download History"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
								value: "account",
								className: "data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white",
								children: "Account Settings"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "favorites",
						className: "mt-6",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-12 text-center text-sm text-muted-foreground",
							children: "Loading favorites..."
						}) : favorites.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-12 text-center text-sm text-muted-foreground",
							children: "No favorites saved yet. Click the heart icon on any wallpaper!"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 space-y-4",
							children: favorites.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageCard, { item }, item.id || item.slug))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "collections",
						className: "mt-6 grid gap-4 sm:grid-cols-3",
						children: collections.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-[#1A1A1A] p-5 shadow-lg flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-[#7C3AED]",
									children: "Collection"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: col.is_public ? "Public" : "Private" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-xl font-bold text-white",
								children: col.name
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "mt-6 w-full border-border text-white hover:bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/collection/$slug",
									params: { slug: col.id },
									children: ["Open Collection ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 ml-2" })]
								})
							})]
						}, col.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "history",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-2xl border border-border bg-[#1A1A1A] divide-y divide-border overflow-hidden",
							children: downloads.map((item) => {
								const wp = item.wallpapers || wallpapers[0];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-4 p-4 hover:bg-[#111111]/50 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: wp.src || wp.image_url || wallpapers[0].src,
											alt: wp.title,
											className: "size-14 rounded-lg object-cover border border-border"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate text-sm font-bold text-white",
												children: wp.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													"Resolution: ",
													item.resolution || "3840x2160",
													" · Date: ",
													new Date(item.created_at).toLocaleDateString()
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "sm",
											className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/wallpaper/$slug",
												params: { slug: wp.slug },
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5 mr-1" }), " Re-Download"]
											})
										})
									]
								}, item.id);
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "account",
						className: "mt-6 max-w-xl",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-[#1A1A1A] p-6 shadow-xl space-y-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "text-xl font-bold text-white flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5 text-[#7C3AED]" }), " Profile & Preferences"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: handleUpdateProfile,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-medium text-muted-foreground",
											children: "Display Name"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: displayName,
											onChange: (e) => setDisplayName(e.target.value),
											className: "bg-[#111111] border-border text-white mt-1"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-medium text-muted-foreground",
											children: "Bio / Tagline"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 3,
											value: bio,
											onChange: (e) => setBio(e.target.value),
											placeholder: "Tell the community about yourself...",
											className: "mt-1 w-full rounded-lg border border-border bg-[#111111] p-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											disabled: savingProfile,
											className: "bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
											children: savingProfile ? "Saving..." : "Save Profile Changes"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-border pt-6 space-y-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-sm font-bold text-white",
											children: "Subscription & Limits"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Current Plan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white font-medium",
												children: "Free Tier"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-xs text-muted-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Download Limit" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-white font-medium",
												children: "10 / day"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											className: "w-full mt-2 bg-[#7C3AED] hover:bg-[#5B21B6] text-white",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
												to: "/pricing",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 mr-2" }), " Upgrade to Premium Pro"]
											})
										})
									]
								})
							]
						})
					})
				]
			})
		]
	});
}
var $$splitComponentImporter$8 = () => import("./forgot-password-aGtrFxHO.mjs");
var Route$8 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [{ title: "Reset Password — Pixelvault" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./license-C5IHajQE.mjs");
var Route$7 = createFileRoute("/license")({
	head: () => ({
		meta: [{ title: "License Information — Pixelvault" }, {
			name: "description",
			content: "Details on Pixelvault Free & Commercial Wallpaper Licenses."
		}],
		links: [{
			rel: "canonical",
			href: "/license"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./login-BnVV4ZWd.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign In — Pixelvault" }, {
		name: "description",
		content: "Sign in to your Pixelvault account to access downloads, favorites, and premium wallpapers."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./pricing-CnJycQ9p.mjs");
var Route$5 = createFileRoute("/pricing")({
	head: () => ({
		meta: [
			{ title: "Pricing — Premium Wallpaper Membership | Pixelvault" },
			{
				name: "description",
				content: "Free explorer plan or premium membership for unlimited 4K and bulk ZIP downloads with commercial license."
			},
			{
				property: "og:title",
				content: "Pricing — Pixelvault Membership"
			},
			{
				property: "og:url",
				content: "/pricing"
			}
		],
		links: [{
			rel: "canonical",
			href: "/pricing"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./privacy-QggMa9h2.mjs");
var Route$4 = createFileRoute("/privacy")({
	head: () => ({
		meta: [{ title: "Privacy Policy — Pixelvault" }, {
			name: "description",
			content: "Privacy policy and data protection guidelines for Pixelvault users."
		}],
		links: [{
			rel: "canonical",
			href: "/privacy"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./register-CRBs6rM4.mjs");
var Route$3 = createFileRoute("/register")({
	head: () => ({ meta: [{ title: "Register — Pixelvault" }, {
		name: "description",
		content: "Create your free Pixelvault account to download HD & 4K wallpapers, save favorites, and curate collections."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./terms-DXin-EjZ.mjs");
var Route$2 = createFileRoute("/terms")({
	head: () => ({
		meta: [{ title: "Terms of Service — Pixelvault" }, {
			name: "description",
			content: "Terms of service and usage conditions for the Pixelvault platform."
		}],
		links: [{
			rel: "canonical",
			href: "/terms"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./upload-DS7B2UPu.mjs");
var Route$1 = createFileRoute("/upload")({
	head: () => ({ meta: [{ title: "Submit Wallpaper — Creator Studio | Pixelvault" }, {
		name: "description",
		content: "Upload high-resolution original wallpapers to share on Pixelvault."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./creator.dashboard-D2JIsbbv.mjs");
var Route = createFileRoute("/creator/dashboard")({
	head: () => ({ meta: [{ title: "Creator Studio Dashboard — Pixelvault" }, {
		name: "robots",
		content: "noindex"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$14.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$15
	}),
	AdminRoute: Route$13.update({
		id: "/admin",
		path: "/admin",
		getParentRoute: () => Route$15
	}),
	BrowseRoute: Route$16.update({
		id: "/browse",
		path: "/browse",
		getParentRoute: () => Route$15
	}),
	CategoriesRoute: Route$12.update({
		id: "/categories",
		path: "/categories",
		getParentRoute: () => Route$15
	}),
	CheckoutRoute: Route$18.update({
		id: "/checkout",
		path: "/checkout",
		getParentRoute: () => Route$15
	}),
	CollectionsRoute: Route$11.update({
		id: "/collections",
		path: "/collections",
		getParentRoute: () => Route$15
	}),
	CopyrightRoute: Route$10.update({
		id: "/copyright",
		path: "/copyright",
		getParentRoute: () => Route$15
	}),
	DashboardRoute: Route$9.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$15
	}),
	ForgotPasswordRoute: Route$8.update({
		id: "/forgot-password",
		path: "/forgot-password",
		getParentRoute: () => Route$15
	}),
	LicenseRoute: Route$7.update({
		id: "/license",
		path: "/license",
		getParentRoute: () => Route$15
	}),
	LoginRoute: Route$6.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$15
	}),
	PricingRoute: Route$5.update({
		id: "/pricing",
		path: "/pricing",
		getParentRoute: () => Route$15
	}),
	PrivacyRoute: Route$4.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$15
	}),
	RegisterRoute: Route$3.update({
		id: "/register",
		path: "/register",
		getParentRoute: () => Route$15
	}),
	SearchRoute: Route$22.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$15
	}),
	TermsRoute: Route$2.update({
		id: "/terms",
		path: "/terms",
		getParentRoute: () => Route$15
	}),
	UploadRoute: Route$1.update({
		id: "/upload",
		path: "/upload",
		getParentRoute: () => Route$15
	}),
	CategorySlugRoute: Route$17.update({
		id: "/category/$slug",
		path: "/category/$slug",
		getParentRoute: () => Route$15
	}),
	CollectionSlugRoute: Route$19.update({
		id: "/collection/$slug",
		path: "/collection/$slug",
		getParentRoute: () => Route$15
	}),
	CreatorUsernameRoute: Route$20.update({
		id: "/creator/$username",
		path: "/creator/$username",
		getParentRoute: () => Route$15
	}),
	CreatorDashboardRoute: Route.update({
		id: "/creator/dashboard",
		path: "/creator/dashboard",
		getParentRoute: () => Route$15
	}),
	WallpaperSlugRoute: Route$21.update({
		id: "/wallpaper/$slug",
		path: "/wallpaper/$slug",
		getParentRoute: () => Route$15
	})
};
var routeTree = Route$15._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
