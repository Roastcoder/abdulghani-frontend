import Layout from "@/components/Layout";
import { Wrench, Truck, Settings, HeadphonesIcon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import discPlough from "@/assets/disc-plough.jpg";
import cultivator from "@/assets/cultivator.jpg";
import leveller from "@/assets/leveller.jpg";
import mbPlough from "@/assets/mb-plough.jpg";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    { 
      icon: Wrench, 
      title: t("services.s1Title"), 
      desc: t("services.s1Desc"), 
      color: "from-primary/15 to-primary/5",
      image: discPlough,
      info: "Expert maintenance and repair services for all agricultural equipment. Our skilled technicians ensure your machinery operates at peak performance."
    },
    { 
      icon: Settings, 
      title: t("services.s2Title"), 
      desc: t("services.s2Desc"), 
      color: "from-secondary/15 to-secondary/5",
      image: cultivator,
      info: "Professional customization services to adapt equipment to your specific farming needs. We modify and upgrade machinery for optimal results."
    },
    { 
      icon: Truck, 
      title: t("services.s3Title"), 
      desc: t("services.s3Desc"), 
      color: "from-field/15 to-field/5",
      image: leveller,
      info: "Fast and reliable delivery services across all regions. We ensure your equipment reaches you safely and on time, ready for immediate use."
    },
    { 
      icon: HeadphonesIcon, 
      title: t("services.s4Title"), 
      desc: t("services.s4Desc"), 
      color: "from-earth/15 to-earth/5",
      image: mbPlough,
      info: "24/7 customer support and technical assistance. Our dedicated team is always ready to help you with any questions or concerns."
    },
  ];

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
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                      <img 
                        src={s.image} 
                        alt={s.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-6`}>
                        <s.icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-3">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                      <p className="text-sm text-foreground/70 leading-relaxed">{s.info}</p>
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
