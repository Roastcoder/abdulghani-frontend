import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import discPlough from "@/assets/disc-plough.jpg";
import autoDiscPlough from "@/assets/auto-disc-plough.jpg";
import leveller from "@/assets/leveller.jpg";
import cultivator from "@/assets/cultivator.jpg";
import mbPlough from "@/assets/mb-plough.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";

const fallbackImages: Record<string, string> = {
  "disc-plough": discPlough,
  "automatic-disc-plough": autoDiscPlough,
  "leveller": leveller,
  "cultivator": cultivator,
  "mb-plough": mbPlough,
};

const resolveImg = (url: string, id: string) => {
  if (!url) return fallbackImages[id] || "/placeholder.svg";
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  return url;
};

const ProductCard = ({ product, index, getProductName }: any) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [resolveImg(product.image_url, product.id)];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link
        to={`/products/${product.id}`}
        className="group block bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50"
      >
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          {images.map((img: string, idx: number) => (
            <img
              key={idx}
              src={img}
              alt={`${getProductName(product)} - ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
                idx === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_: any, idx: number) => (
              <div
                key={idx}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  idx === currentImageIndex ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="p-6">
          <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{product.category}</span>
          <h3 className="font-display font-bold text-xl text-foreground mt-2">{getProductName(product)}</h3>
          <p className="text-sm text-muted-foreground mt-2">{product.short_desc}</p>
          <span className="inline-flex items-center text-sm text-primary font-semibold mt-4 group-hover:gap-3 transition-all">
            {t("products.viewDetails")} <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

const Products = () => {
  const { data: products, isLoading } = useProducts();
  const { t } = useLanguage();

  const getProductName = (product: { id: string; name: string }) => {
    const translatedName = t(`product.${product.id}`);
    return translatedName !== `product.${product.id}` ? translatedName : product.name;
  };

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full bg-secondary blur-3xl" />
        </div>
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{t("products.pageTitle")}</h1>
            <p className="text-primary-foreground/80 mt-3 max-w-xl text-lg">{t("products.pageDesc")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container">
          {isLoading ? (
            <p className="text-muted-foreground text-center">{t("products.loading")}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} getProductName={getProductName} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
