import { useState } from "react";
import { API_BASE_URL } from "@/config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Wrench } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const fetchServices = async () => {
  const res = await fetch(`${API_BASE_URL}/api/services`);
  return res.ok ? res.json() : [];
};

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

interface ServiceForm { id?: number; title: string; desc: string; info: string; image_url: string; sort_order: number; }
const emptyForm: ServiceForm = { title: "", desc: "", info: "", image_url: "", sort_order: 0 };

const AdminServices = () => {
  const { data: services = [], isLoading } = useQuery({ queryKey: ["services"], queryFn: fetchServices });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const hi = language === "hi";
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ServiceForm>(emptyForm);
  const [isNew, setIsNew] = useState(true);
  const [errors, setErrors] = useState<Partial<ServiceForm>>({});

  const resolveImg = (url: string) => {
    if (!url) return "";
    if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
    return url;
  };

  const validate = () => {
    const e: Partial<ServiceForm> = {};
    if (!editing.title.trim()) e.title = hi ? "आवश्यक" : "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSave = async () => {
    if (!validate()) return;
    const res = await fetch(`${API_BASE_URL}/api/services`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      toast({ title: isNew ? (hi ? "सेवा बनाई गई" : "Service created") : (hi ? "सेवा अपडेट हुई" : "Service updated") });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      setOpen(false);
    } else {
      toast({ title: hi ? "त्रुटि" : "Error", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(hi ? "इस सेवा को हटाएं?" : "Delete this service?")) return;
    const res = await fetch(`${API_BASE_URL}/api/services`, {
      method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    if (res.ok) { toast({ title: hi ? "सेवा हटाई गई" : "Service deleted" }); queryClient.invalidateQueries({ queryKey: ["services"] }); }
  };

  const openNew = () => {
    setEditing({ ...emptyForm, sort_order: (services as any[]).length + 1 });
    setErrors({}); setIsNew(true); setOpen(true);
  };
  const openEdit = (s: any) => {
    setEditing({ id: s.id, title: s.title, desc: s.desc || "", info: s.info || "", image_url: s.image_url || "", sort_order: s.sort_order || 0 });
    setErrors({}); setIsNew(false); setOpen(true);
  };

  const F = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
        {label} {error && <span className="text-red-500 normal-case font-normal">— {error}</span>}
      </label>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{hi ? "सेवाएं" : "Services"}</h1>
          <p className="text-gray-400 text-sm mt-1">{hi ? "सेवाएं प्रबंधित करें" : "Manage your services"}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> {hi ? "सेवा जोड़ें" : "Add Service"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : !(services as any[]).length ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
          <Wrench className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">{hi ? "अभी तक कोई सेवा नहीं" : "No services yet"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(services as any[]).map((s: any, i: number) => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                {resolveImg(s.image_url) ? (
                  <img src={resolveImg(s.image_url)} alt={s.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <Wrench className="w-10 h-10 text-primary/20" />
                  </div>
                )}
                <div className="absolute top-3 left-3 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow">
                  {i + 1}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-gray-800 font-semibold text-sm">{s.title}</h3>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(s)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 text-gray-400 hover:text-primary flex items-center justify-center transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(s.id)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">
              {isNew ? (hi ? "सेवा जोड़ें" : "Add Service") : (hi ? "सेवा संपादित करें" : "Edit Service")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <F label={hi ? "शीर्षक *" : "Title *"} error={errors.title}>
              <input value={editing.title} onChange={e => { setEditing({ ...editing, title: e.target.value }); setErrors(er => ({ ...er, title: undefined })); }}
                placeholder={hi ? "सेवा का शीर्षक" : "Service title"}
                className={`${inputCls} ${errors.title ? "border-red-300" : ""}`} />
            </F>
            <F label={hi ? "संक्षिप्त विवरण" : "Short Description"}>
              <textarea value={editing.desc} onChange={e => setEditing({ ...editing, desc: e.target.value })}
                placeholder={hi ? "संक्षिप्त विवरण..." : "Short description shown on the card..."}
                rows={3} className={`${inputCls} resize-none`} />
            </F>
            <F label={hi ? "विस्तृत जानकारी" : "Detailed Info"}>
              <textarea value={editing.info} onChange={e => setEditing({ ...editing, info: e.target.value })}
                placeholder={hi ? "विस्तृत जानकारी..." : "Detailed information shown below the description..."}
                rows={4} className={`${inputCls} resize-none`} />
            </F>
            <F label={hi ? "क्रम संख्या" : "Sort Order"}>
              <input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: Number(e.target.value) })}
                className={`${inputCls} w-24`} min={0} />
            </F>
            <ImageUpload label={hi ? "सेवा छवि" : "Service Image"} value={editing.image_url}
              onChange={url => setEditing({ ...editing, image_url: url })} />
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 hover:bg-gray-50 transition-all">
                {hi ? "रद्द करें" : "Cancel"}
              </button>
              <button onClick={handleSave} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-sm">
                {isNew ? (hi ? "सेवा बनाएं" : "Create Service") : (hi ? "परिवर्तन सहेजें" : "Save Changes")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
