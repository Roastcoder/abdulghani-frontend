import Layout from "@/components/Layout";
import aboutFarm from "@/assets/about-farm.jpg";
import { Award, Users, Target, Leaf } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/hooks/useSiteContent";
import { API_BASE_URL } from "@/config/api";

const About = () => {
  const { t } = useLanguage();
  const { data: siteContent = {} } = useSiteContent();
  const rawAboutImage = (siteContent as any).about_image;
  const aboutImage = rawAboutImage
    ? (rawAboutImage.startsWith('/uploads/') ? `${API_BASE_URL}${rawAboutImage}` : rawAboutImage)
    : aboutFarm;
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const values = [
    { icon: Award, title: t("about.value1Title"), desc: t("about.value1Desc") },
    { icon: Users, title: t("about.value2Title"), desc: t("about.value2Desc") },
    { icon: Target, title: t("about.value3Title"), desc: t("about.value3Desc") },
    { icon: Leaf, title: t("about.value4Title"), desc: t("about.value4Desc") },
  ];

  const milestones = [
    { year: t("about.milestone1Year"), title: t("about.milestone1Title"), desc: t("about.milestone1Desc") },
    { year: t("about.milestone2Year"), title: t("about.milestone2Title"), desc: t("about.milestone2Desc") },
    { year: t("about.milestone3Year"), title: t("about.milestone3Title"), desc: t("about.milestone3Desc") },
    { year: t("about.milestone4Year"), title: t("about.milestone4Title"), desc: t("about.milestone4Desc") },
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/80 py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full bg-wheat blur-3xl" />
        </div>
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-wheat font-semibold tracking-[0.2em] uppercase text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-wheat" /> {t("about.tagline")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">{t("about.title")}</h1>
            <p className="text-primary-foreground/75 mt-4 max-w-xl text-lg leading-relaxed">{t("about.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24" ref={parallaxRef}>
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <p className="text-secondary font-semibold tracking-[0.15em] uppercase text-sm mb-3 flex items-center gap-2">
              <span className="w-6 h-px bg-secondary" /> {t("about.storyTag")}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-8">{t("about.storyTitle")}</h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-[15px]">
              <p>{t("about.storyP1")}</p>
              <p>{t("about.storyP2")}</p>
              <p>{t("about.storyP3")}</p>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.2}>
            <div className="rounded-2xl overflow-hidden shadow-2xl relative">
              <motion.img style={{ y: imgY }} src={aboutImage} alt="Aerial view of Indian farmland" className="w-full h-full object-cover scale-110" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{t("about.journeyTitle")}</h2>
          </ScrollReveal>
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {milestones.map((m, i) => (
              <ScrollReveal key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.15}>
                <div className={`flex items-start gap-6 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 hidden md:block ${i % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider">{m.year}</p>
                    <h3 className="font-display font-semibold text-lg text-foreground mt-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                  </div>
                  <div className="relative z-10 w-9 h-9 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-md">
                    <div className="w-3 h-3 rounded-full bg-primary-foreground" />
                  </div>
                  <div className="flex-1 md:hidden">
                    <p className="text-xs font-bold text-secondary uppercase tracking-wider">{m.year}</p>
                    <h3 className="font-display font-semibold text-lg text-foreground mt-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">{t("about.valuesTitle")}</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">{t("about.valuesSubtitle")}</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className="bg-card p-8 rounded-2xl shadow-sm text-center border border-border/50 hover:shadow-xl transition-shadow h-full"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mx-auto mb-5">
                    <v.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground text-lg">{v.title}</h3>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{v.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
