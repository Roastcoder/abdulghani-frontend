import Layout from "@/components/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";

const FAQ = () => {
  const { t } = useLanguage();

  const { data: dbFaqs } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/faqs`);
      return res.ok ? res.json() : [];
    },
  });

  const fallbackFaqs = [
    { question: t("faq.q1"), answer: t("faq.a1") },
    { question: t("faq.q2"), answer: t("faq.a2") },
    { question: t("faq.q3"), answer: t("faq.a3") },
    { question: t("faq.q4"), answer: t("faq.a4") },
    { question: t("faq.q5"), answer: t("faq.a5") },
    { question: t("faq.q6"), answer: t("faq.a6") },
  ];

  const faqs = dbFaqs?.length ? dbFaqs : fallbackFaqs;

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{t("faq.title")}</h1>
            <p className="text-primary-foreground/80 mt-3 text-lg">{t("faq.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq: any, i: number) => (
              <motion.div
                key={faq.id ?? i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <AccordionItem value={`faq-${i}`} className="bg-card border border-border/50 rounded-xl px-6 shadow-sm">
                  <AccordionTrigger className="font-display font-semibold text-foreground hover:no-underline text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
