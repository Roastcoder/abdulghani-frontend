import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";
import { Package, MessageSquare, TrendingUp, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const statusColors: Record<string, string> = {
  new: "bg-blue-50 text-blue-600 border-blue-100",
  contacted: "bg-amber-50 text-amber-600 border-amber-100",
  closed: "bg-green-50 text-green-600 border-green-100",
};

const statusLabels: Record<string, { en: string; hi: string }> = {
  new: { en: "New", hi: "नया" },
  contacted: { en: "Contacted", hi: "संपर्क किया" },
  closed: { en: "Closed", hi: "बंद" },
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
  const hi = language === "hi";
  const { data: products } = useProducts();
  const { data: enquiries = [] } = useQuery({
    queryKey: ["enquiries"],
    queryFn: async () => { const res = await fetch(`${API_BASE_URL}/api/enquiries`); return res.ok ? res.json() : []; },
  });

  const newCount = enquiries.filter((e: any) => e.status === "new").length;
  const recent = enquiries.slice(0, 5);

  const stats = [
    { label: hi ? "कुल उत्पाद" : "Total Products", value: products?.length ?? 0, icon: Package, color: "bg-violet-50 text-violet-600 border-violet-100" },
    { label: hi ? "कुल पूछताछ" : "Total Enquiries", value: enquiries.length, icon: MessageSquare, color: "bg-emerald-50 text-emerald-600 border-emerald-100", badge: newCount },
    { label: hi ? "नई पूछताछ" : "New Enquiries", value: newCount, icon: TrendingUp, color: "bg-blue-50 text-blue-600 border-blue-100" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{hi ? "डैशबोर्ड" : "Dashboard"}</h1>
        <p className="text-gray-400 text-sm mt-1">{hi ? "वापस स्वागत है," : "Welcome back,"} <span className="text-gray-600 font-medium">{user?.username ?? "admin"}</span></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm ${s.color.split(" ")[2]}`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">{s.label}</p>
                <p className="text-gray-900 text-3xl font-bold mt-2">{s.value}</p>
                {s.badge ? <span className="inline-flex mt-2 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">{s.badge} {hi ? "नए" : "new"}</span> : null}
              </div>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${s.color}`}>
                <s.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-gray-800 font-semibold text-sm">{hi ? "हाल की पूछताछ" : "Recent Enquiries"}</h2>
          <Link to="/admin/enquiries" className="flex items-center gap-1 text-primary hover:text-primary/80 text-xs font-medium transition-colors">
            {hi ? "सभी देखें" : "View all"} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">{hi ? "अभी तक कोई पूछताछ नहीं" : "No enquiries yet"}</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recent.map((e: any) => (
              <div key={e.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                <div className="min-w-0">
                  <p className="text-gray-800 text-sm font-medium truncate">{e.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5 truncate">{e.email}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-gray-300 text-xs hidden sm:block">{new Date(e.created_at).toLocaleDateString()}</span>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusColors[e.status]}`}>
                    {hi ? statusLabels[e.status]?.hi : statusLabels[e.status]?.en}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { to: "/admin/products", icon: Package, label: hi ? "उत्पाद प्रबंधित करें" : "Manage Products", sub: `${products?.length ?? 0} ${hi ? "उत्पाद" : "products"}`, color: "bg-violet-50 text-violet-600" },
          { to: "/admin/enquiries", icon: MessageSquare, label: hi ? "पूछताछ देखें" : "View Enquiries", sub: `${newCount} ${hi ? "अपठित" : "unread"}`, color: "bg-emerald-50 text-emerald-600" },
        ].map(item => (
          <Link key={item.to} to={item.to} className="group flex items-center justify-between bg-white hover:bg-gray-50 border border-gray-100 rounded-2xl px-6 py-5 shadow-sm transition-all">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}><item.icon className="w-5 h-5" /></div>
              <div>
                <p className="text-gray-800 text-sm font-semibold">{item.label}</p>
                <p className="text-gray-400 text-xs mt-0.5">{item.sub}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
