import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserCog, Clock, ClipboardList, LogOut, Plus, Pencil, Trash2, X, RefreshCw, AlertCircle, Users, UserCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface StaffUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

const StaffManagement = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, admin, token, isSuperAdmin } = useAuth();
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Create dialog
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", email: "", password: "", role: "staff" });
  const [createError, setCreateError] = useState("");
  const [creating, setCreating] = useState(false);

  // Edit dialog
  const [editUser, setEditUser] = useState<StaffUser | null>(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "staff", isActive: true });
  const [editError, setEditError] = useState("");
  const [editing, setEditing] = useState(false);

  // Delete dialog
  const [deleteUser, setDeleteUser] = useState<StaffUser | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.STAFF, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status === 401) { logout(); navigate("/admin"); return; }
        throw new Error("Failed to fetch staff");
      }
      const data = await response.json();
      setStaff(data.data || data.staff || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [token, logout, navigate]);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);

  const handleCreate = async () => {
    setCreateError("");
    if (!createForm.name || !createForm.email || !createForm.password) {
      setCreateError("All fields are required");
      return;
    }
    setCreating(true);
    try {
      const response = await fetch(API_ENDPOINTS.STAFF, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(createForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create staff");
      setShowCreate(false);
      setCreateForm({ name: "", email: "", password: "", role: "staff" });
      fetchStaff();
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : "Failed to create staff");
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = async () => {
    if (!editUser) return;
    setEditError("");
    if (!editForm.name || !editForm.email) {
      setEditError("Name and email are required");
      return;
    }
    setEditing(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.STAFF}/${editUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to update staff");
      setEditUser(null);
      fetchStaff();
    } catch (err) {
      setEditError(err instanceof Error ? err.message : "Failed to update staff");
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUser) return;
    setDeleting(true);
    try {
      const response = await fetch(`${API_ENDPOINTS.STAFF}/${deleteUser._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to delete staff");
      setDeleteUser(null);
      fetchStaff();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete staff");
    } finally {
      setDeleting(false);
    }
  };

  const openEdit = (user: StaffUser) => {
    setEditUser(user);
    setEditForm({ name: user.name, email: user.email, role: user.role, isActive: user.isActive });
    setEditError("");
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: ClipboardList, path: "/admin/dashboard" },
    { id: "qualified", label: "Qualified Leads", icon: UserCheck, path: "/admin/qualified-leads" },
    { id: "follow-ups", label: "Follow-ups", icon: Clock, path: "/admin/follow-ups" },
    ...(isSuperAdmin ? [{ id: "staff", label: "Staff", icon: UserCog, path: "/admin/staff" }] : []),
  ];

  const totalPages = Math.ceil(staff.length / ITEMS_PER_PAGE);
  const paginatedStaff = staff.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getPageNumbers = (current: number, total: number): (number | "...")[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (current > 3) pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-hero section-pattern">
      <header className="gradient-navy text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-bold font-heading">Staff Management</h1>
              {admin && <p className="text-white/70 text-sm mt-1">Welcome, {admin.name || admin.email}</p>}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          <nav className="flex gap-1 mt-4 border-b border-white/20">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[2px]",
                  location.pathname === item.path
                    ? "border-gold text-white"
                    : "border-transparent text-white/60 hover:text-white hover:border-white/40"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-navy/5 border-b">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-xl md:text-2xl text-navy">Staff Users</CardTitle>
                <p className="text-muted-foreground text-sm mt-1">{loading ? "Loading..." : `${staff.length} users`}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={fetchStaff} disabled={loading} className="gap-2">
                  <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
                  Refresh
                </Button>
                <Button size="sm" onClick={() => { setShowCreate(true); setCreateError(""); }} className="gap-2 bg-gradient-to-r from-navy to-navy-medium text-white">
                  <Plus className="h-4 w-4" />
                  Add Staff
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <RefreshCw className="h-10 w-10 animate-spin mb-4 text-gold" />
                <p className="font-medium">Loading staff...</p>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-destructive/10 rounded-full p-4 mb-4"><AlertCircle className="h-10 w-10 text-destructive" /></div>
                <p className="font-medium text-destructive mb-2">Failed to load staff</p>
                <p className="text-muted-foreground text-sm mb-4">{error}</p>
                <Button variant="outline" onClick={fetchStaff}>Try Again</Button>
              </div>
            )}
            {!loading && !error && staff.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="text-left p-4 font-semibold text-foreground text-sm w-[50px]">Sr No</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm">Name</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm hidden sm:table-cell">Email</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm">Role</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm hidden md:table-cell">Status</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm hidden lg:table-cell">Created</th>
                      <th className="text-right p-4 font-semibold text-foreground text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedStaff.map((user, index) => (
                      <tr key={user._id} className={cn("border-b hover:bg-muted/30 transition-colors", index % 2 === 0 ? "bg-background" : "bg-muted/10")}>
                        <td className="p-4 text-sm text-muted-foreground font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full gradient-gold flex items-center justify-center text-white font-semibold text-sm shrink-0">
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </div>
                            <p className="font-medium text-foreground">{user.name}</p>
                          </div>
                        </td>
                        <td className="p-4 hidden sm:table-cell text-sm text-muted-foreground">{user.email}</td>
                        <td className="p-4">
                          <span className={cn("inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium", user.role === "super-admin" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800")}>
                            {user.role === "super-admin" ? "Super Admin" : "Staff"}
                          </span>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <span className={cn("inline-flex items-center gap-1.5 text-xs font-medium", user.isActive ? "text-emerald-600" : "text-red-500")}>
                            <span className={cn("h-2 w-2 rounded-full", user.isActive ? "bg-emerald-500" : "bg-red-500")} />
                            {user.isActive ? "Active" : "Disabled"}
                          </span>
                        </td>
                        <td className="p-4 hidden lg:table-cell text-sm text-muted-foreground">
                          {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" onClick={() => openEdit(user)} className="h-8 px-2">
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            {user._id !== admin?.id && (
                              <Button variant="ghost" size="sm" onClick={() => setDeleteUser(user)} className="h-8 px-2 text-destructive hover:text-destructive">
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {!loading && !error && totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t">
                <p className="text-sm text-muted-foreground">Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, staff.length)} of {staff.length}</p>
                <div className="flex items-center gap-1">
                  <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
                  {getPageNumbers(currentPage, totalPages).map((page, i) => (
                    page === "..." ? <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">...</span> : (
                      <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page as number)} className="h-8 w-8 p-0">{page}</Button>
                    )
                  ))}
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                </div>
              </div>
            )}
            {!loading && !error && staff.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-muted rounded-full p-4 mb-4"><Users className="h-10 w-10 text-muted-foreground" /></div>
                <p className="font-medium text-foreground mb-1">No staff users</p>
                <p className="text-muted-foreground text-sm mb-4">Add staff users to manage the admin panel.</p>
                <Button onClick={() => setShowCreate(true)} className="gap-2 bg-gradient-to-r from-navy to-navy-medium text-white">
                  <Plus className="h-4 w-4" /> Add Staff
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Create Staff Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Staff User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="create-name">Name</Label>
              <Input id="create-name" value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-email">Email</Label>
              <Input id="create-email" type="email" value={createForm.email} onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })} placeholder="email@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="create-password">Password</Label>
              <Input id="create-password" type="password" value={createForm.password} onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })} placeholder="Minimum 6 characters" />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={createForm.role} onValueChange={(value) => setCreateForm({ ...createForm, role: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {createError && <p className="text-sm text-destructive">{createError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreate(false)} disabled={creating}>Cancel</Button>
            <Button onClick={handleCreate} disabled={creating} className="bg-gradient-to-r from-navy to-navy-medium text-white">
              {creating ? "Creating..." : "Create Staff"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog open={!!editUser} onOpenChange={(open) => { if (!open) setEditUser(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input id="edit-name" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input id="edit-email" type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={editForm.role} onValueChange={(value) => setEditForm({ ...editForm, role: value })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="super-admin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Switch id="edit-active" checked={editForm.isActive} onCheckedChange={(checked) => setEditForm({ ...editForm, isActive: checked })} />
              <Label htmlFor="edit-active">Active (can login)</Label>
            </div>
            {editError && <p className="text-sm text-destructive">{editError}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditUser(null)} disabled={editing}>Cancel</Button>
            <Button onClick={handleEdit} disabled={editing} className="bg-gradient-to-r from-navy to-navy-medium text-white">
              {editing ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteUser} onOpenChange={(open) => { if (!open) setDeleteUser(null); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Staff User</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete <strong>{deleteUser?.name}</strong> ({deleteUser?.email})? This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteUser(null)} disabled={deleting}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="bg-navy text-white/60 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Admin Dashboard &copy; {new Date().getFullYear()} Edustack French Pathways</p>
        </div>
      </footer>
    </div>
  );
};

export default StaffManagement;