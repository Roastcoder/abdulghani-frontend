import Layout from "@/components/Layout";

const Privacy = () => (
  <Layout>
    <section className="bg-primary py-16">
      <div className="container">
        <h1 className="font-display text-4xl font-bold text-primary-foreground">Privacy Policy</h1>
      </div>
    </section>
    <section className="py-16">
      <div className="container max-w-3xl prose prose-sm text-muted-foreground">
        <h2 className="font-display text-xl font-semibold text-foreground">Information We Collect</h2>
        <p>We collect information you provide through our contact and enquiry forms, including your name, email, phone number, and any messages you send us. This information is used solely to respond to your enquiries and provide quotes.</p>
        <h2 className="font-display text-xl font-semibold text-foreground mt-8">How We Use Your Information</h2>
        <p>Your personal information is used to process enquiries, provide customer support, and improve our services. We do not sell or share your data with third parties.</p>
        <h2 className="font-display text-xl font-semibold text-foreground mt-8">Contact</h2>
        <p>For privacy-related questions, please contact us through our Contact page.</p>
      </div>
    </section>
  </Layout>
);

export default Privacy;
