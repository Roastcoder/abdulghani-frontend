import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { ArrowRight, Shield, Wrench, Truck, Award, ChevronDown, Star } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";
import discPlough from "@/assets/disc-plough.jpg";
import autoDiscPlough from "@/assets/auto-disc-plough.jpg";
import leveller from "@/assets/leveller.jpg";
import cultivator from "@/assets/cultivator.jpg";
import mbPlough from "@/assets/mb-plough.jpg";
import { useProducts } from "@/hooks/useProducts";
import { useSiteContent } from "@/hooks/useSiteContent";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";

import { API_BASE_URL } from "@/config/api";

const localFallbacks = [heroImage, discPlough, autoDiscPlough, leveller, cultivator, mbPlough];

const resolveUrl = (url: string, fallback: string) => {
  if (!url) return fallback;
  if (url.startsWith('/uploads/')) return `${API_BASE_URL}${url}`;
  return url;
};

const localProductImages: Record<string, string> = {
  "disc-plough": discPlough,
  "automatic-disc-plough": autoDiscPlough,
  "leveller": leveller,
  "cultivator": cultivator,
  "mb-plough": mbPlough,
};

const Index = () => {
  const { data: products } = useProducts();
  const { data: siteContent = {} } = useSiteContent();
  const displayProducts = products || [];
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef<string[]>([]);

  const carouselImages = [
    resolveUrl((siteContent as any).carousel_1, localFallbacks[0]),
    resolveUrl((siteContent as any).carousel_2, localFallbacks[1]),
    resolveUrl((siteContent as any).carousel_3, localFallbacks[2]),
    resolveUrl((siteContent as any).carousel_4, localFallbacks[3]),
    resolveUrl((siteContent as any).carousel_5, localFallbacks[4]),
    resolveUrl((siteContent as any).carousel_6, localFallbacks[5]),
  ];

  carouselRef.current = carouselImages;

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [(siteContent as any).carousel_1, (siteContent as any).carousel_2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselRef.current.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Shield, title: t("features.builtToLast"), desc: t("features.builtToLastDesc") },
    { icon: Wrench, title: t("features.easyMaintenance"), desc: t("features.easyMaintenanceDesc") },
    { icon: Truck, title: t("features.panIndiaDelivery"), desc: t("features.panIndiaDeliveryDesc") },
    { icon: Award, title: t("features.trustedQuality"), desc: t("features.trustedQualityDesc") },
  ];

  const stats = [
    { value: (siteContent as any).stats_farmers || "500+", label: t("stats.happyFarmers") },
    { value: (siteContent as any).stats_products || "5", label: t("stats.productLines") },
    { value: (siteContent as any).stats_years || "10+", label: t("stats.yearsExperience") },
    { value: "100%", label: t("stats.qualityTested") },
  ];

  return (
    <Layout>
      {/* Hero with parallax */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src={carouselImages[currentImageIndex]}
              alt="Agricultural equipment"
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/30" />
        </motion.div>
        <motion.div style={{ opacity: heroOpacity }} className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-wheat font-semibold tracking-[0.25em] uppercase text-sm mb-5 flex items-center gap-3"
            >
              <span className="w-10 h-px bg-wheat" /> {t("hero.tagline")}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-background leading-[1.05] mb-7"
            >
              {(siteContent as any).hero_title1 || t("hero.title1")}{" "}
              <span className="text-wheat italic">{(siteContent as any).hero_title2 || t("hero.title2")}</span>,
              <br />{(siteContent as any).hero_title3 || t("hero.title3")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-background/75 text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
            >
              {(siteContent as any).hero_desc || t("hero.desc")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/products">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-13 px-10 text-base shadow-xl hover:shadow-2xl transition-shadow">
                  {t("hero.viewProducts")} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/enquiry">
                <Button size="lg" variant="outline" className="!border-white/40 !text-white !bg-transparent hover:!bg-white/10 h-13 px-10 text-base backdrop-blur-sm">
                  {t("hero.requestQuote")}
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown className="w-7 h-7 text-background/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats counter */}
      <section className="py-10 bg-primary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="text-center">
                <p className="font-display text-3xl md:text-4xl font-bold text-wheat">{stat.value}</p>
                <p className="text-primary-foreground/70 text-sm mt-1">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-border/50 h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
                    <f.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-base md:text-lg">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{f.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 md:py-28">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <p className="text-secondary font-semibold tracking-[0.2em] uppercase text-sm mb-3">{t("products.tagline")}</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              {t("products.title")} <br className="hidden sm:block" />{t("products.titleLine2")}
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
              {t("products.desc")}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.1}>
                <Link
                  to={`/products/${product.id}`}
                  className="group block bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted relative">
                    <motion.img
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                      src={(() => { const u = product.image_url || localProductImages[product.id] || "/placeholder.svg"; return u.startsWith('/uploads/') ? `${API_BASE_URL}${u}` : u; })()}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      <span className="inline-flex items-center text-sm text-background font-semibold bg-background/20 backdrop-blur-sm rounded-full px-4 py-1.5">
                        {t("products.viewDetails")} <ArrowRight className="w-4 h-4 ml-1.5" />
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">{product.category}</span>
                    <h3 className="font-display font-bold text-xl text-foreground mt-2 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{product.short_desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <ScrollReveal className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-wheat fill-wheat" />
              ))}
            </div>
            <blockquote className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-snug italic">
              {t("testimonial.quote")}
            </blockquote>
            <p className="text-muted-foreground mt-6 text-sm">{t("testimonial.author")}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -right-1/4 w-[700px] h-[700px] rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute -bottom-1/2 -left-1/4 w-[500px] h-[500px] rounded-full bg-wheat/10 blur-3xl" />
        </div>
        <ScrollReveal className="container text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            {t("cta.title")}<br />{t("cta.titleLine2")}
          </h2>
          <p className="text-primary-foreground/75 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
            {t("cta.desc")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/enquiry">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-13 px-10 text-base shadow-xl">
                {t("cta.freeQuote")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="!border-primary-foreground/30 !text-primary-foreground !bg-transparent hover:!bg-primary-foreground/10 h-13 px-10 text-base">
                {t("cta.contactUs")}
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </Layout>
  );
};

export default Index;
