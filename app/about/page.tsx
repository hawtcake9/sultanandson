import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Sultan & Sons Engineering | Solar Solutions",
  description:
    "Learn about Sultan & Sons Engineering - serving the energy sector since 2010 with reliable and practical solar solutions across the region.",
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="section-container max-w-3xl">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 uppercase">
              About Sultan & Sons Engineering
            </h1>
            <div className="h-1 w-20 bg-linear-to-r from-primary via-secondary to-accent rounded-full"></div>
          </div>

          {/* Company Overview */}
          <section className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Sultan & Sons Engineering has been serving the energy sector since 2010, providing reliable and practical
              solar solutions to customers across the region. With years of hands-on experience, the company has built a
              strong reputation based on trust, quality work, and customer satisfaction.
            </p>
          </section>

          {/* Our Services */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 uppercase">Our Services</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We specialize in complete solar solutions, including solar system installation, solar inverters,
              batteries, solar panels, and all related accessories. Our services cover residential, commercial, and
              industrial projects, ensuring efficient and cost-effective energy solutions tailored to customer needs.
            </p>
          </section>

          {/* Our Approach */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 uppercase">Our Approach</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sultan & Sons Engineering focuses on delivering technically sound installations using quality products and
              proven methods. Every project is handled with careful planning, professional execution, and long-term
              performance in mind.
            </p>
          </section>

          {/* Partnership */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 uppercase">ZIEWNIC Partnership</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Along with our own services, Sultan & Sons Engineering is also an authorized KPK distributor of ZIEWNIC,
              allowing us to provide genuine ZIEWNIC solar panels and inverters with full confidence and support. This
              partnership further strengthens our ability to offer dependable and advanced solar solutions to our
              customers.
            </p>
          </section>

          {/* Our Vision */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 uppercase">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our goal is not just to supply equipment, but to provide complete energy solutions that build long-term
              relationships and customer trust. We are committed to supporting the transition toward clean, renewable
              energy and contributing to a sustainable future.
            </p>
          </section>
        </div>
      </main>
     <Footer />
    </>
  )
}
