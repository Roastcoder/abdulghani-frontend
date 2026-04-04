import { useState } from "react";
import { API_BASE_URL } from "@/config/api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const fetchBlogs = async () => {
  const res = await fetch(`${API_BASE_URL}/api/blogs`);
  return res.ok ? res.json() : [];
};

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

interface BlogForm { id?: number; title: string; excerpt: string; content: string; image_url: string; author: string; date: string; sort_order: number; }
const emptyForm: BlogForm = { title: "", excerpt: "", content: "", image_url: "", author: "Admin", date: new Date().toISOString().split("T")[0], sort_order: 0 };

const AdminBlog = () => {
  const { data: blogs = [], isLoading } = useQuery({ queryKey: ["blogs"], queryFn: fetchBlogs });
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const hi = language === "hi";
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogForm>(emptyForm);
  const [isNew, setIsNew] = useState(true);
  const [errors, setErrors] = useState<Partial<BlogForm>>({});

  const resolveImg = (url: string) => {
    if (!url) return "";
    if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
    return url;
  };

  const validate = () => {
    const e: Partial<BlogForm> = {};
    if (!editing.title.trim()) e.title = hi ? "आवश्यक" : "Required";
    if (!editing.excerpt.trim()) e.excerpt = hi ? "आवश्यक" : "Required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSave = async () => {
    if (!validate()) return;
    const res = await fetch(`${API_BASE_URL}/api/blogs`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      toast({ title: isNew ? (hi ? "ब्लॉग पोस्ट बनाई गई" : "Blog post created") : (hi ? "ब्लॉग पोस्ट अपडेट हुई" : "Blog post updated") });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      setOpen(false);
    } else {
      toast({ title: hi ? "त्रुटि" : "Error", variant: "destructive" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm(hi ? "इस ब्लॉग पोस्ट को हटाएं?" : "Delete this blog post?")) return;
    const res = await fetch(`${API_BASE_URL}/api/blogs`, {
      method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    if (res.ok) { toast({ title: hi ? "ब्लॉग पोस्ट हटाई गई" : "Blog post deleted" }); queryClient.invalidateQueries({ queryKey: ["blogs"] }); }
  };

  const openNew = () => { setEditing({ ...emptyForm, sort_order: (blogs as any[]).length + 1 }); setErrors({}); setIsNew(true); setOpen(true); };
  const openEdit = (b: any) => { setEditing({ id: b.id, title: b.title, excerpt: b.excerpt, content: b.content || "", image_url: b.image_url || "", author: b.author || "Admin", date: b.date || "", sort_order: b.sort_order || 0 }); setErrors({}); setIsNew(false); setOpen(true); };

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
          <h1 className="text-2xl font-bold text-gray-900">{hi ? "ब्लॉग" : "Blog"}</h1>
          <p className="text-gray-400 text-sm mt-1">{hi ? "ब्लॉग पोस्ट प्रबंधित करें" : "Manage blog posts"}</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> {hi ? "पोस्ट जोड़ें" : "Add Post"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
      ) : !(blogs as any[]).length ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
          <BookOpen className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">{hi ? "अभी तक कोई ब्लॉग पोस्ट नहीं" : "No blog posts yet"}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(blogs as any[]).map((b: any) => (
            <div key={b.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
              <div className="aspect-[16/9] bg-gray-100 relative overflow-hidden">
                {resolveImg(b.image_url) ? (
                  <img src={resolveImg(b.image_url)} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <BookOpen className="w-10 h-10 text-primary/20" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs text-gray-400">{b.date} · {b.author}</span>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => openEdit(b)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 text-gray-400 hover:text-primary flex items-center justify-center transition-all"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleDelete(b.id)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <h3 className="text-gray-800 font-semibold text-sm leading-snug">{b.title}</h3>
                <p className="text-gray-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">{b.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">{isNew ? (hi ? "ब्लॉग पोस्ट जोड़ें" : "Add Blog Post") : (hi ? "ब्लॉग पोस्ट संपादित करें" : "Edit Blog Post")}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            <F label={hi ? "शीर्षक *" : "Title *"} error={errors.title}>
              <input value={editing.title} onChange={e => { setEditing({ ...editing, title: e.target.value }); setErrors(er => ({ ...er, title: undefined })); }}
                placeholder={hi ? "ब्लॉग पोस्ट का शीर्षक" : "Blog post title"}
                className={`${inputCls} ${errors.title ? "border-red-300" : ""}`} />
            </F>
            <F label={hi ? "सारांश *" : "Excerpt *"} error={errors.excerpt}>
              <textarea value={editing.excerpt} onChange={e => { setEditing({ ...editing, excerpt: e.target.value }); setErrors(er => ({ ...er, excerpt: undefined })); }}
                placeholder={hi ? "संक्षिप्त विवरण..." : "Short description..."}
                rows={3} className={`${inputCls} resize-none ${errors.excerpt ? "border-red-300" : ""}`} />
            </F>
            <F label={hi ? "पूरी सामग्री" : "Full Content"}>
              <textarea value={editing.content} onChange={e => setEditing({ ...editing, content: e.target.value })}
                placeholder={hi ? "पूरा लेख यहां लिखें..." : "Write the full article here..."}
                rows={8} className={`${inputCls} resize-none`} />
            </F>
            <div className="grid grid-cols-2 gap-3">
              <F label={hi ? "लेखक" : "Author"}>
                <input value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} className={inputCls} />
              </F>
              <F label={hi ? "तारीख" : "Date"}>
                <input type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} className={inputCls} />
              </F>
            </div>
            <F label={hi ? "क्रम संख्या" : "Sort Order"}>
              <input type="number" value={editing.sort_order} onChange={e => setEditing({ ...editing, sort_order: Number(e.target.value) })} className={`${inputCls} w-24`} min={0} />
            </F>
            <ImageUpload label={hi ? "ब्लॉग छवि" : "Blog Image"} value={editing.image_url}
              onChange={url => setEditing({ ...editing, image_url: url })} />
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
              <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 hover:bg-gray-50 transition-all">{hi ? "रद्द करें" : "Cancel"}</button>
              <button onClick={handleSave} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-sm">
                {isNew ? (hi ? "पोस्ट बनाएं" : "Create Post") : (hi ? "परिवर्तन सहेजें" : "Save Changes")}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
