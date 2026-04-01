import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { API_BASE_URL } from "@/config/api";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2, Package } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const resolveImg = (url: string) => {
  if (!url) return "";
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  return url;
};

interface ProductForm {
  id: string; name: string; short_desc: string;
  description: string; features: string; category: string; image_url: string;
}

const emptyForm: ProductForm = { id: "", name: "", short_desc: "", description: "", features: "", category: "", image_url: "" };

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

const AdminProducts = () => {
  const { data: products, isLoading } = useProducts();
  const [editing, setEditing] = useState<ProductForm | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<ProductForm>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const validate = () => {
    const e: Partial<ProductForm> = {};
    if (!editing?.name) e.name = "Required";
    if (!editing?.category) e.category = "Required";
    if (!editing?.short_desc) e.short_desc = "Required";
    if (!editing?.image_url) e.image_url = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!editing || !validate()) return;
    const payload = { ...editing, features: editing.features.split("\n").filter(Boolean), image_url: editing.image_url || null, sort_order: 0 };
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      toast({ title: isNew ? "Product created" : "Product updated" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setOpen(false);
    } else {
      toast({ title: "Error", description: "Failed to save", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const res = await fetch(`${API_BASE_URL}/api/products`, {
      method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    if (res.ok) { toast({ title: "Product deleted" }); queryClient.invalidateQueries({ queryKey: ["products"] }); }
  };

  const openEdit = (p: any) => {
    setEditing({ id: p.id, name: p.name, short_desc: p.short_desc || "", description: p.description || "", features: (p.features || []).join("\n"), category: p.category || "", image_url: p.image_url || "" });
    setErrors({});
    setIsNew(false);
    setOpen(true);
  };

  const openNew = () => {
    setEditing({ ...emptyForm, id: `product-${Date.now()}` });
    setErrors({});
    setIsNew(true);
    setOpen(true);
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
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your product catalog</p>
        </div>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : !products?.length ? (
        <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center shadow-sm">
          <Package className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No products yet</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
          <div className="divide-y divide-gray-50">
            {products.map((p: any) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
                  {p.image_url
                    ? <img src={resolveImg(p.image_url)} alt={p.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center"><Package className="w-5 h-5 text-gray-300" /></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold text-sm truncate">{p.name}</p>
                  <p className="text-gray-400 text-xs mt-0.5 truncate">{p.short_desc}</p>
                </div>
                <span className="hidden sm:inline-flex text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full shrink-0">{p.category}</span>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(p)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-primary/30 hover:bg-primary/5 text-gray-400 hover:text-primary flex items-center justify-center transition-all">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="w-8 h-8 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 text-gray-400 hover:text-red-500 flex items-center justify-center transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900 font-bold">{isNew ? "Add Product" : "Edit Product"}</DialogTitle>
          </DialogHeader>
          {editing && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <F label="Product ID">
                  <input value={editing.id} onChange={e => setEditing({ ...editing, id: e.target.value })} disabled={!isNew} className={`${inputCls} disabled:bg-gray-50 disabled:text-gray-400`} />
                </F>
                <F label="Category *" error={errors.category}>
                  <input value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} className={`${inputCls} ${errors.category ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`} />
                </F>
              </div>
              <F label="Product Name *" error={errors.name}>
                <input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className={`${inputCls} ${errors.name ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`} />
              </F>
              <F label="Short Description *" error={errors.short_desc}>
                <input value={editing.short_desc} onChange={e => setEditing({ ...editing, short_desc: e.target.value })} className={`${inputCls} ${errors.short_desc ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`} />
              </F>
              <F label="Full Description">
                <textarea value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} rows={3} className={`${inputCls} resize-none`} />
              </F>
              <F label="Features (one per line)">
                <textarea value={editing.features} onChange={e => setEditing({ ...editing, features: e.target.value })} rows={4} className={`${inputCls} resize-none`} />
              </F>
              <ImageUpload
                label={`Product Image — ${editing.name || "New Product"}`}
                required
                value={editing.image_url}
                onChange={url => {
                  setEditing({ ...editing, image_url: url });
                  setErrors(e => ({ ...e, image_url: undefined }));
                }}
              />
              {errors.image_url && <p className="text-red-500 text-xs -mt-1">Product image is required</p>}
              <div className="flex justify-end gap-2 pt-2 border-t border-gray-100">
                <button onClick={() => setOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-800 border border-gray-200 hover:bg-gray-50 transition-all">Cancel</button>
                <button onClick={handleSave} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-all shadow-sm">
                  {isNew ? "Create Product" : "Save Changes"}
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProducts;
