import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Trash2, Save } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";

const fetchContent = async () => { const res = await fetch(`${API_BASE_URL}/api/content`); return res.ok ? res.json() : {}; };
const fetchGallery = async () => { const res = await fetch(`${API_BASE_URL}/api/gallery`); return res.ok ? res.json() : []; };

const inputCls = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all";

const carouselSlots = [
  { key: "carousel_1", en: "Hero / Main Banner", hi: "हीरो / मुख्य बैनर" },
  { key: "carousel_2", en: "Disc Plough", hi: "डिस्क हल" },
  { key: "carousel_3", en: "Auto Disc Plough", hi: "ऑटो डिस्क हल" },
  { key: "carousel_4", en: "Leveller", hi: "लेवलर" },
  { key: "carousel_5", en: "Cultivator", hi: "कल्टीवेटर" },
  { key: "carousel_6", en: "MB Plough", hi: "एमबी हल" },
];

const AdminContent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { language } = useLanguage();
  const hi = language === "hi";
  const { data: content = {} } = useQuery({ queryKey: ["site_content"], queryFn: fetchContent });
  const { data: gallery = [] } = useQuery({ queryKey: ["gallery"], queryFn: fetchGallery });

  const tabs = [
    { key: "Hero & Carousel", label: hi ? "हीरो और कैरोसेल" : "Hero & Carousel" },
    { key: "About", label: hi ? "हमारे बारे में" : "About" },
    { key: "Contact", label: hi ? "संपर्क" : "Contact" },
    { key: "Stats", label: hi ? "आंकड़े" : "Stats" },
    { key: "Gallery", label: hi ? "गैलरी" : "Gallery" },
  ];

  const [active, setActive] = useState("Hero & Carousel");
  const [form, setForm] = useState<Record<string, string>>({});
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");

  useEffect(() => { if (content && Object.keys(content).length) setForm(content); }, [content]);

  const set = (key: string, value: string) => setForm(f => ({ ...f, [key]: value }));

  const autoSave = async (key: string, value: string) => {
    setForm(f => ({ ...f, [key]: value }));
    const res = await fetch(`${API_BASE_URL}/api/content`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ [key]: value }) });
    if (res.ok) { toast({ title: hi ? "छवि सहेजी गई" : "Image saved" }); queryClient.invalidateQueries({ queryKey: ["site_content"] }); }
    else toast({ title: hi ? "छवि सहेजने में विफल" : "Failed to save image", variant: "destructive" });
  };

  const saveSection = async (keys: string[]) => {
    const payload: Record<string, string> = {};
    keys.forEach(k => { payload[k] = form[k] ?? ""; });
    const res = await fetch(`${API_BASE_URL}/api/content`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (res.ok) { toast({ title: hi ? "सफलतापूर्वक सहेजा गया" : "Saved successfully" }); queryClient.invalidateQueries({ queryKey: ["site_content"] }); }
    else toast({ title: hi ? "सहेजने में त्रुटि" : "Error saving", variant: "destructive" });
  };

  const addGalleryImage = async () => {
    if (!newImageUrl) return;
    const res = await fetch(`${API_BASE_URL}/api/gallery`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: newImageUrl, alt: newImageAlt }) });
    if (res.ok) { toast({ title: hi ? "छवि जोड़ी गई" : "Image added" }); setNewImageUrl(""); setNewImageAlt(""); queryClient.invalidateQueries({ queryKey: ["gallery"] }); }
  };

  const deleteGalleryImage = async (id: number) => {
    if (!confirm(hi ? "इस छवि को हटाएं?" : "Delete this image?")) return;
    const res = await fetch(`${API_BASE_URL}/api/gallery`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    if (res.ok) { toast({ title: hi ? "छवि हटाई गई" : "Image deleted" }); queryClient.invalidateQueries({ queryKey: ["gallery"] }); }
  };

  const SaveBtn = ({ keys }: { keys: string[] }) => (
    <button onClick={() => saveSection(keys)} className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
      <Save className="w-4 h-4" /> {hi ? "परिवर्तन सहेजें" : "Save Changes"}
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
        <h1 className="text-2xl font-bold text-gray-900">{hi ? "साइट सामग्री" : "Site Content"}</h1>
        <p className="text-gray-400 text-sm mt-1">{hi ? "वेबसाइट टेक्स्ट, छवियां और गैलरी संपादित करें" : "Edit website text, images, and gallery"}</p>
      </div>

      <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 w-fit flex-wrap shadow-sm">
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActive(tab.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${active === tab.key ? "bg-primary text-primary-foreground shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-6">

        {active === "Hero & Carousel" && (
          <>
            <div>
              <h2 className="text-gray-800 font-semibold text-sm mb-1">{hi ? "हीरो टेक्स्ट" : "Hero Text"}</h2>
              <p className="text-gray-400 text-xs mb-4">{hi ? "ये होमपेज पर मुख्य शीर्षक के रूप में दिखते हैं" : "These appear as the main headline on the homepage"}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label={hi ? "शीर्षक शब्द 1" : "Title Word 1"}><input value={form.hero_title1 ?? ""} onChange={e => set("hero_title1", e.target.value)} className={inputCls} /></Field>
                <Field label={hi ? "शीर्षक शब्द 2 (इटैलिक)" : "Title Word 2 (italic)"}><input value={form.hero_title2 ?? ""} onChange={e => set("hero_title2", e.target.value)} className={inputCls} /></Field>
                <Field label={hi ? "शीर्षक पंक्ति 2" : "Title Line 2"}><input value={form.hero_title3 ?? ""} onChange={e => set("hero_title3", e.target.value)} className={inputCls} /></Field>
              </div>
              <div className="mt-4">
                <Field label={hi ? "हीरो विवरण" : "Hero Description"}>
                  <textarea value={form.hero_desc ?? ""} onChange={e => set("hero_desc", e.target.value)} rows={2} className={`${inputCls} resize-none`} />
                </Field>
              </div>
            </div>
            <div className="border-t border-gray-100 pt-6">
              <h2 className="text-gray-800 font-semibold text-sm mb-1">{hi ? "कैरोसेल छवियां" : "Carousel Images"}</h2>
              <p className="text-gray-400 text-xs mb-5">{hi ? "ये 6 छवियां हीरो सेक्शन में स्वचालित रूप से घूमती हैं।" : "These 6 images rotate automatically in the hero section."}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {carouselSlots.map((slot, i) => (
                  <div key={slot.key} className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                      <span className="text-gray-700 text-xs font-semibold">{hi ? slot.hi : slot.en}</span>
                    </div>
                    <ImageUpload label={`${hi ? "कैरोसेल छवि" : "Carousel Image"} ${i + 1} — ${hi ? slot.hi : slot.en}`} value={form[slot.key] ?? ""} onChange={url => autoSave(slot.key, url)} />
                  </div>
                ))}
              </div>
            </div>
            <SaveBtn keys={["hero_title1", "hero_title2", "hero_title3", "hero_desc", ...carouselSlots.map(s => s.key)]} />
          </>
        )}

        {active === "About" && (
          <>
            <ImageUpload label={hi ? "हमारे बारे में छवि" : "About Section Image"} value={form.about_image ?? ""} onChange={url => autoSave("about_image", url)} />
            {["about_story_p1", "about_story_p2", "about_story_p3"].map((key, i) => (
              <Field key={key} label={`${hi ? "कहानी अनुच्छेद" : "Story Paragraph"} ${i + 1}`}>
                <textarea value={form[key] ?? ""} onChange={e => set(key, e.target.value)} rows={3} className={`${inputCls} resize-none`} />
              </Field>
            ))}
            <SaveBtn keys={["about_image", "about_story_p1", "about_story_p2", "about_story_p3"]} />
          </>
        )}

        {active === "Contact" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={hi ? "फ़ोन नंबर" : "Phone Number"}><input value={form.contact_phone ?? ""} onChange={e => set("contact_phone", e.target.value)} className={inputCls} /></Field>
              <Field label={hi ? "ईमेल पता" : "Email Address"}><input value={form.contact_email ?? ""} onChange={e => set("contact_email", e.target.value)} className={inputCls} /></Field>
              <Field label={hi ? "पता" : "Address"}><input value={form.contact_address ?? ""} onChange={e => set("contact_address", e.target.value)} className={inputCls} /></Field>
              <Field label={hi ? "व्हाट्सएप नंबर (+ के बिना)" : "WhatsApp Number (no +)"}><input value={form.whatsapp_number ?? ""} onChange={e => set("whatsapp_number", e.target.value)} placeholder="919874000000" className={inputCls} /></Field>
            </div>
            <SaveBtn keys={["contact_phone", "contact_email", "contact_address", "whatsapp_number"]} />
          </>
        )}

        {active === "Stats" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                ["stats_farmers", hi ? "खुश किसान (उदा. 500+)" : "Happy Farmers (e.g. 500+)"],
                ["stats_products", hi ? "उत्पाद श्रेणियां (उदा. 5)" : "Product Lines (e.g. 5)"],
                ["stats_years", hi ? "वर्षों का अनुभव (उदा. 10+)" : "Years Experience (e.g. 10+)"],
              ].map(([key, label]) => (
                <Field key={key} label={label}><input value={form[key] ?? ""} onChange={e => set(key, e.target.value)} className={inputCls} /></Field>
              ))}
            </div>
            <SaveBtn keys={["stats_farmers", "stats_products", "stats_years"]} />
          </>
        )}

        {active === "Gallery" && (
          <>
            <div className="border border-gray-100 rounded-xl p-5 bg-gray-50/50 space-y-4">
              <div>
                <p className="text-gray-800 text-sm font-semibold">{hi ? "नई छवि जोड़ें" : "Add New Image"}</p>
                <p className="text-gray-400 text-xs mt-0.5">{hi ? "अपलोड करें या URL पेस्ट करें, फिर विवरण जोड़ें" : "Upload or paste a URL, then add a description"}</p>
              </div>
              <ImageUpload label={hi ? "नई गैलरी छवि" : "New Gallery Image"} value={newImageUrl} onChange={url => setNewImageUrl(url)} />
              {newImageUrl && (
                <div className="flex gap-2">
                  <input value={newImageAlt} onChange={e => setNewImageAlt(e.target.value)} placeholder={hi ? "छवि विवरण (उदा. डिस्क हल खेत में)" : "Image description (e.g. Disc Plough in field)"} className={`${inputCls} flex-1`} />
                  <button onClick={addGalleryImage} className="px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold rounded-xl transition-colors shrink-0 shadow-sm">
                    {hi ? "जोड़ें" : "Add"}
                  </button>
                </div>
              )}
            </div>
            <div>
              <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-3">
                {hi ? `वर्तमान गैलरी (${(gallery as any[]).length} छवियां)` : `Current Gallery (${(gallery as any[]).length} images)`}
              </p>
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
                {!(gallery as any[]).length && <p className="col-span-full text-gray-400 text-sm py-8 text-center">{hi ? "अभी तक कोई गैलरी छवि नहीं" : "No gallery images yet"}</p>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminContent;
