import { MessageCircle, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/hooks/useSiteContent";

const DEFAULT_MESSAGE = "नमस्ते! मुझे आपके कृषि उपकरणों में रुचि है। क्या आप अधिक जानकारी प्रदान कर सकते हैं?";

const WhatsAppButton = () => {
  const [whatsappHovered, setWhatsappHovered] = useState(false);
  const [callHovered, setCallHovered] = useState(false);
  const { t } = useLanguage();
  const { data: sc = {} as any } = useSiteContent();

  const whatsappNumber = sc.whatsapp_number || "919874000000";
  const phoneNumber = sc.contact_phone || "+919874000000";

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`, "_blank");
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {callHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="bg-card shadow-lg rounded-xl px-4 py-2.5 border border-border/50 max-w-[200px]"
            >
              <p className="text-sm font-medium text-foreground">Call Us</p>
              <p className="text-xs text-muted-foreground">{phoneNumber}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={handleCallClick}
          onHoverStart={() => setCallHovered(true)}
          onHoverEnd={() => setCallHovered(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
          aria-label="Call Us"
        >
          <Phone className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="flex items-center gap-3">
        <AnimatePresence>
          {whatsappHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="bg-card shadow-lg rounded-xl px-4 py-2.5 border border-border/50 max-w-[200px]"
            >
              <p className="text-sm font-medium text-foreground">{t("whatsapp.chatWithUs")}</p>
              <p className="text-xs text-muted-foreground">{t("whatsapp.replyInstantly")}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          onClick={handleWhatsAppClick}
          onHoverStart={() => setWhatsappHovered(true)}
          onHoverEnd={() => setWhatsappHovered(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </motion.button>
      </div>
    </div>
  );
};

export default WhatsAppButton;
