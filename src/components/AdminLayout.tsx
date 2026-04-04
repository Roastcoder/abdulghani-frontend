import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  LayoutDashboard, Package, FileText, MessageSquare,
  HelpCircle, BookOpen, Wrench, LogOut, ArrowUpRight,
  Menu, X, Wheat, Globe, Bell, ChevronRight
} from "lucide-react";

const navGroups = [
  {
    label: { en: "Overview", hi: "अवलोकन" },
    items: [
      { label: "Dashboard", labelHi: "डैशबोर्ड", path: "/admin", icon: LayoutDashboard },
      { label: "Products", labelHi: "उत्पाद", path: "/admin/products", icon: Package },
      { label: "Enquiries", labelHi: "पूछताछ", path: "/admin/enquiries", icon: MessageSquare },
    ]
  },
  {
    label: { en: "Content", hi: "सामग्री" },
    items: [
      { label: "Services", labelHi: "सेवाएं", path: "/admin/services", icon: Wrench },
      { label: "Blog", labelHi: "ब्लॉग", path: "/admin/blog", icon: BookOpen },
      { label: "FAQ", labelHi: "सवाल-जवाब", path: "/admin/faq", icon: HelpCircle },
      { label: "Site Content", labelHi: "साइट सामग्री", path: "/admin/content", icon: FileText },
    ]
  }
];

const allNavItems = navGroups.flatMap(g => g.items);

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const hi = language === "hi";

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1e]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-white/40 text-sm">Loading...</p>
      </div>
    </div>
  );

  if (!user || !isAdmin) return null;

  const currentNav = allNavItems.find(n => n.path === location.pathname);

  const Sidebar = () => (
    <aside className="w-64 h-full flex flex-col bg-[#0d1117] border-r border-white/[0.06]">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25 shrink-0">
            <Wheat className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">Abdul Gani</p>
            <p className="text-white/30 text-[10px] mt-0.5">{hi ? "एडमिन पैनल" : "Admin Panel"}</p>
          </div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 px-3 py-5 space-y-6 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.label.en}>
            <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.2em] px-3 mb-2">
              {hi ? group.label.hi : group.label.en}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group relative overflow-hidden ${
                      active ? "text-white" : "text-white/40 hover:text-white/80 hover:bg-white/[0.04]"
                    }`}
                  >
                    {active && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl" />
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-primary rounded-full shadow-lg shadow-primary/50" />
                      </>
                    )}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all relative z-10 ${
                      active ? "bg-primary/30 text-primary shadow-sm shadow-primary/20" : "bg-white/[0.05] group-hover:bg-white/[0.08]"
                    }`}>
                      <item.icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="relative z-10">{hi ? item.labelHi : item.label}</span>
                    {active && <ChevronRight className="w-3 h-3 ml-auto text-primary/60 relative z-10" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 pb-4 pt-3 border-t border-white/[0.06] space-y-0.5">
        <button onClick={() => setLanguage(hi ? "en" : "hi")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/80 hover:bg-white/[0.04] transition-all">
          <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
            <Globe className="w-3.5 h-3.5" />
          </div>
          {hi ? "Switch to English" : "हिन्दी में बदलें"}
        </button>
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white/80 hover:bg-white/[0.04] transition-all">
          <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
          {hi ? "वेबसाइट देखें" : "View Website"}
        </Link>
        <button onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all">
          <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
            <LogOut className="w-3.5 h-3.5" />
          </div>
          {hi ? "साइन आउट" : "Sign Out"}
        </button>

        {/* User */}
        <div className="flex items-center gap-3 px-3 py-3 mt-2 rounded-xl bg-white/[0.04] border border-white/[0.06]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg shadow-primary/20">
            {(user?.username ?? "A")[0].toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white/80 text-xs font-semibold truncate">{user?.username ?? "admin"}</p>
            <p className="text-white/30 text-[10px]">{hi ? "प्रशासक" : "Administrator"}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-sm shadow-emerald-400/50" />
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-[#f0f2f5]">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar />
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 z-50 w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm shadow-gray-200/50">
          <div className="flex items-center justify-between px-6 h-16">
            <div className="flex items-center gap-4">
              <button
                className="md:hidden w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                onClick={() => setMobileOpen(v => !v)}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>

              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400 font-medium">{hi ? "एडमिन" : "Admin"}</span>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                <span className="text-gray-800 font-bold">
                  {hi ? (currentNav?.labelHi ?? "पेज") : (currentNav?.label ?? "Page")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Lang */}
              <button onClick={() => setLanguage(hi ? "en" : "hi")}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all shadow-sm">
                <Globe className="w-3.5 h-3.5" />
                {hi ? "EN" : "हिं"}
              </button>

              {/* Bell */}
              <button className="relative w-9 h-9 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center text-gray-500 transition-all shadow-sm">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full" />
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-gray-200 mx-1" />

              {/* User */}
              <div className="flex items-center gap-2.5 cursor-pointer group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary/20">
                  {(user?.username ?? "A")[0].toUpperCase()}
                </div>
                <div className="hidden sm:block">
                  <p className="text-gray-800 text-xs font-bold leading-none">{user?.username}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5">{hi ? "प्रशासक" : "Admin"}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </main>

        {/* Footer */}
        <footer className="px-8 py-3 border-t border-gray-200/60 bg-white/60">
          <p className="text-gray-400 text-xs text-center">
            © {new Date().getFullYear()} Abdul Gani Hazi Gulam Mohd
            <span className="mx-2 text-gray-300">·</span>
            {hi ? "सर्वाधिकार सुरक्षित" : "All rights reserved"}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
