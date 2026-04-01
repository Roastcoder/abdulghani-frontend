import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import discPlough from "@/assets/disc-plough.jpg";
import autoDiscPlough from "@/assets/auto-disc-plough.jpg";
import leveller from "@/assets/leveller.jpg";
import cultivator from "@/assets/cultivator.jpg";
import mbPlough from "@/assets/mb-plough.jpg";
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

const ProductDetail = () => {
  const { id } = useParams();
  const { data: products, isLoading } = useProducts();
  const product = products?.find((p) => p.id === id);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = product ? [resolveImg(product.image_url, product.id)] : ["/placeholder.svg"];

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Product Not Found</h1>
          <Link to="/products" className="text-primary mt-4 inline-block">Back to Products</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <Link to="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 group">
          <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted border shadow-lg group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${product.name} - Image ${currentIndex + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {images.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-md"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background shadow-md"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          i === currentIndex
                            ? "bg-primary scale-110"
                            : "bg-background/60 hover:bg-background/80"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      i === currentIndex
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-xs font-semibold text-secondary uppercase tracking-wider">{product.category}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3">{product.name}</h1>
            <p className="text-muted-foreground mt-5 leading-relaxed text-lg">{product.description}</p>

            <div className="mt-10">
              <h3 className="font-display font-semibold text-xl text-foreground mb-4">Key Features</h3>
              <ul className="space-y-3">
                {product.features?.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-3 text-muted-foreground"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/enquiry">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 px-8 shadow-md">
                  <Phone className="w-4 h-4 mr-2" /> Request Quote
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="h-12 px-8">Contact Us</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
