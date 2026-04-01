import { useRef, useState } from "react";
import { API_BASE_URL } from "@/config/api";
import { Upload, X, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
  className?: string;
}

// Resolve relative /uploads/ paths to full URL using API_BASE_URL
const resolveUrl = (url: string) =>
  url && url.startsWith('/uploads/') ? `${API_BASE_URL}${url}` : url;

const ImageUpload = ({ value, onChange, label, required, className = "" }: ImageUploadProps) => {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [dragging, setDragging] = useState(false);

  const uploadFile = async (file: File) => {
    if (!file.type.startsWith("image/")) { toast({ title: "Only image files allowed", variant: "destructive" }); return; }
    if (file.size > 5 * 1024 * 1024) { toast({ title: "Max file size is 5MB", variant: "destructive" }); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`${API_BASE_URL}/api/upload`, { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) onChange(data.url);
      else toast({ title: "Upload failed", description: data.error, variant: "destructive" });
    } catch { toast({ title: "Upload failed", variant: "destructive" }); }
    finally { setUploading(false); }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) uploadFile(file);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider flex items-center gap-1">
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {value ? (
        <div className="relative group rounded-xl overflow-hidden border border-gray-200 aspect-video bg-gray-50">
          <img src={resolveUrl(value)} alt={label ?? "Preview"} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button onClick={() => inputRef.current?.click()} disabled={uploading}
              className="flex items-center gap-1.5 px-3 py-2 bg-white/90 hover:bg-white text-gray-800 text-xs font-semibold rounded-lg transition-all shadow">
              <Upload className="w-3.5 h-3.5" /> Replace
            </button>
            <button onClick={() => onChange("")}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold rounded-lg transition-all shadow">
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl aspect-video flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
            dragging ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/40 hover:bg-gray-50"
          } ${required && !value ? "border-red-200 bg-red-50/30" : ""}`}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-xs">Uploading...</p>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <Upload className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-center px-4">
                <p className="text-gray-600 text-sm font-medium">Click to upload <span className="text-gray-400 font-normal">or drag & drop</span></p>
                <p className="text-gray-400 text-xs mt-1">PNG, JPG, WEBP up to 5MB</p>
                {required && !value && <p className="text-red-400 text-xs mt-1 font-medium">Required</p>}
              </div>
            </>
          )}
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f); e.target.value = ""; }} />

      <button type="button" onClick={() => setShowUrl(v => !v)}
        className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-xs transition-colors">
        <Link className="w-3 h-3" /> Use URL instead
      </button>

      {showUrl && (
        <div className="flex gap-2">
          <input value={urlInput} onChange={e => setUrlInput(e.target.value)} placeholder="https://example.com/image.jpg"
            className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all" />
          <button onClick={() => { if (urlInput) { onChange(urlInput); setUrlInput(""); setShowUrl(false); } }}
            className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-xl transition-colors shrink-0">
            Set
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
