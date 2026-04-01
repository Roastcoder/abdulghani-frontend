import Layout from "@/components/Layout";

const Terms = () => (
  <Layout>
    <section className="bg-primary py-16">
      <div className="container">
        <h1 className="font-display text-4xl font-bold text-primary-foreground">Terms & Conditions</h1>
      </div>
    </section>
    <section className="py-16">
      <div className="container max-w-3xl prose prose-sm text-muted-foreground">
        <h2 className="font-display text-xl font-semibold text-foreground">General Terms</h2>
        <p>By using this website, you agree to these terms and conditions. All products are subject to availability and pricing may change without notice.</p>
        <h2 className="font-display text-xl font-semibold text-foreground mt-8">Product Information</h2>
        <p>We make every effort to ensure product descriptions and images are accurate. However, slight variations may occur. Contact us for the most up-to-date specifications.</p>
        <h2 className="font-display text-xl font-semibold text-foreground mt-8">Limitation of Liability</h2>
        <p>Abdul Gani Hazi Gulam Mohd shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or this website.</p>
      </div>
    </section>
  </Layout>
);

export default Terms;
