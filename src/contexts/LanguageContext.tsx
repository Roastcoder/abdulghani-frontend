import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "hi";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  showLanguagePopup: boolean;
  setShowLanguagePopup: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "nav.home": "Home",
    "nav.about": "About",
    "nav.products": "Products",
    "nav.services": "Services",
    "nav.gallery": "Gallery",
    "nav.blog": "Blog",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.getQuote": "Get Quote",

    // Hero
    "hero.tagline": "Premium Agricultural Equipment",
    "hero.title1": "Empowering",
    "hero.title2": "Farmers",
    "hero.title3": "Enriching Harvests",
    "hero.desc": "Abdul Gani Hazi Gulam Mohd — your trusted partner for high-quality ploughs, cultivators, and land preparation equipment.",
    "hero.viewProducts": "View Products",
    "hero.requestQuote": "Request Quote",

    // Stats
    "stats.happyFarmers": "Happy Farmers",
    "stats.productLines": "Product Lines",
    "stats.yearsExperience": "Years Experience",
    "stats.qualityTested": "Quality Tested",

    // Features
    "features.builtToLast": "Built to Last",
    "features.builtToLastDesc": "Premium materials and rigorous quality testing.",
    "features.easyMaintenance": "Easy Maintenance",
    "features.easyMaintenanceDesc": "Designed for simple field-level servicing.",
    "features.panIndiaDelivery": "Pan-India Delivery",
    "features.panIndiaDeliveryDesc": "Fast and reliable shipping across India.",
    "features.trustedQuality": "Trusted Quality",
    "features.trustedQualityDesc": "Preferred by thousands of Indian farmers.",

    // Products section
    "products.tagline": "Our Products",
    "products.title": "Agricultural Equipment",
    "products.titleLine2": "You Can Trust",
    "products.desc": "Every piece of equipment is engineered for the demanding conditions of Indian farmland.",
    "products.viewDetails": "View Details",
    "products.pageTitle": "Our Products",
    "products.pageDesc": "Explore our range of high-quality agricultural equipment designed for Indian farming conditions.",
    "products.loading": "Loading products...",
    "products.readMore": "Read More →",

    // Product names
    "product.disc-plough": "Disc Plough",
    "product.automatic-disc-plough": "Automatic Disc Plough",
    "product.leveller": "Leveller",
    "product.cultivator": "Cultivator",
    "product.mb-plough": "MB Plough",

    // Testimonial
    "testimonial.quote": '"The quality of Abdul Gani\'s disc plough is exceptional. It has transformed how we prepare our fields every season."',
    "testimonial.author": "— A Satisfied Farmer from Madhya Pradesh",

    // CTA
    "cta.title": "Ready to Upgrade Your",
    "cta.titleLine2": "Farm Equipment?",
    "cta.desc": "Get in touch with us for the best prices on premium agricultural implements. We provide customized solutions for your farming needs.",
    "cta.freeQuote": "Get a Free Quote",
    "cta.contactUs": "Contact Us",

    // About page
    "about.tagline": "Who We Are",
    "about.title": "About Us",
    "about.subtitle": "Learn about our legacy of quality and commitment to Indian agriculture.",
    "about.storyTag": "Our Story",
    "about.storyTitle": "A Legacy of Agricultural Excellence",
    "about.storyP1": "Abdul Gani Hazi Gulam Mohd is a renowned manufacturer and supplier of premium agricultural equipment. With deep roots in India's farming heritage, we have been serving the agricultural community with reliable, high-performance tools.",
    "about.storyP2": "Our product range includes disc ploughs, automatic disc ploughs, levellers, cultivators, and MB ploughs — all engineered to withstand the demanding conditions of Indian farmland while delivering exceptional performance.",
    "about.storyP3": "We take pride in combining traditional craftsmanship with modern engineering to create equipment that empowers farmers and enhances agricultural productivity across the nation.",
    "about.journeyTitle": "Our Journey",
    "about.milestone1Year": "Founded",
    "about.milestone1Title": "Company Established",
    "about.milestone1Desc": "Started manufacturing quality agricultural equipment.",
    "about.milestone2Year": "Growth",
    "about.milestone2Title": "Pan-India Expansion",
    "about.milestone2Desc": "Extended delivery and services across all Indian states.",
    "about.milestone3Year": "Innovation",
    "about.milestone3Title": "Automatic Equipment",
    "about.milestone3Desc": "Launched hydraulic disc ploughs with automatic controls.",
    "about.milestone4Year": "Today",
    "about.milestone4Title": "500+ Farmers Served",
    "about.milestone4Desc": "Trusted by hundreds of farmers across the nation.",
    "about.valuesTitle": "Our Values",
    "about.valuesSubtitle": "The principles that drive everything we do",
    "about.value1Title": "Quality First",
    "about.value1Desc": "Every product undergoes rigorous quality checks before delivery.",
    "about.value2Title": "Customer Focus",
    "about.value2Desc": "We build lasting relationships with farmers across India.",
    "about.value3Title": "Innovation",
    "about.value3Desc": "Continuously improving our designs for modern farming needs.",
    "about.value4Title": "Sustainability",
    "about.value4Desc": "Promoting sustainable farming through efficient equipment.",

    // Services page
    "services.tagline": "What We Offer",
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive support from purchase to field operation.",
    "services.s1Title": "Equipment Installation",
    "services.s1Desc": "Professional installation and setup of all our agricultural equipment with on-site guidance for your farm.",
    "services.s2Title": "Maintenance & Repair",
    "services.s2Desc": "Regular maintenance services and quick repairs to keep your equipment running at peak performance.",
    "services.s3Title": "Delivery & Logistics",
    "services.s3Desc": "Reliable pan-India delivery with careful handling to ensure your equipment arrives in perfect condition.",
    "services.s4Title": "After-Sales Support",
    "services.s4Desc": "Dedicated customer support and spare parts availability to minimize downtime during critical farming seasons.",
    "services.s1Info": "Expert maintenance and repair services for all agricultural equipment. Our skilled technicians ensure your machinery operates at peak performance.",
    "services.s2Info": "Professional customization services to adapt equipment to your specific farming needs. We modify and upgrade machinery for optimal results.",
    "services.s3Info": "Fast and reliable delivery services across all regions. We ensure your equipment reaches you safely and on time, ready for immediate use.",
    "services.s4Info": "24/7 customer support and technical assistance. Our dedicated team is always ready to help you with any questions or concerns.",
    "services.customCta": "Need a custom service? We're here to help.",
    "services.contactBtn": "Contact Us",

    // Contact page
    "contact.tagline": "Get In Touch",
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in touch with us for any enquiries about our agricultural equipment.",
    "contact.sendTitle": "Send Us a Message",
    "contact.sendSubtitle": "Fill out the form and our team will get back to you within 24 hours.",
    "contact.infoTitle": "Contact Information",
    "contact.infoSubtitle": "Reach out through any of the following channels.",
    "contact.name": "Your Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.message": "Your Message",
    "contact.sendBtn": "Send Message",
    "contact.successTitle": "Message Sent!",
    "contact.successDesc": "We'll get back to you shortly.",
    "contact.phoneSub": "Mon-Sat, 9AM-6PM",
    "contact.emailSub": "We reply within 24 hours",
    "contact.addressSub": "Pan-India delivery available",
    "contact.workingHours": "Working Hours",
    "contact.workingValue": "Mon - Sat: 9AM - 6PM",
    "contact.workingSub": "Sunday closed",

    // FAQ page
    "faq.title": "FAQ",
    "faq.subtitle": "Frequently asked questions about our products and services.",
    "faq.q1": "What products do you manufacture?",
    "faq.a1": "We manufacture Disc Ploughs, Automatic Disc Ploughs, Levellers, Cultivators, and MB Ploughs — all designed for Indian farming conditions.",
    "faq.q2": "Do you offer pan-India delivery?",
    "faq.a2": "Yes, we provide reliable delivery services across India. Shipping times vary by location.",
    "faq.q3": "Can I get a customized product?",
    "faq.a3": "Yes, we can customize our equipment based on your specific farming needs. Contact us to discuss your requirements.",
    "faq.q4": "What is the warranty on your products?",
    "faq.a4": "All our products come with a manufacturer's warranty. Please contact us for specific warranty terms for each product.",
    "faq.q5": "How can I request a quote?",
    "faq.a5": "You can request a quote through our Enquiry page, or contact us directly via phone or email.",
    "faq.q6": "Do you provide after-sales support?",
    "faq.a6": "Yes, we provide comprehensive after-sales support including maintenance, repairs, and spare parts availability.",

    // Gallery page
    "gallery.title": "Gallery",
    "gallery.subtitle": "A visual showcase of our equipment and farming operations.",

    // Blog page
    "blog.title": "Farming Knowledge",
    "blog.subtitle": "Tips, guides, and insights for modern Indian agriculture.",
    "blog.readMore": "Read More →",
    "blog.post1Title": "Choosing the Right Plough for Your Soil Type",
    "blog.post1Date": "January 15, 2026",
    "blog.post1Excerpt": "Understanding your soil type is the first step to selecting the perfect plough. Learn how to match disc ploughs, MB ploughs, and cultivators to your specific soil conditions.",
    "blog.post2Title": "5 Tips for Maintaining Your Agricultural Equipment",
    "blog.post2Date": "January 10, 2026",
    "blog.post2Excerpt": "Proper maintenance extends the life of your farming equipment and ensures optimal performance. Follow these essential tips for disc ploughs and cultivators.",
    "blog.post3Title": "Benefits of Automatic Disc Ploughs in Modern Farming",
    "blog.post3Date": "January 5, 2026",
    "blog.post3Excerpt": "Automatic disc ploughs revolutionize tillage by reducing operator fatigue and ensuring consistent depth. Discover why more farmers are making the switch.",
    "blog.post4Title": "Land Levelling: Why It Matters for Crop Yield",
    "blog.post4Date": "December 28, 2025",
    "blog.post4Excerpt": "Proper land levelling improves water distribution, reduces waterlogging, and significantly boosts crop yield. Learn how levellers can transform your fields.",

    // Enquiry page
    "enquiry.title": "Request a Quote",
    "enquiry.subtitle": "Fill in your details and we'll provide a competitive quote.",
    "enquiry.fullName": "Full Name *",
    "enquiry.email": "Email *",
    "enquiry.phone": "Phone *",
    "enquiry.selectProduct": "Select Product *",
    "enquiry.quantity": "Quantity",
    "enquiry.additional": "Additional Requirements",
    "enquiry.submitBtn": "Submit Enquiry",
    "enquiry.successTitle": "Enquiry Submitted!",
    "enquiry.successDesc": "Our team will contact you with a quote soon.",

    // Footer
    "footer.desc": "Leading manufacturer and supplier of premium agricultural equipment. Empowering farmers with reliable, high-performance tools.",
    "footer.quickLinks": "Quick Links",
    "footer.products": "Products",
    "footer.contact": "Contact",
    "footer.phone": "Phone",
    "footer.email": "Email",
    "footer.location": "Location",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy",
    "footer.terms": "Terms",
    "footer.disclaimer": "Disclaimer",
    "footer.aboutUs": "About Us",

    // Language popup
    "lang.title": "Choose Your Language",
    "lang.subtitle": "अपनी भाषा चुनें",
    "lang.english": "English",
    "lang.hindi": "हिन्दी",

    // WhatsApp
    "whatsapp.chatWithUs": "Chat with us!",
    "whatsapp.replyInstantly": "We reply instantly",
  },
  hi: {
    // Header
    "nav.home": "होम",
    "nav.about": "हमारे बारे में",
    "nav.products": "उत्पाद",
    "nav.services": "सेवाएं",
    "nav.gallery": "गैलरी",
    "nav.blog": "ब्लॉग",
    "nav.faq": "सवाल-जवाब",
    "nav.contact": "संपर्क",
    "nav.getQuote": "कोटेशन लें",

    // Hero
    "hero.tagline": "प्रीमियम कृषि उपकरण",
    "hero.title1": "किसानों को",
    "hero.title2": "सशक्त",
    "hero.title3": "बनाना, फसल समृद्ध करना",
    "hero.desc": "अब्दुल गनी हाज़ी गुलाम मोहम्मद — उच्च गुणवत्ता वाले हल, कल्टीवेटर और भूमि तैयारी उपकरणों के लिए आपका विश्वसनीय साथी।",
    "hero.viewProducts": "उत्पाद देखें",
    "hero.requestQuote": "कोटेशन अनुरोध",

    // Stats
    "stats.happyFarmers": "खुश किसान",
    "stats.productLines": "उत्पाद श्रेणियाँ",
    "stats.yearsExperience": "वर्षों का अनुभव",
    "stats.qualityTested": "गुणवत्ता परीक्षित",

    // Features
    "features.builtToLast": "टिकाऊ निर्माण",
    "features.builtToLastDesc": "प्रीमियम सामग्री और कठोर गुणवत्ता परीक्षण।",
    "features.easyMaintenance": "आसान रखरखाव",
    "features.easyMaintenanceDesc": "खेत-स्तरीय सर्विसिंग के लिए डिज़ाइन किया गया।",
    "features.panIndiaDelivery": "पूरे भारत में डिलीवरी",
    "features.panIndiaDeliveryDesc": "पूरे भारत में तेज़ और विश्वसनीय शिपिंग।",
    "features.trustedQuality": "भरोसेमंद गुणवत्ता",
    "features.trustedQualityDesc": "हज़ारों भारतीय किसानों की पसंद।",

    // Products section
    "products.tagline": "हमारे उत्पाद",
    "products.title": "कृषि उपकरण",
    "products.titleLine2": "जिन पर भरोसा करें",
    "products.desc": "हर उपकरण भारतीय खेतों की कठिन परिस्थितियों के लिए तैयार किया गया है।",
    "products.viewDetails": "विवरण देखें",
    "products.pageTitle": "हमारे उत्पाद",
    "products.pageDesc": "भारतीय खेती की परिस्थितियों के लिए डिज़ाइन किए गए हमारे उच्च गुणवत्ता वाले कृषि उपकरणों की श्रेणी देखें।",
    "products.loading": "उत्पाद लोड हो रहे हैं...",
    "products.readMore": "और पढ़ें →",

    // Product names
    "product.disc-plough": "डिस्क हल",
    "product.automatic-disc-plough": "ऑटोमैटिक डिस्क हल",
    "product.leveller": "लेवलर",
    "product.cultivator": "कल्टीवेटर",
    "product.mb-plough": "एमबी हल",

    // Testimonial
    "testimonial.quote": '"अब्दुल गनी के डिस्क हल की गुणवत्ता असाधारण है। इसने हर मौसम में हमारे खेतों की तैयारी को बदल दिया है।"',
    "testimonial.author": "— मध्य प्रदेश के एक संतुष्ट किसान",

    // CTA
    "cta.title": "अपने खेत के उपकरण",
    "cta.titleLine2": "अपग्रेड करने के लिए तैयार?",
    "cta.desc": "प्रीमियम कृषि उपकरणों पर सर्वोत्तम कीमतों के लिए हमसे संपर्क करें। हम आपकी खेती की ज़रूरतों के लिए अनुकूलित समाधान प्रदान करते हैं।",
    "cta.freeQuote": "मुफ्त कोटेशन लें",
    "cta.contactUs": "संपर्क करें",

    // About page
    "about.tagline": "हम कौन हैं",
    "about.title": "हमारे बारे में",
    "about.subtitle": "भारतीय कृषि के प्रति हमारी गुणवत्ता और प्रतिबद्धता की विरासत के बारे में जानें।",
    "about.storyTag": "हमारी कहानी",
    "about.storyTitle": "कृषि उत्कृष्टता की विरासत",
    "about.storyP1": "अब्दुल गनी हाज़ी गुलाम मोहम्मद प्रीमियम कृषि उपकरणों के प्रसिद्ध निर्माता और आपूर्तिकर्ता हैं। भारत की कृषि विरासत में गहरी जड़ों के साथ, हम कृषि समुदाय को विश्वसनीय, उच्च-प्रदर्शन उपकरणों से सेवा प्रदान कर रहे हैं।",
    "about.storyP2": "हमारी उत्पाद श्रेणी में डिस्क हल, ऑटोमैटिक डिस्क हल, लेवलर, कल्टीवेटर और एमबी हल शामिल हैं — सभी भारतीय खेतों की कठिन परिस्थितियों को सहन करने और असाधारण प्रदर्शन देने के लिए इंजीनियर किए गए हैं।",
    "about.storyP3": "हम पारंपरिक शिल्प कौशल को आधुनिक इंजीनियरिंग के साथ मिलाकर ऐसे उपकरण बनाने पर गर्व करते हैं जो किसानों को सशक्त बनाते हैं और पूरे देश में कृषि उत्पादकता बढ़ाते हैं।",
    "about.journeyTitle": "हमारा सफर",
    "about.milestone1Year": "स्थापना",
    "about.milestone1Title": "कंपनी की स्थापना",
    "about.milestone1Desc": "गुणवत्तापूर्ण कृषि उपकरणों का निर्माण शुरू किया।",
    "about.milestone2Year": "विकास",
    "about.milestone2Title": "पूरे भारत में विस्तार",
    "about.milestone2Desc": "सभी भारतीय राज्यों में डिलीवरी और सेवाओं का विस्तार किया।",
    "about.milestone3Year": "नवाचार",
    "about.milestone3Title": "ऑटोमैटिक उपकरण",
    "about.milestone3Desc": "ऑटोमैटिक नियंत्रण वाले हाइड्रोलिक डिस्क हल लॉन्च किए।",
    "about.milestone4Year": "आज",
    "about.milestone4Title": "500+ किसानों की सेवा",
    "about.milestone4Desc": "पूरे देश में सैकड़ों किसानों का भरोसा।",
    "about.valuesTitle": "हमारे मूल्य",
    "about.valuesSubtitle": "वे सिद्धांत जो हमारे हर काम को प्रेरित करते हैं",
    "about.value1Title": "गुणवत्ता सर्वोपरि",
    "about.value1Desc": "हर उत्पाद डिलीवरी से पहले कठोर गुणवत्ता जांच से गुज़रता है।",
    "about.value2Title": "ग्राहक केंद्रित",
    "about.value2Desc": "हम पूरे भारत में किसानों के साथ स्थायी संबंध बनाते हैं।",
    "about.value3Title": "नवाचार",
    "about.value3Desc": "आधुनिक खेती की ज़रूरतों के लिए अपने डिज़ाइन में निरंतर सुधार।",
    "about.value4Title": "स्थिरता",
    "about.value4Desc": "कुशल उपकरणों के माध्यम से टिकाऊ खेती को बढ़ावा देना।",

    // Services page
    "services.tagline": "हम क्या प्रदान करते हैं",
    "services.title": "हमारी सेवाएं",
    "services.subtitle": "खरीद से लेकर खेत संचालन तक व्यापक सहायता।",
    "services.s1Title": "उपकरण स्थापना",
    "services.s1Desc": "आपके खेत के लिए ऑन-साइट मार्गदर्शन के साथ हमारे सभी कृषि उपकरणों की पेशेवर स्थापना और सेटअप।",
    "services.s2Title": "रखरखाव और मरम्मत",
    "services.s2Desc": "आपके उपकरणों को सर्वोत्तम प्रदर्शन पर चालू रखने के लिए नियमित रखरखाव सेवाएं और त्वरित मरम्मत।",
    "services.s3Title": "डिलीवरी और लॉजिस्टिक्स",
    "services.s3Desc": "आपके उपकरण को उत्तम स्थिति में पहुंचाने के लिए सावधानीपूर्ण हैंडलिंग के साथ विश्वसनीय पूरे भारत में डिलीवरी।",
    "services.s4Title": "बिक्री के बाद सहायता",
    "services.s4Desc": "महत्वपूर्ण कृषि मौसम के दौरान डाउनटाइम को कम करने के लिए समर्पित ग्राहक सहायता और स्पेयर पार्ट्स की उपलब्धता।",
    "services.s1Info": "सभी कृषि उपकरणों के लिए विशेषज्ञ रखरखाव और मरम्मत सेवाएं। हमारे कुशल तकनीशियन सुनिश्चित करते हैं कि आपकी मशीनरी सर्वोत्तम प्रदर्शन पर काम करे।",
    "services.s2Info": "आपकी विशिष्ट खेती की ज़रूरतों के अनुसार उपकरण अनुकूलित करने के लिए पेशेवर सेवाएं। हम इष्टतम परिणामों के लिए मशीनरी को संशोधित और अपग्रेड करते हैं।",
    "services.s3Info": "सभी क्षेत्रों में तेज़ और विश्वसनीय डिलीवरी सेवाएं। हम सुनिश्चित करते हैं कि आपका उपकरण सुरक्षित और समय पर पहुंचे, तुरंत उपयोग के लिए तैयार।",
    "services.s4Info": "24/7 ग्राहक सहायता और तकनीकी सहायता। हमारी समर्पित टीम हमेशा आपके किसी भी प्रश्न या चिंता में मदद के लिए तैयार है।",
    "services.customCta": "कस्टम सेवा चाहिए? हम मदद के लिए यहां हैं।",
    "services.contactBtn": "संपर्क करें",

    // Contact page
    "contact.tagline": "संपर्क करें",
    "contact.title": "संपर्क करें",
    "contact.subtitle": "हमारे कृषि उपकरणों के बारे में किसी भी पूछताछ के लिए हमसे संपर्क करें।",
    "contact.sendTitle": "हमें संदेश भेजें",
    "contact.sendSubtitle": "फॉर्म भरें और हमारी टीम 24 घंटे के भीतर आपसे संपर्क करेगी।",
    "contact.infoTitle": "संपर्क जानकारी",
    "contact.infoSubtitle": "निम्नलिखित में से किसी भी माध्यम से संपर्क करें।",
    "contact.name": "आपका नाम",
    "contact.email": "ईमेल पता",
    "contact.phone": "फ़ोन नंबर",
    "contact.message": "आपका संदेश",
    "contact.sendBtn": "संदेश भेजें",
    "contact.successTitle": "संदेश भेजा गया!",
    "contact.successDesc": "हम जल्द ही आपसे संपर्क करेंगे।",
    "contact.phoneSub": "सोम-शनि, सुबह 9 - शाम 6",
    "contact.emailSub": "हम 24 घंटे के भीतर जवाब देते हैं",
    "contact.addressSub": "पूरे भारत में डिलीवरी उपलब्ध",
    "contact.workingHours": "कार्य समय",
    "contact.workingValue": "सोम - शनि: सुबह 9 - शाम 6",
    "contact.workingSub": "रविवार बंद",

    // FAQ page
    "faq.title": "सवाल-जवाब",
    "faq.subtitle": "हमारे उत्पादों और सेवाओं के बारे में अक्सर पूछे जाने वाले प्रश्न।",
    "faq.q1": "आप कौन से उत्पाद बनाते हैं?",
    "faq.a1": "हम डिस्क हल, ऑटोमैटिक डिस्क हल, लेवलर, कल्टीवेटर और एमबी हल बनाते हैं — सभी भारतीय खेती की परिस्थितियों के लिए डिज़ाइन किए गए हैं।",
    "faq.q2": "क्या आप पूरे भारत में डिलीवरी करते हैं?",
    "faq.a2": "हां, हम पूरे भारत में विश्वसनीय डिलीवरी सेवाएं प्रदान करते हैं। शिपिंग समय स्थान के अनुसार भिन्न होता है।",
    "faq.q3": "क्या मुझे अनुकूलित उत्पाद मिल सकता है?",
    "faq.a3": "हां, हम आपकी विशिष्ट खेती की ज़रूरतों के आधार पर अपने उपकरणों को अनुकूलित कर सकते हैं। अपनी आवश्यकताओं पर चर्चा करने के लिए हमसे संपर्क करें।",
    "faq.q4": "आपके उत्पादों पर वारंटी क्या है?",
    "faq.a4": "हमारे सभी उत्पाद निर्माता की वारंटी के साथ आते हैं। कृपया प्रत्येक उत्पाद के लिए विशिष्ट वारंटी शर्तों के लिए हमसे संपर्क करें।",
    "faq.q5": "मैं कोटेशन कैसे अनुरोध कर सकता हूं?",
    "faq.a5": "आप हमारे पूछताछ पेज के माध्यम से कोटेशन का अनुरोध कर सकते हैं, या सीधे फ़ोन या ईमेल के माध्यम से हमसे संपर्क कर सकते हैं।",
    "faq.q6": "क्या आप बिक्री के बाद सहायता प्रदान करते हैं?",
    "faq.a6": "हां, हम रखरखाव, मरम्मत और स्पेयर पार्ट्स की उपलब्धता सहित व्यापक बिक्री के बाद सहायता प्रदान करते हैं।",

    // Gallery page
    "gallery.title": "गैलरी",
    "gallery.subtitle": "हमारे उपकरणों और कृषि कार्यों का दृश्य प्रदर्शन।",

    // Blog page
    "blog.title": "कृषि ज्ञान",
    "blog.subtitle": "आधुनिक भारतीय कृषि के लिए सुझाव, गाइड और जानकारी।",
    "blog.readMore": "और पढ़ें →",
    "blog.post1Title": "अपनी मिट्टी के प्रकार के लिए सही हल चुनना",
    "blog.post1Date": "15 जनवरी, 2026",
    "blog.post1Excerpt": "सही हल चुनने का पहला कदम अपनी मिट्टी के प्रकार को समझना है। जानें कि डिस्क हल, एमबी हल और कल्टीवेटर को अपनी विशिष्ट मिट्टी की स्थितियों से कैसे मिलाएं।",
    "blog.post2Title": "अपने कृषि उपकरणों के रखरखाव के 5 सुझाव",
    "blog.post2Date": "10 जनवरी, 2026",
    "blog.post2Excerpt": "उचित रखरखाव आपके कृषि उपकरणों की उम्र बढ़ाता है और इष्टतम प्रदर्शन सुनिश्चित करता है। डिस्क हल और कल्टीवेटर के लिए इन आवश्यक सुझावों का पालन करें।",
    "blog.post3Title": "आधुनिक खेती में ऑटोमैटिक डिस्क हल के लाभ",
    "blog.post3Date": "5 जनवरी, 2026",
    "blog.post3Excerpt": "ऑटोमैटिक डिस्क हल ऑपरेटर की थकान को कम करके और लगातार गहराई सुनिश्चित करके जुताई में क्रांति लाते हैं। जानें कि अधिक किसान क्यों बदलाव कर रहे हैं।",
    "blog.post4Title": "भूमि समतलीकरण: फसल उपज के लिए यह क्यों मायने रखता है",
    "blog.post4Date": "28 दिसंबर, 2025",
    "blog.post4Excerpt": "उचित भूमि समतलीकरण पानी के वितरण में सुधार करता है, जलभराव को कम करता है और फसल उपज को महत्वपूर्ण रूप से बढ़ाता है। जानें कि लेवलर आपके खेतों को कैसे बदल सकते हैं।",

    // Enquiry page
    "enquiry.title": "कोटेशन अनुरोध",
    "enquiry.subtitle": "अपना विवरण भरें और हम आपको प्रतिस्पर्धी कोटेशन प्रदान करेंगे।",
    "enquiry.fullName": "पूरा नाम *",
    "enquiry.email": "ईमेल *",
    "enquiry.phone": "फ़ोन *",
    "enquiry.selectProduct": "उत्पाद चुनें *",
    "enquiry.quantity": "मात्रा",
    "enquiry.additional": "अतिरिक्त आवश्यकताएं",
    "enquiry.submitBtn": "पूछताछ जमा करें",
    "enquiry.successTitle": "पूछताछ जमा हो गई!",
    "enquiry.successDesc": "हमारी टीम जल्द ही कोटेशन के साथ आपसे संपर्क करेगी।",

    // Footer
    "footer.desc": "प्रीमियम कृषि उपकरणों के प्रमुख निर्माता और आपूर्तिकर्ता। विश्वसनीय, उच्च-प्रदर्शन उपकरणों के साथ किसानों को सशक्त बनाना।",
    "footer.quickLinks": "त्वरित लिंक",
    "footer.products": "उत्पाद",
    "footer.contact": "संपर्क",
    "footer.phone": "फ़ोन",
    "footer.email": "ईमेल",
    "footer.location": "स्थान",
    "footer.rights": "सभी अधिकार सुरक्षित।",
    "footer.privacy": "गोपनीयता",
    "footer.terms": "नियम",
    "footer.disclaimer": "अस्वीकरण",
    "footer.aboutUs": "हमारे बारे में",

    // Language popup
    "lang.title": "Choose Your Language",
    "lang.subtitle": "अपनी भाषा चुनें",
    "lang.english": "English",
    "lang.hindi": "हिन्दी",

    // WhatsApp
    "whatsapp.chatWithUs": "हमसे बात करें!",
    "whatsapp.replyInstantly": "हम तुरंत जवाब देते हैं",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("preferred-language");
    return (saved as Language) || "en";
  });
  const [showLanguagePopup, setShowLanguagePopup] = useState(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred-language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Show popup after 10 seconds if user hasn't chosen a language before
  useEffect(() => {
    const hasChosen = localStorage.getItem("preferred-language");
    if (!hasChosen) {
      const timer = setTimeout(() => {
        setShowLanguagePopup(true);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, showLanguagePopup, setShowLanguagePopup }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
