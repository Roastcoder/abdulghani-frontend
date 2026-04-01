import Layout from "@/components/Layout";
import discPlough from "@/assets/disc-plough.jpg";
import autoDiscPlough from "@/assets/auto-disc-plough.jpg";
import leveller from "@/assets/leveller.jpg";
import cultivator from "@/assets/cultivator.jpg";
import mbPlough from "@/assets/mb-plough.jpg";
import heroImage from "@/assets/hero-agriculture.jpg";
import aboutFarm from "@/assets/about-farm.jpg";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";

const localImages = [
  { src: heroImage, alt: "Farm equipment in wheat fields" },
  { src: discPlough, alt: "Disc Plough" },
  { src: autoDiscPlough, alt: "Automatic Disc Plough" },
  { src: leveller, alt: "Leveller" },
  { src: cultivator, alt: "Cultivator" },
  { src: mbPlough, alt: "MB Plough" },
  { src: aboutFarm, alt: "Aerial farm view" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useLanguage();

  const { data: dbGallery } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/gallery`);
      return res.ok ? res.json() : [];
    },
  });

  const images = dbGallery?.length
    ? dbGallery.map((img: any) => ({
        src: img.url.startsWith('/uploads/') ? `${API_BASE_URL}${img.url}` : img.url,
        alt: img.alt || ""
      }))
    : localImages;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{t("gallery.title")}</h1>
            <p className="text-primary-foreground/80 mt-3 text-lg">{t("gallery.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {images.map((img: any, i: number) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                onClick={() => setSelected(img.src)}
                className="aspect-[4/3] rounded-xl overflow-hidden bg-muted group shadow-sm hover:shadow-xl transition-shadow"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <button className="absolute top-6 right-6 text-background hover:text-background/80" onClick={() => setSelected(null)}>
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selected}
              alt="Gallery preview"
              className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Gallery;
