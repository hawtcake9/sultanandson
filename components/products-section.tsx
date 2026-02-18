"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"

const products = [
  {
    id: 1,
    name: "SolarPower 3K",
    power: "3 kW",
    price: "$1,899",
    image: "⚡",
    specs: ["150-900V DC Input", "Single Phase", "Compact Design", "WiFi Enabled"],
    features: ["Perfect for small residential systems", "High efficiency @ 98.2%", "15-year warranty"],
    inStock: true,
  },
  {
    id: 2,
    name: "SolarPower 5K",
    power: "5 kW",
    price: "$2,499",
    image: "⚡",
    specs: ["150-900V DC Input", "Single/Three Phase", "Dual Tracking", "Smart App"],
    features: ["Ideal for mid-size homes", "High efficiency @ 98.5%", "15-year warranty"],
    inStock: true,
    featured: true,
  },
  {
    id: 3,
    name: "SolarPower 7K",
    power: "7 kW",
    price: "$3,199",
    image: "⚡",
    specs: ["150-900V DC Input", "Three Phase", "Advanced MPPT", "Grid Support"],
    features: ["Large residential systems", "High efficiency @ 98.4%", "15-year warranty"],
    inStock: true,
  },
  {
    id: 4,
    name: "SolarPower 8K",
    power: "8 kW",
    price: "$3,699",
    image: "⚡",
    specs: ["150-900V DC Input", "Three Phase", "Dual MPPT", "Battery Ready"],
    features: ["Premium home solution", "High efficiency @ 98.5%", "15-year warranty"],
    inStock: true,
  },
  {
    id: 5,
    name: "SolarPower 10K",
    power: "10 kW",
    price: "$4,499",
    image: "⚡",
    specs: ["150-900V DC Input", "Three Phase", "Dual MPPT", "Commercial Grade"],
    features: ["Commercial/large residential", "High efficiency @ 98.3%", "15-year warranty"],
    inStock: true,
  },
  {
    id: 6,
    name: "SolarPower Hybrid",
    power: "6 kW / 5kWh",
    price: "$5,999",
    image: "🔋",
    specs: ["Battery Compatible", "AC/DC Hybrid", "Backup Power", "Cloud Monitoring"],
    features: ["Storage integration", "Emergency backup", "Self-consumption optimization"],
    inStock: false,
  },
  {
    id: 7,
    name: "Mark Series 4.2KW",
    power: "4.2 kW",
    price: "Contact for pricing",
    image: "⚡",
    specs: ["SP-Hybrid Technology", "WiFi Enabled", "Solar + Battery Ready", "Touch Display"],
    features: ["Advanced hybrid capability", "MPPT solar charging", "AC backup charging"],
    inStock: true,
    slug: "mark-series-4-2kw",
  },
  {
    id: 8,
    name: "Mark Series 6.2KW",
    power: "6.2 kW",
    price: "Contact for pricing",
    image: "⚡",
    specs: ["SP-Hybrid Technology", "WiFi Enabled", "Solar + Battery Ready", "Touch Display"],
    features: ["Advanced hybrid capability", "MPPT solar charging", "AC backup charging"],
    inStock: true,
    slug: "mark-series-6-2kw",
  },
  {
    id: 9,
    name: "Nord Series 8.2KW",
    power: "8.2 kW",
    price: "Contact for pricing",
    image: "⚡",
    specs: ["SP-Hybrid Technology", "WiFi Enabled", "Solar + Battery Ready", "Touch Display"],
    features: ["Advanced hybrid capability", "MPPT solar charging", "AC backup charging"],
    inStock: true,
    slug: "nord-series-8-2kw",
  },
  {
    id: 10,
    name: "Nord Series 10.2KW",
    power: "10.2 kW",
    price: "Contact for pricing",
    image: "⚡",
    specs: ["SP-Hybrid Technology", "WiFi Enabled", "Solar + Battery Ready", "Touch Display"],
    features: ["Advanced hybrid capability", "MPPT solar charging", "AC backup charging"],
    inStock: true,
    slug: "nord-series-10-2kw",
  },
]

export function ProductsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const markProducts = products.filter(
    (p) => p.id >= 7 && p.id <= 10, // Mark Series (7-8) and Nord Series (9-10)
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("[data-product]").forEach((el, idx) => {
            setTimeout(() => {
              el.classList.remove("opacity-0", "translate-y-8")
              el.classList.add("animate-fade-in-up")
            }, idx * 80)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" ref={sectionRef} className="relative py-20 sm:py-32 bg-muted/30">
      <div className="section-container space-y-16">
        {/* Featured Mark Series & Nord Series Section */}
        <div className="grid md:grid-cols-2 gap-6 justify-items-center md:justify-items-start">
          {markProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-xl border border-primary bg-card overflow-hidden shadow-lg w-full md:max-w-sm"
              data-product
            >
              <div className="flex flex-col">
                <div className="relative w-full h-[500px] bg-muted/50">
                  <Link href={`/products/${product.slug}`} className="block w-full h-full">
                    <img
                      src={
                        product.slug === "mark-series-4-2kw"
                          ? "/images/mark-4-2kw/mrkcover.jpeg"
                          : product.slug === "mark-series-6-2kw"
                            ? "/images/mark-6-2kw/cover.jpeg"
                            : product.slug === "nord-series-8-2kw"
                              ? "/images/nord-8-2kw/nrdcover.jpeg"
                              : product.slug === "nord-series-10-2kw"
                                ? "/images/nord-10-2kw/nordcover.jpeg"
                                : ""
                      }
                      alt={product.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 cursor-pointer bg-white"
                    />
                  </Link>
                </div>

                {/* Content Section - Bottom */}
                <div className="p-6 text-center space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-card-foreground">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{product.power}</p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-block px-6 py-2 rounded-lg font-semibold text-sm transition-colors button-primary bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      View Details
                    </Link>
                    <a
                      href="https://wa.me/923459012298"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-6 py-2 rounded-lg font-semibold text-sm transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/90"
                    >
                      Contact Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Us Section */}
        <div className="flex flex-col items-center justify-center py-12 gap-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">Interested in Our Products?</h3>
            <p className="text-muted-foreground">Get in touch with us for pricing and more information</p>
          </div>
          <a
            href="https://wa.me/923459012298"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-lg font-semibold text-base transition-colors button-primary bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
