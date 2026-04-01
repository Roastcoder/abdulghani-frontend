import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const Blog = () => {
  const { t } = useLanguage();

  const blogPosts = [
    { title: t("blog.post1Title"), date: t("blog.post1Date"), excerpt: t("blog.post1Excerpt") },
    { title: t("blog.post2Title"), date: t("blog.post2Date"), excerpt: t("blog.post2Excerpt") },
    { title: t("blog.post3Title"), date: t("blog.post3Date"), excerpt: t("blog.post3Excerpt") },
    { title: t("blog.post4Title"), date: t("blog.post4Date"), excerpt: t("blog.post4Excerpt") },
  ];

  return (
    <Layout>
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground">{t("blog.title")}</h1>
            <p className="text-primary-foreground/80 mt-3 text-lg">{t("blog.subtitle")}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container max-w-3xl">
          <div className="space-y-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border/50 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <time className="text-xs text-muted-foreground font-medium">{post.date}</time>
                <h2 className="font-display text-xl font-bold text-foreground mt-2">{post.title}</h2>
                <p className="text-muted-foreground mt-3 leading-relaxed">{post.excerpt}</p>
                <span className="text-primary text-sm font-semibold mt-4 inline-block cursor-pointer hover:underline">{t("blog.readMore")}</span>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
