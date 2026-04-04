import Layout from "@/components/Layout";
import { Wrench, Truck, Settings, HeadphonesIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";
import discPlough from "@/assets/disc-plough.jpg";
import cultivator from "@/assets/cultivator.jpg";
import leveller from "@/assets/leveller.jpg";
import mbPlough from "@/assets/mb-plough.jpg";

const localImages = [discPlough, cultivator, leveller, mbPlough];
const icons = [Wrench, Settings, Truck, HeadphonesIcon];
const colors = ["from-primary/15 to-primary/5", "from-secondary/15 to-secondary/5", "from-field/15 to-field/5", "from-earth/15 to-earth/5"];

const resolveImg = (url: string, fallback: string) => {
  if (!url) return fallback;
  if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
  return url;
};

const Services = () => {
  const { t, language } = useLanguage();
  const hi = language === "hi";

  const { data: dbServices } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/services`);
      return res.ok ? res.json() : [];
    },
  });

  const fallbackServices = [
    { title: t("services.s1Title"), desc: t("services.s1Desc"), info: t("services.s1Info") },
    { title: t("services.s2Title"), desc: t("services.s2Desc"), info: t("services.s2Info") },
    { title: t("services.s3Title"), desc: t("services.s3Desc"), info: t("services.s3Info") },
    { title: t("services.s4Title"), desc: t("services.s4Desc"), info: t("services.s4Info") },
  ];

  // Hindi always uses translations; English uses DB with fallback
  const rawServices = hi ? fallbackServices : (dbServices?.length ? dbServices : fallbackServices);

  const services = rawServices.map((s: any, i: number) => ({
    ...s,
    icon: icons[i % icons.length],
    color: colors[i % colors.length],
    image: resolveImg(s.image_url, localImages[i % localImages.length]),
  }));

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/80 py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-wheat font-semibold tracking-[0.2em] uppercase text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-wheat" /> {t("services.tagline")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{t("services.title")}</h1>
            <p className="text-primary-foreground/75 mt-3 max-w-xl text-lg">{t("services.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 gap-12">
            {services.map((s: any, i: number) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                    <div className={`aspect-[4/3] md:aspect-auto overflow-hidden ${i % 2 !== 0 ? "md:order-2" : ""}`}>
                      <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div className={`p-8 md:p-10 flex flex-col justify-center ${i % 2 !== 0 ? "md:order-1" : ""}`}>
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6`}>
                        <s.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-3">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                      {s.info && <p className="text-sm text-foreground/70 leading-relaxed">{s.info}</p>}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3} className="mt-16 text-center">
            <p className="text-muted-foreground mb-4">{t("services.customCta")}</p>
            <Link to="/enquiry">
              <Button size="lg" className="h-12 px-8 shadow-md">
                {t("services.contactBtn")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
