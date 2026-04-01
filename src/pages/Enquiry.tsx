import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useProducts } from "@/hooks/useProducts";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { API_BASE_URL } from "@/config/api";

const Enquiry = () => {
  const { toast } = useToast();
  const { data: products } = useProducts();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", product: "", quantity: "", message: "" });

  const getProductName = (product: { id: string; name: string }) => {
    const translatedName = t(`product.${product.id}`);
    return translatedName !== `product.${product.id}` ? translatedName : product.name;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone, message: form.message || form.quantity, product_id: form.product || null }),
      });
      if (res.ok) {
        toast({ title: t("enquiry.successTitle"), description: t("enquiry.successDesc") });
        setForm({ name: "", email: "", phone: "", product: "", quantity: "", message: "" });
      } else {
        toast({ title: "Error", description: "Failed to submit enquiry", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Network error, please try again", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{t("enquiry.title")}</h1>
            <p className="text-primary-foreground/80 mt-3 max-w-xl text-lg">{t("enquiry.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-2xl">
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Input placeholder={t("enquiry.fullName")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="h-12" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input type="email" placeholder={t("enquiry.email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="h-12" />
              <Input type="tel" placeholder={t("enquiry.phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required className="h-12" />
            </div>
            <Select value={form.product} onValueChange={(v) => setForm({ ...form, product: v })}>
              <SelectTrigger className="h-12"><SelectValue placeholder={t("enquiry.selectProduct")} /></SelectTrigger>
              <SelectContent>
                {products?.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{getProductName(p)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input type="number" placeholder={t("enquiry.quantity")} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className="h-12" />
            <Textarea placeholder={t("enquiry.additional")} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <Button type="submit" size="lg" className="w-full h-12 bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-md" disabled={isLoading}>{isLoading ? "Submitting..." : t("enquiry.submitBtn")}</Button>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default Enquiry;
