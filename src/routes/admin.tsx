import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ShieldAlert,
  Check,
  X,
  Image as ImageIcon,
  Users,
  Grid,
  Flag,
  BarChart3,
  Search,
  Plus,
  Shield,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories as defaultCategories, wallpapers as seedWallpapers, formatCount } from "@/lib/wallpapers";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Pixelvault" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

export function AdminPage() {
  const { isStaff, loading: authLoading } = useAuth();

  // Pending wallpapers queue state
  const [pendingWallpapers, setPendingWallpapers] = useState<any[]>([]);
  const [loadingPending, setLoadingPending] = useState(true);


  // Users state
  const [usersList, setUsersList] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Reports state
  const [reportsList, setReportsList] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  // Categories state
  const [categoryList, setCategoryList] = useState(defaultCategories);
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");

  const fetchPendingWallpapers = async () => {
    setLoadingPending(true);
    try {
      const { data, error } = await supabase
        .from("wallpapers")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setPendingWallpapers(data);
      } else {
        // Fallback demo queue items
        setPendingWallpapers([
          {
            id: "p1",
            title: "Cyber Neon Alley 8K",
            category: "Urban",
            image_url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80",
            created_at: new Date().toISOString(),
            status: "pending",
            width: 3840,
            height: 2160,
          },
          {
            id: "p2",
            title: "Prismatic Wave Abstract",
            category: "Abstract",
            image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
            created_at: new Date().toISOString(),
            status: "pending",
            width: 2560,
            height: 1440,
          },
        ]);
      }
    } catch (err: any) {
      console.error("Fetch pending error:", err);
    } finally {
      setLoadingPending(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (data && data.length > 0) {
        setUsersList(data);
      } else {
        setUsersList([
          { id: "u1", username: "alexm", display_name: "Alex Mercer", is_creator: true, created_at: "2026-08-01" },
          { id: "u2", username: "linaf", display_name: "Lina Farouk", is_creator: true, created_at: "2026-08-05" },
          { id: "u3", username: "kaitom", display_name: "Kaito Mori", is_creator: true, created_at: "2026-08-10" },
        ]);
      }
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
      if (data && data.length > 0) {
        setReportsList(data);
      } else {
        setReportsList([
          { id: "r1", reason: "Copyright dispute", details: "Author claims original photography rights.", status: "open", created_at: new Date().toISOString(), wallpapers: { title: "Dawn Ridge Mist" } },
        ]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReports(false);
    }
  };

  useEffect(() => {
    fetchPendingWallpapers();
    fetchUsers();
    fetchReports();
  }, []);

  const handleModerationAction = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("wallpapers")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;
      toast.success(`Wallpaper ${newStatus} successfully!`);
      setPendingWallpapers((prev) => prev.filter((item) => item.id !== id));
    } catch (err: any) {
      toast.error(err.message || "Action failed");
    }
  };

  const handleUpdateReportStatus = async (reportId: string, status: string) => {
    try {
      await supabase.from("reports").update({ status }).eq("id", reportId);
      toast.success(`Report status updated to ${status}`);
      setReportsList((prev) => prev.map((r) => (r.id === reportId ? { ...r, status } : r)));
    } catch (err: any) {
      toast.error(err.message || "Failed to update report");
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName) return;
    const slug = newCatSlug || newCatName.toLowerCase().replace(/\s+/g, "-");

    setCategoryList((prev) => [
      ...prev,
      {
        slug,
        name: newCatName,
        count: 0,
        cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
        description: `Wallpapers in the ${newCatName} collection.`,
      },
    ]);
    toast.success(`Category "${newCatName}" added!`);
    setNewCatName("");
    setNewCatSlug("");
  };

  const filteredUsers = usersList.filter(
    (u) =>
      u.display_name?.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.username?.toLowerCase().includes(userSearch.toLowerCase())
  );

  if (!authLoading && !isStaff) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-red-500/10 text-red-400">
          <ShieldAlert className="size-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">Access Denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          You do not have staff or administrator privileges to view the moderation queue or manage platform users.
        </p>
        <Button asChild className="mt-6 bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="size-8 text-[#7C3AED]" /> Admin Command Center
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage user submissions, content moderation, reports, user roles, and platform health.
          </p>
        </div>
        <span className="rounded-full bg-[#7C3AED]/20 px-4 py-1.5 text-xs font-semibold text-[#EDE9FE] border border-[#7C3AED]/40">
          {pendingWallpapers.length} Pending Review
        </span>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="moderation" className="mt-8">
        <TabsList className="bg-[#1A1A1A] border border-border">
          <TabsTrigger value="moderation" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Moderation Queue ({pendingWallpapers.length})
          </TabsTrigger>
          <TabsTrigger value="users" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Users & Roles ({usersList.length})
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Reports ({reportsList.length})
          </TabsTrigger>
          <TabsTrigger value="categories" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Categories ({categoryList.length})
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#7C3AED] data-[state=active]:text-white">
            Analytics Overview
          </TabsTrigger>
        </TabsList>

        {/* MODERATION QUEUE TAB */}
        <TabsContent value="moderation" className="mt-6">
          {loadingPending ? (
            <div className="py-20 text-center text-muted-foreground">Loading queue...</div>
          ) : pendingWallpapers.length === 0 ? (
            <div className="py-20 text-center">
              <ImageIcon className="mx-auto size-12 text-muted-foreground/40" />
              <p className="mt-2 text-white font-medium">No pending wallpapers to review!</p>
              <p className="text-xs text-muted-foreground">All uploaded content has been moderated.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pendingWallpapers.map((item) => (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-border bg-[#1A1A1A] shadow-xl">
                  <div className="relative aspect-video w-full overflow-hidden bg-[#111111]">
                    <img src={item.image_url || item.src || seedWallpapers[0].src} alt={item.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white truncate">{item.title}</h3>
                    <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="rounded bg-muted px-2 py-0.5 uppercase text-white font-mono">{item.category}</span>
                      <span>{item.width || 3840}×{item.height || 2160}</span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button
                        onClick={() => handleModerationAction(item.id, "approved")}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1"
                      >
                        <Check className="size-4" /> Approve Live
                      </Button>
                      <Button
                        onClick={() => handleModerationAction(item.id, "rejected")}
                        variant="destructive"
                        className="flex-1 text-xs gap-1"
                      >
                        <X className="size-4" /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* USERS MANAGEMENT TAB */}
        <TabsContent value="users" className="mt-6 space-y-4">
          <div className="flex max-w-md gap-2">
            <Input
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              placeholder="Search users by name or handle..."
              className="bg-[#1A1A1A] border-border text-white text-xs"
            />
          </div>

          <div className="rounded-2xl border border-border bg-[#1A1A1A] divide-y divide-border overflow-hidden">
            {filteredUsers.map((u) => (
              <div key={u.id} className="flex items-center justify-between p-4 hover:bg-[#111111]/50">
                <div>
                  <p className="font-bold text-white text-sm">{u.display_name || u.username}</p>
                  <p className="text-xs text-muted-foreground">@{u.username || "user"} · Joined {new Date(u.created_at || Date.now()).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#7C3AED]/20 px-2.5 py-1 text-xs font-semibold text-[#EDE9FE]">
                    {u.is_creator ? "Creator" : "Standard User"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* REPORTS TAB */}
        <TabsContent value="reports" className="mt-6">
          <div className="rounded-2xl border border-border bg-[#1A1A1A] divide-y divide-border overflow-hidden">
            {reportsList.map((rep) => (
              <div key={rep.id} className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <span className="inline-block rounded bg-amber-500/20 px-2 py-0.5 text-xs font-bold text-amber-300 uppercase">
                    {rep.status}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1">{rep.reason}</h3>
                  <p className="text-xs text-muted-foreground">Target wallpaper: <strong className="text-white">{rep.wallpapers?.title || "Wallpaper"}</strong></p>
                  {rep.details && <p className="text-xs text-muted-foreground mt-1">{rep.details}</p>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleUpdateReportStatus(rep.id, "resolved")} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
                    Resolve
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleUpdateReportStatus(rep.id, "dismissed")} className="border-border text-white text-xs">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* CATEGORIES TAB */}
        <TabsContent value="categories" className="mt-6 space-y-6">
          <form onSubmit={handleAddCategory} className="flex max-w-lg gap-2">
            <Input
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              placeholder="New category name..."
              className="bg-[#1A1A1A] border-border text-white text-xs"
            />
            <Button type="submit" className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white">
              <Plus className="size-4 mr-1" /> Add Category
            </Button>
          </form>

          <div className="grid gap-4 sm:grid-cols-3">
            {categoryList.map((c) => (
              <div key={c.slug} className="rounded-xl border border-border bg-[#1A1A1A] p-4 flex items-center gap-3">
                <img src={c.cover} alt={c.name} className="size-12 rounded-lg object-cover" />
                <div>
                  <p className="font-bold text-white text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{formatCount(c.count)} wallpapers</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* ANALYTICS TAB */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-border bg-[#1A1A1A] p-5">
              <Users className="size-5 text-[#7C3AED]" />
              <p className="mt-2 font-display text-2xl font-bold text-white">4,820</p>
              <p className="text-xs text-muted-foreground">Total Users</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#1A1A1A] p-5">
              <ImageIcon className="size-5 text-[#7C3AED]" />
              <p className="mt-2 font-display text-2xl font-bold text-white">26,410</p>
              <p className="text-xs text-muted-foreground">Active Wallpapers</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#1A1A1A] p-5">
              <BarChart3 className="size-5 text-emerald-400" />
              <p className="mt-2 font-display text-2xl font-bold text-emerald-400">142.8k</p>
              <p className="text-xs text-muted-foreground">Monthly Downloads</p>
            </div>
            <div className="rounded-2xl border border-border bg-[#1A1A1A] p-5">
              <Shield className="size-5 text-amber-300" />
              <p className="mt-2 font-display text-2xl font-bold text-amber-300">$18,400</p>
              <p className="text-xs text-muted-foreground">Monthly Recurring Revenue</p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}