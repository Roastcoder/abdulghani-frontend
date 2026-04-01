import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Globe, X } from "lucide-react";

const LanguagePopup = () => {
  const { showLanguagePopup, setShowLanguagePopup, setLanguage, t } = useLanguage();

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    setShowLanguagePopup(false);
  };

  return (
    <AnimatePresence>
      {showLanguagePopup && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => {
              setShowLanguagePopup(false);
              localStorage.setItem("preferred-language", "en");
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-2xl shadow-2xl border border-border/50 overflow-hidden w-full max-w-sm">
              {/* Header */}
              <div className="bg-primary px-6 py-5 relative">
                <button
                  onClick={() => {
                    setShowLanguagePopup(false);
                    localStorage.setItem("preferred-language", "en");
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-primary-foreground" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-primary-foreground/15 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-primary-foreground text-lg">{t("lang.title")}</h3>
                    <p className="text-primary-foreground/70 text-sm">{t("lang.subtitle")}</p>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="p-5 space-y-3">
                <button
                  onClick={() => handleSelect("en")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-primary bg-muted/30 hover:bg-primary/5 transition-all group"
                >
                  <span className="text-2xl">🇬🇧</span>
                  <div className="text-left">
                    <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">English</p>
                    <p className="text-xs text-muted-foreground">Continue in English</p>
                  </div>
                </button>

                <button
                  onClick={() => handleSelect("hi")}
                  className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-border hover:border-primary bg-muted/30 hover:bg-primary/5 transition-all group"
                >
                  <span className="text-2xl">🇮🇳</span>
                  <div className="text-left">
                    <p className="font-display font-bold text-foreground group-hover:text-primary transition-colors">हिन्दी</p>
                    <p className="text-xs text-muted-foreground">हिन्दी में जारी रखें</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LanguagePopup;
