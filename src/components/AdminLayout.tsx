import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LayoutDashboard, Package, FileText, MessageSquare, HelpCircle, BookOpen, LogOut, ArrowUpRight, Menu, X, ChevronRight, Wheat, Globe } from "lucide-react";

const navItems = [
  { label: "Dashboard", labelHi: "डैशबोर्ड", path: "/admin", icon: LayoutDashboard },
  { label: "Products", labelHi: "उत्पाद", path: "/admin/products", icon: Package },
  { label: "Enquiries", labelHi: "पूछताछ", path: "/admin/enquiries", icon: MessageSquare },
  { label: "Blog", labelHi: "ब्लॉग", path: "/admin/blog", icon: BookOpen },
  { label: "FAQ", labelHi: "सवाल-जवाब", path: "/admin/faq", icon: HelpCircle },
  { label: "Site Content", labelHi: "साइट सामग्री", path: "/admin/content", icon: FileText },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHindi = language === "hi";

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) navigate("/admin/login");
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );

  if (!user || !isAdmin) return null;

  const currentNav = navItems.find(n => n.path === location.pathname);
  const currentLabel = isHindi ? (currentNav?.labelHi ?? "पेज") : (currentNav?.label ?? "Page");

  const LangToggle = () => (
    <button
      onClick={() => setLanguage(isHindi ? "en" : "hi")}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-900 transition-all"
      title="Switch Language"
    >
      <Globe className="w-3.5 h-3.5" />
      {isHindi ? "EN" : "हिं"}
    </button>
  );

  const Sidebar = () => (
    <aside className="w-64 h-full bg-white border-r border-gray-100 flex flex-col shadow-sm">
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <Wheat className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-gray-900 font-bold text-sm leading-none">Abdul Gani</p>
            <p className="text-gray-400 text-[11px] mt-0.5">{isHindi ? "एडमिन पैनल" : "Admin Panel"}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-gray-400 text-[10px] font-semibold uppercase tracking-widest px-3 mb-3">
          {isHindi ? "मेनू" : "Menu"}
        </p>
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                active ? "bg-primary text-primary-foreground shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{isHindi ? item.labelHi : item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-gray-100 space-y-1">
        {/* Language toggle in sidebar */}
        <button
          onClick={() => setLanguage(isHindi ? "en" : "hi")}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
        >
          <Globe className="w-4 h-4" />
          {isHindi ? "Switch to English" : "हिन्दी में बदलें"}
        </button>
        <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all">
          <ArrowUpRight className="w-4 h-4" /> {isHindi ? "वेबसाइट देखें" : "View Website"}
        </Link>
        <button onClick={() => signOut()} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all">
          <LogOut className="w-4 h-4" /> {isHindi ? "साइन आउट" : "Sign Out"}
        </button>
        <div className="flex items-center gap-3 px-3 py-3 mt-1 rounded-xl bg-gray-50 border border-gray-100">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
            {(user?.username ?? "A")[0].toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-gray-800 text-xs font-semibold truncate">{user?.username ?? "admin"}</p>
            <p className="text-gray-400 text-[10px]">{isHindi ? "प्रशासक" : "Administrator"}</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <div className="hidden md:flex flex-col fixed inset-y-0 left-0 w-64 z-30"><Sidebar /></div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-64 z-50"><Sidebar /></div>
        </div>
      )}

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <button className="md:hidden w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors" onClick={() => setMobileOpen(v => !v)}>
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-gray-400">{isHindi ? "एडमिन" : "Admin"}</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              <span className="text-gray-800 font-semibold">{currentLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <LangToggle />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-400 text-xs">Live</span>
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
