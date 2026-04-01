import Layout from "@/components/Layout";

const Disclaimer = () => (
  <Layout>
    <section className="bg-primary py-16">
      <div className="container">
        <h1 className="font-display text-4xl font-bold text-primary-foreground">Disclaimer</h1>
      </div>
    </section>
    <section className="py-16">
      <div className="container max-w-3xl prose prose-sm text-muted-foreground">
        <p>The information provided on this website is for general informational purposes only. While we strive to keep the information up to date and correct, we make no representations or warranties of any kind about the completeness, accuracy, reliability, or suitability of the information, products, or services contained on this website.</p>
        <p className="mt-4">Product images are for illustration purposes and may differ from actual products. Specifications and features are subject to change without prior notice. Always contact us for the latest product information before making a purchase decision.</p>
      </div>
    </section>
  </Layout>
);

export default Disclaimer;
