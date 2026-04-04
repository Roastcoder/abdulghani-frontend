import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteContent } from "@/hooks/useSiteContent";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  const { t } = useLanguage();
  const { data: sc = {} as any } = useSiteContent();

  const phone = sc.contact_phone || "+91 XXXXX XXXXX";
  const email = sc.contact_email || "info@abdulgani.com";
  const address = sc.contact_address || "India";

  const quickLinks = [
    { label: t("nav.home"), path: "/" },
    { label: t("nav.products"), path: "/products" },
    { label: t("footer.aboutUs"), path: "/about" },
    { label: t("nav.services"), path: "/services" },
    { label: t("nav.contact"), path: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src={logo} alt="Abdul Gani Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">{t("footer.desc")}</p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-secondary" /> {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-background/60 hover:text-background transition-colors flex items-center gap-1 group">
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-secondary" /> {t("footer.products")}
            </h4>
            <ul className="space-y-3 text-sm">
              {["disc-plough", "automatic-disc-plough", "leveller", "cultivator", "mb-plough"].map((id) => (
                <li key={id}>
                  <Link to="/products" className="text-background/60 hover:text-background transition-colors">
                    {t(`product.${id}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-base mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-secondary" /> {t("footer.contact")}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-background/40 text-xs mb-0.5">{t("footer.phone")}</p>
                  <a href={`tel:${phone}`} className="text-background/80 hover:text-background transition-colors">{phone}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-background/40 text-xs mb-0.5">{t("footer.email")}</p>
                  <a href={`mailto:${email}`} className="text-background/80 hover:text-background transition-colors">{email}</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-background/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-background/40 text-xs mb-0.5">{t("footer.location")}</p>
                  <span className="text-background/80">{address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/40">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <p>© {new Date().getFullYear()} Abdul Gani Hazi Gulam Mohd. {t("footer.rights")}</p>
            <span className="hidden md:inline">|</span>
            <p>Designed & Developed by <a href="https://marketvry.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-wheat transition-colors">Marketvry</a></p>
          </div>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-background transition-colors">{t("footer.privacy")}</Link>
            <Link to="/terms" className="hover:text-background transition-colors">{t("footer.terms")}</Link>
            <Link to="/disclaimer" className="hover:text-background transition-colors">{t("footer.disclaimer")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
