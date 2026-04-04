import { useState } from "react";
import { API_BASE_URL } from "@/config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, HelpCircle, GripVertical } from "lucide-react";

const fetchFaqs = async () => {
  const res = await fetch(`${API_BASE_URL}/api/faqs`);
  return res.ok ? res.json() : [];
};

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

interface FaqForm { id?: number; question: string; answer: string; sort_order: number; }
const emptyForm: FaqForm = { question: "", answer: "", sort_order: 0 };

const AdminFAQ = () => {
  const { data: faqs = [], isLoading } = useQuery({ queryKey: ["faqs"], queryFn: fetchFaqs });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const hi = language === "hi";
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<FaqForm>(emptyForm);
  const [isNew, setIsNew] = useState(true);
  const [errors, setErrors] = useState<Partial<FaqForm>>({});

  const validate = () => {
    const e: Partial<FaqForm> = {};
    if (!editing.question.trim()) e.question = hi ? "आवश्यक" : "Required";
    if (!editing.answer.trim()) e.answer = hi ? "आवश्यक" : "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSave = async () => {
    if (!validate()) return;
    const res = await fetch(`${API_BASE_URL}/api/faqs`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      toast({ title: isNew ? (hi ? "FAQ जोड़ा गया" : "FAQ added") : (hi ? "FAQ अपडेट हुआ" : "FAQ updated") });
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      setOpen(false);
    } else {
      toast({ title: hi ? "FAQ सहेजने में त्रुटि" : "Error saving FAQ", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(hi ? "इस FAQ को हटाएं?" : "Delete this FAQ?")) return;
    const res = await fetch(`${API_BASE_URL}/api/faqs`, {
      method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    if (res.ok) { toast({ title: hi ? "FAQ हटाया गया" : "FAQ deleted" }); queryClient.invalidateQueries({ queryKey: ["faqs"] }); }
  };

  const openNew = () => { setEditing({ ...emptyForm, sort_order: (faqs as any[]).length + 1 }); setErrors({}); setIsNew(true); setOpen(true); };
  const openEdit = (faq: any) => { setEditing({ id: faq.id, question: faq.question, answer: faq.answer, sort_order: faq.sort_order }); setErrors({}); setIsNew(false); setOpen(true); };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{hi ? "सवाल-जवाब" : "FAQ"}</h1>
          <p className="text-gray-400 text-sm mt-1">{hi ? "अक्सर पूछे जाने वाले प्रश्न प्रबंधित करें" : "Manage frequently asked questions"}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> {hi ? "FAQ जोड़ें" : "Add FAQ"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : !(faqs as any[]).length ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
          <HelpCircle className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">{hi ? "अभी तक कोई FAQ नहीं। पहला जोड़ें।" : "No FAQs yet. Add your first one."}</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-gray-50">
            {(faqs as any[]).map((faq, i) => (
              <div key={faq.id} className="flex items-start gap-4 px-6 py-5 hover:bg-gray-50 transition-colors group">
                <div className="flex items-center gap-3 shrink-0 mt-0.5">
                  <GripVertical className="w-4 h-4 text-gray-200 group-hover:text-gray-400 transition-colors" />
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold text-sm">{faq.question}</p>
                  <p className="text-gray-400 text-sm mt-1.5 leading-relaxed line-clamp-2">{faq.answer}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0 mt-0.5">
                  <button onClick={() => openEdit(faq)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 text-gray-400 hover:text-primary flex items-center justify-center transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(faq.id)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">{isNew ? (hi ? "FAQ जोड़ें" : "Add FAQ") : (hi ? "FAQ संपादित करें" : "Edit FAQ")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <div className="space-y-1.5">
              <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                {hi ? "प्रश्न" : "Question"} {errors.question && <span className="text-red-500 normal-case font-normal">— {errors.question}</span>}
              </label>
              <input value={editing.question} onChange={e => { setEditing({ ...editing, question: e.target.value }); setErrors(er => ({ ...er, question: undefined })); }}
                placeholder={hi ? "उदा. आप कौन से उपकरण बनाते हैं?" : "e.g. What types of equipment do you offer?"}
                className={`${inputCls} ${errors.question ? "border-red-300" : ""}`} />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
                {hi ? "उत्तर" : "Answer"} {errors.answer && <span className="text-red-500 normal-case font-normal">— {errors.answer}</span>}
              </label>
              <textarea value={editing.answer} onChange={e => { setEditing({ ...editing, answer: e.target.value }); setErrors(er => ({ ...er, answer: undefined })); }}
                placeholder={hi ? "स्पष्ट और सहायक उत्तर लिखें..." : "Write a clear and helpful answer..."}
                rows={5} className={`${inputCls} resize-none ${errors.answer ? "border-red-300" : ""}`} />
            </div>
            <div className="space-y-1.5">
              <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">{hi ? "क्रम संख्या" : "Sort Order"}</label>
              <input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: Number(e.target.value) })} className={`${inputCls} w-24`} min={0} />
              <p className="text-gray-400 text-xs">{hi ? "कम संख्या = पहले दिखेगा" : "Lower number = appears first"}</p>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 hover:bg-gray-50 transition-all">{hi ? "रद्द करें" : "Cancel"}</button>
              <button onClick={handleSave} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-sm">
                {isNew ? (hi ? "FAQ जोड़ें" : "Add FAQ") : (hi ? "परिवर्तन सहेजें" : "Save Changes")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminFAQ;
