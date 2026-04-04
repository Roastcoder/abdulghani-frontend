import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { API_BASE_URL } from "@/config/api";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

const Blog = () => {
  const { t, language } = useLanguage();
  const hi = language === "hi";

  const { data: dbPosts } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/api/blogs`);
      return res.ok ? res.json() : [];
    },
  });

  const fallbackPosts = [
    { id: 1, title: t("blog.post1Title"), excerpt: t("blog.post1Excerpt"), date: t("blog.post1Date"), author: "Admin", image_url: null },
    { id: 2, title: t("blog.post2Title"), excerpt: t("blog.post2Excerpt"), date: t("blog.post2Date"), author: "Admin", image_url: null },
    { id: 3, title: t("blog.post3Title"), excerpt: t("blog.post3Excerpt"), date: t("blog.post3Date"), author: "Admin", image_url: null },
    { id: 4, title: t("blog.post4Title"), excerpt: t("blog.post4Excerpt"), date: t("blog.post4Date"), author: "Admin", image_url: null },
  ];

  const posts = dbPosts?.length ? dbPosts : fallbackPosts;
  const [featured, ...rest] = posts;

  const resolveImg = (url: string) => {
    if (!url) return null;
    if (url.startsWith("/uploads/")) return `${API_BASE_URL}${url}`;
    return url;
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] rounded-full bg-wheat blur-3xl" />
        </div>
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-wheat font-semibold tracking-[0.2em] uppercase text-sm mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-wheat" /> {hi ? "हमारा ब्लॉग" : "Our Blog"}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{t("blog.title")}</h1>
            <p className="text-primary-foreground/80 mt-3 text-lg max-w-xl">{t("blog.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container">

          {/* Featured post */}
          {featured && (
            <ScrollReveal className="mb-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow group">
                <div className="aspect-[4/3] lg:aspect-auto bg-muted relative overflow-hidden">
                  {resolveImg(featured.image_url) ? (
                    <img src={resolveImg(featured.image_url)!} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                      <BookOpen className="w-16 h-16 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                      {hi ? "विशेष लेख" : "Featured"}
                    </span>
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                    <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{featured.author}</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground leading-snug">{featured.title}</h2>
                  <p className="text-muted-foreground mt-4 leading-relaxed">{featured.excerpt}</p>
                  {featured.content && (
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-6 group-hover:gap-3 transition-all cursor-pointer">
                      {t("blog.readMore")} <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Rest of posts */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post: any, i: number) => (
                <ScrollReveal key={post.id} delay={i * 0.1}>
                  <motion.article
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group h-full flex flex-col"
                  >
                    <div className="aspect-[16/9] bg-muted relative overflow-hidden">
                      {resolveImg(post.image_url) ? (
                        <img src={resolveImg(post.image_url)!} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <BookOpen className="w-10 h-10 text-primary/30" />
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{post.date}</span>
                        <span className="flex items-center gap-1.5"><User className="w-3 h-3" />{post.author}</span>
                      </div>
                      <h2 className="font-display text-lg font-bold text-foreground leading-snug group-hover:text-primary transition-colors">{post.title}</h2>
                      <p className="text-muted-foreground text-sm mt-3 leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
                      {post.content && (
                        <span className="inline-flex items-center gap-1.5 text-primary font-semibold text-sm mt-4 group-hover:gap-2.5 transition-all cursor-pointer">
                          {t("blog.readMore")} <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </motion.article>
                </ScrollReveal>
              ))}
            </div>
          )}

          {posts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>{hi ? "अभी तक कोई ब्लॉग पोस्ट नहीं" : "No blog posts yet"}</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
