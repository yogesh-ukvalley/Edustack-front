import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserCheck, UserCog, ClipboardList, LogOut, RefreshCw, AlertCircle, Users, Mail, Phone, BookOpen, Calendar as CalendarIcon, Search, X, Eye, Save, Clock } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

const LEAD_STATUSES = [
  "New Lead",
  "Connected",
  "Interested",
  "Follow-up Required",
  "Follow-up Set",
  "Qualified",
  "Not Interested",
  "Other",
] as const;

const STATUS_COLORS: Record<string, string> = {
  "New Lead": "bg-blue-100 text-blue-700 border-blue-200",
  "Connected": "bg-green-100 text-green-700 border-green-200",
  "Interested": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Follow-up Required": "bg-orange-100 text-orange-700 border-orange-200",
  "Follow-up Set": "bg-teal-100 text-teal-700 border-teal-200",
  "Qualified": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Not Interested": "bg-red-100 text-red-700 border-red-200",
  "Other": "bg-purple-100 text-purple-700 border-purple-200",
};

const getDisplayStatus = (contact: Contact): string => {
  if (contact.status === "Follow-up Required" && contact.followUpDate) return "Follow-up Set";
  return contact.status || "New Lead";
};

const toLocalDateStr = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};

const formatTime = (dateString: string) => {
  return new Date(dateString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
};

interface Contact {
  _id: string;
  name: string;
  email: string;
  mobileNo: string;
  courses: string[];
  status?: string;
  statusNote?: string;
  followUpDate?: string;
  assignedTo?: { _id: string; name: string; email: string } | null;
  createdAt: string;
}

const QualifiedLeads = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, admin, token, isSuperAdmin } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  // Popup state
  const [followUpContact, setFollowUpContact] = useState<Contact | null>(null);
  const [followUpDate, setFollowUpDate] = useState<Date | undefined>(undefined);
  const [followUpStatus, setFollowUpStatus] = useState<string>("Follow-up Required");
  const [otherContact, setOtherContact] = useState<Contact | null>(null);
  const [otherNote, setOtherNote] = useState("");
  const [noteStatus, setNoteStatus] = useState<string>("Other");
  const [viewContact, setViewContact] = useState<Contact | null>(null);

  const NOTE_STATUSES = ["Connected", "Interested", "Not Interested", "Other"];

  const handleLogout = () => {
    logout();
    navigate("/admin");
  };

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.GET_CONTACTS, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        if (response.status === 401) { logout(); navigate("/admin"); return; }
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data.data || data.contacts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [token, logout, navigate]);

  useEffect(() => { fetchContacts(); }, [fetchContacts]);

  const handleStatusSelect = (contactId: string, newStatus: string) => {
    if (newStatus === "Follow-up Required" || newStatus === "Follow-up Set") {
      const contact = contacts.find((c) => c._id === contactId);
      if (contact) {
        setFollowUpContact(contact);
        setFollowUpDate(contact.followUpDate ? new Date(contact.followUpDate) : new Date());
        setFollowUpStatus(newStatus);
      }
      return;
    }
    if (NOTE_STATUSES.includes(newStatus)) {
      const contact = contacts.find((c) => c._id === contactId);
      if (contact) {
        setOtherContact(contact);
        setOtherNote(contact.statusNote || "");
        setNoteStatus(newStatus);
      }
      return;
    }
    handleStatusChange(contactId, newStatus);
  };

  const handleStatusChange = async (contactId: string, newStatus: string, extra?: { statusNote?: string; followUpDate?: string }) => {
    const prevContact = contacts.find((c) => c._id === contactId);
    if (!prevContact) return;

    setContacts((prev) =>
      prev.map((c) => {
        if (c._id !== contactId) return c;
        const updated = { ...c, status: newStatus };
        if (extra?.statusNote !== undefined) updated.statusNote = extra.statusNote;
        if (extra?.followUpDate !== undefined) updated.followUpDate = extra.followUpDate || undefined;
        if (NOTE_STATUSES.includes(prevContact.status) && !NOTE_STATUSES.includes(newStatus)) updated.statusNote = "";
        if (prevContact.status === "Follow-up Required" && newStatus !== "Follow-up Required" && newStatus !== "Follow-up Set") updated.followUpDate = undefined;
        if (prevContact.status === "Follow-up Set" && newStatus !== "Follow-up Set" && newStatus !== "Follow-up Required") updated.followUpDate = undefined;
        return updated;
      })
    );

    setUpdatingId(contactId);
    try {
      const body: Record<string, string> = { status: newStatus };
      if (extra?.statusNote !== undefined) body.statusNote = extra.statusNote;
      if (extra?.followUpDate) body.followUpDate = extra.followUpDate;
      if (NOTE_STATUSES.includes(prevContact.status) && !NOTE_STATUSES.includes(newStatus)) body.statusNote = "";
      if (prevContact.status === "Follow-up Required" && newStatus !== "Follow-up Required" && newStatus !== "Follow-up Set") body.followUpDate = "";
      if (prevContact.status === "Follow-up Set" && newStatus !== "Follow-up Set" && newStatus !== "Follow-up Required") body.followUpDate = "";

      const response = await fetch(API_ENDPOINTS.CONTACT_STATUS(contactId), {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update status");
      }
      const result = await response.json();
      const updated = result.data || result.contact;
      if (updated) {
        setContacts((prev) => prev.map((c) => (c._id === contactId ? { ...c, ...updated } : c)));
      }
      toast.success(`Status updated to "${newStatus}"`);
    } catch (err) {
      setContacts((prev) => prev.map((c) => (c._id === contactId ? prevContact : c)));
      toast.error(err instanceof Error ? err.message : "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleFollowUpSave = async () => {
    if (!followUpContact || !followUpDate) return;
    const dateStr = toLocalDateStr(followUpDate);
    await handleStatusChange(followUpContact._id, followUpStatus, { followUpDate: dateStr });
    setFollowUpContact(null);
  };

  const handleOtherSave = async () => {
    if (!otherContact) return;
    await handleStatusChange(otherContact._id, noteStatus, { statusNote: otherNote });
    setOtherContact(null);
  };

  const allCourses = useMemo(() => {
    const courseSet = new Set<string>();
    contacts.forEach((c) => c.courses?.forEach((course) => courseSet.add(course)));
    return Array.from(courseSet).sort();
  }, [contacts]);

  const qualifiedLeads = useMemo(() => {
    let result = contacts.filter((c) => c.status === "Qualified");
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) =>
        c.name?.toLowerCase().includes(q) ||
        c.email?.toLowerCase().includes(q) ||
        c.mobileNo?.toLowerCase().includes(q) ||
        c.courses?.some((course) => course.toLowerCase().includes(q)) ||
        getDisplayStatus(c).toLowerCase().includes(q)
      );
    }
    if (filterStatus !== "all") result = result.filter((c) => getDisplayStatus(c) === filterStatus);
    if (filterCourse !== "all") result = result.filter((c) => c.courses?.includes(filterCourse));
    return result;
  }, [contacts, searchQuery, filterStatus, filterCourse]);

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [searchQuery, filterStatus, filterCourse]);

  const totalPages = Math.ceil(qualifiedLeads.length / ITEMS_PER_PAGE);
  const paginatedLeads = qualifiedLeads.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const getPageNumbers = (current: number, total: number): (number | "...")[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (current > 3) pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push("...");
    pages.push(total);
    return pages;
  };

  const totalQualified = qualifiedLeads.length;

  const renderContactInfo = (contact: Contact) => (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full gradient-gold flex items-center justify-center text-white font-bold text-lg shrink-0">
          {contact.name?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="font-semibold text-foreground text-lg">{contact.name}</p>
          <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", STATUS_COLORS[getDisplayStatus(contact)] || "bg-gray-100 text-gray-700 border-gray-200")}>
            {getDisplayStatus(contact)}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-muted-foreground shrink-0" /><a href={`mailto:${contact.email}`} className="text-primary hover:underline">{contact.email}</a></div>
        <div className="flex items-center gap-2 text-sm"><Phone className="h-4 w-4 text-muted-foreground shrink-0" /><a href={`tel:${contact.mobileNo}`} className="text-primary hover:underline">{contact.mobileNo}</a></div>
        <div className="flex items-center gap-2 text-sm"><BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
          <div className="flex flex-wrap gap-1">
            {contact.courses && contact.courses.length > 0 ? (
              contact.courses.map((course) => (<span key={course} className={cn("inline-flex items-center px-2 py-0.5 rounded text-xs font-medium", course === "A1" && "bg-green-100 text-green-700", course === "A2" && "bg-blue-100 text-blue-700", course === "B1" && "bg-purple-100 text-purple-700", course === "B2" && "bg-orange-100 text-orange-700")}>{course}</span>))
            ) : <span className="text-muted-foreground">-</span>}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm"><CalendarIcon className="h-4 w-4 text-muted-foreground shrink-0" /><span>Submitted: {formatDate(contact.createdAt)}</span></div>
      </div>
      {contact.followUpDate && (
        <div className="flex items-center gap-2 text-sm bg-orange-50 border border-orange-200 rounded-md px-3 py-2">
          <CalendarIcon className="h-4 w-4 text-orange-600 shrink-0" />
          <span className="text-orange-700 font-medium">Follow-up: {formatDate(contact.followUpDate)}</span>
        </div>
      )}
      {contact.statusNote && (
        <div className="bg-purple-50 border border-purple-200 rounded-md px-3 py-2">
          <p className="text-xs font-medium text-purple-700 mb-0.5">Note:</p>
          <p className="text-sm text-purple-800">{contact.statusNote}</p>
        </div>
      )}
    </div>
  );

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: ClipboardList, path: "/admin/dashboard" },
    { id: "qualified", label: "Qualified Leads", icon: UserCheck, path: "/admin/qualified-leads" },
    { id: "follow-ups", label: "Follow-ups", icon: Clock, path: "/admin/follow-ups" },
    ...(isSuperAdmin ? [{ id: "staff", label: "Staff", icon: UserCog, path: "/admin/staff" }] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-hero section-pattern">
      <header className="gradient-navy text-white py-4 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-bold font-heading">Qualified Leads</h1>
              {admin && <p className="text-white/70 text-sm mt-1">Welcome, {admin.name || admin.email}</p>}
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-white/10 border-white/20 text-white hover:bg-white/20">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
          <nav className="flex gap-1 mt-4 border-b border-white/20">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => navigate(item.path)} className={cn("flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-[2px]", location.pathname === item.path ? "border-gold text-white" : "border-transparent text-white/60 hover:text-white hover:border-white/40")}>
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-cyan-600 to-cyan-500">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-white/80 text-xs md:text-sm font-medium">Qualified Leads</p><p className="text-white text-xl md:text-2xl font-bold mt-1">{totalQualified}</p></div>
                <div className="p-2 md:p-3 rounded-xl bg-white/20"><UserCheck className="h-5 w-5 md:h-6 md:w-6 text-white" /></div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-navy to-navy-medium">
            <CardContent className="p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div><p className="text-white/80 text-xs md:text-sm font-medium">Total Contacts</p><p className="text-white text-xl md:text-2xl font-bold mt-1">{contacts.length}</p></div>
                <div className="p-2 md:p-3 rounded-xl bg-white/20"><Users className="h-5 w-5 md:h-6 md:w-6 text-white" /></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Qualified Leads Table */}
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardHeader className="bg-cyan-500/5 border-b">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl md:text-2xl text-navy">Qualified Leads</CardTitle>
                  <p className="text-muted-foreground text-sm mt-1">{loading ? "Loading..." : `${qualifiedLeads.length} qualified leads`}</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchContacts} disabled={loading} className="gap-2 self-start">
                  <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />Refresh
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search by name, phone, email, course, or status..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 h-9" />
                  {searchQuery && (<button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-muted-foreground hover:text-foreground" /></button>)}
                </div>
                <Button variant="outline" size="sm" className={cn("gap-2 h-9", showFilters && "bg-muted")} onClick={() => setShowFilters(!showFilters)}>
                  <BookOpen className="h-4 w-4" />Filters
                </Button>
              </div>
              {showFilters && (
                <div className="flex flex-wrap gap-3 pt-1">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-[180px] h-9"><SelectValue placeholder="Status" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {LEAD_STATUSES.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  <Select value={filterCourse} onValueChange={setFilterCourse}>
                    <SelectTrigger className="w-[150px] h-9"><SelectValue placeholder="Course" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {allCourses.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
                    </SelectContent>
                  </Select>
                  {(filterStatus !== "all" || filterCourse !== "all") && (
                    <Button variant="ghost" size="sm" className="h-9 text-xs" onClick={() => { setFilterStatus("all"); setFilterCourse("all"); }}>Clear Filters</Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <RefreshCw className="h-10 w-10 animate-spin mb-4 text-gold" /><p className="font-medium">Loading qualified leads...</p>
              </div>
            )}
            {error && (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="bg-destructive/10 rounded-full p-4 mb-4"><AlertCircle className="h-10 w-10 text-destructive" /></div>
                <p className="font-medium text-destructive mb-2">Failed to load qualified leads</p>
                <p className="text-muted-foreground text-sm mb-4">{error}</p>
                <Button variant="outline" onClick={fetchContacts}>Try Again</Button>
              </div>
            )}
            {!loading && !error && qualifiedLeads.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <div className="bg-muted rounded-full p-4 mb-4"><UserCheck className="h-10 w-10 text-muted-foreground" /></div>
                <p className="font-medium text-foreground mb-1">No qualified leads yet</p>
                <p className="text-muted-foreground text-sm">Leads marked as &quot;Qualified&quot; will appear here.</p>
              </div>
            )}
            {!loading && !error && qualifiedLeads.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="text-left p-4 font-semibold text-foreground text-sm w-[50px]">Sr No</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm"><Users className="h-4 w-4 text-muted-foreground inline mr-1" /> Name</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm"><Phone className="h-4 w-4 text-muted-foreground inline mr-1" /> Phone</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm hidden sm:table-cell"><Mail className="h-4 w-4 text-muted-foreground inline mr-1" /> Email</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm hidden md:table-cell"><BookOpen className="h-4 w-4 text-muted-foreground inline mr-1" /> Course</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm">Status</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm hidden lg:table-cell">Notes</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedLeads.map((contact, index) => (
                      <tr key={contact._id} className={cn("border-b hover:bg-muted/30 transition-colors", index % 2 === 0 ? "bg-background" : "bg-muted/10")}>
                        <td className="p-4 text-sm text-muted-foreground font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="hidden sm:flex h-9 w-9 rounded-full gradient-gold items-center justify-center text-white font-semibold text-sm shrink-0">{contact.name?.charAt(0)?.toUpperCase() || "U"}</div>
                            <div><p className="font-medium text-foreground">{contact.name}</p><p className="text-xs text-muted-foreground sm:hidden">{contact.mobileNo}</p></div>
                          </div>
                        </td>
                        <td className="p-4">
                          <a href={`tel:${contact.mobileNo}`} className="font-mono text-sm text-primary hover:text-gold transition-colors">{contact.mobileNo}</a>
                        </td>
                        <td className="p-4 hidden sm:table-cell">
                          <a href={`mailto:${contact.email}`} className="text-primary hover:text-gold transition-colors text-sm">{contact.email}</a>
                        </td>
                        <td className="p-4 hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {contact.courses && contact.courses.length > 0 ? (
                              contact.courses.map((course) => (<span key={course} className={cn("inline-flex items-center px-2 py-1 rounded-md text-xs font-medium", course === "A1" && "bg-green-100 text-green-700", course === "A2" && "bg-blue-100 text-blue-700", course === "B1" && "bg-purple-100 text-purple-700", course === "B2" && "bg-orange-100 text-orange-700")}>{course}</span>))
                            ) : <span className="text-muted-foreground">-</span>}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 min-w-[140px]">
                            <Select value={getDisplayStatus(contact)} onValueChange={(value) => handleStatusSelect(contact._id, value)} disabled={updatingId === contact._id}>
                              <SelectTrigger className="h-8 text-xs border-border flex-1"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                {LEAD_STATUSES.map((status) => (<SelectItem key={status} value={status}>{status}</SelectItem>))}
                              </SelectContent>
                            </Select>
                            {updatingId === contact._id && <RefreshCw className="h-3.5 w-3.5 animate-spin text-muted-foreground shrink-0" />}
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell">
                          {contact.statusNote ? (
                            <span className="text-sm text-muted-foreground truncate max-w-[120px] inline-block" title={contact.statusNote}>{contact.statusNote.length > 30 ? contact.statusNote.substring(0, 30) + "..." : contact.statusNote}</span>
                          ) : <span className="text-muted-foreground">-</span>}
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" className="gap-1.5 h-8 px-2" onClick={() => setViewContact(contact)}>
                            <Eye className="h-3.5 w-3.5" /><span className="text-xs">View</span>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t">
                <p className="text-sm text-muted-foreground">Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, qualifiedLeads.length)} of {qualifiedLeads.length}</p>
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
          </CardContent>
        </Card>

        {/* Mobile Cards */}
        {!loading && !error && paginatedLeads.length > 0 && (
          <div className="mt-6 md:hidden space-y-4">
            {paginatedLeads.map((contact) => (
              <Card key={contact._id} className="shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full gradient-gold flex items-center justify-center text-white font-semibold shrink-0">{contact.name?.charAt(0)?.toUpperCase() || "U"}</div>
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-foreground truncate">{contact.name}</p>
                        <div className="flex items-center gap-1">
                          <span className={cn("text-xs px-2 py-0.5 rounded-full border", STATUS_COLORS[getDisplayStatus(contact)] || "bg-gray-100 text-gray-700 border-gray-200")}>{getDisplayStatus(contact)}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setViewContact(contact)}><Eye className="h-3.5 w-3.5" /></Button>
                        </div>
                      </div>
                      <a href={`tel:${contact.mobileNo}`} className="text-sm text-primary hover:text-gold block">{contact.mobileNo}</a>
                      <a href={`mailto:${contact.email}`} className="text-sm text-muted-foreground truncate block">{contact.email}</a>
                      <div className="flex flex-wrap gap-1">
                        {contact.courses?.map((course) => (<span key={course} className={cn("px-2 py-0.5 rounded text-xs font-medium", course === "A1" && "bg-green-100 text-green-700", course === "A2" && "bg-blue-100 text-blue-700", course === "B1" && "bg-purple-100 text-purple-700", course === "B2" && "bg-orange-100 text-orange-700")}>{course}</span>))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 pt-2">
                <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Prev</Button>
                {getPageNumbers(currentPage, totalPages).map((page, i) => (
                  page === "..." ? <span key={`ellipsis-${i}`} className="px-1 text-muted-foreground">...</span> : (
                    <Button key={page} variant={page === currentPage ? "default" : "outline"} size="sm" onClick={() => setCurrentPage(page as number)} className="h-8 w-8 p-0">{page}</Button>
                  )
                ))}
                <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Follow-up Date Popup */}
      <Dialog open={!!followUpContact} onOpenChange={(open) => { if (!open) setFollowUpContact(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>Set Follow-up Date</DialogTitle><DialogDescription>Choose a follow-up date for {followUpContact?.name}</DialogDescription></DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex justify-center"><Calendar mode="single" selected={followUpDate} onSelect={setFollowUpDate} className="rounded-md border" /></div>
            {followUpDate && (<div className="flex items-center gap-2"><Label className="text-sm text-muted-foreground shrink-0">Selected:</Label><Input type="date" value={followUpDate ? toLocalDateStr(followUpDate) : ""} onChange={(e) => setFollowUpDate(e.target.value ? new Date(e.target.value + "T00:00:00") : undefined)} className="h-9" /></div>)}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFollowUpContact(null)}>Cancel</Button>
            <Button onClick={handleFollowUpSave} disabled={!followUpDate || updatingId === followUpContact?._id} className="gap-2 bg-gradient-to-r from-navy to-navy-medium text-white"><Save className="h-4 w-4" />{updatingId === followUpContact?._id ? "Saving..." : "Save Follow-up"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Note Popup */}
      <Dialog open={!!otherContact} onOpenChange={(open) => { if (!open) setOtherContact(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader><DialogTitle>{noteStatus === "Other" ? "Add Custom Note" : `Add Note — ${noteStatus}`}</DialogTitle><DialogDescription>Add a note for {otherContact?.name}'s status change to "{noteStatus}"</DialogDescription></DialogHeader>
          <div className="py-2"><Label htmlFor="other-note" className="mb-2 block text-sm font-medium">Note</Label><Textarea id="other-note" placeholder="Enter note..." value={otherNote} onChange={(e) => setOtherNote(e.target.value)} rows={3} className="resize-none" /></div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOtherContact(null)}>Cancel</Button>
            <Button onClick={handleOtherSave} disabled={updatingId === otherContact?._id} className="gap-2 bg-gradient-to-r from-navy to-navy-medium text-white"><Save className="h-4 w-4" />{updatingId === otherContact?._id ? "Saving..." : "Save Note"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Contact Detail Popup */}
      <Dialog open={!!viewContact} onOpenChange={(open) => { if (!open) setViewContact(null); }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader><DialogTitle>Lead Details</DialogTitle><DialogDescription>Complete information for this lead</DialogDescription></DialogHeader>
          {viewContact && renderContactInfo(viewContact)}
          <DialogFooter><Button variant="outline" onClick={() => setViewContact(null)}>Close</Button></DialogFooter>
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

export default QualifiedLeads;