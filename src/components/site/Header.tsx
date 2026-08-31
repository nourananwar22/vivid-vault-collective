import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, Upload, User as UserIcon, LogOut, ShieldAlert, LayoutDashboard, Crown, Sparkles } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AuthModal } from "@/components/site/AuthModal";
import { useAuth } from "@/lib/auth";

const nav = [
  { to: "/browse", label: "Browse" },
  { to: "/categories", label: "Categories" },
  { to: "/pricing", label: "Pricing" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function Header() {
  const navigate = useNavigate();
  const { user, profile, isStaff, isCreator, signOut } = useAuth();
  const [q, setQ] = useState("");
  const [openMobile, setOpenMobile] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/browse", search: { q: q || undefined } });
    setOpenMobile(false);
  };

  const handleOpenAuth = (mode: "login" | "register") => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-primary font-display text-sm font-bold text-primary-foreground shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            P
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">Pixelvault</span>
        </Link>

        <form onSubmit={submit} className="relative hidden flex-1 md:block max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search wallpapers, tags, categories…"
            aria-label="Search wallpapers"
            className="h-10 rounded-full border-border bg-card pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </form>

        <nav className="hidden items-center gap-1 lg:flex ml-2">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
          {isStaff && (
            <Link
              to="/admin"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm text-[#7C3AED] hover:text-[#EDE9FE]"
            >
              <ShieldAlert className="size-4" /> Admin
            </Link>
          )}
        </nav>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <Button asChild variant="ghost" size="sm" className="hover:bg-secondary">
            <Link to="/upload">
              <Upload className="size-4" /> Upload
            </Link>
          </Button>

          <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary-dark font-medium shadow-[0_0_12px_rgba(124,58,237,0.3)]">
            <Link to="/pricing">
              <Sparkles className="size-3.5" /> Go Premium
            </Link>
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative size-9 rounded-full p-0 border border-border">
                  <Avatar className="size-9">
                    <AvatarImage src={profile?.avatar_url || undefined} alt={profile?.display_name || "User"} />
                    <AvatarFallback className="bg-primary/20 text-[#7C3AED] text-xs font-bold">
                      {(profile?.display_name || user.email || "U").substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#1A1A1A] border-border text-foreground">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{profile?.display_name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/dashboard" className="flex items-center gap-2">
                    <LayoutDashboard className="size-4 text-primary" /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/upload" className="flex items-center gap-2">
                    <Upload className="size-4 text-muted-foreground" /> Creator Studio
                  </Link>
                </DropdownMenuItem>
                {isStaff && (
                  <DropdownMenuItem asChild className="cursor-pointer text-[#7C3AED]">
                    <Link to="/admin" className="flex items-center gap-2 font-medium">
                      <ShieldAlert className="size-4" /> Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer text-red-400 focus:text-red-400">
                  <LogOut className="size-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => handleOpenAuth("login")}>
                Sign In
              </Button>
              <Button size="sm" variant="outline" className="border-[#7C3AED]/40 text-[#EDE9FE] hover:bg-[#7C3AED]/20" onClick={() => handleOpenAuth("register")}>
                Register
              </Button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <Sheet open={openMobile} onOpenChange={setOpenMobile}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-auto md:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-[#1A1A1A] border-border text-foreground">
            <form onSubmit={submit} className="mt-8">
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search wallpapers…"
                aria-label="Search wallpapers"
                className="bg-background border-border"
              />
            </form>
            <nav className="mt-6 grid gap-1">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpenMobile(false)}
                  className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/upload"
                onClick={() => setOpenMobile(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                Upload Wallpaper
              </Link>
              {isStaff && (
                <Link
                  to="/admin"
                  onClick={() => setOpenMobile(false)}
                  className="rounded-md px-3 py-2 text-sm font-medium text-[#7C3AED] hover:bg-secondary"
                >
                  Admin Panel
                </Link>
              )}
            </nav>

            <div className="mt-6 border-t border-border pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-2">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/20 text-[#7C3AED] text-xs font-bold">
                        {(profile?.display_name || user.email || "U").substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-medium text-white">{profile?.display_name || "User"}</p>
                      <p className="truncate text-[10px] text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full justify-start text-xs border-border" onClick={() => { signOut(); setOpenMobile(false); }}>
                    <LogOut className="size-3.5 mr-2" /> Sign Out
                  </Button>
                </div>
              ) : (
                <div className="grid gap-2">
                  <Button className="w-full bg-[#7C3AED] hover:bg-[#5B21B6]" onClick={() => { setOpenMobile(false); handleOpenAuth("login"); }}>
                    Sign In
                  </Button>
                  <Button variant="outline" className="w-full border-border" onClick={() => { setOpenMobile(false); handleOpenAuth("register"); }}>
                    Create Account
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} defaultMode={authMode} />
    </header>
  );
}
