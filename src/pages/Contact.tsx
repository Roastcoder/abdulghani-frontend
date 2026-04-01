import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_BASE_URL } from "@/config/api";
import { useSiteContent } from "@/hooks/useSiteContent";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { data: sc = {} as any } = useSiteContent();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const phone = sc.contact_phone || "+91 98740 00000";
  const email = sc.contact_email || "info@abdulgani.com";
  const address = sc.contact_address || "India";
  const whatsapp = sc.whatsapp_number || "919874000000";

  const contactInfo = [
    { icon: Phone, title: t("footer.phone"), value: phone, sub: t("contact.phoneSub") },
    { icon: Mail, title: t("footer.email"), value: email, sub: t("contact.emailSub") },
    { icon: MapPin, title: t("footer.location"), value: address, sub: t("contact.addressSub") },
    { icon: Clock, title: t("contact.workingHours"), value: t("contact.workingValue"), sub: t("contact.workingSub") },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message }),
      });
      if (res.ok) {
        toast({ title: t("contact.successTitle"), description: t("contact.successDesc") });
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        toast({ title: "Error", description: "Failed to send message", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error, please try again", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/80 py-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-wheat font-semibold tracking-[0.2em] uppercase text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-wheat" /> {t("contact.tagline")}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{t("contact.title")}</h1>
            <p className="text-primary-foreground/75 mt-3 max-w-xl text-lg">{t("contact.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-2 gap-16">
          <ScrollReveal direction="left">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">{t("contact.sendTitle")}</h2>
            <p className="text-muted-foreground mb-8">{t("contact.sendSubtitle")}</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input placeholder={t("contact.name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="h-12 rounded-xl" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input type="email" placeholder={t("contact.email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="h-12 rounded-xl" />
                <Input type="tel" placeholder={t("contact.phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="h-12 rounded-xl" />
              </div>
              <Textarea placeholder={t("contact.message")} rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="rounded-xl" />
              <Button type="submit" size="lg" className="h-12 px-8 rounded-xl shadow-md" disabled={isLoading}>
                {isLoading ? "Sending..." : t("contact.sendBtn")}
              </Button>
            </form>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">{t("contact.infoTitle")}</h2>
            <p className="text-muted-foreground mb-8">{t("contact.infoSubtitle")}</p>
            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <motion.div key={i} whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 p-5 bg-muted/30 rounded-2xl border border-border/50 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-foreground/80 text-sm mt-0.5">{item.value}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex gap-4 mt-8">
              <Button asChild className="flex-1 h-12 rounded-xl">
                <a href={`tel:${phone}`}>
                  <Phone className="w-4 h-4 mr-2" /> Call Now
                </a>
              </Button>
              <Button asChild variant="outline" className="flex-1 h-12 rounded-xl">
                <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
