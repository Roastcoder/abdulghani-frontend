import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2, Save } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const fetchContent = async () => {
  const res = await fetch(`${API_BASE_URL}/api/content`);
  return res.ok ? res.json() : {};
};
const fetchGallery = async () => {
  const res = await fetch(`${API_BASE_URL}/api/gallery`);
  return res.ok ? res.json() : [];
};

const tabs = ["Hero & Carousel", "About", "Contact", "Stats", "Gallery"];

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

// Named carousel slots — 6 images matching the homepage carousel
const carouselSlots = [
  { key: "carousel_1", label: "Carousel Image 1 — Hero / Main Banner" },
  { key: "carousel_2", label: "Carousel Image 2 — Disc Plough" },
  { key: "carousel_3", label: "Carousel Image 3 — Auto Disc Plough" },
  { key: "carousel_4", label: "Carousel Image 4 — Leveller" },
  { key: "carousel_5", label: "Carousel Image 5 — Cultivator" },
  { key: "carousel_6", label: "Carousel Image 6 — MB Plough" },
];

const AdminContent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: content = {} } = useQuery({ queryKey: ["site_content"], queryFn: fetchContent });
  const { data: gallery = [] } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });

  const [active, setActive] = useState("Hero & Carousel");
  const [form, setForm] = useState<Record<string, string>>({});
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");

  useEffect(() => {
    if (content && Object.keys(content).length) setForm(content);
  }, [content]);

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  // Auto-save a single key immediately (used for image uploads)
  const autoSave = async (key: string, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    const res = await fetch(`${API_BASE_URL}/api/content`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [key]: value }),
    });
    if (res.ok) {
      toast({ title: "Image saved" });
      queryClient.invalidateQueries({ queryKey: ["site_content"] });
    } else {
      toast({ title: "Failed to save image", variant: "destructive" });
    }
  };

  const saveSection = async (keys: string[]) => {
    const payload: Record<string, string> = {};
    keys.forEach(k => { payload[k] = form[k] ?? ""; });
    const res = await fetch(`${API_BASE_URL}/api/content`, {
      method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
    });
    if (res.ok) { toast({ title: "Saved successfully" }); queryClient.invalidateQueries({ queryKey: ["site_content"] }); }
    else toast({ title: "Error saving", variant: "destructive" });
  };

  const addGalleryImage = async () => {
    if (!newImageUrl) return;
    const res = await fetch(`${API_BASE_URL}/api/gallery`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: newImageUrl, alt: newImageAlt }),
    });
    if (res.ok) { toast({ title: "Image added" }); setNewImageUrl(""); setNewImageAlt(""); queryClient.invalidateQueries({ queryKey: ["gallery"] }); }
  };

  const deleteGalleryImage = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    const res = await fetch(`${API_BASE_URL}/api/gallery`, {
      method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    if (res.ok) { toast({ title: "Image deleted" }); queryClient.invalidateQueries({ queryKey: ["gallery"] }); }
  };

  const SaveBtn = ({ keys }: { keys: string[] }) => (
    <button onClick={() => saveSection(keys)}
      className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
      <Save className="w-4 h-4" /> Save Changes
    </button>
  );

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div className="space-y-1.5">
      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Site Content</h1>
        <p className="text-gray-400 text-sm mt-1">Edit website text, images, and gallery</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit flex-wrap shadow-sm">
        {tabs.map(t => (
          <button key={t} onClick={() => setActive(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active === t ? "bg-primary text-primary-foreground shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">

        {/* Hero & Carousel */}
        {active === "Hero & Carousel" && (
          <>
            <div>
              <h2 className="text-gray-800 font-semibold text-sm mb-1">Hero Text</h2>
              <p className="text-gray-400 text-xs mb-4">These appear as the main headline on the homepage</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Title Word 1"><input value={form.hero_title1 ?? ""} onChange={e => set("hero_title1", e.target.value)} className={inputCls} /></Field>
                <Field label="Title Word 2 (italic highlight)"><input value={form.hero_title2 ?? ""} onChange={e => set("hero_title2", e.target.value)} className={inputCls} /></Field>
                <Field label="Title Line 2"><input value={form.hero_title3 ?? ""} onChange={e => set("hero_title3", e.target.value)} className={inputCls} /></Field>
              </div>
              <div className="mt-4">
                <Field label="Hero Description">
                  <textarea value={form.hero_desc ?? ""} onChange={e => set("hero_desc", e.target.value)} rows={2} className={`${inputCls} resize-none`} />
                </Field>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-gray-800 font-semibold text-sm mb-1">Carousel Images</h2>
              <p className="text-gray-400 text-xs mb-5">These 6 images rotate automatically in the hero section. Each slot is named for easy identification.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {carouselSlots.map((slot, i) => (
                  <div key={slot.key} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-gray-700 text-xs font-semibold">{slot.label.split(" — ")[1]}</span>
                    </div>
                    <ImageUpload
                      label={slot.label}
                      value={form[slot.key] ?? ""}
                      onChange={url => autoSave(slot.key, url)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <SaveBtn keys={["hero_title1", "hero_title2", "hero_title3", "hero_desc", ...carouselSlots.map(s => s.key)]} />
          </>
        )}

        {/* About */}
        {active === "About" && (
          <>
            <ImageUpload label="About Section Image" value={form.about_image ?? ""} onChange={url => autoSave("about_image", url)} />
            {["about_story_p1", "about_story_p2", "about_story_p3"].map((key, i) => (
              <Field key={key} label={`Story Paragraph ${i + 1}`}>
                <textarea value={form[key] ?? ""} onChange={e => set(key, e.target.value)} rows={3} className={`${inputCls} resize-none`} />
              </Field>
            ))}
            <SaveBtn keys={["about_image", "about_story_p1", "about_story_p2", "about_story_p3"]} />
          </>
        )}

        {/* Contact */}
        {active === "Contact" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone Number"><input value={form.contact_phone ?? ""} onChange={e => set("contact_phone", e.target.value)} className={inputCls} /></Field>
              <Field label="Email Address"><input value={form.contact_email ?? ""} onChange={e => set("contact_email", e.target.value)} className={inputCls} /></Field>
              <Field label="Address"><input value={form.contact_address ?? ""} onChange={e => set("contact_address", e.target.value)} className={inputCls} /></Field>
              <Field label="WhatsApp Number (no +)"><input value={form.whatsapp_number ?? ""} onChange={e => set("whatsapp_number", e.target.value)} placeholder="919874000000" className={inputCls} /></Field>
            </div>
            <SaveBtn keys={["contact_phone", "contact_email", "contact_address", "whatsapp_number"]} />
          </>
        )}

        {/* Stats */}
        {active === "Stats" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[["stats_farmers", "Happy Farmers (e.g. 500+)"], ["stats_products", "Product Lines (e.g. 5)"], ["stats_years", "Years Experience (e.g. 10+)"]].map(([key, label]) => (
                <Field key={key} label={label}><input value={form[key] ?? ""} onChange={e => set(key, e.target.value)} className={inputCls} /></Field>
              ))}
            </div>
            <SaveBtn keys={["stats_farmers", "stats_products", "stats_years"]} />
          </>
        )}

        {/* Gallery */}
        {active === "Gallery" && (
          <>
            <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 space-y-4">
              <div>
                <p className="text-gray-800 text-sm font-semibold">Add New Image</p>
                <p className="text-gray-400 text-xs mt-0.5">Upload or paste a URL, then add a description</p>
              </div>
              <ImageUpload label="New Gallery Image" value={newImageUrl} onChange={url => setNewImageUrl(url)} />
              {newImageUrl && (
                <div className="flex gap-2">
                  <input value={newImageAlt} onChange={e => setNewImageAlt(e.target.value)} placeholder="Image description (e.g. Disc Plough in field)"
                    className={`${inputCls} flex-1`} />
                  <button onClick={addGalleryImage} className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl transition-colors shrink-0 shadow-sm">
                    Add to Gallery
                  </button>
                </div>
              )}
            </div>

            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3">Current Gallery ({(gallery as any[]).length} images)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {(gallery as any[]).map((img: any, i: number) => (
                  <div key={img.id} className="relative group rounded-xl overflow-hidden border border-gray-100 aspect-[4/3] bg-gray-50 shadow-sm">
                    <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 w-5 h-5 rounded-full bg-black/50 text-white text-[10px] font-bold flex items-center justify-center">{i + 1}</div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button onClick={() => deleteGalleryImage(img.id)} className="w-9 h-9 rounded-xl bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {img.alt && <p className="absolute bottom-0 left-0 right-0 text-xs text-white bg-black/50 px-2 py-1 truncate">{img.alt}</p>}
                  </div>
                ))}
                {!(gallery as any[]).length && (
                  <p className="col-span-full text-gray-400 text-sm py-8 text-center">No gallery images yet</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminContent;
