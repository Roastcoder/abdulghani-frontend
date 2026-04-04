import { API_BASE_URL } from "@/config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trash2, Mail, Phone, Package, MessageSquare } from "lucide-react";

const fetchEnquiries = async () => {
  const res = await fetch(`${API_BASE_URL}/api/enquiries`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

const statusStyles: Record<string, string> = {
  new: "bg-blue-50 text-blue-600 border-blue-100",
  contacted: "bg-amber-50 text-amber-600 border-amber-100",
  closed: "bg-green-50 text-green-600 border-green-100",
};

const AdminEnquiries = () => {
  const { data: enquiries, isLoading } = useQuery({ queryKey: ["enquiries"], queryFn: fetchEnquiries });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const hi = language === "hi";

  const statusLabel = (s: string) => {
    if (!hi) return s.charAt(0).toUpperCase() + s.slice(1);
    return { new: "नया", contacted: "संपर्क किया", closed: "बंद" }[s] || s;
  };

  const updateStatus = async (id: number, status: string) => {
    const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }),
    });
    if (res.ok) { toast({ title: hi ? "स्थिति अपडेट हुई" : "Status updated" }); queryClient.invalidateQueries({ queryKey: ["enquiries"] }); }
  };

  const deleteEnquiry = async (id: number) => {
    if (!confirm(hi ? "इस पूछताछ को हटाएं?" : "Delete this enquiry?")) return;
    const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
      method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    if (res.ok) { toast({ title: hi ? "पूछताछ हटाई गई" : "Enquiry deleted" }); queryClient.invalidateQueries({ queryKey: ["enquiries"] }); }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{hi ? "पूछताछ" : "Enquiries"}</h1>
        <p className="text-gray-400 text-sm mt-1">{hi ? "ग्राहक पूछताछ प्रबंधित करें" : "Manage customer enquiries"}</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : !enquiries?.length ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
          <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">{hi ? "अभी तक कोई पूछताछ नहीं" : "No enquiries yet"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((e: any) => (
            <div key={e.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">{e.name[0].toUpperCase()}</div>
                  <div className="min-w-0">
                    <p className="text-gray-800 font-semibold text-sm">{e.name}</p>
                    <div className="flex flex-wrap gap-3 mt-1">
                      <span className="flex items-center gap-1 text-gray-400 text-xs"><Mail className="w-3 h-3" />{e.email}</span>
                      {e.phone && <span className="flex items-center gap-1 text-gray-400 text-xs"><Phone className="w-3 h-3" />{e.phone}</span>}
                      {e.product_name && <span className="flex items-center gap-1 text-gray-400 text-xs"><Package className="w-3 h-3" />{e.product_name}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${statusStyles[e.status]}`}>{statusLabel(e.status)}</span>
                  <button onClick={() => deleteEnquiry(e.id)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
                <p className="text-gray-600 text-sm leading-relaxed">{e.message}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-gray-300 text-xs">{new Date(e.created_at).toLocaleString()}</span>
                <div className="flex gap-1.5">
                  {["new", "contacted", "closed"].map(s => (
                    <button key={s} onClick={() => updateStatus(e.id, s)}
                      className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${e.status === s ? statusStyles[s] : "border-gray-200 text-gray-400 hover:text-gray-700 hover:bg-gray-50"}`}>
                      {statusLabel(s)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
